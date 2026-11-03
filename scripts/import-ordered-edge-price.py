"""Import primary-source cached cells, preserving all stock prices.
Usage: python3 scripts/import-ordered-edge-price.py extracted.json
The input contains original workbook sheet names and A1 cell values.
"""
import json,re,sys,unicodedata
from pathlib import Path
src=json.load(open(sys.argv[1]));tabs={t['name']:t['cells'] for t in src}
p=Path('data/panels.json');data=json.loads(p.read_text());retail=tabs['Розничная цена']
levels={'Розничная цена':'retail','Скидка лояльности':'loyalty','Цена по карте постоянного покуп':'regular','Цена по карте VIP клиента':'vip','При заказе 1000-2999 пог.м.':'volume1000_2999','При заказе 3000-4999 пог.м..':'volume2999_4999','При заказе от 5000 пог.м.':'volume5000_plus','Цена серийных производителей':'serial'}
columns={'C':('vl_s',.6,19,300,False,True),'D':('sk_s',.6,19,120,True,False),'E':('thick_glue_1',1,19,250,True,None),'F':('thick',1,19,250,False,None),'G':('thick',1.5,19,250,False,None),'H':('thick',2,19,250,False,None),'I':('thick',3,19,250,False,None),'J':('thick',3.5,19,250,False,None),'K':('thick',4,19,250,False,None)}
norm=lambda s:re.sub(r'\s+',' ',unicodedata.normalize('NFKC',str(s)).strip().casefold().replace('ё','е'))
items=[];missing=[];materials=[]
for row in range(6,265):
 name=retail.get('A'+str(row),'').strip()
 if not name or not any(isinstance(retail.get(c+str(row)),(float,int)) for c in columns):continue
 materials.append(name)
 for col,(typ,thick,lo,hi,glue,fleece) in columns.items():
  cell=col+str(row);value=retail.get(cell)
  if not isinstance(value,(int,float)) or value<=0:
   missing.append({'material':name,'typeId':typ,'thicknessMm':thick,'sourceCell':cell,'sourceValue':value,'status':'price_not_provided'});continue
  prices={key:tabs[sheet].get(cell) if isinstance(tabs[sheet].get(cell),(int,float)) and tabs[sheet][cell]>0 else None for sheet,key in levels.items()}
  matches=[v for v in data['veneers'] if any(norm(v.get(k,''))==norm(name) for k in ['name','displayName','wmsName'])]
  aliases=sorted({v.get('displayName') or v['name'] for v in matches})
  items.append({'id':f'ordered_20261009_{row}_{col}','typeId':typ,'name':name,'displayName':name,'veneerName':name,'thicknessMm':thick,'orderedProgram':True,'stockProgram':False,'hasGlue':glue,'hasFleece':fleece,'widthRangeMm':{'min':lo,'max':hi},'minimumRunningM':50,'minimumScope':'one_material','pricesPerM2':prices,'aliases':aliases,'veneerIds':[v['id'] for v in matches],'source':'Прайс-лист Кромка под заказ 09.10.2026','sourceUrl':'https://docs.google.com/spreadsheets/d/1GrQ8kxsZGzs2wm9hc3nwEQkkNbbKU2j-/edit','sourceSheet':'Розничная цена','sourceCell':cell,'vatIncluded':True})
data['orderedEdgeCatalog']=items;data['orderedEdgeUnavailable']=missing
data['meta']['orderedEdgeCatalogSource']={'title':'Прайс-лист Кромка под заказ 09.10.2026','fileId':'1GrQ8kxsZGzs2wm9hc3nwEQkkNbbKU2j-','date':'2026-10-09','unit':'RUB/m2','vatIncluded':True,'minimumRunningM':50,'minimumScope':'one_material','minimumOnAttachedEdges':'not_applied_pending_confirmation','leadTimeWorkingDays':[5,10],'lengthJoiningColumn':'L: not imported as an edge material or edging service'}
data['orderedEdgePriceLevels']=[{'id':'volume1000_2999','name':'1000–2999 пог. м','scope':'order_volume','minRunningM':1000,'maxRunningM':2999},{'id':'volume2999_4999','name':'3000–4999 пог. м','scope':'order_volume','minRunningM':3000,'maxRunningM':4999},{'id':'volume5000_plus','name':'от 5000 пог. м','scope':'order_volume','minRunningM':5000,'maxRunningM':None}]
for t in data['edgeTypes']:
 if t['id']=='thick':t['thicknesses']=[1,1.5,2,3,3.5,4];t['name']='Толстая кромка 1–4 мм'
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print({'materials':len(materials),'priced_combinations':len(items),'unpriced_combinations':len(missing),'exactly_linked_materials':len({x['veneerName'] for x in items if x['veneerIds']})})
