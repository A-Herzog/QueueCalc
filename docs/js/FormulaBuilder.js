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

export {formulasErlangB, formulasErlangC, formulasExtErlangC, formulasPC, formulasKingman, formulasAC, formulasExtAC, formulasCompare, formulasShortestQueue}

import {language} from './Language.js';

const mathStart="<p><math>";
const mathEnd="</math></p>";

const symLambda="<mi>&lambda;</mi>";
const symMu="<mi>&mu;</mi>";
const symRho="<mi>&rho;</mi>";
const symNu="<mi>&nu;</mi>";
const symI="<mi>I</mi>";
const symS="<mi>S</mi>";
const symW="<mi>W</mi>";
const symV="<mi>V</mi>";
const symNQ="<msub><mi>N</mi><mi>Q</mi></msub>";
const symNS="<msub><mi>N</mi><mi>S</mi></msub>";
const symN="<mi>N</mi>";
const syma="<mi>a</mi>";
const symb="<mi>b</mi>";
const symc="<mi>c</mi>";
const symk="<mi>k</mi>";
const symi="<mi>i</mi>";
const symn="<mi>n</mi>";
const symp="<mi>p</mi>";
const symt="<mi>t</mi>";
const symA="<mi>A</mi>";
const symC="<mi>C</mi>";
const symK="<mi>K</mi>";
const symP="<mi>P</mi>";
const symComma="<mtext>,&nbsp;&nbsp;&nbsp;</mtext>";
const symFor="<mtext>&nbsp;"+language.statistics.for+"&nbsp;</mtext>";

const opFact="<mo>!</mo>";

const num0="<mn>0</mn>";
const num1="<mn>1</mn>";
const num2="<mn>2</mn>";
const num3="<mn>3</mn>";
const num4="<mn>4</mn>";

const equals="<mo>=</mo>";
const approx="<mo>&approx;</mo>";
const plus="<mo>+</mo>";
const minus="<mo>-</mo>";
const mul="<mo>&middot;</mo>";
const sup=(x,y)=>"<msup><mrow>"+x+"</mrow><mrow>"+y+"</mrow></msup>";
const sub=(x,y)=>"<msub><mrow>"+x+"</mrow><mrow>"+y+"</mrow></msub>";
const sum=(x,y)=>"<msubsup><mo>&sum;</mo><mrow>"+x+"</mrow><mrow>"+y+"</mrow></msubsup>";
const prod=(x,y)=>"<msubsup><mo>&prod;</mo><mrow>"+x+"</mrow><mrow>"+y+"</mrow></msubsup>";

const symP1=sub("<mi>P</mi>",num1);

const frac=(x,y)=>'<mfrac><mrow>'+x+'</mrow><mrow>'+y+'</mrow></mfrac>';
const binom=(x,y)=>'<mo>(</mo><mfrac linethickness="0"><mrow>'+x+'</mrow><mrow>'+y+'</mrow></mfrac><mo>)</mo>';
const sqrt=(x)=>'<msqrt><mrow>'+x+'</mrow></msqrt>';

const funcE=x=>'<mi mathvariant="normal">E</mi><mo>[</mo><mrow>'+x+'</mrow><mo>]</mo>';
const funcCV=x=>'<mi mathvariant="normal">CV</mi><mo>[</mo><mrow>'+x+'</mrow><mo>]</mo>';
const funcSCV=x=>'<mi mathvariant="normal">SCV</mi><mo>[</mo><mrow>'+x+'</mrow><mo>]</mo>';
const funcVar=x=>'<mi mathvariant="normal">Var</mi><mo>[</mo><mrow>'+x+'</mrow><mo>]</mo>';
const funcP=x=>'<mi mathvariant="normal">P</mi><mo>(</mo><mrow>'+x+'</mrow><mo>)</mo>';
const funcQ=(x,y)=>'<mi>Q</mi><mo>(</mo><mrow>'+x+'</mrow><mo>,</mo><mrow>'+y+'</mrow><mo>)</mo>';
const funcExp=x=>'<msup><mi mathvariant="normal">e</mi><mrow>'+x+'</mrow></msup>';
const funcExpFunc=x=>'<mi mathvariant="normal">exp</mi><mo>(</mo><mrow>'+x+'</mrow><mo>)</mo>';
const funcMax=(x,y)=>'<mi mathvariant="normal">max</mi><mo>(</mo><mrow>'+x+'</mrow><mo>,</mo><mrow>'+y+'</mrow><mo>)</mo>';

const infoBlockLambdaMu=mathStart+symLambda+equals+frac(num1,funcE(symI))+symComma+symMu+equals+frac(num1,funcE(symS))+mathEnd;
const infoBlockWorkLoad=mathStart+syma+equals+frac(symLambda,symMu)+mathEnd;
const infoBlockUtilization=mathStart+symRho+equals+frac(symLambda,symc+mul+symMu)+mathEnd;



/** Erlang B formulas as MathML */
let formulasErlangB="";

formulasErlangB+=language.statistics.arrivalAnsServiceRate+":";
formulasErlangB+=infoBlockLambdaMu;

formulasErlangB+=language.statistics.Workload+":";
formulasErlangB+=infoBlockWorkLoad;

formulasErlangB+=language.statistics.rejectionProbability+":";
formulasErlangB+=mathStart;
formulasErlangB+=funcP("<mi mathvariant='normal'>reject</mi>")+equals;
formulasErlangB+=frac(
  frac(sup(syma,symc),symc+opFact),
  sum(symn+equals+num0,symc)+frac(sup(syma,symn),symn+opFact)
);
formulasErlangB+=mathEnd;

formulasErlangB+=language.statistics.Utilization+":";
formulasErlangB+=mathStart;
formulasErlangB+=symRho+equals;
formulasErlangB+=frac(
    symLambda+"<mo>(</mo>"+num1+minus+funcP("<mi mathvariant='normal'>reject</mi>")+"<mo>)</mo>",
    symc+mul+symMu
);
formulasErlangB+=mathEnd;



/** Erlang C formulas as MathML */
let formulasErlangC="";

formulasErlangC+=language.statistics.arrivalAnsServiceRate+":";
formulasErlangC+=infoBlockLambdaMu;

formulasErlangC+=language.statistics.Workload+":";
formulasErlangC+=infoBlockWorkLoad;

formulasErlangC+=language.statistics.Utilization+":";
formulasErlangC+=infoBlockUtilization;

formulasErlangC+=language.statistics.WaitingTimeDistribution+":";
formulasErlangC+=mathStart;
formulasErlangC+=symP1+equals;
formulasErlangC+=frac(
  frac(sup(syma,symc)+mul+symc,symc+opFact+"<mo>(</mo>"+symc+minus+syma+"<mo>)</mo>"),
  sum(symn+equals+num0,symc+minus+num1)+frac(sup(syma,symn),symn+opFact)+plus+frac(sup(syma,symc)+mul+symc,symc+opFact+"<mo>(</mo>"+symc+minus+syma+"<mo>)</mo>")
);
formulasErlangC+=mathEnd;
formulasErlangC+=mathStart;
formulasErlangC+=funcP(symW+"<mo>&le;</mo>"+symt)+equals;
formulasErlangC+=num1+minus+symP1+funcExp(minus+"<mo>(</mo>"+symc+minus+syma+"<mo>)</mo>"+symMu+symt);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageNQ+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symNQ)+equals;
formulasErlangC+=symP1+mul+frac(syma,symc+minus+syma);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageNS+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symNS)+equals;
formulasErlangC+=syma;
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageN+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symN)+equals;
formulasErlangC+=symP1+mul+frac(syma,symc+minus+syma)+plus+syma;
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageWaitingTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symW)+equals;
formulasErlangC+=symP1+mul+frac(num1,symc+symMu+minus+symLambda);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.variationWaitingTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcVar(symW)+equals;
formulasErlangC+=frac(num2+mul+symP1+minus+sup(symP1,num2),sup("<mo>(</mo>"+symc+mul+symMu+minus+symLambda+"<mo>)</mo>",num2));
formulasErlangC+=mathEnd;
formulasErlangC+=mathStart;
formulasErlangC+=funcCV(symW)+equals;
formulasErlangC+=sqrt(frac(num2,symP1)+minus+num1);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageResidenceTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symV)+equals;
formulasErlangC+=symP1+mul+frac(num1,symc+symMu+minus+symLambda)+plus+frac(num1,symMu);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.variationResidenceTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcVar(symV)+equals;
formulasErlangC+=frac(num2+mul+symP1+minus+sup(symP1,num2),sup("<mo>(</mo>"+symc+mul+symMu+minus+symLambda+"<mo>)</mo>",num2));
formulasErlangC+=plus+funcVar(symS);
formulasErlangC+=mathEnd;
formulasErlangC+=mathStart;
formulasErlangC+=funcCV(symV)+equals;
formulasErlangC+=frac(sqrt(num2+mul+symP1+minus+sup(symP1,num2)+plus+sup("<mo>(</mo>"+symc+mul+symMu+minus+symLambda+"<mo>)</mo>",num2)+funcVar(symS)),symP1+plus+"<mo>(</mo>"+symc+mul+symMu+minus+symLambda+"<mo>)</mo>"+funcE(symS));
formulasErlangC+=mathEnd;

formulasErlangC+="<p><b>"+language.statistics.SpecialCase+" c=1:</b></p>";

formulasErlangC+=language.statistics.Utilization+":";
formulasErlangC+=mathStart;
formulasErlangC+=symRho+equals+syma;
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.WaitingTimeDistribution+":";
formulasErlangC+=mathStart;
formulasErlangC+=symP1+equals+syma;
formulasErlangC+=mathEnd;
formulasErlangC+=mathStart;
formulasErlangC+=funcP(symW+"<mo>&le;</mo>"+symt)+equals;
formulasErlangC+=num1+minus+syma+funcExp("<mo>(</mo>"+syma+minus+num1+"<mo>)</mo>"+symMu+symt);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageNQ+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symNQ)+equals;
formulasErlangC+=frac(sup(syma,num2),num1+minus+syma);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.variationNQ+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcVar(symNQ)+equals;
formulasErlangC+=frac(sup(syma,num2)+mul+"<mo>(</mo>"+num1+plus+syma+minus+sup(syma,num2)+"<mo>)</mo>",sup("<mo>(</mo>"+num1+minus+syma+"<mo>)</mo>",num2));
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageNS+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symNS)+equals;
formulasErlangC+=syma;
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageN+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symN)+equals;
formulasErlangC+=frac(syma,num1+minus+syma);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.variationN+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcVar(symN)+equals;
formulasErlangC+=frac(syma,sup("<mo>(</mo>"+num1+minus+syma+"<mo>)</mo>",num2));
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageWaitingTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symW)+equals;
formulasErlangC+=frac(syma,symMu+"<mo>(</mo>"+num1+minus+syma+"<mo>)</mo>");
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.variationWaitingTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcVar(symW)+equals;
formulasErlangC+=frac(num2+mul+syma+minus+sup(syma,num2),sup("<mo>(</mo>"+symMu+minus+symLambda+"<mo>)</mo>",num2));
formulasErlangC+=mathEnd;
formulasErlangC+=mathStart;
formulasErlangC+=funcCV(symW)+equals;
formulasErlangC+=sqrt(frac(num2,syma)+minus+num1);
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.averageResidenceTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcE(symV)+equals;
formulasErlangC+=frac(num1,symMu+"<mo>(</mo>"+num1+minus+syma+"<mo>)</mo>");
formulasErlangC+=mathEnd;

formulasErlangC+=language.statistics.variationResidenceTime+":";
formulasErlangC+=mathStart;
formulasErlangC+=funcVar(symV)+equals;
formulasErlangC+=frac(num2+mul+syma+minus+sup(syma,num2),sup("<mo>(</mo>"+symMu+minus+symLambda+"<mo>)</mo>",num2));
formulasErlangC+=plus+funcVar(symS);
formulasErlangC+=mathEnd;
formulasErlangC+=mathStart;
formulasErlangC+=funcCV(symV)+equals;
formulasErlangC+=frac(sqrt(num2+mul+syma+minus+sup(syma,num2)+plus+sup("<mo>(</mo>"+symMu+minus+symLambda+"<mo>)</mo>",num2)+funcVar(symS)),syma+plus+"<mo>(</mo>"+symMu+minus+symLambda+"<mo>)</mo>"+funcE(symS));
formulasErlangC+=mathEnd;



/** Extended Erlang C formulas as MathML */
let formulasExtErlangC="";

formulasExtErlangC+=language.statistics.arrivalAnsServiceRate+":";
formulasExtErlangC+=infoBlockLambdaMu;

formulasExtErlangC+=language.statistics.Workload+":";
formulasExtErlangC+=infoBlockWorkLoad;

formulasExtErlangC+=language.statistics.auxiliaryFormulas+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symC,symn)+equals;
formulasExtErlangC+=frac(sup(syma,symn),symn+opFact)
formulasExtErlangC+=symFor+symn+"<mo>&le;</mo>"+symc;
formulasExtErlangC+=symComma;
formulasExtErlangC+=sub(symC,symn)+equals;
formulasExtErlangC+=frac(sup(symLambda,symn),symc+opFact+sup(symMu,symc)+prod(symi+equals+num1,symn+minus+symc)+"<mo>(</mo>"+symc+symMu+plus+symi+symNu+"<mo>)</mo>");
formulasExtErlangC+=symFor+symc+"<mo>&lt;</mo>"+symn+"<mo>&le;</mo>"+symK;
formulasExtErlangC+=mathEnd;
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symp,num0)+equals;
formulasExtErlangC+=sup("<mo>(</mo>"+sum(symi+equals+num0,symK)+sub(symC,symi)+"<mo>)</mo>",minus+num1);
formulasExtErlangC+=mathEnd;
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symp,symn)+equals;
formulasExtErlangC+=sub(symC,symn)+sub(symp,num0);
formulasExtErlangC+=symFor+symn+"<mo>&gt;</mo>"+num0;
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.WaitingTimeDistribution+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcP(symW+"<mo>&le;</mo>"+symt)+equals;
formulasExtErlangC+=num1+minus+sub(symC,symK)+sub(symp,num0)+minus+sub(symp,num0)+mul;
formulasExtErlangC+=sum(symn+equals+symc,symK+minus+num1)+sub(symC,symn)+funcQ(symn+minus+symc,"<mo>(</mo>"+symc+symMu+plus+symNu+"<mo>)</mo>"+symt);
formulasExtErlangC+=mathEnd;
formulasExtErlangC+="<p>("+language.statistics.WaitingTimeDistributionInfo+")</p>";

formulasExtErlangC+=language.statistics.waitingProbability+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcP(symW+"<mo>&gt;</mo>"+num0)+equals;
formulasExtErlangC+=sub(symp,num0)+mul+sum(symn+equals+symc,symK)+sub(symC,symn);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.blockingProbability+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symp,symK)+equals+funcP(symN+equals+symK)+equals;
formulasExtErlangC+=sub(symC,symK)+sub(symp,num0);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.emptySystemProbability
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symp,num0)+equals+funcP(symN+equals+num0)+equals;
formulasExtErlangC+=sup("<mo>(</mo>"+sum(symi+equals+num0,symK)+sub(symC,symi)+"<mo>)</mo>",minus+num1);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.waitingCancelationProbability+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcP(symA)+equals;
formulasExtErlangC+=sub(symp,num0)+mul+sum(symn+equals+symc+plus+num1,symK)+frac(symNu,symLambda)+"<mo>(</mo>"+symn+minus+symc+"<mo>)</mo>"+sub(symC,symn);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.arrivalRateNet+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symLambda,"<mtext>net</mtext")+equals;
formulasExtErlangC+=symLambda+mul+"<mo>(</mo>"+num1+minus+sub(symp,symK)+"<mo>)</mo>"+mul+"<mo>(</mo>"+num1+minus+funcP(symA)+"<mo>)</mo>";
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.UtilizationNet+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=sub(symRho,"<mtext>net</mtext")+equals;
formulasExtErlangC+=frac(sub(symLambda,"<mtext>net</mtext"),symc+symMu);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.averageNQ+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcE(symNQ)+equals;
formulasExtErlangC+=sub(symp,num0)+mul+sum(symn+equals+symc+plus+num1,symK)+"<mo>(</mo>"+symn+minus+symc+"<mo>)</mo>"+sub(symC,symn);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.averageNS+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcE(symNS)+equals;
formulasExtErlangC+=frac(sub(symLambda,"<mtext>net</mtext"),symMu);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.averageN+":";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcE(symN)+equals;
formulasExtErlangC+=sub(symp,num0)+mul+sum(symn+equals+num1,symK)+symn+sub(symC,symn);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.averageWaitingTime+" ("+language.statistics.SuccessAndCanceled+"):";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcE(symW)+equals;
formulasExtErlangC+=frac(sub(symp,num0),symLambda)+mul+sum(symn+equals+symc+plus+num1,symK)+"<mo>(</mo>"+symn+minus+symc+"<mo>)</mo>"+sub(symC,symn);
formulasExtErlangC+=mathEnd;

formulasExtErlangC+=language.statistics.averageResidenceTime+" ("+language.statistics.SuccessAndCanceled+"):";
formulasExtErlangC+=mathStart;
formulasExtErlangC+=funcE(symV)+equals;
formulasExtErlangC+=frac(sub(symp,num0),symLambda)+mul+sum(symn+equals+num1,symK)+symn+sub(symC,symn);
formulasExtErlangC+=mathEnd;



/** Pollaczek-Chintschin formulas as MathML */
let formulasPC="";

formulasPC+=language.statistics.arrivalAnsServiceRate+":";
formulasPC+=infoBlockLambdaMu;

formulasPC+=language.statistics.Workload+":";
formulasPC+=infoBlockWorkLoad;

formulasPC+=language.statistics.Utilization+":";
formulasPC+=mathStart+symRho+equals+syma+mathEnd;

formulasPC+=language.statistics.conversion+":";
formulasPC+=mathStart+funcVar(symS)+equals+sup("<mo>(</mo>"+funcCV(symS)+mul+funcE(symS)+"<mo>)</mo>",num2)+mathEnd;

formulasPC+=language.statistics.averageNQ+":";
formulasPC+=mathStart;
formulasPC+=funcE(symNQ)+equals;
formulasPC+=frac(sup(symRho,num2)+plus+sup(symLambda,num2)+mul+funcVar(symS),num2+"<mo>(</mo>"+num1+minus+symRho+"<mo>)</mo>");
formulasPC+=mathEnd;

formulasPC+=language.statistics.averageN+":";
formulasPC+=mathStart;
formulasPC+=funcE(symN)+equals;
formulasPC+=frac(sup(symRho,num2)+plus+sup(symLambda,num2)+mul+funcVar(symS),num2+"<mo>(</mo>"+num1+minus+symRho+"<mo>)</mo>")+plus+symRho;
formulasPC+=mathEnd;

formulasPC+=language.statistics.averageWaitingTime+":";
formulasPC+=mathStart;
formulasPC+=funcE(symW)+equals;
formulasPC+=frac(sup(symRho,num2)+plus+sup(symLambda,num2)+mul+funcVar(symS),num2+symLambda+"<mo>(</mo>"+num1+minus+symRho+"<mo>)</mo>");
formulasPC+=mathEnd;

formulasPC+=language.statistics.averageResidenceTime+":";
formulasPC+=mathStart;
formulasPC+=funcE(symV)+equals;
formulasPC+=frac(sup(symRho,num2)+plus+sup(symLambda,num2)+mul+funcVar(symS),num2+symLambda+"<mo>(</mo>"+num1+minus+symRho+"<mo>)</mo>")+plus+frac(num1,symMu);
formulasPC+=mathEnd;



/** Kingman approximation formulas as MathML */
let formulasKingman="";

formulasKingman+=language.statistics.arrivalAnsServiceRate+":";
formulasKingman+=infoBlockLambdaMu;

formulasKingman+=language.statistics.Workload+":";
formulasKingman+=infoBlockWorkLoad;

formulasKingman+=language.statistics.Utilization+":";
formulasKingman+=mathStart;
formulasKingman+=symRho+equals+syma;
formulasKingman+=mathEnd;

formulasKingman+=language.statistics.auxiliaryFormula+":";
formulasKingman+=mathStart;
formulasKingman+=sub(funcE(symNQ),"<mtext>M/M/1</mtext>")+equals;
formulasKingman+=frac(sup(symRho,num2),num1+minus+symRho);
formulasKingman+=mathEnd;

formulasKingman+=language.statistics.averageNQ+":";
formulasKingman+=mathStart;
formulasKingman+=funcE(symNQ)+approx;
formulasKingman+=sub(funcE(symNQ),"<mtext>M/M/1</mtext>")+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2);
formulasKingman+=equals+frac(symRho,num1+minus+symRho)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+mul+symRho;
formulasKingman+=mathEnd;

formulasKingman+=language.statistics.averageNS+":";
formulasKingman+=mathStart;
formulasKingman+=funcE(symNS)+equals;
formulasKingman+=syma;
formulasKingman+=mathEnd;

formulasKingman+=language.statistics.averageN+":";
formulasKingman+=mathStart;
formulasKingman+=funcE(symN)+approx;
formulasKingman+=sub(funcE(symNQ),"<mtext>M/M/1</mtext>")+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+plus+syma;
formulasKingman+=equals+frac(symRho,num1+minus+symRho)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+mul+symRho+plus+syma;
formulasKingman+=mathEnd;

formulasKingman+=language.statistics.averageWaitingTime+":";
formulasKingman+=mathStart;
formulasKingman+=funcE(symW)+approx;
formulasKingman+=sub(funcE(symNQ),"<mtext>M/M/1</mtext>")+mul+frac(num1,symLambda)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2);
formulasKingman+=equals+frac(symRho,num1+minus+symRho)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+mul+frac(num1,symMu);
formulasKingman+=mathEnd;

formulasKingman+=language.statistics.averageResidenceTime+":";
formulasKingman+=mathStart;
formulasKingman+=funcE(symV)+approx;
formulasKingman+=sub(funcE(symNQ),"<mtext>M/M/1</mtext>")+mul+frac(num1,symLambda)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+plus+frac(num1,symMu);
formulasKingman+=equals+frac(symRho,num1+minus+symRho)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+mul+frac(num1,symMu)+plus+frac(num1,symMu);
formulasKingman+=mathEnd;



/** Allen-Cunneen approximation formulas as MathML */
let formulasAC="";

formulasAC+=language.statistics.arrivalAnsServiceRate+":";
formulasAC+=infoBlockLambdaMu;

formulasAC+=language.statistics.Workload+":";
formulasAC+=infoBlockWorkLoad;

formulasAC+=language.statistics.Utilization+":";
formulasAC+=infoBlockUtilization;

formulasAC+=language.statistics.auxiliaryFormulas+":";
formulasAC+=mathStart;
formulasAC+=symP1+equals;
formulasAC+=frac(
  frac(sup(syma,symc)+mul+symc,symc+opFact+"<mo>(</mo>"+symc+minus+syma+"<mo>)</mo>"),
  sum(symn+equals+num0,symc+minus+num1)+frac(sup(syma,symn),symn+opFact)+plus+frac(sup(syma,symc)+mul+symc,symc+opFact+"<mo>(</mo>"+symc+minus+syma+"<mo>)</mo>")
);
formulasAC+=mathEnd;
formulasAC+=mathStart;
formulasAC+=sub(funcE(symNQ),"<mtext>M/M/c</mtext>")+equals;
formulasAC+=symP1+mul+frac(symRho,num1+minus+symRho);
formulasAC+=mathEnd;

formulasAC+=language.statistics.averageNQ+":";
formulasAC+=mathStart;
formulasAC+=funcE(symNQ)+approx;
formulasAC+=sub(funcE(symNQ),"<mtext>M/M/c</mtext>")+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2);
formulasAC+=mathEnd;

formulasAC+=language.statistics.averageNS+":";
formulasAC+=mathStart;
formulasAC+=funcE(symNS)+equals;
formulasAC+=syma;
formulasAC+=mathEnd;

formulasAC+=language.statistics.averageN+":";
formulasAC+=mathStart;
formulasAC+=funcE(symN)+approx;
formulasAC+=sub(funcE(symNQ),"<mtext>M/M/c</mtext>")+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+plus+syma;
formulasAC+=mathEnd;

formulasAC+=language.statistics.averageWaitingTime+":";
formulasAC+=mathStart;
formulasAC+=funcE(symW)+approx;
formulasAC+=sub(funcE(symNQ),"<mtext>M/M/c</mtext>")+mul+frac(num1,symLambda)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2);
formulasAC+=mathEnd;

formulasAC+=language.statistics.averageResidenceTime+":";
formulasAC+=mathStart;
formulasAC+=funcE(symV)+approx;
formulasAC+=sub(funcE(symNQ),"<mtext>M/M/c</mtext>")+mul+frac(num1,symLambda)+mul+frac(funcSCV(symI)+plus+funcSCV(symS),num2)+plus+frac(num1,symMu);
formulasAC+=mathEnd;



/** Extended Allen-Cunneen approximation formulas as MathML */
let formulasExtAC="";

formulasExtAC+=language.statistics.arrivalAnsServiceRate+":";
formulasExtAC+=mathStart;
formulasExtAC+=symLambda+equals+frac(sub(symb,symI),funcE(symI));
formulasExtAC+=symComma;
formulasExtAC+=symMu+equals+frac(sub(symP,"<mtext>Up</mtext>"),funcE(symS));
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.Workload+":";
formulasExtAC+=mathStart;
formulasExtAC+=syma+equals;
formulasExtAC+=frac(symLambda,symMu);
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.Utilization+":";
formulasExtAC+=mathStart;
formulasExtAC+=symRho+equals;
formulasExtAC+=frac(symLambda,symMu+mul+sub(symb,symS)+mul+symc);
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.auxiliaryFormulas+":";
formulasExtAC+=mathStart;
formulasExtAC+="<mi>PC1</mi>"+equals;
formulasExtAC+=frac(sup("<mo>(</mo>"+symc+symRho+"<mo>)</mo>",symc),symc+opFact+"<mo>(</mo>"+num1+minus+symRho+"<mo>)</mo>");
formulasExtAC+=mathEnd;
formulasExtAC+=mathStart;
formulasExtAC+="<mi>PC</mi>"+equals;
formulasExtAC+=frac("<mi>PC1</mi>","<mi>PC1</mi>"+plus+sum(symk+equals+num0,symc+minus+num1)+frac(sup("<mo>(</mo>"+symc+symRho+"<mo>)</mo>",symk),symk+opFact));
formulasExtAC+=mathEnd;
formulasExtAC+=mathStart;
formulasExtAC+=sub("<mi>SCV</mi>","<mtext>compl</mtext>")+equals;
formulasExtAC+=funcSCV(symS)+plus+sub(symP,"<mtext>Up</mtext>")+mul+"<mo>(</mo>"+num1+minus+sub(symP,"<mtext>Up</mtext>")+"<mo>)</mo>"+mul+funcE("<mi>Dt</mi>")+mul+"<mo>(</mo>"+num1+plus+funcSCV("<mi>Dt</mi>")+"<mo>)</mo>"+mul+symMu;
formulasExtAC+=mathEnd;

formulasExtAC+="W. Kraemer, M. Langenbach-Belz:";
formulasExtAC+=mathStart;
formulasExtAC+=funcSCV(sup(symI,"<mi>*</mi>"))+equals;
formulasExtAC+=frac(sub(symb,symI),sub(symb,symS))+mul+funcSCV(symI);
formulasExtAC+=mathEnd;
formulasExtAC+=mathStart;
formulasExtAC+="<mi>KLB</mi>"+equals;
formulasExtAC+=funcExpFunc(minus+frac(num2,num3)+mul+frac(num1+minus+symRho,"<mi>PC</mi>")+mul+frac(sup("<mo>(</mo>"+num1+minus+funcSCV(sup(symI,"<mi>*</mi>"))+"<mo>)</mo>",num2),funcSCV(sup(symI,"<mi>*</mi>"))+plus+sub("<mi>SCV</mi>","<mtext>compl</mtext>")));
formulasExtAC+=symFor+funcSCV(sup(symI,"<mi>*</mi>"))+"<mo>&le;</mo>"+num1;
formulasExtAC+=mathEnd;
formulasExtAC+=mathStart;
formulasExtAC+="<mi>KLB</mi>"+equals;
formulasExtAC+=funcExpFunc(minus+"<mo>(</mo>"+num1+minus+symRho+"<mo>)</mo>"+frac(funcSCV(sup(symI,"<mi>*</mi>"))+minus+num1,funcSCV(sup(symI,"<mi>*</mi>"))+plus+num4+mul+sub("<mi>SCV</mi>","<mtext>compl</mtext>")));
formulasExtAC+=symFor+funcSCV(sup(symI,"<mi>*</mi>"))+"<mo>&gt;</mo>"+num1;
formulasExtAC+=mathEnd;

formulasExtAC+="Th. Hanschke:";
formulasExtAC+=mathStart;
formulasExtAC+="<mi>H</mi>"+equals;
formulasExtAC+=funcMax(sub(symb,symI)+minus+sub(symb,symS)+mul+symc,num0)+mul+frac(symRho,num2);
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.averageNQ+":";
formulasExtAC+=mathStart;
formulasExtAC+=funcE(symNQ)+approx;
formulasExtAC+=frac(symRho,num1+minus+symRho)+mul+"<mi>PC</mi>"+mul;
formulasExtAC+=frac(sub(symb,symI)+mul+funcSCV(symI)+plus+sub(symb,symS)+mul+sub("<mi>SCV</mi>","<mtext>compl</mtext>"),2); /* +mul+"<mi>KLB</mi>"; */
formulasExtAC+=plus+frac(sub(symb,symI)+minus+num1,num2)+plus+frac(sub(symb,symS)+minus+num1,num2); /* +plus+"<mi>H</mi>"; */
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.averageNS+":";
formulasExtAC+=mathStart;
formulasExtAC+=funcE(symNS)+equals;
formulasExtAC+=syma;
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.averageN+":";
formulasExtAC+=mathStart;
formulasExtAC+=funcE(symN)+approx;
formulasExtAC+=frac(symRho,num1+minus+symRho)+mul+"<mi>PC</mi>"+mul;
formulasExtAC+=frac(sub(symb,symI)+mul+funcSCV(symI)+plus+sub(symb,symS)+mul+sub("<mi>SCV</mi>","<mtext>compl</mtext>"),2); /* +mul+"<mi>KLB</mi>"; */
formulasExtAC+=plus+frac(sub(symb,symI)+minus+num1,num2)+plus+frac(sub(symb,symS)+minus+num1,num2); /* +plus+"<mi>H</mi>"; */
formulasExtAC+=plus+syma;
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.averageWaitingTime+":";
formulasExtAC+=mathStart;
formulasExtAC+=funcE(symW)+approx;
formulasExtAC+="<mo>(</mo>";
formulasExtAC+=frac(symRho,num1+minus+symRho)+mul+"<mi>PC</mi>"+mul;
formulasExtAC+=frac(sub(symb,symI)+mul+funcSCV(symI)+plus+sub(symb,symS)+mul+sub("<mi>SCV</mi>","<mtext>compl</mtext>"),2); /* +mul+"<mi>KLB</mi>"; */
formulasExtAC+=plus+frac(sub(symb,symI)+minus+num1,num2)+plus+frac(sub(symb,symS)+minus+num1,num2); /* +plus+"<mi>H</mi>"; */
formulasExtAC+="<mo>)</mo>"+mul+frac(num1,symLambda);
formulasExtAC+=mathEnd;

formulasExtAC+=language.statistics.averageResidenceTime+":";
formulasExtAC+=mathStart;
formulasExtAC+=funcE(symV)+approx;
formulasExtAC+="<mo>(</mo>";
formulasExtAC+=frac(symRho,num1+minus+symRho)+mul+"<mi>PC</mi>"+mul;
formulasExtAC+=frac(sub(symb,symI)+mul+funcSCV(symI)+plus+sub(symb,symS)+mul+sub("<mi>SCV</mi>","<mtext>compl</mtext>"),2); /* +mul+"<mi>KLB</mi>"; */
formulasExtAC+=plus+frac(sub(symb,symI)+minus+num1,num2)+plus+frac(sub(symb,symS)+minus+num1,num2); /* +plus+"<mi>H</mi>"; */
formulasExtAC+="<mo>)</mo>"+mul+frac(num1,symLambda)+plus+frac(num1,symMu);
formulasExtAC+=mathEnd;



/** System design: Comparison of different strategies - MathML */
let formulasCompare="";

formulasCompare+="<p><b>"+language.statistics.compere.common+"</b>:</p>";
formulasCompare+="<p>"+language.statistics.compere.input+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>&lambda;<sub>common</sub>=&lambda;</li>";
formulasCompare+="<li>&mu;<sub>common</sub>=&mu;</li>";
formulasCompare+="<li>b<sub>S,common</sub>=1</li>";
formulasCompare+="<li>c<sub>common</sub>=<b>2</b></li>";
formulasCompare+="</ul>";
formulasCompare+="<p>"+language.statistics.compere.output+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>E[W]<sub>total</sub>=E[W]<sub>common</sub></li>";
formulasCompare+="<li>E[V]<sub>total</sub>=E[V]<sub>common</sub></li>";
formulasCompare+="<li>E[N<sub>Q</sub>]<sub>total</sub>=E[N<sub>Q</sub>]<sub>common</sub></li>";
formulasCompare+="<li>E[N]<sub>total</sub>=E[N]<sub>common</sub></li>";
formulasCompare+="</ul>";

formulasCompare+="<p><b>"+language.statistics.compere.separate+"</b>:</p>";
formulasCompare+="<p>"+language.statistics.compere.inputSingle+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>&lambda;<sub>separate</sub>=&lambda;<b>/2</b></li>";
formulasCompare+="<li>&mu;<sub>separate</sub>=&mu;</li>";
formulasCompare+="<li>b<sub>S,separate</sub>=1</li>";
formulasCompare+="<li>c<sub>separate</sub>=1</li>";
formulasCompare+="</ul>";
formulasCompare+="<p>"+language.statistics.compere.output+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>E[W]<sub>total</sub>=E[W]<sub>separate</sub></li>";
formulasCompare+="<li>E[V]<sub>total</sub>=E[V]<sub>separate</sub></li>";
formulasCompare+="<li>E[N<sub>Q</sub>]<sub>total</sub>=<b>2</b>&middot;E[N<sub>Q</sub>]<sub>separate</sub></li>";
formulasCompare+="<li>E[N]<sub>total</sub>=<b>2</b>&middot;E[N]<sub>separate</sub></li>";
formulasCompare+="</ul>";

formulasCompare+="<p><b>"+language.statistics.compere.batch+"</b>:</p>";
formulasCompare+="<p>"+language.statistics.compere.input+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>&lambda;<sub>batch</sub>=&lambda;</li>";
formulasCompare+="<li>&mu;<sub>batch</sub>=&mu;</li>";
formulasCompare+="<li>b<sub>S,batch</sub>=<b>2</b></li>";
formulasCompare+="<li>c<sub>batch</sub>=1</li>";
formulasCompare+="</ul>";
formulasCompare+="<p>"+language.statistics.compere.output+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>E[W]<sub>total</sub>=E[W]<sub>batch</sub></li>";
formulasCompare+="<li>E[V]<sub>total</sub>=E[V]<sub>batch</sub></li>";
formulasCompare+="<li>E[N<sub>Q</sub>]<sub>total</sub>=E[N<sub>Q</sub>]<sub>batch</sub></li>";
formulasCompare+="<li>E[N]<sub>total</sub>=E[N]<sub>batch</sub></li>";
formulasCompare+="</ul>";

formulasCompare+="<p><b>"+language.statistics.compere.fast+"</b>:</p>";
formulasCompare+="<p>"+language.statistics.compere.input+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>&lambda;<sub>fast</sub>=&lambda;</li>";
formulasCompare+="<li>&mu;<sub>fast</sub>=<b>2</b>&middot;&mu;</li>";
formulasCompare+="<li>b<sub>S,fast</sub>=1</li>";
formulasCompare+="<li>c<sub>fast</sub>=1</li>";
formulasCompare+="</ul>";
formulasCompare+="<p>"+language.statistics.compere.output+":</p>";
formulasCompare+="<ul>";
formulasCompare+="<li>E[W]<sub>total</sub>=E[W]<sub>fast</sub></li>";
formulasCompare+="<li>E[V]<sub>total</sub>=E[V]<sub>fast</sub></li>";
formulasCompare+="<li>E[N<sub>Q</sub>]<sub>total</sub>=E[N<sub>Q</sub>]<sub>fast</sub></li>";
formulasCompare+="<li>E[N]<sub>total</sub>=E[N]<sub>fast</sub></li>";
formulasCompare+="</ul>";



/** System design: Choosing the shortest queue - MathML */
let formulasShortestQueue="";

formulasShortestQueue+="<p>a="+language.GUI.formulaShortestQueueA+"</p>";
formulasShortestQueue+="<p>b="+language.GUI.formulaShortestQueueB+"</p>";
formulasShortestQueue+="<p>W<sub>(a)</sub>="+language.GUI.formulaShortestQueueAWaitingTime+"</p>";
formulasShortestQueue+="<p>W<sub>(b)</sub>="+language.GUI.formulaShortestQueueBWaitingTime+"</p>";
formulasShortestQueue+=mathStart;
formulasShortestQueue+=funcP(sub(symW,"<mo>(</mo><mi>b</mi><mo>)</mo>")+"<mo>&gt;</mo>"+sub(symW,"<mo>(</mo><mi>a</mi><mo>)</mo>"))+equals;
formulasShortestQueue+="<msup><mrow><mo>(</mo>"+frac("<mn>1</mn>","<mn>2</mn>")+"<mo>)</mo></mrow><mi>a</mi></msup>";
formulasShortestQueue+=sum(symk+equals+num0,"<mi>b</mi>"+minus+num1)+binom("<mi>a</mi>"+plus+symk+minus+num1,symk)+mul+frac(num1,sup(num2,symk));
formulasShortestQueue+=mathEnd;