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

export {tilesPC, updatePC};

import {TilesBuilder, Table} from './tools_gui.js';
import {language} from './Language.js';

const tilesPC=new TilesBuilder('PC');

tilesPC.add(
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

tilesPC.add(
  language.model.inputServiceTimeMean,
  "E[S]",
  "ES",
  95,
  5,
  50,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceTimeMeanInfo1,
  language.model.inputServiceTimeMeanInfo2,
  "PositiveFloat"
);

tilesPC.add(
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

function factorial(n) {
  let result=1;
  for (let i=2;i<=n;i++) result*=i;
  return result;
}

function calcPC(input) {
  const result={};

  result.EI=input[0];
  result.ES=input[1];
  result.CVS=input[2];

  const lambda=(1/result.EI);
  const mu=1/result.ES;
  result.c=1;
  result.a=lambda/mu;
  result.rho=result.a;

  /* CV=Std/E => Std=CV*E => Var=(CV*E)^2 */
  const varS=(result.CVS*result.ES)**2;

  if (result.rho<1) {
    /*
    E[NQ]=(rho^2+lambda^2*Var[S])/(2(1-rho))
    E[N]=E[NQ]+rho
    E[W]=E[NQ]/lambda
    E[V]=E[W]+1/mu
    */
    result.ENQ=(result.rho**2+lambda**2*varS)/(2*(1-result.rho));
    result.EN=result.ENQ+result.rho;
    result.EW=result.ENQ/lambda;
    result.EV=result.EW+1/mu;
    result.ENS=result.rho;
  } else {
    result.EW=null;
    result.EV=null;
    result.ENQ=null;
    result.EN=null;
    result.ENS=null;
  }

  return result;
}

function calcPCTable(mode) {
  const input=tilesPC.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]');
  table.addHeading('E[S]');
  table.addHeading('CV[S]');
  table.addHeading('a');
  table.addHeading('&rho;');
  table.addHeading('E[W]');
  table.addHeading('E[V]');
  table.addHeading('E[N<sub>Q</sub>]');
  table.addHeading('E[N<sub>S</sub>]');
  table.addHeading('E[N]');

  table.calc(input,function(table,input) {
    const data=calcPC(input);
    table.addCol(data.EI);
    table.addCol(data.ES);
    table.addCol(data.CVS);
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

function updatePCValues() {
  const input=tilesPC.valuesValues;
  if (input==null) return;
  const data=calcPC(input);

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  if (data.CVS!=1) result+=language.model.inputServiceTimeCV+': <b>CV[S]='+data.CVS.toLocaleString()+"</b><br>\n";
  result+=language.statistics.NumberOfOperators+': <b>c=1</b><br>\n';
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingPCResults+"</h5>\n";
  result+="<p>\n";
  if (data.rho>=1) {
      result+=language.statistics.rhoError;
  } else {
      result+=language.statistics.averageWaitingTime+": <b>E[W]="+data.EW.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageResidenceTime+": <b>E[V]="+data.EV.toLocaleString()+"</b> <small>(=E[W]+E[S])</small><br>\n";
      result+=language.statistics.flowFactor+": <b>E[V]/E[S]="+(data.EV/data.ES).toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageNS+": <b>E[N<sub>S</sub>]="+data.ENS.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b> <small>(=E[N<sub>Q</sub>]+E[N<sub>S</sub>])</small><br>\n";
  }
  result+="</p>\n";

  document.getElementById('PCValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabPCTable(sender) {
  tilesPC.updateTabs(sender,'Table');
  updatePCTable();
}

function updatePCTable() {
  let table=calcPCTable('Table');
  if (table!=null) {
    globalThis["PCTableData"]=table.text;
    const html=table.html+"<p><button type='button' class='btn btn-primary bi-clipboard' onclick='navigator.clipboard.writeText(globalThis.PCTableData);'> "+language.GUI.copyTable+"</button></p>";
    document.getElementById('PCTable_results').innerHTML=html;
  }
}

/* Diagramm */

function changeTabPCDiagram(sender) {
  tilesPC.updateTabs(sender,'Diagram');
  updatePCDiagram();
}

function updatePCDiagram() {
  const table=calcPCTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
    case 1: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
    case 2: xAxisTitle='CV[S]'; break;
  }

  const ySetup=[
    {columnIndex: 2+3, color: 'red', mode: 'time'}, /* E[W] */
    {columnIndex: 2+4, color: 'green', mode: 'time'}, /* E[V] */
    {columnIndex: 2+5, color: 'orange', mode: 'number'}, /* E[NQ] */
    {columnIndex: 2+7, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 2+2, color: 'gray', mode: 'percent'}, /* rho */
  ];

  table.diagram('PCDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* Allgemeine Vorbereitungen */

window.updatePCValues=updatePCValues;
window.updatePCTable=updatePCTable;
window.updatePCDiagram=updatePCDiagram;
window.changeTabPCTable=changeTabPCTable;
window.changeTabPCDiagram=changeTabPCDiagram;

function updatePC() {
  updatePCValues();
  updatePCTable();
  updatePCDiagram();
}