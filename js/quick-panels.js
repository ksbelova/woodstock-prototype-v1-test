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

 const preliminaryDisclaimer='Это предварительный расчёт. Точную стоимость назовёт менеджер, когда уточнит детали вашего заказа';
 // Здесь меняется только язык сообщений для клиента, а не расчётные предупреждения.
 function clientWarningReason(raw){
   const source=String(raw||'').trim();
   if(!source)return '';
   if(/^Присадка:/i.test(source))return 'присадка — отверстия под петли и/или ручки';
   if(/^Не выбрана основа/i.test(source))return 'стоимость основы (материал не выбран)';
   if(/^Не задана корректная толщина основы/i.test(source))return 'стоимость основы (толщина не указана)';
   if(/^Не выбран тип материала/i.test(source))return 'стоимость шпона (тип не выбран)';
   if(/^Не выбрана доступная толщина лицевого шпона/i.test(source))return 'стоимость шпона (толщина не выбрана)';
   if(/^Не добавлен ни один заполненный размер/i.test(source))return 'стоимость изделий (не указаны размеры)';
   if(/^Введите количество целым числом/i.test(source))return 'стоимость изделий (уточните количество)';
   if(/^(Выберите раскладку шпона|Выбранная раскладка недоступна)/i.test(source))return 'стоимость раскладки шпона (уточните раскладку)';
   if(/^Добавьте описание раскладки/i.test(source))return 'стоимость раскладки по индивидуальному заданию';
   if(/^Готовая рубашка:/i.test(source))return 'стоимость приклеивания готового шпона';
   if(/^(Обратная сторона: цена категории|Обратная сторона.*Extra\/AA|Лицевой слой 2 мм:)/i.test(source))return 'стоимость шпона обратной стороны';
   if(/^Черновая обратная сторона:/i.test(source)||/толщины чернового шпона нет подтверждённой ставки/i.test(source))return 'стоимость чернового шпона обратной стороны';
   if(/(ставка бумаги на обратной стороне|Для бумаги на обратной стороне ставка)/i.test(source))return 'стоимость бумаги на обратной стороне';
   if(/^Лак полиуретановый:/i.test(source))return 'покрытие полиуретановым лаком';
   if(/^Глянец 100%:/i.test(source))return 'покрытие с блеском 100%';
   if(/технологической схемы\/числа сторон нет подтверждённого/i.test(source))return 'стоимость выбранного покрытия';
   if(/^Фаска:/i.test(source))return 'стоимость фаски на кромке';
   if(/(операци[яи] кромления|кромление требуется|тарифа операции кромления)/i.test(source))return 'работа по кромлению';
   if(/(кромка отсутствует в складском прайсе|складской кромки нет цены)/i.test(source))return 'стоимость выбранной кромки';
   if(/^Калибровка ДСП:/i.test(source)||/Для калибровки не задана базовая ставка/i.test(source))return 'обработка основы до нужной толщины';
   if(/чистовой припил|тарифа припила/i.test(source))return 'чистовой распил изделия';
   if(/^(Диагональ 45°: ставка|Не подтверждена ставка диагонали)/i.test(source))return 'работа по диагональной раскладке шпона';
   if(/Не подтверждена ставка ёлочки/i.test(source))return 'работа по раскладке шпона «ёлочкой»';
   if(/^Нестандарт со шпоном/i.test(source))return 'дополнительная работа со шпоном выбранной толщины';
   if(/(нет подтверждённой ставки нестандарта|Стандарт по запросу: нет подтверждённой ставки|Базовая стоимость не включена)/i.test(source))return 'стоимость изготовления изделия из выбранной основы';
   if(/(для компонента «|нет подтверждённой цены|не подставляется)/i.test(source))return 'стоимость выбранного материала или производственной операции';
   if(/^(Фактическое количество шпона не задано|Укажите фактическое количество шпона)/i.test(source))return 'стоимость шпона (требуется уточнить расход)';
   if(/готовой рубашки/i.test(source))return 'стоимость готового шпона';
   return source.replace(/\s*Расчёт неполный[.;]?/gi,'').replace(/[.\s]+$/,'');
 }
 function clientWarningReasons(result,boring){
   const raw=[...(result?.warnings||[]),...(boring?['Присадка: стоимость определяет производство.']:[])];
   return [...new Set(raw.map(clientWarningReason).filter(Boolean))];
 }
 function preliminaryPartialText(result,boring){
   const reasons=clientWarningReasons(result,boring);
   const list=reasons.length?reasons.join('; '):'стоимость материалов или работ, которые требуется уточнить';
   return 'Это предварительный расчёт. В сумму пока не вошли: '+list+'. Менеджер уточнит детали заказа и назовёт стоимость, максимально близкую к итоговой';
 }
 // Внутренние вопросы из вкладок «Краткий» и «Второй круг правок».
 // Пометки принадлежат только интерфейсу: productDocument не читает их из DOM.
 function renderReviewNotes(){
  const form=api.form,face=Number(form.veneerThicknessSelect.value);
  const faceSelected=Boolean(form.veneerThicknessSelect.value);
  const finish=form.finishSelect.value,toning=['lacquer_acrylic','lacquer_polyurethane'].includes(finish);
  const note=(id,anchorId,text,visible=true)=>{
   const anchor=$(anchorId);if(!anchor)return;
   let element=$(id);
   if(!element){
    element=document.createElement('span');element.id=id;element.className='prototype-review-note';element.setAttribute('role','note');
    const heading=document.createElement('strong');heading.textContent='Внутренняя пометка · требует согласования. ';
    element.append(heading,document.createTextNode(text));
    (anchor.closest('.field')||anchor).append(element);
   }
   element.classList.toggle('is-hidden',!visible);
  };
  if(wall){
   note('quickOnePointFiveReviewNote','veneerThicknessSelect','Для стеновых панелей при толщине шпона на лицевой стороне 1,5 мм принят шпон с одной стороны и черновой шпон на обороте. Итоговый вариант нужно сообщить производству: ранее на встрече звучало правило о шпоне с двух сторон от 1,5 мм.',faceSelected&&Math.abs(face-1.5)<0.001);
   note('quickTwoMmFinishReviewNote','veneerThicknessSelect','При толщине шпона на лицевой стороне 2 мм покрытие считается только по лицевой стороне, по аналогии с 2,5 мм. Применимость этого правила к 2 мм отдельно не подтверждена.',faceSelected&&Math.abs(face-2)<0.001);
   note('quickEdgeWidthReviewNote','edgeThicknessSelect','Правило подбора ближайшей ширины кромки с запасом минимум 4 мм к итоговой толщине изделия выведено командой из примеров производства. Формулировка правила требует подтверждения.');
   note('quickFinishDescriptionReviewNote','finishSelect','Описания свойств акрилового и полиуретанового лаков и эмали подготовлены командой по общим свойствам материалов. Их нужно сверить с покрытиями, которые использует Woodstock.',Boolean(finish)&&finish!=='none');
   note('quickPolyurethaneReviewNote','finishSelect','Для полиуретанового лака нет подтверждённого тарифа: его стоимость не входит в предварительную сумму. Нужно согласовать, оставлять ли этот вариант в кратком расчёте.',finish==='lacquer_polyurethane');
  }
  if(standard){
   const edge=form.edgeModeSelect.value==='separate';
   note('quickSeparateEdgeWidthReviewNote','separateEdgeFields','Ширина временно подбирается по правилу стеновых панелей: ближайшая ширина из прайса с запасом минимум 4 мм к итоговой толщине плиты. Правило выведено командой из примеров производства. Для отдельной кромки может требоваться большая ширина; возможность её выбора клиентом пока не согласована.',edge);
  }
  if(wall||scenario==='details'){
   note('quickToningRateReviewNote','quickToningField','В расчёте применяется доплата за тонировку 1000 ₽/м². Источник этого тарифа в записях встреч не указан; ставку нужно подтвердить у производства.',toning&&form.toningSelect.value==='yes');
  }
  if(scenario==='details')note('quickBoringDescriptionReviewNote','boringSelect','Вопрос и пояснение о присадке сформулированы командой. Диаметр отверстия под петлю 35 мм взят из свода правок и отдельно представителем производства не подтверждён.');
 }
 function render(result){
  if(syncing)return;
  const form=api.form;
  if(wall&&$('quickVeneeredSides')) $('quickVeneeredSides').textContent=form.veneerThicknessSelect.value ? (Number(form.veneeredSidesSelect.value)===2?'с двух сторон':'с одной стороны') : '—';
  if(wall&&$('quickReverseSide')) {
   const thickness=Number(form.veneerThicknessSelect.value);
   const two=Number(form.veneeredSidesSelect.value)===2;
   $('quickReverseSide').textContent=!form.veneerThicknessSelect.value?'—':two
    ? 'тот же шпон, что и на лицевой стороне'
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
  // Внутренние отметки спорных допущений: они не влияют на цену и не входят в PDF.
  const faceThickness=Number(form.veneerThicknessSelect.value);
  const compensatorNote=$('quickCompensatorReviewNote');
  if(compensatorNote){
    const selected=Boolean(form.veneerThicknessSelect.value)&&[2,2.5].some(value=>Math.abs(faceThickness-value)<0.001);
    compensatorNote.classList.toggle('is-hidden',!selected);
  }
  const roughOneMmNote=$('quickRoughOneMmReviewNote');
  if(roughOneMmNote){
    const roughSelected=Boolean(form.veneerThicknessSelect.value)
      &&Math.abs(faceThickness-1)<0.001
      &&Number(form.veneeredSidesSelect.value)===1
      &&form.reverseSideSelect.value==='rough';
    roughOneMmNote.classList.toggle('is-hidden',!roughSelected);
  }
  const hasKnownPrice=Number.isFinite(result?.finalTotal)&&result.finalTotal>0;
  renderReviewNotes();
  const partial=(hasKnownPrice||ready)&&(!ready||!result.priceCalculationComplete||boring);
  $('resultTotal').textContent=!hasKnownPrice&&!ready?'—':partial?(hasKnownPrice?money(result.finalTotal)+' *':'Стоимость рассчитает менеджер'):money(result.finalTotal);
  $('priceLabel').textContent='Ориентировочная стоимость с НДС';
  $('partialWarning').classList.toggle('is-hidden',!partial);
  $('partialWarning').textContent=partial?preliminaryPartialText(result,boring):'';
  $('quickArea').textContent=result?.base&&result.totalArea>0?number(result.totalArea)+' м²':'—';
  if((wall||standard)&&$('quickEdgeWidth')) {
   const width=result?.edge?.widthMm;
   $('quickEdgeWidth').textContent=result?.edge?.mode===(standard?'separate':'attached')&&Number.isFinite(width)&&width>0?number(width)+' мм':'—';
  }
  const sourceList=document.querySelector('.spec-panel .spec-list');
  if(sourceList){
   let sourceRow=$('quickEdgePriceSourceRow');
   if(!sourceRow){sourceRow=document.createElement('div');sourceRow.id='quickEdgePriceSourceRow';const label=document.createElement('dt');label.textContent='Цена кромки';const value=document.createElement('dd');value.id='quickEdgePriceSource';sourceRow.append(label,value);sourceList.append(sourceRow);}
   const source=result?.edge?.mode!=='none'?result?.edge?.priceCatalogSource:'';
   sourceRow.classList.toggle('is-hidden',!source);$('quickEdgePriceSource').textContent=source||'';
  }

 }
 function productDocument(record,result){
  const side=(material,pattern)=>material?[`${material.name||'—'} · ${number(material.thicknessMm)} мм`,pattern].filter(Boolean).join(' · '):record.sideB||'—';
  const edge=record.edge||{};
  const certified=wall&&record.baseId==='gsp';
  const edgeText=certified?'По сертификату КМ1 (уточняет производство)':edge.mode==='none'?'Не нужна':[edge.typeName,edge.veneerName||edge.name,edge.thicknessApplicable?number(edge.thicknessMm)+' мм':'',number(edge.widthMm)+' мм',number(edge.meters??edge.orderedMeters)+' пог. м',edge.priceCatalogSource].filter(Boolean).join(' · ');
  const edgeForPosition=row=>{
   if(edge.mode==='none')return 'Не нужна';
   if(edge.mode==='separate')return 'Отдельная спецификация';
   const position=edge.positionSettings?.find(item=>item.position===row.position);
   if(!position)return 'См. спецификацию кромки';
   if(!position.applies)return 'Не нужна';
   return [edge.typeName,edge.veneerName||edge.name,Number.isFinite(position.thicknessMm)?number(position.thicknessMm)+' мм':'',Number.isFinite(position.widthMm)?number(position.widthMm)+' мм':'',position.sides,number(position.calculatedMeters)+' пог. м',position.priceCatalogSource||edge.priceCatalogSource].filter(Boolean).join(' · ');
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
  const notes=[{text:preliminaryDisclaimer,style:'infoSmall',margin:[0,4,0,8]}];
  const rowPartial=record.sizes.some(row=>row.pricingPartial)||boring;
  if(rowPartial)notes.push({text:'* Частичная стоимость позиции: учтены только рассчитанные составляющие.',style:'infoSmall'});
  if(Number.isFinite(result.orderLevelUnallocatedCost)&&Math.abs(result.orderLevelUnallocatedCost)>0.000001)notes.push({text:'Общие рассчитанные затраты заказа, не распределённые по изделиям: '+money(result.orderLevelUnallocatedCost)+'. Они включены в итог один раз.',style:'infoSmall'});
  const round=v=>Math.round((v+Number.EPSILON)*100)/100;
  const rowRounding=round(round(result.finalTotal)-record.sizes.reduce((sum,row)=>sum+round(row.knownSubtotal||0),0)-round(result.orderLevelUnallocatedCost||0));
  const breakdownRounding=round(round(result.finalTotal)-result.breakdown.reduce((sum,item)=>sum+round(item.value),0));
  if(rowRounding||breakdownRounding)notes.push({text:'Расчёт выполнен без промежуточного округления. Разница округления: по позициям '+money(rowRounding)+'; по составляющим '+money(breakdownRounding)+'.',style:'infoSmall'});
  if(certified)notes.push({text:"ГСП: состав кромки и покрытия по сертификату КМ1 подтверждает производство.",style:"infoText"});
  if(partial)notes.push({text:preliminaryPartialText(result,boring),style:'infoText',margin:[0,8,0,4]});
  notes.push({text:'Рассчитанные составляющие',style:'sectionTitle'},{table:{headerRows:1,dontBreakRows:true,widths:Common.fitPdfTableWidths([360,179],3),body:[[{text:'Составляющая',bold:true},{text:'Стоимость с НДС',bold:true}],...result.breakdown.map(x=>[x.label,money(x.value)])]},layout:Common.pdfTableLayout()});
  if(edge.mode!=='none')notes.push({text:'Кромка — данные отдельной спецификации',style:'sectionTitle'},{text:edgeText,style:'infoSmall'});
  const files=[...new Set([...contact.fileNames(),...(record.layoutTzFiles||[]),...record.sizes.flatMap(row=>row.files||[])])];
  if(record.layoutTzComment)notes.push({text:'Требования к раскладке: '+record.layoutTzComment,style:'infoText'});
  if(wall||scenario==='details') notes.push({text:(wall?'Переход рисунка на панелях: ':'Переход рисунка на деталях: ')+(record.patternTransitionRequested?'да':'нет'),style:'infoText'});
  notes.push({text:'Дополнительные требования',style:'sectionTitle'},{text:record.comment||'—',style:'infoText'},{text:'Файлы: '+(files.join(', ')||'нет'),style:'infoSmall'},{text:'Связь с менеджером: '+($('managerContactInput').checked?'нужна':'не запрошена'),style:'infoSmall'});
  return {dontBreakRows:false,title,numberPrefix:'КР-ПЛ-',subtitle:'Краткий расчёт плит',preliminaryPriceLabels:true,widths:[12,52,110,103,57,24,38,65,65],header:['№','Основа','Шпон','Раскладка и обработка','Размер, мм','Шт.','Площадь, м²','Цена с НДС','Сумма с НДС'].map(text=>({text,style:'tableHeader'})),rows,afterPrice:notes};
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
  if(!standard&&api.form.layoutSelect.value==='custom'&&!api.form.layoutTzFiles.files.length){$('saveStatus').textContent='Для индивидуальной раскладки приложите файл.';api.form.layoutTzFiles.focus();return;}
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
  // Присадка влияет на полноту стоимости, обновляем чек без другого действия.
  $('boringSelect')?.addEventListener('change',()=>render(api.result()));
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
  // В кратком расчёте фасадов скрытая фаска не должна попадать в цену.
  // Элемент остаётся в DOM для общего расчётного контроллера.
  if(scenario==='details') api.form.edgeBevelSelect.value='no';
  // These are the existing detailed fields, hidden for the shortened client scenario.
  ['toningSelect','isolatorSelect','positionFinishToggle','positionEdgeToggle','lacquerExecutionSelect','lacquerProcessSelect','enamelVariantSelect','edgeOrderPriceInput','separateEdgeOrderPriceInput'].forEach(id=>{$(id)?.closest('.field')?.setAttribute('data-quick-hidden','');});
  api.form.finishSelect.dispatchEvent(new Event('change',{bubbles:true}));api.recalculate();render(api.result());
 }
 // Configure the view before detailed-panels.js starts; the DOM event runs after it has been loaded.
 window.addEventListener('DOMContentLoaded',()=>init().catch(error=>{console.error(error);$('saveStatus').textContent='Не удалось запустить расчёт.';}));
})();
