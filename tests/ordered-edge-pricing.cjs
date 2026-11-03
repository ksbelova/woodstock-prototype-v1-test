'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),cp=require('child_process');
const data=JSON.parse(fs.readFileSync('data/panels.json','utf8'));
const before=JSON.parse(cp.execFileSync('git',['show','HEAD:data/panels.json'],{encoding:'utf8',maxBuffer:10e6}));
assert.deepEqual(data.edgeCatalog,before.edgeCatalog,'Stock catalog changed');assert.deepEqual(data.edgeRates,before.edgeRates,'Edging rates changed');
assert.equal(data.meta.edgeMachineThresholdRunningM,40);assert.equal(data.meta.edgeSeparateMinimumRunningM,50);
const src=fs.readFileSync('js/detailed-panels.js','utf8');
function extract(name){const start=src.indexOf('  function '+name+'(');assert(start>=0,name);const next=src.indexOf('\n  function ',start+3);return src.slice(start,next<0?src.length:next);}
const context={data,window:{WoodstockPanelsView:{edgeVolumePricing:false}},num:v=>v===null||v===undefined||v===''?null:Number.isFinite(Number(v))?Number(v):null,clientConditionPriceKey:id=>id,clientConditionUiName:id=>id};vm.createContext(context);
for(const name of ['normalizeEdgeLookup','edgeCatalogItems','edgeCatalogWidths','edgeWidthPeers','edgeAvailableWidths','edgeCatalogPriceRow','applicableEdgeVolumeLevels','automaticEdgePrice'])vm.runInContext(extract(name),context);
let checks=0;
for(const item of data.edgeCatalog)for(const width of item.availableWidths){assert.deepEqual(context.edgeCatalogPriceRow(item,width),item.pricesPerRunningM[String(width)]);checks++;}
for(const item of data.orderedEdgeCatalog){assert(item.pricesPerM2.retail>0);assert.equal(item.minimumRunningM,50);const{min,max}=item.widthRangeMm;assert.equal(context.edgeCatalogPriceRow(item,min-1),null);assert.equal(context.edgeCatalogPriceRow(item,max+1),null);for(const width of [min,23,max]){const rates=context.edgeCatalogPriceRow(item,width);for(const[level,value]of Object.entries(item.pricesPerM2)){assert.equal(rates[level],typeof value==='number'?value*width/1000:null);checks++;}}}
assert.equal(data.orderedEdgeCatalog.length,2233);assert.equal(data.orderedEdgeUnavailable.length,44);
const albero=data.orderedEdgeCatalog.find(x=>x.veneerName==='ALBERO 05C'&&x.typeId==='thick'&&x.thicknessMm===1);
assert(Math.abs(context.edgeCatalogPriceRow(albero,19).retail*50-4366.2)<1e-8);
assert(!data.orderedEdgeCatalog.some(x=>x.veneerName==='DUNA 002S 3D'&&x.typeId==='vl_s'));
assert(data.orderedEdgeUnavailable.some(x=>x.material==='DUNA 002S 3D'&&x.typeId==='vl_s'&&x.sourceValue==='Х'));
assert.equal(context.automaticEdgePrice(context.edgeCatalogPriceRow(albero,19),'retail',5000).price,albero.pricesPerM2.retail*.019,'Deferred volume changes line price');
console.log(JSON.stringify({stockWidthsUnchanged:true,sourceCombinations:2233,explicitMissing:44,priceChecks:checks,albero19mm50m:4366.2}));
// Exercise the real selection/serialization path with form controls, without a DOM.
context.form={clientConditionSelect:{value:'retail'}};
let controls;context.edgeControls=()=>controls;
context.isQuickWallPanel=()=>false;context.isDetailedPanelCalculation=()=>false;context.isQuickStandardPanel=()=>false;
context.edgeWidthFitsProduct=()=>true;context.quickPanelFinishedThicknessMm=()=>10;
context.edgeTypeById=id=>data.edgeTypes.find(x=>x.id===id);
for(const name of ['edgeNameGroups','edgeNameGroupForInput','currentEdgeThickness','resolveEdgeCatalogItem','edgeSelectionState'])vm.runInContext(extract(name),context);
function select(item,width){controls={typeSelect:{value:item.typeId},materialInput:{value:item.displayName,dataset:{}},thicknessSelect:{value:String(item.thicknessMm)},widthSelect:{value:String(width)},orderWidthInput:{value:''},orderPriceInput:{value:''}};return context.edgeSelectionState('separate');}
let stockSelections=0;
for(const item of data.edgeCatalog)for(const width of item.availableWidths){for(const client of ['retail','loyalty','regular','vip']){context.form.clientConditionSelect.value=client;const selected=select(item,width);assert.equal(selected.catalogItemId,item.id);assert.equal(selected.pricePerRunningM,item.pricesPerRunningM[String(width)][client]);assert.equal(selected.stockProgram,true);stockSelections++;}}
context.form.clientConditionSelect.value='retail';
const orderSelected=select(albero,19);assert.equal(orderSelected.orderedProgram,true);assert.equal(orderSelected.priceCatalogCell,'F127');assert(Math.abs(orderSelected.pricePerRunningM*50-4366.2)<1e-8);
const beech=data.edgeCatalog.find(x=>x.displayName==='Бук'&&x.typeId==='thick'&&x.thicknessMm===1);
assert.equal(select(beech,19).stockProgram,true);
assert.equal(select(beech,100).orderedProgram,true,'Stock width 100 must fall back to order price');
assert.equal(select(albero,251).valid,false,'Outside order width range');
console.log(JSON.stringify({stockSelectionChecks:stockSelections,orderSourceAndStockFallback:true}));
