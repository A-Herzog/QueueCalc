/*
Copyright 2024 Alexander Herzog

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

export {tilesCallCenter};

import {TilesBuilder, Table} from './tools_gui.js';
import {calcExtErlangC} from './gui_ExtErlangC.js';
import {language} from './Language.js';


/**
 * Input tiles for the economy of scale
 */
const tilesCallCenter=new TilesBuilder('CallCenter');

tilesCallCenter.add(
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
  "PositiveFloat",
  false,
  false
);

tilesCallCenter.add(
  language.model.inputServiceTimeMean,
  "E[S]",
  "ES",
  500,
  5,
  1000,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceTimeMeanInfo1,
  language.model.inputServiceTimeMeanInfo2,
  "PositiveFloat",
  false,
  false
);

tilesCallCenter.add(
  language.model.inputWaitingTimeToleranceMean,
  "E[WT]",
  "EWT",
  900,
  30,
  60,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputWaitingTimeToleranceMeanInfo1,
  language.model.inputWaitingTimeToleranceMeanInfo2,
  "PositiveFloat",
  false,
  false
);

tilesCallCenter.add(
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
  false
);

tilesCallCenter.add(
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
  "PositiveInt",
  false,
  true
);

/**
 * Calculates the call center results for an individual set of input parameters.
 * @param {Object} input Input values
 * @returns {Object} Results
 */
function calcCallCenter(input) {
  const temp=[...input];
  temp.splice(2,0,1000);
  const c=temp[5];
  temp[5]=temp[4];
  temp[4]=c;
  return calcExtErlangC(temp);
}

/**
 * Generates a results table based on the input values in table or diagram mode.
 * @param {String} mode Which input elements are to be used ("Table" or "Diagram")?
 * @returns {Object} Table object with the calculated values.
 */
function calcCallCenterTable(mode) {
  const input=tilesCallCenter.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]',language.model.inputInterArrivalTimeMean);
  table.addHeading('E[S]',language.model.inputServiceTimeMean);
  table.addHeading('K',language.statistics.SystemSize);
  table.addHeading('E[WT]',language.model.inputWaitingTimeToleranceMean);
  table.addHeading('c',language.model.inputNumberOfOperators);
  table.addHeading('t',language.model.inputServiceLevelSeconds);
  table.addHeading('a ('+language.statistics.characteristicsModeInput+')',language.statistics.Workload+' ('+language.statistics.characteristicsModeInput+')');
  table.addHeading('&rho; ('+language.statistics.characteristicsModeInput+')',language.statistics.Utilization+' ('+language.statistics.characteristicsModeInput+')');
  table.addHeading('P(A)',language.statistics.waitingCancelationProbability);
  table.addHeading('E[I] ('+language.statistics.characteristicsModeNet+')',language.model.inputInterArrivalTimeMean+' ('+language.statistics.characteristicsModeNet+')');
  table.addHeading('&rho; ('+language.statistics.characteristicsModeNet+')',language.statistics.Utilization+' ('+language.statistics.characteristicsModeNet+')');
  table.addHeading('E[W]',language.statistics.averageWaitingTime);
  table.addHeading('E[V]',language.statistics.averageResidenceTime);
  table.addHeading('E[N<sub>Q</sub>]',language.statistics.averageNQ);
  table.addHeading('E[N<sub>S</sub>]',language.statistics.averageNS);
  table.addHeading('E[N]',language.statistics.averageN);
  table.addHeading('P(N=0)',language.statistics.emptySystemProbability);
  table.addHeading('P(W&gt;0)',language.statistics.waitingProbability);
  table.addHeading('P(W&le;t)',language.model.inputServiceLevel);

  table.calc(input,function(table,input) {
    const data=calcCallCenter(input);
    table.addCol(data.EI);
    table.addCol(data.ES);
    table.addCol(data.K);
    table.addCol(data.EWT);
    table.addCol(data.c);
    table.addCol(data.t);
    table.addCol(data.a);
    table.addColPercent(data.rho);
    table.addColPercent(data.PA);
    table.addCol(data.EINet);
    table.addColPercent(data.rhoNet);
    table.addCol(data.EW);
    table.addCol(data.EV);
    table.addCol(data.ENQ);
    table.addCol(data.ENS);
    table.addCol(data.EN);
    table.addColPercent(data.PNeq0);
    table.addColPercent(data.PWgt0);
    table.addColPercent(data.PWlet);
  });

  return table;
}

/* Diagram */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in diagram mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabCallCenterDiagram(sender) {
  tilesCallCenter.updateTabs(sender,'Diagram');
  updateCallCenterDiagram();
}

/**
 * Callback for updating the diagram results.
 */
function updateCallCenterDiagram() {
  const table=calcCallCenterTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
    case 1: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
    case 2: xAxisTitle='E[WT] ('+language.statistics.unitTime+')'; break;
    case 3: xAxisTitle='c ('+language.statistics.unitNumber+')'; break;
    case 4: xAxisTitle='t ('+language.statistics.unitTime+')'; break;
  }

  const ySetup=[
    {columnIndex: 8, color: 'red', mode: 'percent'}, /* P(A) */
    {columnIndex: 11, color: 'yellow', mode: 'time'}, /* E[W] */
    {columnIndex: 12, color: 'green', mode: 'time'}, /* E[V] */
    {columnIndex: 13, color: 'orange', mode: 'number'}, /* E[NQ] */
    {columnIndex: 15, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 7, color: 'lightgray', mode: 'percent'}, /* rho */
    {columnIndex: 10, color: 'gray', mode: 'percent'}, /* rhoNet */
    {columnIndex: 18, color: 'black', mode: 'percent'} /* P(W<=t) */
  ];

  table.diagram('CallCenterDiagram_results',table.xValuesCol,xAxisTitle,ySetup,{x: 4, y: Array.from({length: 12},(_,i)=>i+7)});
}

/* General setup */

window.updateCallCenterDiagram=updateCallCenterDiagram;
window.changeTabCallCenterDiagram=changeTabCallCenterDiagram;