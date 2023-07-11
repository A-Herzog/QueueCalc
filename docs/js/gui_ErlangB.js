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

export {tilesErlangB};

import {TilesBuilder, Table} from './tools_gui.js';
import {ErlangB} from './Erlang.js';
import {language} from './Language.js';

const tilesErlangB=new TilesBuilder('ErlangB');

tilesErlangB.add(
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

tilesErlangB.add(
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

tilesErlangB.add(
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

function calcErlangB(input) {
  const result={};

  result.EI=input[0];
  result.ES=input[1];
  result.c=input[2];

  result.a=result.ES/result.EI;

  result.Preject=ErlangB(result.a,result.c);

  const lambdaNet=1/result.EI*(1-result.Preject);
  result.rho=lambdaNet*result.ES/result.c;

  result.rhoErlangC=result.a/result.c;

  return result;
}

function calcErlangBTable(mode) {
  const input=tilesErlangB.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]');
  table.addHeading('E[S]');
  table.addHeading('c');
  table.addHeading('a');
  table.addHeading('&rho;');
  table.addHeading('P(reject)');

  table.calc(input,function(table,input) {
    const data=calcErlangB(input);
    table.addCol(data.EI);
    table.addCol(data.ES);
    table.addCol(data.c);
    table.addCol(data.a);
    table.addColPercent(data.rho);
    table.addColPercent(data.Preject);
  });

  return table;
}

/* Einzelwerte */

function updateErlangBValues() {
  const input=tilesErlangB.valuesValues;
  if (input==null) return;
  const data=calcErlangB(input);

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
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b> <small>("+language.statistics.UtilizationErlangC+": "+(data.rhoErlangC*100).toLocaleString()+"%)</small>\n";
  result+="</p>\n";
  result+="<h5>"+language.statistics.headingErlangBResults+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.rejectionProbability+": <b>P(reject)="+(data.Preject*100).toLocaleString()+"%</b><br>\n";
  result+="</p>\n";

  document.getElementById('ErlangBValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabErlangBTable(sender) {
  tilesErlangB.updateTabs(sender,'Table');
  updateErlangBTable();
}

function updateErlangBTable() {
  let table=calcErlangBTable('Table');
  if (table!=null) document.getElementById('ErlangBTable_results').innerHTML=table.html+table.buttons;
}

/* Diagramm */

function changeTabErlangBDiagram(sender) {
  tilesErlangB.updateTabs(sender,'Diagram');
  updateErlangBDiagram();
}

function updateErlangBDiagram() {
  const table=calcErlangBTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
    case 1: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
    case 2: xAxisTitle='c ('+language.statistics.unitNumber+')'; break;
  }

  const ySetup=[
    {columnIndex: 5, color: 'blue', mode: 'percent'}, /* P(reject) */
    {columnIndex: 4, color: 'gray', mode: 'percent'}, /* rho */
  ];

  table.diagram('ErlangBDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* Allgemeine Vorbereitungen */

window.updateErlangBValues=updateErlangBValues;
window.updateErlangBTable=updateErlangBTable;
window.updateErlangBDiagram=updateErlangBDiagram;
window.changeTabErlangBTable=changeTabErlangBTable;
window.changeTabErlangBDiagram=changeTabErlangBDiagram;
