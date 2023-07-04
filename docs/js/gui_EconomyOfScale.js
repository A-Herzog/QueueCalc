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
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputUtilizationInfo1,
  language.model.inputUtilizationInfo2,
  "rho",
  false,
  false
);

function calcEconomyOfScale(input) {
  /* rho=ES/EI/c => EI=ES/c/rho */
  const EI=input[1]/input[3]/input[4];
  input.splice(0,0,EI);
  return calcAC(input);
}

function calcEconomyOfScaleTable(mode) {
  const input=tilesEconomyOfScale.rangeValues(mode);
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

/* Tabelle */

function changeTabEconomyOfScaleTable(sender) {
    tilesEconomyOfScale.updateTabs(sender,'Table');
    updateEconomyOfScaleTable();
  }

  function updateEconomyOfScaleTable() {
    let table=calcEconomyOfScaleTable('Table');
    if (table!=null) {
      globalThis["EconomyOfScaleTableData"]=table.text;
      const html=table.html+"<p><button type='button' class='btn btn-primary bi-clipboard' onclick='navigator.clipboard.writeText(globalThis.EconomyOfScaleTableData);'> "+language.GUI.copyTable+"</button></p>";
      document.getElementById('EconomyOfScaleTable_results').innerHTML=html;
    }
  }

  /* Diagramm */

  function changeTabEconomyOfScaleDiagram(sender) {
    tilesEconomyOfScale.updateTabs(sender,'Diagram');
    updateEconomyOfScaleDiagram();
  }

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
      {columnIndex: 4+7, color: 'blue', mode: 'number'}, /* E[N] */
      {columnIndex: 4+2, color: 'gray', mode: 'percent'}, /* rho */
    ];

    table.diagram('EconomyOfScaleDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
  }

  /* Allgemeine Vorbereitungen */

window.updateEconomyOfScaleTable=updateEconomyOfScaleTable;
window.updateEconomyOfScaleDiagram=updateEconomyOfScaleDiagram;
window.changeTabEconomyOfScaleTable=changeTabEconomyOfScaleTable;
window.changeTabEconomyOfScaleDiagram=changeTabEconomyOfScaleDiagram;