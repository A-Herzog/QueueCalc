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

export {tilesPC};

import {TilesBuilder, Table} from './tools_gui.js';
import {language} from './Language.js';

/**
 * Input tiles for the Pollaczek-Chintschin formula
 */
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

/**
 * Calculates the Pollaczek-Chintschin formula results for an individual set of input parameters.
 * @param {Object} input Input values
 * @returns {Object} Results
 */
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

/**
 * Generates a results table based on the input values in table or diagram mode.
 * @param {String} mode Which input elements are to be used ("Table" or "Diagram")?
 * @returns {Object} Table object with the calculated values.
 */
function calcPCTable(mode) {
  const input=tilesPC.rangeValues(mode);
  if (input==null) return null;

  let table=new Table(language.GUI.formulaPCLong+" - "+language.GUI.results);

  table.addHeading('E[I]',language.model.inputInterArrivalTimeMean);
  table.addHeading('E[S]',language.model.inputServiceTimeMean);
  table.addHeading('CV[S]',language.model.inputServiceTimeCV);
  table.addHeading('a',language.statistics.Workload);
  table.addHeading('&rho;',language.statistics.Utilization);
  table.addHeading('E[W]',language.statistics.averageWaitingTime);
  table.addHeading('E[V]',language.statistics.averageResidenceTime);
  table.addHeading('E[N<sub>Q</sub>]',language.statistics.averageNQ);
  table.addHeading('E[N<sub>S</sub>]',language.statistics.averageNS);
  table.addHeading('E[N]',language.statistics.averageN);

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

/* Individual values */

/**
 * Callback for updating the individual values results.
 */
function updatePCValues() {
  const input=tilesPC.valuesValues;
  if (input==null) return;
  const data=calcPC(input);

  let result='';
  result+="<h4 class='h5'>"+language.statistics.headingInputParameters+"</h4>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  if (data.CVS!=1) result+=language.model.inputServiceTimeCV+': <b>CV[S]='+data.CVS.toLocaleString()+"</b><br>\n";
  result+=language.statistics.NumberOfOperators+': <b>c=1</b><br>\n';
  result+="</p>\n";

  result+="<h4 class='h5'>"+language.statistics.headingDirectCalculableParameters+"</h4>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h4 class='h5'>"+language.statistics.headingPCResults+"</h4>\n";
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

/* Table */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in table mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabPCTable(sender) {
  tilesPC.updateTabs(sender,'Table');
  updatePCTable();
}

/**
 * Callback for updating the table results.
 */
function updatePCTable() {
  let table=calcPCTable('Table');
  if (table!=null) document.getElementById('PCTable_results').innerHTML=table.html+table.buttons;
}

/* Diagram */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in diagram mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabPCDiagram(sender) {
  tilesPC.updateTabs(sender,'Diagram');
  updatePCDiagram();
}

/**
 * Callback for updating the diagram results.
 */
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
    {columnIndex: 2+6, color: 'lightgray', mode: 'number'}, /* E[NS] */
    {columnIndex: 2+7, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 2+2, color: 'gray', mode: 'percent'}, /* rho */
  ];

  table.diagram('PCDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* General setup */

window.updatePCValues=updatePCValues;
window.updatePCTable=updatePCTable;
window.updatePCDiagram=updatePCDiagram;
window.changeTabPCTable=changeTabPCTable;
window.changeTabPCDiagram=changeTabPCDiagram;
