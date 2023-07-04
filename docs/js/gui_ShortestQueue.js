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

function binom(n,k) {
  let prod=1;
  for (let i=1;i<=k;i++) prod*=(n-i+1)/i;
  return prod;
}

function calcShortestQueue(input) {
  const result={};

  result.a=Math.max(input[0],input[1]);
  result.b=Math.min(input[0],input[1]);

  /* vgl. Hanschke, Stochastik II, Beispiel 16.23 */
  let sum=0;
  for (let k=0;k<=result.b-1;k++) sum+=binom(result.a+k-1,k)*(0.5**k);
  result.p=(0.5**result.a)*sum;

  return result;
}

function calcShortestQueueTable(mode) {
  const input=tilesShortestQueue.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('a');
  table.addHeading('b');
  table.addHeading('P(W<sub>(b)</sub>&gt;W<sub>(a)</sub>)');

  table.calc(input,function(table,input) {
    const data=calcShortestQueue(input);
    table.addCol(data.a);
    table.addCol(data.b);
    table.addColPercent(data.p);
  });

  return table;
}


/* Einzelwerte */

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

  result+="<h5>"+"Wahrscheinlichkeit an der kürzeren Warteschlange länger warten zu müssen"+"</h5>";
  result+="<p>\n";
  result+="<b>P(W<sub>(b)</sub>&gt;W<sub>(a)</sub>)="+(data.p*100).toLocaleString()+"%</b>";
  result+="</p>\n";

  document.getElementById('ShortestQueueValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabShortestQueueTable(sender) {
  tilesShortestQueue.updateTabs(sender,'Table');
  updateShortestQueueTable();
}

function updateShortestQueueTable() {
  let table=calcShortestQueueTable('Table');
  if (table!=null) {
    globalThis["ShortestQueueTableData"]=table.text;
    const html=table.html+"<p><button type='button' class='btn btn-primary bi-clipboard' onclick='navigator.clipboard.writeText(globalThis.ShortestQueueTableData);'> "+language.GUI.copyTable+"</button></p>";
    document.getElementById('ShortestQueueTable_results').innerHTML=html;
  }
}

/* Diagramm */

function changeTabShortestQueueDiagram(sender) {
  tilesShortestQueue.updateTabs(sender,'Diagram');
  updateShortestQueueDiagram();
}

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

/* Allgemeine Vorbereitungen */

window.updateShortestQueueValues=updateShortestQueueValues;
window.updateShortestQueueTable=updateShortestQueueTable;
window.updateShortestQueueDiagram=updateShortestQueueDiagram;
window.changeTabShortestQueueTable=changeTabShortestQueueTable;
window.changeTabShortestQueueDiagram=changeTabShortestQueueDiagram;
