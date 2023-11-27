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

export {tilesShortestQueue};

import {TilesBuilder, Table} from './tools_gui.js';
import {language} from './Language.js';
import {binom} from './tools.js';

/**
 * Input tiles for the shortest queue system design model
 */
const tilesShortestQueue=new TilesBuilder('ShortestQueue');

tilesShortestQueue.add(
  language.GUI.formulaShortestQueueA,
  "a",
  "a",
  8,
  1,
  20,
  language.model.invalidPositiveInt,
  language.model.invalidPositiveInt,
  language.GUI.formulaShortestQueueAInfo1,
  language.GUI.formulaShortestQueueAInfo2,
  "PositiveInt"
);

tilesShortestQueue.add(
  language.GUI.formulaShortestQueueB,
  "b",
  "b",
  5,
  1,
  20,
  language.model.invalidPositiveInt,
  language.model.invalidPositiveInt,
  language.GUI.formulaShortestQueueBInfo1,
  language.GUI.formulaShortestQueueBInfo2,
  "PositiveInt"
);

/**
 * Calculates the shortest queue system design results for an individual set of input parameters.
 * @param {Object} input Input values
 * @returns {Object} Results
 */
function calcShortestQueue(input) {
  const result={};

  result.a=Math.max(input[0],input[1]);
  result.b=Math.min(input[0],input[1]);

  /* see Hanschke, Stochastik II, example 16.23 */
  let sum=0;
  for (let k=0;k<=result.b-1;k++) sum+=binom(result.a+k-1,k)*(0.5**k);
  result.p=(0.5**result.a)*sum;

  return result;
}

/**
 * Generates a results table based on the input values in table or diagram mode.
 * @param {String} mode Which input elements are to be used ("Table" or "Diagram")?
 * @returns {Object} Table object with the calculated values.
 */
function calcShortestQueueTable(mode) {
  const input=tilesShortestQueue.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('a',language.GUI.formulaShortestQueueA);
  table.addHeading('b',language.GUI.formulaShortestQueueB);
  table.addHeading('P(W<sub>(b)</sub>&gt;W<sub>(a)</sub>)',language.GUI.formulaShortestQueueInfoAB);

  table.calc(input,function(table,input) {
    const data=calcShortestQueue(input);
    table.addCol(data.a);
    table.addCol(data.b);
    table.addColPercent(data.p);
  });

  return table;
}

/* Individual values */

/**
 * Callback for updating the individual values results.
 */
function updateShortestQueueValues() {
  const input=tilesShortestQueue.valuesValues;
  if (input==null) return;
  const data=calcShortestQueue(input);

  let result='';

  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.GUI.formulaShortestQueueA+": <b>a="+data.a+"</b><br>";
  result+=language.GUI.formulaShortestQueueB+": <b>b="+data.b+"</b><br>";
  result+="</p>\n";

  result+="<h5>"+language.GUI.formulaShortestQueueInfoAB+"</h5>";
  result+="<p>\n";
  result+="<b>P(W<sub>(b)</sub>&gt;W<sub>(a)</sub>)="+(data.p*100).toLocaleString()+"%</b>";
  result+="</p>\n";

  document.getElementById('ShortestQueueValues_results').innerHTML=result;
}

/* Table */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in table mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabShortestQueueTable(sender) {
  tilesShortestQueue.updateTabs(sender,'Table');
  updateShortestQueueTable();
}

/**
 * Callback for updating the table results.
 */
function updateShortestQueueTable() {
  let table=calcShortestQueueTable('Table');
  if (table!=null) document.getElementById('ShortestQueueTable_results').innerHTML=table.html+table.buttons;
}

/* Diagram */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in diagram mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabShortestQueueDiagram(sender) {
  tilesShortestQueue.updateTabs(sender,'Diagram');
  updateShortestQueueDiagram();
}

/**
 * Callback for updating the diagram results.
 */
function updateShortestQueueDiagram() {
  const table=calcShortestQueueTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='a ('+language.GUI.formulaShortestQueueA+')'; break;
    case 1: xAxisTitle='b ('+language.GUI.formulaShortestQueueB+')'; break;
  }

  const ySetup=[
    {columnIndex: 2, color: 'red', mode: 'percent'},
  ];

  table.diagram('ShortestQueueDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* General setup */

window.updateShortestQueueValues=updateShortestQueueValues;
window.updateShortestQueueTable=updateShortestQueueTable;
window.updateShortestQueueDiagram=updateShortestQueueDiagram;
window.changeTabShortestQueueTable=changeTabShortestQueueTable;
window.changeTabShortestQueueDiagram=changeTabShortestQueueDiagram;
