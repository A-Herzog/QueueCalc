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

export {tilesErlangB, tilesErlangB2};

import {TilesBuilder, Table} from './tools_gui.js';
import {ErlangB} from './Erlang.js';
import {language} from './Language.js';

/**
 * Input tiles for the Erlang B formula
 */
const tilesErlangB=new TilesBuilder('ErlangB');
const tilesErlangB2=new TilesBuilder('ErlangB2');

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

tilesErlangB2.add(
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

tilesErlangB2.add(
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

tilesErlangB2.add(
  language.model.inputPReject,
  "P(reject)",
  "Preject",
  0.2,
  0.1,
  0.2,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputPRejectInfo1,
  language.model.inputPRejectInfo2,
  "reject",
  false,
  false
);

/**
 * Calculates the Erlang B formula results for an individual set of input parameters.
 * @param {Object} input Input values
 * @returns {Object} Results
 */
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

  table.addHeading('E[I]',language.model.inputInterArrivalTimeMean);
  table.addHeading('E[S]',language.model.inputServiceTimeMean);
  table.addHeading('E[N<sub>S</sub>]',language.statistics.averageNS);
  table.addHeading('c',language.model.inputNumberOfOperators);
  table.addHeading('a',language.statistics.Workload);
  table.addHeading('&rho;',language.statistics.Utilization);
  table.addHeading('P(reject)',language.statistics.rejectionProbability);

  table.calc(input,function(table,input) {
    const data=calcErlangB(input);
    table.addCol(data.EI);
    table.addCol(data.ES);
    table.addCol(data.a); /* E[NS] */
    table.addCol(data.c);
    table.addCol(data.a);
    table.addColPercent(data.rho);
    table.addColPercent(data.Preject);
  });

  return table;
}

/* Individual values */

/**
 * Callback for updating the individual values results.
 */
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

/**
 * Callback for updating the individual values results (2).
 */
function updateErlangB2Values() {
  const input=tilesErlangB2.valuesValues;
  if (input==null) return;

  const data={};
  data.EI=input[0];
  data.ES=input[1];
  data.Preject=input[2];
  data.a=data.ES/data.EI;

  data.c=1;
  while (true) {
    data.PrejectCalc=ErlangB(data.a,data.c);
    const lambdaNet=1/data.EI*(1-data.Preject);
    data.rho=lambdaNet*data.ES/data.c;
    if (data.PrejectCalc<=data.Preject) break;
    data.c++;
  }

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  result+=language.statistics.rejectionProbability+" ("+language.statistics.valueSet+"): <b>P(reject)="+(data.Preject*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingErlangBResults+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.NumberOfOperators+': <b>c='+data.c+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b><br>\n";
  result+=language.statistics.rejectionProbability+" ("+language.statistics.valueCalculated+"): <b>P(reject)="+(data.PrejectCalc*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  document.getElementById('ErlangB2Values_results').innerHTML=result;
}

/* Table */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in table mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabErlangBTable(sender) {
  tilesErlangB.updateTabs(sender,'Table');
  updateErlangBTable();
}

/**
 * Callback for updating the table results.
 */
function updateErlangBTable() {
  let table=calcErlangBTable('Table');
  if (table!=null) document.getElementById('ErlangBTable_results').innerHTML=table.html+table.buttons;
}

/* Diagram */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in diagram mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabErlangBDiagram(sender) {
  tilesErlangB.updateTabs(sender,'Diagram');
  updateErlangBDiagram();
}

/**
 * Callback for updating the diagram results.
 */
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
    {columnIndex: 6, color: 'red', mode: 'percent'}, /* P(reject) */
    {columnIndex: 2, color: 'gray', mode: 'number'}, /* E[NS] */
    {columnIndex: 5, color: 'blue', mode: 'percent'}, /* rho */
  ];

  table.diagram('ErlangBDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* General setup */

window.updateErlangBValues=updateErlangBValues;
window.updateErlangB2Values=updateErlangB2Values;
window.updateErlangBTable=updateErlangBTable;
window.updateErlangBDiagram=updateErlangBDiagram;
window.changeTabErlangBTable=changeTabErlangBTable;
window.changeTabErlangBDiagram=changeTabErlangBDiagram;
