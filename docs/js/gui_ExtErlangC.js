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

export {tilesExtErlangC, calcExtErlangC};

import {TilesBuilder, Table} from './tools_gui.js';
import {ErlangC_ENQ, ErlangC_EW, MMcKMZustandsP, ErwErlangC_PA, ErwErlangC, ErwErlangC_ENQ, ErwErlangC_EN, ErwErlangC_EW, ErwErlangC_EV} from './Erlang.js';
import {language} from './Language.js';

const tilesExtErlangC=new TilesBuilder('ExtErlangC');

tilesExtErlangC.add(
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

tilesExtErlangC.add(
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

tilesExtErlangC.add(
  language.model.inputSystemSize,
  "K",
  "K",
  100,
  1,
  10,
  language.model.invalidNotNegativeInt,
  language.model.invalidPositiveInt,
  language.model.inputSystemSizeInfo1,
  language.model.inputSystemSizeInfo2,
  "NotNegativeInt",
);

tilesExtErlangC.add(
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
  "PositiveFloat"
);

tilesExtErlangC.add(
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

tilesExtErlangC.add(
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

function calcExtErlangC(input) {
    const result={};

    result.EI=input[0];
    result.ES=input[1];
    result.K=input[2];
    result.EWT=input[3];
    result.c=input[4];
    result.t=input[5];

    result.a=result.ES/result.EI;
    result.rho=result.a/result.c;

    result.PNK=MMcKMZustandsP(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K,result.K);
    result.PA=ErwErlangC_PA(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K);
    result.lambdaNet=1/result.EI*(1-result.PNK)*(1-result.PA);
    result.EINet=1/result.lambdaNet;
    result.rhoNet=result.lambdaNet*result.ES/result.c;

    if (result.rho<1) {
        result.EWErlangC=ErlangC_EW(1/result.EI,1/result.ES,result.c);
        result.ENQErlangC=ErlangC_ENQ(1/result.EI,1/result.ES,result.c);
    } else {
        result.EWErlangC=null;
        result.ENQErlangC=null;
    }
    result.EW=ErwErlangC_EW(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K);
    result.EV=ErwErlangC_EV(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K);
    result.ENQ=ErwErlangC_ENQ(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K);
    result.EN=ErwErlangC_EN(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K);
    result.ENS=result.EN-result.ENQ;

    result.PNeq0=MMcKMZustandsP(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K,0);
    result.PWgt0=1-ErwErlangC(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K,0);
    if (result.t==null) result.PWlet=null; else result.PWlet=ErwErlangC(1/result.EI,1/result.ES,1/result.EWT,result.c,result.K,result.t);

    return result;
}

function calcExtErlangCTable(mode) {
  const input=tilesExtErlangC.rangeValues(mode);
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
  table.addHeading('P(N=K)',language.statistics.blockingProbability);
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
    const data=calcExtErlangC(input);
    table.addCol(data.EI);
    table.addCol(data.ES);
    table.addCol(data.K);
    table.addCol(data.EWT);
    table.addCol(data.c);
    table.addCol(data.t);
    table.addCol(data.a);
    table.addColPercent(data.rho);
    table.addColPercent(data.PNK);
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

/* Einzelwerte */

function updateExtErlangCValues() {
  const input=tilesExtErlangC.valuesValues;
  if (input==null) return;
  const data=calcExtErlangC(input);

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  result+=language.statistics.cancelationRate+': <b>&nu;='+(1/data.EWT).toLocaleString()+"</b> <small>("+language.statistics.cancelationRateInfo+" E[WT]="+data.EWT.toLocaleString()+")</small><br>\n";
  result+=language.statistics.SystemSize+': <b>K='+data.K+"</b> <small>("+language.statistics.SystemSizeInfo+": "+(data.K+data.c)+")</small><br>\n";
  result+=language.statistics.NumberOfOperators+': <b>c='+data.c+"</b>\n";
  result+="</p>\n";
  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+(data.ES/data.EI).toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b><br>\n";
  result+="<small>("+language.statistics.UtilizationInputInfo+")</small>\n";
  result+="</p>\n";
  result+="<h5>"+language.statistics.headingErlangCResults+"</h5>\n";
  result+="<p>\n";
  if (data.K<data.c) {
    result+=language.statistics.SystemSizeError;
  } else {
    result+=language.statistics.blockingProbability+": <b>P(N=K)="+(data.PNK*100).toLocaleString()+"%</b><br>\n";
    result+=language.statistics.waitingCancelationProbability+": <b>P(A)="+(data.PA*100).toLocaleString()+"%</b><br>\n";
    result+=language.statistics.arrivalRateNet+": <b>&lambda;="+data.lambdaNet.toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+(1/data.lambdaNet).toLocaleString()+")</small><br>\n";
    result+=language.statistics.UtilizationNet+": <b>&rho;="+(data.rhoNet*100).toLocaleString()+"%</b><br>\n";
    result+="</p>\n";
    result+="<p>\n";
    let info="";
    if (data.rho<1) info=" <small>("+language.statistics.ErlangCCompare1+": "+data.EWErlangC.toLocaleString()+")</small>";
    result+=language.statistics.averageWaitingTime+" ("+language.statistics.SuccessAndCanceled+"): <b>E[W]="+data.EW.toLocaleString()+"</b>"+info+"<br>\n";
    result+=language.statistics.averageResidenceTime+" ("+language.statistics.SuccessAndCanceled+"): <b>E[V]="+data.EV.toLocaleString()+"</b> <small>(=E[W]+E[S])</small><br>\n";
    result+=language.statistics.flowFactor+": <b>E[V]/E[S]="+(data.EV/data.ES).toLocaleString()+"</b><br>\n";
    info="";
    if (data.rho<1) info=" <small>("+language.statistics.ErlangCCompare1+": "+data.ENQErlangC.toLocaleString()+")</small>";
    result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b>"+info+"<br>\n";
    result+=language.statistics.averageNS+": <b>E[N<sub>S</sub>]="+data.ENS.toLocaleString()+"</b><br>\n";
    result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b> <small>(=E[N<sub>Q</sub>]+E[N<sub>S</sub>])</small><br>\n";
    result+=language.statistics.emptySystemProbability+": <b>P(N=0)="+(data.PNeq0*100).toLocaleString()+"%</b><br>\n";
    if (data.t!=null) {
      result+=language.statistics.serviceLevel+": <b>P(W&le;"+data.t.toLocaleString()+")="+(data.PWlet*100).toLocaleString()+"%</b> (<small>"+(data.PWlet*100).toLocaleString()+"% "+language.statistics.serviceLevelInfo1+" "+data.t.toLocaleString()+" "+language.statistics.serviceLevelInfo2+")</small><br>\n";
    }
    result+=language.statistics.waitingProbability+": <b>P(W&gt;0)="+(data.PWgt0*100).toLocaleString()+"%</b> (<small>"+(data.PWgt0*100).toLocaleString()+"% "+language.statistics.waitingProbabilityInfo+")</small><br>\n";
  }
  result+="</p>\n";

  if (data.K>=data.c) {
    result+="<p>\n";
    const settings=[];
    settings.push("EI="+data.EI);
    settings.push("ES="+data.ES);
    settings.push("K="+data.K);
    settings.push("EWT="+data.EWT);
    settings.push("c="+data.c);
    result+="<p><a class='btn btn-primary bi-graph-up' href='WaitingTimeDist_"+language.GUI.imageMode+".html?mode=ExtErlangC&"+settings.join('&')+"' target='_blank'> "+language.WaitingTimeDist.button+"</a></p>";
  }

  document.getElementById('ExtErlangCValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabExtErlangCTable(sender) {
  tilesExtErlangC.updateTabs(sender,'Table');
  updateExtErlangCTable();
}

function updateExtErlangCTable() {
  let table=calcExtErlangCTable('Table');
  if (table!=null) document.getElementById('ExtErlangCTable_results').innerHTML=table.html+table.buttons;
}

/* Diagramm */

function changeTabExtErlangCDiagram(sender) {
  tilesExtErlangC.updateTabs(sender,'Diagram');
  updateExtErlangCDiagram();
}

function updateExtErlangCDiagram() {
    const table=calcExtErlangCTable('Diagram');
    if (table==null) return;

    let xAxisTitle='';
    switch (table.xValuesCol) {
      case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
      case 1: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
      case 2: xAxisTitle='K ('+language.statistics.unitNumber+')'; break;
      case 3: xAxisTitle='E[WT] ('+language.statistics.unitTime+')'; break;
      case 4: xAxisTitle='c ('+language.statistics.unitNumber+')'; break;
      case 5: xAxisTitle='t ('+language.statistics.unitTime+')'; break;
    }

    const ySetup=[
      {columnIndex: 9, color: 'red', mode: 'percent'}, /* P(A) */
      {columnIndex: 12, color: 'yellow', mode: 'time'}, /* E[W] */
      {columnIndex: 13, color: 'green', mode: 'time'}, /* E[V] */
      {columnIndex: 14, color: 'orange', mode: 'number'}, /* E[NQ] */
      {columnIndex: 16, color: 'blue', mode: 'number'}, /* E[N] */
      {columnIndex: 7, color: 'lightgray', mode: 'percent'}, /* rho */
      {columnIndex: 11, color: 'gray', mode: 'percent'}, /* rhoNet */
      {columnIndex: 19, color: 'black', mode: 'percent'} /* P(W<=t) */
    ];

    table.diagram('ExtErlangCDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* Allgemeine Vorbereitungen */

window.updateExtErlangCValues=updateExtErlangCValues;
window.updateExtErlangCTable=updateExtErlangCTable;
window.updateExtErlangCDiagram=updateExtErlangCDiagram;
window.changeTabExtErlangCTable=changeTabExtErlangCTable;
window.changeTabExtErlangCDiagram=changeTabExtErlangCDiagram;
