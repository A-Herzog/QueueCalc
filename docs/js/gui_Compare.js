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

export {tilesCompare, updateCompare};

import {TilesBuilder} from './tools_gui.js';
import {language} from './Language.js';

const tilesCompare=new TilesBuilder('Compare');

tilesCompare.add(
  language.model.inputInterArrivalTimeMean,
  "E[I]",
  "EI",
  0.555555,
  0.1,
  1,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputInterArrivalTimeMeanInfo1,
  language.model.inputInterArrivalTimeMeanInfo2,
  "PositiveFloat"
);

tilesCompare.add(
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

tilesCompare.add(
  language.model.inputServiceTimeMean,
  "E[S]",
  "ES",
  1,
  0.1,
  2,
  language.model.invalidPositiveFloat,
  language.model.invalidPositiveFloat,
  language.model.inputServiceTimeMeanInfo1,
  language.model.inputServiceTimeMeanInfo2,
  "PositiveFloat"
);

tilesCompare.add(
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

function factorial(n) {
  let result=1;
  for (let i=2;i<=n;i++) result*=i;
  return result;
}

function calcAC(lambda, mu, CVI, CVS, bS, c) {
  const result={};

  const a=lambda/mu;
  const rho=a/c/bS;

  const SCVI=CVI**2;
  const SCVS=CVS**2;

  let PCx=(a/bS)**c/(factorial(c)*(1-rho));
  let sum=0;
  for (let k=0;k<=c-1;k++) sum+=(a/bS)**k/factorial(k);
  let PC=PCx/(PCx+sum);

  result.ENQ=rho/(1-rho)*PC*(SCVI+bS*SCVS)/2+(bS-1)/2;
  const EB=c*bS*rho;
  result.EN=result.ENQ+EB;
  result.EV=result.EN/lambda;
  const EC=1/mu;
  result.EW=result.EV-EC;
  result.ENS=result.EN-result.ENQ;

  return result;
}

function calcCompare(input) {
  const result={};

  result.EI=input[0];
  result.CVI=input[1];
  result.ES=input[2];
  result.CVS=input[3];

  const lambda=1/result.EI;
  const mu=1/result.ES;
  result.a=lambda/mu;
  result.rho=result.a/2;

  if (result.rho<1) {
    result.common=calcAC(lambda,mu,result.CVI,result.CVS,1,2);
    result.separate=calcAC(lambda/2,mu,result.CVI,result.CVS,1,1);
    result.separate.ENQ*=2;
    result.separate.EN*=2;
    result.batch=calcAC(lambda,mu,result.CVI,result.CVS,2,1);
    result.fast=calcAC(lambda,mu*2,result.CVI,result.CVS,1,1);
  }
  return result;
}

/* Einzelwerte */

function getRank(obj, all, property) {
  const list=all.map(record=>record[property]);
  list.sort((a,b)=>a-b);
  return list.indexOf(obj[property])+1;
}

function getModelResults(data, all) {
  let result="";
  const rankW=getRank(data,all,"EW");
  const rankV=getRank(data,all,"EV");
  result+=language.statistics.averageWaitingTime+": <b>E[W]="+data.EW.toLocaleString()+"</b> <small>("+rankW+". "+language.statistics.headingCompareResultsRank+")</small><br>\n";
  result+=language.statistics.averageResidenceTime+": <b>E[V]="+data.EV.toLocaleString()+"</b> <small>("+rankV+". "+language.statistics.headingCompareResultsRank+")</small><br>\n";
  result+=language.statistics.averageNQ+": <b>E[N<sub>Q</sub>]="+data.ENQ.toLocaleString()+"</b><br>\n";
  result+=language.statistics.averageN+": <b>E[N]="+data.EN.toLocaleString()+"</b><br>\n";
  return result;
}

function updateCompareValues() {
  const input=tilesCompare.valuesValues;
  if (input==null) return;
  const data=calcCompare(input);

  let result='';

  result+="<h5>"+language.statistics.headingInputParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.arrivalRate+': <b>&lambda;='+(1/data.EI).toLocaleString()+"</b> <small>("+language.statistics.arrivalRateInfo+" E[I]="+data.EI.toLocaleString()+")</small><br>\n";
  if (data.CVI!=1) result+=language.model.inputInterArrivalTimeCV+': <b>CV[I]='+data.CVI.toLocaleString()+"</b><br>\n";
  result+=language.statistics.serviceRate+': <b>&mu;='+(1/data.ES).toLocaleString()+"</b> <small>("+language.statistics.serviceRateInfo+" E[S]="+data.ES.toLocaleString()+")</small><br>\n";
  if (data.CVS!=1) result+=language.model.inputServiceTimeCV+': <b>CV[S]='+data.CVS.toLocaleString()+"</b><br>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingDirectCalculableParameters+"</h5>\n";
  result+="<p>\n";
  result+=language.statistics.Workload+": <b>a="+data.a.toLocaleString()+" "+language.statistics.WorkloadErlang+"</b><br>\n";
  result+=language.statistics.Utilization+": <b>&rho;="+(data.rho*100).toLocaleString()+"%</b>\n";
  result+="</p>\n";

  result+="<h5>"+language.statistics.headingCompareResults+"</h5>\n";
  result+="<p>\n";
  if (data.rho>=1) {
      result+=language.statistics.rhoError;
  } else {
    const all=[data.common,data.separate,data.batch,data.fast];
    result+="<b>"+language.statistics.compere.common+"</b><br>";
    result+=getModelResults(data.common,all);
    result+="<b>"+language.statistics.compere.separate+"</b><br>";
    result+=getModelResults(data.separate,all);
    result+="<b>"+language.statistics.compere.batch+"</b><br>";
    result+=getModelResults(data.batch,all);
    result+="<b>"+language.statistics.compere.fast+"</b><br>";
    result+=getModelResults(data.fast,all);
  }
  result+="</p>\n";

  document.getElementById('CompareValues_results').innerHTML=result;
}

/* Allgemeine Vorbereitungen */

window.updateCompareValues=updateCompareValues;

function updateCompare() {
  updateCompareValues();
}