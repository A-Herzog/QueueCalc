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

export {tilesErlangC, tilesErlangC2, calcErlangC};

import {TilesBuilder, Table} from './tools_gui.js';
import {MMcZustandsP, ErlangC, ErlangC_P1} from './Erlang.js';
import {language} from './Language.js';

/**
 * Input tiles for the Erlang C formula
 */
const tilesErlangC=new TilesBuilder('ErlangC');
const tilesErlangC2=new TilesBuilder('ErlangC2');

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

tilesErlangC2.add(
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

tilesErlangC2.add(
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

tilesErlangC2.add(
  language.model.inputServiceLevelSeconds,
  "t",
  "t",
  20,
  1,
  0,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceLevelInfo3t,
  "",
  "NotNegativeFloat"
);

tilesErlangC2.add(
  language.model.inputServiceLevel,
  "P(W&\le;t)",
  "servicelevel",
  0.8,
  0.1,
  0.2,
  language.model.invalidPercent,
  language.model.invalidPositiveFloat,
  language.model.inputServiceLevelInfo3P,
  "",
  "servicelevel"
);

/**
 * Calculates the Erlang C formula results for an individual set of input parameters.
 * @param {Object} input Input values
 * @returns {Object} Results
 */
function calcErlangC(input) {
  const result={};

  result.EI=input[0];
  result.ES=input[1];
  result.c=input[2];
  result.t=input[3];

  result.a=result.ES/result.EI;
  result.rho=result.a/result.c;

  if (result.rho<1) {
    result.P1=ErlangC_P1(result.a,result.c);
    const lambda=1/result.EI;
    const mu=1/result.ES;
    result.EW=result.P1/(result.c*mu-lambda);
    result.EV=result.EW+result.ES;
    result.ENQ=result.EW/result.EI;
    result.EN=result.EV/result.EI;
    result.ENS=result.EN-result.ENQ;
    result.PNeq0=MMcZustandsP(result.a,result.c,0);
    result.PWgt0=1-ErlangC(lambda,mu,result.c,0);
    if (result.t==null) result.PWlet=null; else result.PWlet=ErlangC(lambda,mu,result.c,result.t);
    result.VarW=(2*result.P1-result.P1**2)/(result.c*mu-lambda)**2;
    result.CVW=Math.sqrt(result.VarW)/result.EW;
    result.VarV=result.VarW+result.ES**2;
    result.CVV=Math.sqrt(result.VarV)/result.EV;
    if (result.c==1) {
      result.VarN=result.rho/(1-result.rho)**2; /* Var[N]=rho/(1-rho)^2 */
      result.CVN=Math.sqrt(result.VarN)/result.EN;
      result.VarNQ=result.rho**2*(1+result.rho-result.rho**2)/(1-result.rho)**2; /* Var[NQ]=rho^2(1+rho-rho^2)/(1-rho)^2 */
      result.CVNQ=Math.sqrt(result.VarNQ)/result.ENQ;
    }
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

/**
 * Generates a results table based on the input values in table or diagram mode.
 * @param {String} mode Which input elements are to be used ("Table" or "Diagram")?
 * @returns {Object} Table object with the calculated values.
 */
function calcErlangCTable(mode) {
  const input=tilesErlangC.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]',language.model.inputInterArrivalTimeMean);
  table.addHeading('E[S]',language.model.inputServiceTimeMean);
  table.addHeading('c',language.model.inputNumberOfOperators);
  table.addHeading('t',language.model.inputServiceLevelSeconds);
  table.addHeading('a',language.statistics.Workload);
  table.addHeading('&rho;',language.statistics.Utilization);
  table.addHeading('E[W]',language.statistics.averageWaitingTime);
  table.addHeading('E[V]',language.statistics.averageResidenceTime);
  table.addHeading('E[N<sub>Q</sub>]',language.statistics.averageNQ);
  table.addHeading('E[N<sub>S</sub>]',language.statistics.averageNS);
  table.addHeading('E[N]',language.statistics.averageN);
  table.addHeading('P(N=0)',language.statistics.emptySystemProbability);
  table.addHeading('P(W&gt;0)',language.statistics.waitingProbability);
  table.addHeading('P(W&le;t)',language.model.inputServiceLevel);

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

/* Individual values */

/**
 * Generates a string for a button to open a distribution viewer
 * @param {Object} data Object containing the Erlang C input parameters
 * @param {Number} display Selects what to display
 * @param {String} buttonTitle  Button title
 * @returns HTML code for the button as a string
 */
function distributionButton(data, display, buttonTitle) {
  const settings=[];
  settings.push("display="+display);
  settings.push("EI="+data.EI);
  settings.push("ES="+data.ES);
  settings.push("c="+data.c);
  return "<a class='btn btn-primary bi-graph-up me-3 mt-2' href='Dist_"+language.GUI.imageMode+".html?mode=ErlangC&"+settings.join('&')+"' target='_blank'> "+buttonTitle+"</a>";
}

/**
 * Callback for updating the individual values results.
 */
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
      result+=language.statistics.P1+": <b>P<sub>1</sub>="+data.P1.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageWaitingTime+": <b>E[W]="+data.EW.toLocaleString()+"</b> <small>(Std[W]="+Math.sqrt(data.VarW).toLocaleString()+", CV[W]="+data.CVW.toLocaleString()+")</small><br>\n";
      result+=language.statistics.averageResidenceTime+": <b>E[V]="+data.EV.toLocaleString()+"</b> <small>(=E[W]+E[S])</small> <small>(Std[V]="+Math.sqrt(data.VarV).toLocaleString()+", CV[V]="+data.CVV.toLocaleString()+")</small><br>\n";
      result+=language.statistics.flowFactor+": <b>E[V]/E[S]="+(data.EV/data.ES).toLocaleString()+"</b><br>\n";
      const infoNQ=(data.c>1)?"":(" <small>(Std[NQ]="+Math.sqrt(data.VarNQ).toLocaleString()+", CV[NQ]="+data.CVNQ.toLocaleString()+")</small>");
      result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b>"+infoNQ+"<br>\n";
      result+=language.statistics.averageNS+": <b>E[N<sub>S</sub>]="+data.ENS.toLocaleString()+"</b><br>\n";
      const infoN=(data.c>1)?"":(" <small>(Std[N]="+Math.sqrt(data.VarN).toLocaleString()+", CV[N]="+data.CVN.toLocaleString()+")</small>");
      result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b> <small>(=E[N<sub>Q</sub>]+E[N<sub>S</sub>])</small>"+infoN+"<br>\n";
      result+=language.statistics.emptySystemProbability+": <b>P(N=0)="+(data.PNeq0*100).toLocaleString()+"%</b><br>\n";
      if (data.t!=null) {
          result+=language.statistics.serviceLevel+": <b>P(W&le;"+data.t.toLocaleString()+")="+(data.PWlet*100).toLocaleString()+"%</b> (<small>"+(data.PWlet*100).toLocaleString()+"% "+language.statistics.serviceLevelInfo1+" "+data.t.toLocaleString()+" "+language.statistics.serviceLevelInfo2+")</small><br>\n";
      }
      result+=language.statistics.waitingProbability+": <b>P(W&gt;0)=P(N&ge;c)="+(data.PWgt0*100).toLocaleString()+"%</b> (<small>"+(data.PWgt0*100).toLocaleString()+"% "+language.statistics.waitingProbabilityInfo+")</small><br>\n";
  }
  result+="</p>\n";

  if (data.rho<1) {
    result+="<p>";
    result+=distributionButton(data,0,language.WaitingTimeDist.button);
    result+=distributionButton(data,1,language.WaitingTimeDistN.button);
    result+=distributionButton(data,2,language.WaitingTimeDistNQ.button);
    result+=distributionButton(data,3,language.WaitingTimeDistCBusy.button);
    result+="</p>";
  }

  document.getElementById('ErlangCValues_results').innerHTML=result;
}

/**
 * Callback for updating the individual values results (2).
 */
function updateErlangC2Values() {
  const input=tilesErlangC2.valuesValues;
  if (input==null) return;

  const temp={};
  temp.EI=input[0];
  temp.ES=input[1];
  temp.t=input[2];
  temp.servicelevel=input[3];
  temp.minC=Math.ceil(temp.ES/temp.EI);
  if ((temp.ES/temp.EI)%1==0) temp.minC++;

  if (temp.t==0 && temp.servicelevel==1) {
    document.getElementById('ErlangC2Values_results').innerHTML=language.model.impossibleServiceLevel;
    return;
  }

  let data;
  let c=temp.minC-1;
  do {
    c++;
    const tempInput=[temp.EI, temp.ES, c, temp.t];
    data=calcErlangC(tempInput);
  } while (data.PWlet<temp.servicelevel);

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceLevel+": <b>P(W&le;"+data.t.toLocaleString()+")="+(temp.servicelevel*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingErlangCResults+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.NumberOfOperators+': <b>c='+data.c+"</b><br>\n";
  if (data.rho>=1) {
      result+=language.statistics.rhoError;
  } else {
      result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b><br>\n";
      result+=language.statistics.P1+": <b>P<sub>1</sub>="+data.P1.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageWaitingTime+": <b>E[W]="+data.EW.toLocaleString()+"</b> <small>(Std[W]="+Math.sqrt(data.VarW).toLocaleString()+", CV[W]="+data.CVW.toLocaleString()+")</small><br>\n";
      result+=language.statistics.averageResidenceTime+": <b>E[V]="+data.EV.toLocaleString()+"</b> <small>(=E[W]+E[S])</small> <small>(Std[V]="+Math.sqrt(data.VarV).toLocaleString()+", CV[V]="+data.CVV.toLocaleString()+")</small><br>\n";
      result+=language.statistics.flowFactor+": <b>E[V]/E[S]="+(data.EV/data.ES).toLocaleString()+"</b><br>\n";
      const infoNQ=(data.c>1)?"":(" <small>(Std[NQ]="+Math.sqrt(data.VarNQ).toLocaleString()+", CV[NQ]="+data.CVNQ.toLocaleString()+")</small>");
      result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b>"+infoNQ+"<br>\n";
      result+=language.statistics.averageNS+": <b>E[N<sub>S</sub>]="+data.ENS.toLocaleString()+"</b><br>\n";
      const infoN=(data.c>1)?"":(" <small>(Std[N]="+Math.sqrt(data.VarN).toLocaleString()+", CV[N]="+data.CVN.toLocaleString()+")</small>");
      result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b> <small>(=E[N<sub>Q</sub>]+E[N<sub>S</sub>])</small>"+infoN+"<br>\n";
      result+=language.statistics.emptySystemProbability+": <b>P(N=0)="+(data.PNeq0*100).toLocaleString()+"%</b><br>\n";
      if (data.t!=null) {
          result+=language.statistics.serviceLevel+": <b>P(W&le;"+data.t.toLocaleString()+")="+(data.PWlet*100).toLocaleString()+"%</b> (<small>"+(data.PWlet*100).toLocaleString()+"% "+language.statistics.serviceLevelInfo1+" "+data.t.toLocaleString()+" "+language.statistics.serviceLevelInfo2+")</small><br>\n";
      }
      result+=language.statistics.waitingProbability+": <b>P(W&gt;0)=P(N&ge;c)="+(data.PWgt0*100).toLocaleString()+"%</b> (<small>"+(data.PWgt0*100).toLocaleString()+"% "+language.statistics.waitingProbabilityInfo+")</small><br>\n";
  }
  result+="</p>\n";

  if (data.rho<1) {
    result+="<p>";
    result+=distributionButton(data,0,language.WaitingTimeDist.button);
    result+=distributionButton(data,1,language.WaitingTimeDistN.button);
    result+=distributionButton(data,2,language.WaitingTimeDistNQ.button);
    result+=distributionButton(data,3,language.WaitingTimeDistCBusy.button);
    result+="</p>";
  }

  document.getElementById('ErlangC2Values_results').innerHTML=result;
}

/* Table */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in table mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabErlangCTable(sender) {
  tilesErlangC.updateTabs(sender,'Table');
  updateErlangCTable();
}

/**
 * Callback for updating the table results.
 */
function updateErlangCTable() {
  let table=calcErlangCTable('Table');
  if (table!=null) document.getElementById('ErlangCTable_results').innerHTML=table.html+table.buttons;
}

/* Diagram */

/**
 * Callback to notify the tiles system that a fix/range tab has changed (in diagram mode).
 * @param {Object} sender Tab which was changed
 */
function changeTabErlangCDiagram(sender) {
  tilesErlangC.updateTabs(sender,'Diagram');
  updateErlangCDiagram();
}

/**
 * Callback for updating the diagram results.
 */
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
    {columnIndex: 9, color: 'lightgray', mode: 'number'}, /* E[NS] */
    {columnIndex: 5, color: 'gray', mode: 'percent'}, /* rho */
    {columnIndex: 13, color: 'black', mode: 'percent'} /* P(W<=t) */
  ];

  table.diagram('ErlangCDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* General setup */

window.updateErlangCValues=updateErlangCValues;
window.updateErlangC2Values=updateErlangC2Values;
window.updateErlangCTable=updateErlangCTable;
window.updateErlangCDiagram=updateErlangCDiagram;
window.changeTabErlangCTable=changeTabErlangCTable;
window.changeTabErlangCDiagram=changeTabErlangCDiagram;
