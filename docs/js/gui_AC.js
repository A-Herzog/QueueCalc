/*
Copyright 2023 Alexander Herzog

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export {tilesAC, calcAC};

import {TilesBuilder, Table} from './tools_gui.js';
import {ErlangC_ENQ, ErlangC_EW} from './Erlang.js';
import {language} from './Language.js';

const tilesAC=new TilesBuilder('AC');

tilesAC.add(
  language.model.inputInterArrivalTimeMean,
  "E[I]",
  "EI",
  100,
  5,
  150,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputInterArrivalTimeMeanInfo1,
  language.model.inputInterArrivalTimeMeanInfo2,
  "PositiveFloat"
);

tilesAC.add(
  language.model.inputInterArrivalTimeCV,
  "CV[I]",
  "CVI",
  1,
  0.1,
  0,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputInterArrivalTimeCVInfo1,
  language.model.inputInterArrivalTimeCVInfo2,
  "NotNegativeFloat"
);

tilesAC.add(
  language.model.inputServiceTimeMean,
  "E[S]",
  "ES",
  400,
  5,
  200,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceTimeMeanInfo1,
  language.model.inputServiceTimeMeanInfo2,
  "PositiveFloat"
);

tilesAC.add(
  language.model.inputServiceTimeCV,
  "CV[S]",
  "CVS",
  1,
  0.1,
  0,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceTimeCVInfo1,
  language.model.inputServiceTimeCVInfo2,
  "NotNegativeFloat"
);

tilesAC.add(
  language.model.inputNumberOfOperators,
  "c",
  "c",
  5,
  1,
  10,
  language.model.invalidPositiveInt,
  language.model.invalidPositiveInt,
  language.model.inputNumberOfOperatorsInfo1,
  language.model.inputNumberOfOperatorsInfo2,
  "PositiveInt"
);

function factorial(n) {
  let result=1;
  for (let i=2;i<=n;i++) result*=i;
  return result;
}

function calcAC(input) {
  const result={};

  result.EI=input[0];
  result.CVI=input[1];
  result.bI=1;
  result.ES=input[2];
  result.CVS=input[3];
  result.bS=1;
  result.c=input[4];
  result.PUp=1;
  result.EDt=0;
  result.CVDt=0;

  const lambda=(1/result.EI)*result.bI;
  const CVI=Math.sqrt(result.bI*result.CVI*result.CVI+result.bI-1);
  const SCVIB=CVI*CVI/result.bS;

  const mu=1/result.ES;

  let lambdaBatch=lambda/result.bS;
  let compl=mu*result.PUp;
  let rho=lambdaBatch/(compl*result.c);

  result.a=result.c*rho;
  result.rho=rho;

  if (result.rho<1) {
    const SCVcompl=result.CVS*result.CVS+result.PUp*(1-result.PUp)*result.EDt*(1+result.CVDt*result.CVDt)*mu;
    let PCx=Math.pow(result.c*rho,result.c)/(factorial(result.c)*(1-rho));
    let sum=0;
    for (let k=0;k<=result.c-1;k++) sum+=Math.pow(result.c*rho,k)/factorial(k);
    let PC=PCx/(PCx+sum);

    result.ENQ=rho/(1-rho)*PC*result.bS*(SCVIB+SCVcompl)/2+(result.bS-1)/2;
    const EB=result.c*result.bS*rho;
    result.EN=result.ENQ+EB;
    result.EV=result.EN/lambda;
    const EC=1/mu;
    result.EW=result.EV-EC;
    result.ENS=result.EN-result.ENQ;
    result.EWErlangC=ErlangC_EW(1/result.EI*result.bI,1/result.ES*result.bS,result.c);
    result.ENQErlangC=ErlangC_ENQ(1/result.EI*result.bI,1/result.ES*result.bS,result.c);
  } else {
    result.EW=null;
    result.EV=null;
    result.ENQ=null;
    result.EN=null;
    result.ENS=null;
    result.EWErlangC=null;
    result.ENQErlangC=null;
  }

  return result;
}

function calcACTable(mode) {
  const input=tilesAC.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]');
  table.addHeading('CV[I]');
  table.addHeading('E[S]');
  table.addHeading('CV[S]');
  table.addHeading('c');
  table.addHeading('a');
  table.addHeading('&rho;');
  table.addHeading('E[W]');
  table.addHeading('E[V]');
  table.addHeading('E[N<sub>Q</sub>]');
  table.addHeading('E[N<sub>S</sub>]');
  table.addHeading('E[N]');

  table.calc(input,function(table,input) {
    const data=calcAC(input);
    table.addCol(data.EI);
    table.addCol(data.CVI);
    table.addCol(data.ES);
    table.addCol(data.CVS);
    table.addCol(data.c);
    table.addCol(data.a);
    table.addColPercent(data.rho);
    if (data.rho<1) {
      table.addCol(data.EW);
      table.addCol(data.EV);
      table.addCol(data.ENQ);
      table.addCol(data.ENS);
      table.addCol(data.EN);
    }
  });

  return table;
}

/* Einzelwerte */

function updateACValues() {
  const input=tilesAC.valuesValues;
  if (input==null) return;
  const data=calcAC(input);

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";

  let infoBI='';
  if (data.bI>1) infoBI=', '+language.statistics.BatchArrivalInfo1+': '+(data.EI/data.bI).toLocaleString();
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+infoBI+")</small><br>\n";
  if (data.CVI!=1) result+=language.model.inputInterArrivalTimeCV+': <b>CV[I]='+data.CVI.toLocaleString()+"</b><br>\n";
  if (data.bI>1) result+=language.statistics.BatchArrivalInfo2+': <b>b(I)='+data.bI+"</b><br>\n";

  let infoBS='';
  if (data.bS>1) infoBS=', '+language.statistics.BatchServiceInfo1+': '+(data.ES/data.bS).toLocaleString();
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+infoBS+")</small><br>\n";
  if (data.CVS!=1) result+=language.model.inputServiceTimeCV+': <b>CV[S]='+data.CVS.toLocaleString()+"</b><br>\n";
  if (data.bS>1) result+=language.statistics.BatchServiceInfo2+': <b>b(S)='+data.bS+"</b><br>\n";

  result+=language.statistics.NumberOfOperators+': <b>c='+data.c+"</b><br>\n";
  if (data.PUp<1) {
    result+=language.statistics.AvailabilityProbability+": <b>P(Up)="+(data.PUp*100).toLocaleString()+" %</b><br>\n";
    if (data.EDt>0) result+=language.statistics.DownTimeMean+": <b>E[Dt]="+data.EDt.toLocaleString()+"</b><br>\n";
    if (data.EDt>0 && data.CVDt!=1) result+=language.statistics.DownTimeCV+": <b>E[Dt]="+data.CVDt.toLocaleString()+"</b><br>\n";
  }

  result+="</p>\n";

  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingACResults+"</h5>\n";
  result+="<p>\n";
  if (data.rho>=1) {
      result+=language.statistics.rhoError;
  } else {
      result+=language.statistics.averageWaitingTime+": <b>E[W]="+data.EW.toLocaleString()+"</b> <small>("+language.statistics.ErlangCCompare2+": "+data.EWErlangC.toLocaleString()+")</small><br>\n";
      result+=language.statistics.averageResidenceTime+": <b>E[V]="+data.EV.toLocaleString()+"</b> <small>(=E[W]+E[S])</small><br>\n";
      result+=language.statistics.flowFactor+": <b>E[V]/E[S]="+(data.EV/data.ES).toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b> <small>("+language.statistics.ErlangCCompare2+": "+data.ENQErlangC.toLocaleString()+")</small><br>\n";
      result+=language.statistics.averageNS+": <b>E[N<sub>S</sub>]="+data.ENS.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b> <small>(=E[N<sub>Q</sub>]+E[N<sub>S</sub>])</small><br>\n";
  }
  result+="</p>\n";

  document.getElementById('ACValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabACTable(sender) {
  tilesAC.updateTabs(sender,'Table');
  updateACTable();
}

function updateACTable() {
  let table=calcACTable('Table');
  if (table!=null) {
    globalThis["ACTableData"]=table.text;
    const html=table.html+"<p><button type='button' class='btn btn-primary bi-clipboard' onclick='navigator.clipboard.writeText(globalThis.ACTableData);'> "+language.GUI.copyTable+"</button></p>";
    document.getElementById('ACTable_results').innerHTML=html;
  }
}

/* Diagramm */

function changeTabACDiagram(sender) {
  tilesAC.updateTabs(sender,'Diagram');
  updateACDiagram();
}

function updateACDiagram() {
  const table=calcACTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
    case 1: xAxisTitle='CV[I]'; break;
    case 2: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
    case 3: xAxisTitle='CV[S]'; break;
    case 4: xAxisTitle='c ('+language.statistics.unitNumber+')'; break;
  }

  const ySetup=[
    {columnIndex: 4+3, color: 'red', mode: 'time'}, /* E[W] */
    {columnIndex: 4+4, color: 'green', mode: 'time'}, /* E[V] */
    {columnIndex: 4+5, color: 'orange', mode: 'number'}, /* E[NQ] */
    {columnIndex: 4+7, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 4+2, color: 'gray', mode: 'percent'}, /* rho */
  ];

  table.diagram('ACDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* Allgemeine Vorbereitungen */

window.updateACValues=updateACValues;
window.updateACTable=updateACTable;
window.updateACDiagram=updateACDiagram;
window.changeTabACTable=changeTabACTable;
window.changeTabACDiagram=changeTabACDiagram;
