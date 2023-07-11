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

export {tilesErlangC};

import {TilesBuilder, Table} from './tools_gui.js';
import {MMcZustandsP, ErlangC, ErlangC_EW} from './Erlang.js';
import {language} from './Language.js';

const tilesErlangC=new TilesBuilder('ErlangC');

tilesErlangC.add(
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

tilesErlangC.add(
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

tilesErlangC.add(
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

tilesErlangC.add(
  language.model.inputServiceLevel,
  "t",
  "t",
  20,
  1,
  0,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceLevelInfo1,
  language.model.inputServiceLevelInfo2,
  "NotNegativeFloat",
  true,
);

function calcErlangC(input) {
  const result={};

  result.EI=input[0];
  result.ES=input[1];
  result.c=input[2];
  result.t=input[3];

  result.a=result.ES/result.EI;
  result.rho=result.a/result.c;

  if (result.rho<1) {
    result.EW=ErlangC_EW(1/result.EI,1/result.ES,result.c);
    result.EV=result.EW+result.ES;
    result.ENQ=result.EW/result.EI;
    result.EN=result.EV/result.EI;
    result.ENS=result.EN-result.ENQ;
    result.PNeq0=MMcZustandsP(result.a,result.c,0);
    result.PWgt0=1-ErlangC(1/result.EI,1/result.ES,result.c,0);
    if (result.t==null) result.PWlet=null; else result.PWlet=ErlangC(1/result.EI,1/result.ES,result.c,result.t);
  } else {
    result.EW=null;
    result.EV=null;
    result.ENQ=null;
    result.EN=null;
    result.ENS=null;
    result.PNeq0=0;
    result.PWgt0=null;
    result.PWlet=null;
  }

  return result;
}

function calcErlangCTable(mode) {
  const input=tilesErlangC.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]');
  table.addHeading('E[S]');
  table.addHeading('c');
  table.addHeading('t');
  table.addHeading('a');
  table.addHeading('&rho;');
  table.addHeading('E[W]');
  table.addHeading('E[V]');
  table.addHeading('E[N<sub>Q</sub>]');
  table.addHeading('E[N<sub>S</sub>]');
  table.addHeading('E[N]');
  table.addHeading('P(N=0)');
  table.addHeading('P(W&gt;0)');
  table.addHeading('P(W&le;t)');

  table.calc(input,function(table,input) {
    const data=calcErlangC(input);
    table.addCol(data.EI);
    table.addCol(data.ES);
    table.addCol(data.c);
    table.addCol(data.t);
    table.addCol(data.a);
    table.addColPercent(data.rho);
    if (data.rho<1) {
      table.addCol(data.EW);
      table.addCol(data.EV);
      table.addCol(data.ENQ);
      table.addCol(data.ENS);
      table.addCol(data.EN);
      table.addColPercent(data.PNeq0);
      table.addColPercent(data.PWgt0);
      table.addColPercent(data.PWlet);
    }
  });

  return table;
}

/* Einzelwerte */

function updateErlangCValues() {
  const input=tilesErlangC.valuesValues;
  if (input==null) return;
  const data=calcErlangC(input);

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  result+=language.statistics.NumberOfOperators+': <b>c='+data.c+"</b>\n";
  result+="</p>\n";
  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";
  result+="<h5>"+language.statistics.headingErlangCResults+"</h5>\n";
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
      result+=language.statistics.emptySystemProbability+": <b>P(N=0)="+(data.PNeq0*100).toLocaleString()+"%</b><br>\n";
      if (data.t!=null) {
          result+=language.statistics.serviceLevel+": <b>P(W&le;"+data.t.toLocaleString()+")="+(data.PWlet*100).toLocaleString()+"%</b> (<small>"+(data.PWlet*100).toLocaleString()+"% "+language.statistics.serviceLevelInfo1+" "+data.t.toLocaleString()+" "+language.statistics.serviceLevelInfo2+")</small><br>\n";
      }
      result+=language.statistics.waitingProbability+": <b>P(W&gt;0)="+(data.PWgt0*100).toLocaleString()+"%</b> (<small>"+(data.PWgt0*100).toLocaleString()+"% "+language.statistics.waitingProbabilityInfo+")</small><br>\n";
  }
  result+="</p>\n";

  document.getElementById('ErlangCValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabErlangCTable(sender) {
  tilesErlangC.updateTabs(sender,'Table');
  updateErlangCTable();
}

function updateErlangCTable() {
  let table=calcErlangCTable('Table');
  if (table!=null) document.getElementById('ErlangCTable_results').innerHTML=table.html+table.buttons;
}

/* Diagramm */

function changeTabErlangCDiagram(sender) {
  tilesErlangC.updateTabs(sender,'Diagram');
  updateErlangCDiagram();
}

function updateErlangCDiagram() {
  const table=calcErlangCTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
    case 1: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
    case 2: xAxisTitle='c ('+language.statistics.unitNumber+')'; break;
    case 3: xAxisTitle='t ('+language.statistics.unitTime+')'; break;
  }

  const ySetup=[
    {columnIndex: 6, color: 'red', mode: 'time'}, /* E[W] */
    {columnIndex: 7, color: 'green', mode: 'time'}, /* E[V] */
    {columnIndex: 8, color: 'orange', mode: 'number'}, /* E[NQ] */
    {columnIndex: 10, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 5, color: 'gray', mode: 'percent'}, /* rho */
    {columnIndex: 13, color: 'black', mode: 'percent'} /* P(W<=t) */
  ];

  table.diagram('ErlangCDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* Allgemeine Vorbereitungen */

window.updateErlangCValues=updateErlangCValues;
window.updateErlangCTable=updateErlangCTable;
window.updateErlangCDiagram=updateErlangCDiagram;
window.changeTabErlangCTable=changeTabErlangCTable;
window.changeTabErlangCDiagram=changeTabErlangCDiagram;
