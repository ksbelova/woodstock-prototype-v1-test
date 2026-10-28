"use strict";
(() => {
 const $=id=>document.getElementById(id), scenario=document.body.dataset.panelScenario;
 const standard=scenario==="standard",wall=scenario==="wall";
 const Core=window.WoodstockPanelsCore,Common=window.WoodstockQuickCommon;
 let api=null,contact=null,submitted=false,syncing=false,certifiedState=false;
 const title=document.querySelector('h1').textContent;
 const money=Core.formatMoney,number=v=>Number.isFinite(v)?new Intl.NumberFormat('ru-RU',{maximumFractionDigits:4}).format(v):'—';
 const allowed=standard?['mdf','dsp','gsp','plywood_water','plywood_light','plywood_flexible','blockboard']:wall?['mdf','dsp','gsp','plywood_water','plywood_light']:['mdf','dsp','plywood_water','plywood_light','blockboard'];
 window.WoodstockPanelsView={
  allowBase:base=>Boolean(base)&&allowed.includes(base.id),
  baseSelectable:base=>!base||['mdf','dsp'].includes(base.id),
  priceSensitivePatterns:true,
  emptyInitialBase:true,
  positionPricing:true,
  edgeVolumePricing:true,
  automaticOperations:true,
  transitionMinimumPieces:2,
  allowLayout:layout=>layout.id!=="herringbone"&&(!standard||layout.id!=="custom"),
  thicknesses:(base,values,data)=>(values||[]).filter(value=>{
   if(!base||!['mdf','dsp'].includes(base.id))return false;
   const key=String(value),mode=standard?'standard':'exact';
   if(base.id==='mdf'&&key==='24')return false; // Legacy standard rates AC23:AC24 conflict with the exact-price classification; confirmation pending.
   if(wall&&!(base.id==='dsp'?key==='16':['10','12','16','6+6'].includes(key)))return false;
   const status=data.baseThicknessScenarioPriceModes?.[base.id]?.[key]?.[mode]||data.baseThicknessPriceModes?.[base.id]?.[key];
   const rates=standard?data.standardProductionRates:data.nonstandardRates;
   return status==='automatic'&&rates.some(rate=>rate.baseId===base.id&&String(rate.thickness)===key&&Number.isFinite(rate.ratePerM2));
  }),
  changed:result=>{if(api)render(result);}
 };
 function render(result){
  if(syncing)return;
  const form=api.form;
  if(wall&&$('quickVeneeredSides')) $('quickVeneeredSides').textContent=form.veneerThicknessSelect.value ? (Number(form.veneeredSidesSelect.value)===2?'с двух сторон':'с одной стороны') : '—';
  if(wall&&$('quickReverseSide')) {
   const thickness=Number(form.veneerThicknessSelect.value);
   const two=Number(form.veneeredSidesSelect.value)===2;
   $('quickReverseSide').textContent=!form.veneerThicknessSelect.value?'—':two
    ? (Math.abs(thickness-2.5)<0.001?'шпон ясеня 2,5 мм':'шпон той же породы, 2 мм')
    : form.reverseSideSelect.value==='paper'?'бумага':'черновой шпон';
  }
  const certified=wall&&result?.base?.id==='gsp';
  if(certified!==certifiedState){
   certifiedState=certified;syncing=true;
   if(certified){form.finishSelect.add(new Option('По сертификату КМ1','none'));form.finishSelect.value='none';form.edgeModeSelect.value='none';}
   else if(!standard){form.finishSelect.querySelector('option[value="none"]')?.remove();form.finishSelect.value='';}
   form.finishSelect.disabled=certified;form.edgeModeSelect.disabled=certified;
   form.finishSelect.dispatchEvent(new Event('change',{bubbles:true}));form.edgeModeSelect.dispatchEvent(new Event('change',{bubbles:true}));
   syncing=false;result=api.result();
  }
  if(wall&&$('quickFinishExplanation')) {
   const descriptions={
    lacquer_acrylic:'Прозрачное покрытие на водной основе, сохраняет рисунок и цвет шпона, подходит для стен и мебели без высокой нагрузки.',
    lacquer_polyurethane:'Прозрачное покрытие повышенной прочности, лучше переносит частые прикосновения и влажную уборку, подходит для коридоров, холлов и общественных помещений.',
    enamel:'Непрозрачное цветное покрытие, перекрывает рисунок шпона, но сохраняет его фактуру.'
   };
   const text=descriptions[form.finishSelect.value]||'';
   $('quickFinishExplanation').textContent=text;
   $('quickFinishExplanation').classList.toggle('is-hidden',!text);
  }
  if((wall||scenario==='details')&&$('quickToningField')) {
   const lacquer=['lacquer_acrylic','lacquer_polyurethane'].includes(form.finishSelect.value);
   $('quickToningField').classList.toggle('is-hidden',!lacquer);
   $('quickToningCheckbox').checked=lacquer&&form.toningSelect.value==='yes';
  }
  // The short scenario selects the documented finish process, then the existing controller prices it.
  const process=form.finishSelect.value==='lacquer_acrylic'&&form.lacquerProcessSelect.value===''?'primer_lacquer':null;
  if(process&&[...form.lacquerProcessSelect.options].some(o=>o.value===process)){
   syncing=true;form.lacquerProcessSelect.value=process;api.recalculate();syncing=false;result=api.result();
  }
  if(form.finishSelect.value==='enamel'&&!form.enamelVariantSelect.value){syncing=true;form.enamelVariantSelect.value='Грунт + эмаль';api.recalculate();syncing=false;result=api.result();}
  const ready=!!result?.base&&!!result.validSizes?.length&&!api.issues().length&&(standard||certified||!!form.finishSelect.value);
  const boring=$('boringSelect')?.value==='yes';
  const hasKnownPrice=Number.isFinite(result?.finalTotal)&&result.finalTotal>0;
  const partial=(hasKnownPrice||ready)&&(!ready||!result.priceCalculationComplete||boring);
  $('resultTotal').textContent=!hasKnownPrice&&!ready?'—':partial?(hasKnownPrice?money(result.finalTotal)+' *':'Стоимость рассчитает менеджер'):money(result.finalTotal);
  $('priceLabel').textContent=partial?'Стоимость рассчитанной части с НДС':'Ориентировочная стоимость с НДС';
  $('partialWarning').classList.toggle('is-hidden',!partial);
  $('partialWarning').textContent=partial?'Расчёт неполный. '+[...(result.warnings||[]),...(boring?['Присадка: стоимость определяет производство.']:[])].join(' '):'';
  $('quickArea').textContent=result?.base&&result.totalArea>0?number(result.totalArea)+' м²':'—';
  if((wall||standard)&&$('quickEdgeWidth')) {
   const width=result?.edge?.widthMm;
   $('quickEdgeWidth').textContent=result?.edge?.mode===(standard?'separate':'attached')&&Number.isFinite(width)&&width>0?number(width)+' мм':'—';
  }
 }
 function productDocument(record,result){
  const side=(material,pattern)=>material?[`${material.name||'—'} · ${number(material.thicknessMm)} мм`,pattern].filter(Boolean).join(' · '):record.sideB||'—';
  const edge=record.edge||{};
  const certified=wall&&record.baseId==='gsp';
  const edgeText=certified?'По сертификату КМ1 (уточняет производство)':edge.mode==='none'?'Не нужна':[edge.typeName,edge.veneerName||edge.name,edge.thicknessApplicable?number(edge.thicknessMm)+' мм':'',number(edge.widthMm)+' мм',number(edge.meters??edge.orderedMeters)+' пог. м'].filter(Boolean).join(' · ');
  const edgeForPosition=row=>{
   if(edge.mode==='none')return 'Не нужна';
   if(edge.mode==='separate')return 'Отдельная спецификация';
   const position=edge.positionSettings?.find(item=>item.position===row.position);
   if(!position)return 'См. спецификацию кромки';
   if(!position.applies)return 'Не нужна';
   return [edge.typeName,edge.veneerName||edge.name,Number.isFinite(position.thicknessMm)?number(position.thicknessMm)+' мм':'',Number.isFinite(position.widthMm)?number(position.widthMm)+' мм':'',position.sides,number(position.calculatedMeters)+' пог. м'].filter(Boolean).join(' · ');
  };
  const boring=$('boringSelect')?.value==='yes';
  const rows=record.sizes.map(row=>{
   const partial=row.pricingPartial||boring;
   const value=amount=>money(amount)+(partial&&Number.isFinite(amount)?' *':'');
   const classification=standard&&['warehouse_standard','standard_request'].includes(row.classificationId)?row.classificationName:'';
   return [
   String(row.position),[record.title,classification].filter(Boolean).join('\n'),
   `А: ${side(record.materialSides.A,record.veneerCut)}\nБ / оборот: ${record.sides===2?side(record.materialSides.B,record.veneerBCut):record.sideB}\nШпон: ${Number(record.sides)===2?'с двух сторон':'с одной стороны'}`,
   `А: ${record.layout}\nБ: ${record.layoutB||'—'}\n${certified?'Покрытие по сертификату КМ1 (уточняет производство)':record.finishByPosition.find(x=>x.position===row.position)?.summary||record.finish}\nКромка: ${edgeForPosition(row)}${row.comment?'\nКомментарий: '+row.comment:''}${$('boringSelect')?.value==='yes'?'\nПрисадка: по чертежу':''}`,
   `${row.length} × ${row.width}`,String(row.quantity),number(row.area),
   `${value(row.knownPricePerPiece)} / шт.\n${value(row.knownPricePerM2)} / м²`,value(row.knownSubtotal)
  ];});
  const partial=!result.priceCalculationComplete||$('boringSelect')?.value==='yes';
  const notes=[];
  const rowPartial=record.sizes.some(row=>row.pricingPartial)||boring;
  if(rowPartial)notes.push({text:'* Частичная стоимость позиции: учтены только рассчитанные составляющие.',style:'infoSmall'});
  if(Number.isFinite(result.orderLevelUnallocatedCost)&&Math.abs(result.orderLevelUnallocatedCost)>0.000001)notes.push({text:'Общие рассчитанные затраты заказа, не распределённые по изделиям: '+money(result.orderLevelUnallocatedCost)+'. Они включены в итог один раз.',style:'infoSmall'});
  const round=v=>Math.round((v+Number.EPSILON)*100)/100;
  const rowRounding=round(round(result.finalTotal)-record.sizes.reduce((sum,row)=>sum+round(row.knownSubtotal||0),0)-round(result.orderLevelUnallocatedCost||0));
  const breakdownRounding=round(round(result.finalTotal)-result.breakdown.reduce((sum,item)=>sum+round(item.value),0));
  if(rowRounding||breakdownRounding)notes.push({text:'Расчёт выполнен без промежуточного округления. Разница округления: по позициям '+money(rowRounding)+'; по составляющим '+money(breakdownRounding)+'.',style:'infoSmall'});
  if(certified)notes.push({text:"ГСП: состав кромки и покрытия по сертификату КМ1 подтверждает производство.",style:"infoText"});
  if(partial)notes.push({text:'Расчёт неполный. Указана только рассчитанная часть. Полную стоимость подтвердит менеджер.',style:'infoText',margin:[0,8,0,4]},{ul:[...result.warnings,...($('boringSelect')?.value==='yes'?['Присадка: стоимость производства.']:[])],style:'infoSmall'});
  notes.push({text:'Рассчитанные составляющие',style:'sectionTitle'},{table:{headerRows:1,dontBreakRows:true,widths:Common.fitPdfTableWidths([360,179],3),body:[[{text:'Составляющая',bold:true},{text:'Стоимость с НДС',bold:true}],...result.breakdown.map(x=>[x.label,money(x.value)])]},layout:Common.pdfTableLayout()});
  if(edge.mode!=='none')notes.push({text:'Кромка — данные отдельной спецификации',style:'sectionTitle'},{text:edgeText,style:'infoSmall'});
  const files=[...new Set([...contact.fileNames(),...(record.layoutTzFiles||[]),...record.sizes.flatMap(row=>row.files||[])])];
  if(record.layoutTzComment)notes.push({text:'Требования к раскладке: '+record.layoutTzComment,style:'infoText'});
  if(wall||scenario==='details') notes.push({text:(wall?'Переход рисунка на панелях: ':'Переход рисунка на деталях: ')+(record.patternTransitionRequested?'да':'нет'),style:'infoText'});
  notes.push({text:'Дополнительные требования',style:'sectionTitle'},{text:record.comment||'—',style:'infoText'},{text:'Файлы: '+(files.join(', ')||'нет'),style:'infoSmall'},{text:'Связь с менеджером: '+($('managerContactInput').checked?'нужна':'не запрошена'),style:'infoSmall'});
  return {dontBreakRows:false,title,numberPrefix:'КР-ПЛ-',subtitle:'Краткий расчёт плит',widths:[12,52,110,103,57,24,38,65,65],header:['№','Основа','Шпон','Раскладка и обработка','Размер, мм','Шт.','Площадь, м²','Цена с НДС','Сумма с НДС'].map(text=>({text,style:'tableHeader'})),rows,afterPrice:notes};
 }
 // Standard sizes are tied to the chosen base. A cleared base must not retain a previously selected format.
 function clearBaseDependentStandardSizes(){
  api.form.sizeRows.querySelectorAll('[data-size-row][data-size-mode="standard"]').forEach(row=>{
   row.dataset.sizeMode='';
   delete row.dataset.sourceStandardLength;
   delete row.dataset.sourceStandardWidth;
   ['length','width'].forEach(key=>{
    const input=row.querySelector(`[data-size-${key}]`);
    if(input){input.value='';input.readOnly=false;}
   });
   row.querySelectorAll('[data-standard-size].is-selected').forEach(button=>button.classList.remove('is-selected'));
  });
 }
 function contactForm(){return {name:$('nameInput'),phone:$('phoneInput'),city:$('cityInput'),email:$('emailInput'),comment:$('commentInput'),files:$('filesInput'),managerContact:$('managerContactInput'),privacy:$('privacyInput')};}
 function submit(){
  submitted=true;const issues=contact.validate();
  if(issues.length){$('saveStatus').textContent='Заполните обязательные контактные данные и согласие.';issues[0].input.focus();return;}
  if(!standard&&api.form.finishSelect.value===''){$('saveStatus').textContent='Выберите покрытие.';api.form.finishSelect.focus();return;}
  if(!standard&&api.form.layoutSelect.value==='custom'&&!api.form.layoutTzFiles.files.length){$('saveStatus').textContent='Для раскладки по ТЗ приложите файл.';api.form.layoutTzFiles.focus();return;}
  if(scenario==='details'&&$('boringSelect').value==='yes'&&!contact.fileNames().length){$('saveStatus').textContent='Для присадки приложите чертёж.';return;}
  // This is the detailed calculation's own validation and serialization, without writing a specification item.
  const record=api.capture();if(!record)return;
  if(wall||scenario==='details') record.patternTransitionRequested=Boolean($('quickPatternTransition')?.checked);
  const result=api.result();
  if($('boringSelect')?.value==='yes')record.sizes.forEach(row=>{row.pricingPartial=true;row.pricingComplete=false;row.total=null;row.pricePerM2=null;row.pricePerPiece=null;row.pendingCosts=[...(row.pendingCosts||[]),'Присадка: стоимость производства'];});
  const f=contactForm(),partial=!result.priceCalculationComplete||$('boringSelect')?.value==='yes';
  const payload={createdAt:record.createdAt,pricing:{total:result.finalTotal,finalPricePerM2:result.avgM2,vat:result.vat,partial},contact:{name:f.name.value.trim(),phone:f.phone.value.trim(),city:f.city.value.trim(),email:contact.normalizeEmail(f.email.value),comment:f.comment.value.trim(),files:contact.fileNames(),callbackRequested:f.managerContact.checked,privacyAccepted:f.privacy.checked}};
  try{localStorage.setItem('woodstockQuickPanelsCalculation',JSON.stringify({...record,...($('boringSelect')?.value==='yes'?{boring:{required:true,pricingStatus:'production'},pricingPartial:true,requiresProductionCost:true,total:null,knownSubtotal:result.finalTotal}:{}),contact:payload.contact}));}catch(error){console.warn('Не удалось сохранить расчёт локально:',error);}
  Common.downloadSpecification(payload,productDocument(record,result),`woodstock-panels-${scenario}-specification.pdf`,$('saveStatus'),()=>{$('saveStatus').textContent='Спецификация и расчёт скачаны в PDF.';Common.openDownloadModal($('downloadModal'));});
 }
 async function init(){
  api=window.WoodstockPanelsController;await api.ready;
  // Run before the detailed controller's change handler and its recalculation.
  api.form.baseSelect.addEventListener('change',()=>{if(!api.form.baseSelect.value)clearBaseDependentStandardSizes();},true);
  const f=contactForm(),ui={citySuggestions:$('citySuggestions'),selectedFiles:$('selectedFiles')};
  contact=Common.createContact({form:f,ui,submitted:()=>submitted,renderAll:()=>api.recalculate()});contact.bind();
  f.files.addEventListener('change',()=>api.recalculate());
  $('getCalculationButton').addEventListener('click',submit);
  if(wall||scenario==='details') $('quickToningCheckbox')?.addEventListener('change',()=>{
   api.form.toningSelect.value=['lacquer_acrylic','lacquer_polyurethane'].includes(api.form.finishSelect.value)&&$('quickToningCheckbox').checked?'yes':'no';
   api.form.toningSelect.dispatchEvent(new Event('change',{bubbles:true}));
  });
  $('downloadModalClose').addEventListener('click',()=>Common.closeDownloadModal($('downloadModal')));
  $('downloadModal').addEventListener('click',event=>{if(event.target===$('downloadModal'))Common.closeDownloadModal($('downloadModal'));});
  api.form.root.addEventListener('submit',event=>{event.preventDefault();submit();});
  api.form.veneeredSidesSelect.value=wall?'1':'2';
  if(standard)api.form.finishSelect.value='none';
  else{
   api.form.finishSelect.querySelector('option[value="none"]')?.remove();api.form.finishSelect.add(new Option('Выберите покрытие',''),0);api.form.finishSelect.value='';
   const prepareRows=()=>{document.querySelectorAll('[data-size-row]').forEach(row=>{if(!row.dataset.sizeMode)api.customSize(row,{focus:false});});};
   prepareRows();new MutationObserver(prepareRows).observe(api.form.sizeRows,{childList:true});
  }
  // These are the existing detailed fields, hidden for the shortened client scenario.
  ['toningSelect','isolatorSelect','positionFinishToggle','positionEdgeToggle','lacquerExecutionSelect','lacquerProcessSelect','enamelVariantSelect','edgeOrderPriceInput','separateEdgeOrderPriceInput'].forEach(id=>{$(id)?.closest('.field')?.setAttribute('data-quick-hidden','');});
  api.form.finishSelect.dispatchEvent(new Event('change',{bubbles:true}));api.recalculate();render(api.result());
 }
 // Configure the view before detailed-panels.js starts; the DOM event runs after it has been loaded.
 window.addEventListener('DOMContentLoaded',()=>init().catch(error=>{console.error(error);$('saveStatus').textContent='Не удалось запустить расчёт.';}));
})();
