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

export {tilesExtAC, updateExtAC};

import {TilesBuilder, Table} from './tools_gui.js';
import {ErlangC_ENQ, ErlangC_EW} from './Erlang.js';
import {language} from './Language.js';

const tilesExtAC=new TilesBuilder('ExtAC');

tilesExtAC.add(
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

tilesExtAC.add(
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
  "NotNegativeFloat"
);

tilesExtAC.add(
  language.model.inputInterArrivalBatchSize,
  "b(I)",
  "bI",
  1,
  1,
  5,
  language.model.invalidPositiveInt,
  language.model.invalidPositiveInt,
  language.model.inputInterArrivalBatchSizeInfo1,
  language.model.inputInterArrivalBatchSizeInfo2,
  "PositiveInt"
);

tilesExtAC.add(
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

tilesExtAC.add(
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

tilesExtAC.add(
  language.model.inputServiceBatchSize,
  "b(S)",
  "bS",
  1,
  1,
  5,
  language.model.invalidPositiveInt,
  language.model.invalidPositiveInt,
  language.model.inputServiceBatchSizeInfo1,
  language.model.inputServiceBatchSizeInfo2,
  "PositiveInt"
);

tilesExtAC.add(
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

tilesExtAC.add(
  language.model.inputAvailability,
  "P(Up)",
  "PUp",
  1,
  0.1,
  0.5,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputAvailabilityInfo1,
  language.model.inputAvailabilityInfo2,
  "PositiveFloat"
);

tilesExtAC.add(
  language.model.inputDownTimeMean,
  "E[Dt]",
  "EDt",
  0,
  0.5,
  5,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputDownTimeMeanInfo1,
  language.model.inputDownTimeMeanInfo2,
  "NotNegativeFloat"
);

tilesExtAC.add(
  language.model.inputDownTimeCV,
  "CV[Dt]",
  "CVDt",
  1,
  0.1,
  0,
  language.model.invalidNotNegativeFloat,
  language.model.invalidPositiveFloat,
  language.model.inputDownTimeCVInfo1,
  language.model.inputDownTimeCVInfo2,
  "NotNegativeFloat"
);

tilesExtAC.addSwitch(
  language.statistics.headingACCorrectionFactors,
  [language.statistics.CorrectionFactorKLB,language.statistics.CorrectionFactorH],
  ["KLB","Hanschke"],
  language.statistics.headingACCorrectionFactorsInfo1,
  language.statistics.headingACCorrectionFactorsInfo2
)

function factorial(n) {
  let result=1;
  for (let i=2;i<=n;i++) result*=i;
  return result;
}

function powerFactorial(a, c) {
	/* a^c/c! */
	let result=1;
	for (let i=1;i<=c;i++) result*=(a/i);
	return result;
}

function calcExtAC(input) {
  const result={};

  result.EI=input[0];
  result.CVI=input[1];
  result.bI=input[2];
  result.ES=input[3];
  result.CVS=input[4];
  result.bS=input[5];
  result.c=input[6];
  result.PUp=Math.min(1,input[7]);
  result.EDt=input[8];
  result.CVDt=input[9];

  const useKLB=input[10][0];
  const useHanschke=input[10][1];

	/*
	 * Rechnungen sind mit
	 * Hanschke: "Approximations for the mean queue length of the GIX/G(b,b)/c queue" abgeglichen.
	 */

	const lambda=(1/result.EI)*result.bI; /* Umrechnung von Arrival-Batches auf einzelne Kunden */
  const mu=1/result.ES*result.PUp;

	result.a=lambda/mu/result.bS;
	result.rho=lambda/mu/(result.bS*result.c);

  if (result.rho<1) {
	  const scvI=result.CVI**2;
	  const scvS=result.CVS**2;

	  /*
	  PC1=(c*rho)^c/(c!(1-rho));
	  PC=PC1/(PC1+sum(k=0...c-1; (c*rho)^k/k!))
	  E[NQ]=rho/(1-rho)*PC*(bI*SCV[I]+bS*SCV[S])/2+(bI-1)/2+(bS-1)/2
	  E[N]=E[NQ]+bS*c*rho
	  */

	  const PC1=powerFactorial(result.c*result.rho,result.c)/(1-result.rho);
    let PC=0; for(let i=0;i<=result.c-1;i++) PC+=powerFactorial(result.c*result.rho,i);
	  PC=PC1/(PC1+PC);

    const scvScompl=scvS+result.PUp*(1-result.PUp)*result.EDt*(1+result.CVDt**2)*mu;

	  let KLB=1; /* W. Kraemer, M. Langenbach-Belz, Approximate formulae for the delay in the queueing system G/G/1. in: Proceedings of the Eighth International Teletraffic Congress, Melbourne, 1976, pp. 235.1–235.8. */
	  if (useKLB) {
	  	const scvIstar=result.bI/result.bS*scvI;
	  	if (scvIstar<=1) {
	  		KLB=Math.exp(-2/3*(1-result.rho)/PC*Math.pow(1-scvIstar,2)/(scvIstar+scvScompl));
	  	} else {
	  		KLB=Math.exp(-(1-result.rho)*(scvIstar-1)/(scvIstar+4*scvScompl));
	  	}
      result.KLB=KLB;
	  }

	  let H=0; /* Th. Hanschke, Approximations for the mean queue length of the GIX/G(b,b)/c queue. in: Operations Research Letters 34 (2006) 205 – 213. */
	  if (useHanschke) {
	    H=Math.max(result.bI-result.bS*result.c,0)*result.rho/2;
      result.H=H;
	  }

	  result.ENQ=result.rho/(1-result.rho)*PC*(result.bI*scvI+result.bS*scvScompl)/2*KLB+(result.bI-1)/2+(result.bS-1)/2+H;
    const EB=result.c*result.bS*result.rho;
    result.EN=result.ENQ+EB;
    result.EV=result.EN/lambda;
    const EC=1/mu;
    result.EW=result.EV-EC;
    result.ENS=result.EN-result.ENQ;
    result.EWErlangC=ErlangC_EW(1/result.EI*result.bI,1/result.ES*result.bS,result.c);
    result.ENQErlangC=ErlangC_ENQ(1/result.EI*result.bI,1/result.ES*result.bS,result.c);
  } else {
    result.EW=null;
    result.EV=null;
    result.ENQ=null;
    result.EN=null;
    result.ENS=null;
    result.EWErlangC=null;
    result.ENQErlangC=null;
  }

  return result;
}

function calcExtACTable(mode) {
  const input=tilesExtAC.rangeValues(mode);
  if (input==null) return null;

  let table=new Table();

  table.addHeading('E[I]');
  table.addHeading('CV[I]');
  table.addHeading('b(I)');
  table.addHeading('E[S]');
  table.addHeading('CV[S]');
  table.addHeading('b(S)');
  table.addHeading('c');
  table.addHeading('P(Up)');
  table.addHeading('E[Dt]');
  table.addHeading('CV[Dt]');
  table.addHeading('a');
  table.addHeading('&rho;');
  table.addHeading('E[W]');
  table.addHeading('E[V]');
  table.addHeading('E[N<sub>Q</sub>]');
  table.addHeading('E[N<sub>S</sub>]');
  table.addHeading('E[N]');

  table.calc(input,function(table,input) {
    const data=calcExtAC(input);
    table.addCol(data.EI);
    table.addCol(data.CVI);
    table.addCol(data.bI);
    table.addCol(data.ES);
    table.addCol(data.CVS);
    table.addCol(data.bS);
    table.addCol(data.c);
    table.addColPercent(data.PUp);
    table.addCol(data.EDt);
    table.addCol(data.CVDt);
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

/* Einzelwerte */

function updateExtACValues() {
  const input=tilesExtAC.valuesValues;
  if (input==null) return;
  const data=calcExtAC(input);

  let result='';
  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";

  let infoBI='';
  if (data.bI>1) infoBI=', '+language.statistics.BatchArrivalInfo1+': '+(data.EI/data.bI).toLocaleString();
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+infoBI+")</small><br>\n";
  if (data.CVI!=1) result+=language.model.inputInterArrivalTimeCV+': <b>CV[I]='+data.CVI.toLocaleString()+"</b><br>\n";
  if (data.bI>1) result+=language.statistics.BatchArrivalInfo2+': <b>b(I)='+data.bI+"</b><br>\n";

  let infoBS='';
  if (data.bS>1) infoBS=', '+language.statistics.BatchServiceInfo1+': '+(data.ES/data.bS).toLocaleString();
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+infoBS+")</small><br>\n";
  if (data.CVS!=1) result+=language.model.inputServiceTimeCV+': <b>CV[S]='+data.CVS.toLocaleString()+"</b><br>\n";
  if (data.bS>1) result+=language.statistics.BatchServiceInfo2+': <b>b(S)='+data.bS+"</b><br>\n";

  result+=language.statistics.NumberOfOperators+': <b>c='+data.c+"</b><br>\n";
  if (data.PUp<1) {
    result+=language.statistics.AvailabilityProbability+": <b>P(Up)="+(data.PUp*100).toLocaleString()+"%</b><br>\n";
    if (data.EDt>0) result+=language.statistics.DownTimeMean+": <b>E[Dt]="+data.EDt.toLocaleString()+"</b><br>\n";
    if (data.EDt>0 && data.CVDt!=1) result+=language.statistics.DownTimeCV+": <b>E[Dt]="+data.CVDt.toLocaleString()+"</b><br>\n";
  }

  result+="</p>\n";

  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingACResults+"</h5>\n";
  result+="<p>\n";
  if (data.rho>=1) {
      result+=language.statistics.rhoError;
  } else {
      result+=language.statistics.averageWaitingTime+": <b>E[W]="+data.EW.toLocaleString()+"</b> <small>("+language.statistics.ErlangCCompare2+": "+data.EWErlangC.toLocaleString()+")</small><br>\n";
      result+=language.statistics.averageResidenceTime+": <b>E[V]="+data.EV.toLocaleString()+"</b> <small>(=E[W]+E[S])</small><br>\n";
      result+=language.statistics.flowFactor+": <b>E[V]/E[S]="+(data.EV/data.ES).toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b> <small>("+language.statistics.ErlangCCompare2+": "+data.ENQErlangC.toLocaleString()+")</small><br>\n";
      result+=language.statistics.averageNS+": <b>E[N<sub>S</sub>]="+data.ENS.toLocaleString()+"</b><br>\n";
      result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b> <small>(=E[N<sub>Q</sub>]+E[N<sub>S</sub>])</small><br>\n";
  }
  result+="</p>\n";

  if (typeof(data.KLB)!='undefined' || typeof(data.H)!='undefined') {
    result+="<h5>"+language.statistics.headingACCorrectionFactors+"</h5>\n";
    result+="<p>\n";
    if (typeof(data.KLB)!='undefined') result+=language.statistics.CorrectionFactorKLB+"="+data.KLB.toLocaleString();
    if (typeof(data.KLB)!='undefined' && typeof(data.H)!='undefined') result+="<br>";
    if (typeof(data.H)!='undefined') result+=language.statistics.CorrectionFactorH+"="+data.H.toLocaleString();
    result+="</p>\n";
  }

  document.getElementById('ExtACValues_results').innerHTML=result;
}

/* Tabelle */

function changeTabExtACTable(sender) {
  tilesExtAC.updateTabs(sender,'Table');
  updateExtACTable();
}

function updateExtACTable() {
  let table=calcExtACTable('Table');
  if (table!=null) {
    globalThis["ExtACTableData"]=table.text;
    const html=table.html+"<p><button type='button' class='btn btn-primary bi-clipboard' onclick='navigator.clipboard.writeText(globalThis.ExtACTableData);'> "+language.GUI.copyTable+"</button></p>";
    document.getElementById('ExtACTable_results').innerHTML=html;
  }
}

/* Diagramm */

function changeTabExtACDiagram(sender) {
  tilesExtAC.updateTabs(sender,'Diagram');
  updateExtACDiagram();
}

function updateExtACDiagram() {
  const table=calcExtACTable('Diagram');
  if (table==null) return;

  let xAxisTitle='';
  switch (table.xValuesCol) {
    case 0: xAxisTitle='E[I] ('+language.statistics.unitTime+')'; break;
    case 1: xAxisTitle='CV[I]'; break;
    case 2: xAxisTitle='b(I)'; break;
    case 3: xAxisTitle='E[S] ('+language.statistics.unitTime+')'; break;
    case 4: xAxisTitle='CV[S]'; break;
    case 5: xAxisTitle='b(S)'; break;
    case 6: xAxisTitle='c ('+language.statistics.unitNumber+')'; break;
    case 7: xAxisTitle='P(Up) ('+language.statistics.unitFraction+')'; break;
    case 8: xAxisTitle='E[Dt] ('+language.statistics.unitTime+')'; break;
    case 9:  xAxisTitle='CV[Dt]'; break;
  }

  const ySetup=[
    {columnIndex: 6+6, color: 'red', mode: 'time'}, /* E[W] */
    {columnIndex: 6+7, color: 'green', mode: 'time'}, /* E[V] */
    {columnIndex: 6+8, color: 'orange', mode: 'number'}, /* E[NQ] */
    {columnIndex: 6+10, color: 'blue', mode: 'number'}, /* E[N] */
    {columnIndex: 6+5, color: 'gray', mode: 'percent'}, /* rho */
  ];

  table.diagram('ExtACDiagram_results',table.xValuesCol,xAxisTitle,ySetup);
}

/* Allgemeine Vorbereitungen */

window.updateExtACValues=updateExtACValues;
window.updateExtACTable=updateExtACTable;
window.updateExtACDiagram=updateExtACDiagram;
window.changeTabExtACTable=changeTabExtACTable;
window.changeTabExtACDiagram=changeTabExtACDiagram;

function updateExtAC() {
  updateExtACValues();
  updateExtACTable();
  updateExtACDiagram();
}