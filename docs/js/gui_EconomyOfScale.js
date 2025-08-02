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

export {tilesEconomyOfScale};

import {TilesBuilder, Table} from './tools_gui.js';
import {language} from './Language.js';
import {calcAC} from './gui_AC.js';

/**
 * Input tiles for the economy of scale
 */
const tilesEconomyOfScale=new TilesBuilder('EconomyOfScale');

tilesEconomyOfScale.add(
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
  "NotNegativeFloat",
  false,
  false
);

tilesEconomyOfScale.add(
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
  "PositiveFloat",
  false,
  false
);

tilesEconomyOfScale.add(
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
  "NotNegativeFloat",
  false,
  false
);

tilesEconomyOfScale.add(
  language.model.inputNumberOfOperators,
  "c",
  "c",
  2,
  1,
  10,
  language.model.invalidPositiveInt,
  language.model.invalidPositiveInt,
  language.model.inputNumberOfOperatorsInfo1,
  language.model.inputNumberOfOperatorsInfo2,
  "PositiveInt"
);

tilesEconomyOfScale.add(
  language.model.inputUtilization,
  "&rho;",
  "rho",
  0.8,
  0.1,
  0.8,
  language.model.invalidPercent,
  language.model.invalidPositiveFloat,
  language.model.inputUtilizationInfo1,
  language.model.inputUtilizationInfo2,
  "rho",
  false,
  false
);

/**
 * Calculates the economy of scale results for an individual set of input parameters.
 * @param {Object} input Input values
 * @returns {Object} Results
 */
function calcEconomyOfScale(input) {
  /* rho=ES/EI/c => EI=ES/c/rho */
  const EI=input[1]/input[3]/input[4];
  input.splice(0,0,EI);
  return calcAC(input);
}

/**
 * Generates a results table based on the input values in table or diagram mode.
 * @param {String} mode Which input elements are to be used ("Table" or "Diagram")?
 * @returns {Object} Table object with the calculated values.
 */
function calcEconomyOfScaleTable(mode) {
  const input=tilesEconomyOfScale.rangeValues(mode);
  if (input==null) return null;

  let table=new Table(language.GUI.formulaEconomyOfScaleLong+" - "+language.GUI.results);

  table.addHeading('E[I]',language.model.inputInterArrivalTimeMean);
  table.addHeading('CV[I]',language.model.inputInterArrivalTimeCV);
  table.addHeading('E[S]',language.model.inputServiceTimeMean);
  table.addHeading('CV[S]',language.model.inputServiceTimeCV);
  table.addHeading('c',language.model.inputNumberOfOperators);
  table.addHeading('a',language.statistics.Workload);
  table.addHeading('&rho;',language.statistics.Utilization);
  table.addHeading('E[W]',language.statistics.averageWaitingTime);
  table.addHeading('E[V]',language.statistics.averageResidenceTime);
  table.addHeading('E[N<sub>Q</sub>]',language.statistics.averageNQ);
  table.addHeading('E[N<sub>S</sub>]',language.statistics.averageNS);
  table.addHeading('E[N]',language.statistics.averageN);

    table.calc(input,function(table,input) {
      const data=calcEconomyOfScale(input);
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

  table.xValuesCol++; /* Die erste Ausgabespalt ist in den Eingaben nicht vorhanden. */
  return table;
}

/* Table */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in table mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabEconomyOfScaleTable(sender) {
  tilesEconomyOfScale.updateTabs(sender,'Table');
  updateEconomyOfScaleTable();
}

/**
 * Callback for updating the table results.
 */
function updateEconomyOfScaleTable() {
  let table=calcEconomyOfScaleTable('Table');
  if (table!=null) document.getElementById('EconomyOfScaleTable_results').innerHTML=table.html+table.buttons;
}

/* Diagram */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in diagram mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabEconomyOfScaleDiagram(sender) {
  tilesEconomyOfScale.updateTabs(sender,'Diagram');
  updateEconomyOfScaleDiagram();
}

/**
 * Callback for updating the diagram results.
 */
function updateEconomyOfScaleDiagram() {
  const table=calcEconomyOfScaleTable('Diagram');
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
    {columnIndex: 4+6, color: 'lightgray', mode: 'number'}, /* E[NS] */
    {columnIndex: 4+7, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 4+2, color: 'gray', mode: 'percent'}, /* rho */
  ];

  table.diagram('EconomyOfScaleDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* General setup */

window.updateEconomyOfScaleTable=updateEconomyOfScaleTable;
window.updateEconomyOfScaleDiagram=updateEconomyOfScaleDiagram;
window.changeTabEconomyOfScaleTable=changeTabEconomyOfScaleTable;
window.changeTabEconomyOfScaleDiagram=changeTabEconomyOfScaleDiagram;