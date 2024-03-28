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

/* Imports */

import {language} from './js/Language.js';
import {parseFloatStrict} from './js/tools.js';
import {calcErlangC} from './js/gui_ErlangC.js';
import {calcExtErlangC} from './js/gui_ExtErlangC.js';
import {MMcZustandsP, MMcKMZustandsP} from './js/Erlang.js';

/* Heading */

brandName.innerHTML=" "+language.GUI.Name;
closeButton.title=language.WaitingTimeDist.closeWindow;
closeButton.querySelector('.menuButtonTitleShort').innerHTML=language.WaitingTimeDist.closeWindowShort;
closeButton.querySelector('.menuButtonTitleLong').innerHTML=language.WaitingTimeDist.closeWindow;
closeButton.onclick=()=>{
  if (isDesktopApp) {
    /* Since we open this window in Neutralino.js via window.open, too, we have to use window.close() */
    /* Neutralino.window.hide(); */
    window.close();
  } else {
    window.close();
  }
}

/* Functions: input data processing */

function getSetupFromSearchString() {
  const modes={
    'ErlangC': ["EI","ES","c","display"],
    'ExtErlangC': ["EI","ES","K","EWT","c","display"]
  };

  const search=window.location.search;
  if (!search.startsWith("?")) return null;
  const data={};
  for (let record of search.substring(1).split("&")) {
    const arr=record.split("=");
    if (arr.length!=2) continue;
    const key=arr[0];
    for (let mode in modes) if (key=='mode' || modes[mode].indexOf(key)>=0) {data[key]=arr[1]; break;}
  }

  if (typeof(data.mode)!='string') return null;
  if (typeof(modes[data.mode])=='undefined') return null;

  for (let key of modes[data.mode]) {
    if (typeof(data[key])=='undefined') return null;
    let value=data[key];
    if (typeof(value.replaceAll)=='function') value=value.replaceAll(",",".");
    value=parseFloatStrict(value);
    if (isNaN(value) || value<0) return null;
    data[key]=value;
  }

  return data;
}

function calcErlangCTablePWt(input) {
  const inputVec=[input.EI, input.ES, Math.round(input.c), 0];
  const results=[];
  for (let t=0;t<=10_000;t++) {
    inputVec[3]=t;
    const PWlet=calcErlangC(inputVec).PWlet;
    if (PWlet==null) return null;
    results.push([t,PWlet]);
    if (PWlet>=0.99) break;
  }
  return results;
}

function calcErlangCTablePNn(input) {
  const a=input.ES/input.EI;
  const c=Math.round(input.c);
  if (a>=c) return null;
  const results=[];
  let sum=0;
  for (let n=0;n<=10_000;n++) {
    const p=MMcZustandsP(a,c,n);
    sum+=p;
    results.push([n,p]);
    if (sum>=0.99) break;
  }
  return results;
}

function calcErlangCTablePNQn(input) {
  const a=input.ES/input.EI;
  const c=Math.round(input.c);
  if (a>=c) return null;
  const results=[];
  let sum=0;
  for (let n=0;n<=c;n++) {
    const p=MMcZustandsP(a,c,n);
    sum+=p;
  }
  results.push([0,sum]);
  for (let n=c+1;n<=10_000;n++) {
    const p=MMcZustandsP(a,c,n);
    sum+=p;
    results.push([n-c,p]);
    if (sum>=0.99) break;
  }
  return results;
}

function calcErlangCTablePBusyCn(input) {
  const a=input.ES/input.EI;
  const c=Math.round(input.c);
  if (a>=c) return null;
  const results=[];
  let sum=0;
  for (let n=0;n<c;n++) {
    const p=MMcZustandsP(a,c,n);
    sum+=p;
    results.push([n,p]);
  }
  results.push([c,1-sum]);
  return results;
}

function calcExtErlangCTablePWt(input) {
  const inputVec=[input.EI, input.ES, Math.round(input.K), input.EWT, Math.round(input.c), 0];
  results=[];
  for (let t=0;t<=1000;t++) {
    inputVec[5]=t;
    const PWlet=calcExtErlangC(inputVec).PWlet;
    if (PWlet==null) return null;
    results.push([t,PWlet]);
    if (PWlet>=0.99) break;
  }
  return results;
}

function calcExtErlangCTablePNn(input) {
  const lambda=1/input.EI;
  const mu=1/input.ES;
  const nu=1/input.EWT;
  const K=input.K;
  const c=input.c;
  const results=[];
  let sum=0;
  for (let n=0;n<=K;n++) {
    const p=MMcKMZustandsP(lambda,mu,nu,c,K,n);
    sum+=p;
    results.push([n,p]);
    if (sum>=0.999) break;
  }
  return results;
}

function calcExtErlangCTablePNQn(input) {
  const lambda=1/input.EI;
  const mu=1/input.ES;
  const nu=1/input.EWT;
  const K=input.K;
  const c=input.c;
  const results=[];
  let sum=0;
  for (let n=0;n<=c;n++) {
    const p=MMcKMZustandsP(lambda,mu,nu,c,K,n);
    sum+=p;
  }
  results.push([0,sum]);
  for (let n=c+1;n<=10_000;n++) {
    const p=MMcKMZustandsP(lambda,mu,nu,c,K,n);
    sum+=p;
    results.push([n-c,p]);
    if (sum>=0.999) break;
  }
  return results;
}

function calcExtErlangCTablePBusyCn(input) {
  const lambda=1/input.EI;
  const mu=1/input.ES;
  const nu=1/input.EWT;
  const K=input.K;
  const c=input.c;
  const results=[];
  let sum=0;
  for (let n=0;n<c;n++) {
    const p=MMcKMZustandsP(lambda,mu,nu,c,K,n);
    sum+=p;
    results.push([n,p]);
  }
  results.push([c,1-sum]);
  return results;
}

/* Functions: table builder */

function buildTableElement(parent, cols, longTable=false) {
  const table=document.createElement("table");
  table.className="table table-striped border"+(longTable?" table-sm":"");

  let tr, th;

  const thead=document.createElement("thead");
  table.appendChild(thead);

  thead.appendChild(tr=document.createElement("tr"));

  for (let cell of cols) {
    tr.appendChild(th=document.createElement("th"));
    if (typeof(cell)=='string') th.innerHTML=cell; else th.innerHTML=cell[0];
  }

  const tbody=document.createElement("tbody");
  table.appendChild(tbody);

  if (parent!=null) parent.appendChild(table);

  return [table, tbody];
}

function addRow(tbody, row) {
  let tr;
  tbody.appendChild(tr=document.createElement("tr"));
  for (let cell of row) {
    let td;
    tr.appendChild(td=document.createElement("td"));
    td.innerHTML=cell;
  }
}

/* Process data */

const input=getSetupFromSearchString();
let results=null;
const labelPlain={}, labelHTML={};
let title;
if (input!=null && input['mode']=='ErlangC') {
  switch (input['display']) {
    case 0: /* P(W<=t) */
      results=calcErlangCTablePWt(input);
      title=language.WaitingTimeDist.heading;
      labelPlain.x="t"; labelPlain.y="P(W<=t)";
      labelHTML.x="t"; labelHTML.y="P(W&le;t)"
      break;
    case 1: /* P(N=n)=p_n */
      results=calcErlangCTablePNn(input);
      title=language.WaitingTimeDistN.heading;
      labelPlain.x="n"; labelPlain.y="P(N=n)";
      labelHTML.x="n"; labelHTML.y="P(N=n)"
      break;
    case 2: /* P(NQ=n) */
      results=calcErlangCTablePNQn(input);
      title=language.WaitingTimeDistNQ.heading;
      labelPlain.x="n"; labelPlain.y="P(NQ=n)";
      labelHTML.x="n"; labelHTML.y="P(N<sub>Q</sub>=n)";
      break;
    case 3: /* P(busyC=n) */
      results=calcErlangCTablePBusyCn(input);
      title=language.WaitingTimeDistCBusy.heading;
      labelPlain.x="n"; labelPlain.y=language.WaitingTimeDistCBusy.yLabel;
      labelHTML.x="n"; labelHTML.y=language.WaitingTimeDistCBusy.yLabel;
      break;
  }
}
if (input!=null && input['mode']=='ExtErlangC') {
  switch (input['display']) {
    case 0: /* P(W<=t) */
      results=calcExtErlangCTablePWt(input);
      title=language.WaitingTimeDist.heading;
      labelPlain.x="t"; labelPlain.y="P(W<=t)";
      labelHTML.x="t"; labelHTML.y="P(W&le;t)";
      break;
    case 1: /* P(N=n)=p_n */
      results=calcExtErlangCTablePNn(input);
      title=language.WaitingTimeDistN.heading;
      labelPlain.x="n"; labelPlain.y="P(N=n)";
      labelHTML.x="n"; labelHTML.y="P(N=n)"
      break;
    case 2: /* P(NQ=n) */
      results=calcExtErlangCTablePNQn(input);
      title=language.WaitingTimeDistNQ.heading;
      labelPlain.x="n"; labelPlain.y="P(NQ=n)";
      labelHTML.x="n"; labelHTML.y="P(N<sub>Q</sub>=n)";
      break;
    case 3: /* P(busyC=n) */
      results=calcExtErlangCTablePBusyCn(input);
      title=language.WaitingTimeDistCBusy.heading;
      labelPlain.x="n"; labelPlain.y=language.WaitingTimeDistCBusy.yLabel;
      labelHTML.x="n"; labelHTML.y=language.WaitingTimeDistCBusy.yLabel;
      break;
  }
}

/* Diagram */

if (results!=null) {
  const set={
    label: labelPlain.y,
    fill: false,
    borderColor: "blue",
    data: results.map(row=>row[1]),
    pointRadius: 0,
    pointHoverRadius: 10
  };

  const maxValue=Math.min(1,Math.ceil(results.map(row=>row[1]).reduce((a,b)=>Math.max(a,b))*1.05*50)/50);
  new Chart('dist_plot', {
    type: "line",
    data: {labels: results.map(row=>row[0]), datasets: [set]},
    options: {
      scales: {
        x: {title: {display: true, text: labelPlain.x}},
        y: {title: {display: true, text: labelPlain.y}, min: 0, max: maxValue, ticks: {callback: function(value, index, values) {return (value*100).toLocaleString()+'%';}}}
      },
      plugins: {legend: {display: false}}
    }});
}

/* Table */

if (results!=null) {
  let table, tbody;
  [table,tbody]=buildTableElement(tableArea,[labelHTML.x,labelHTML.y],results.length>100);
  for (let row of results) addRow(tbody,[row[0].toLocaleString(),(row[1]*100).toLocaleString(undefined,{minimumFractionDigits: 3})+"%"]);
}

/* Buttons */

if (results!=null) {
  const exportString="t\tP(W<=t)\n"+results.map(row=>row[0].toLocaleString()+"\t"+row[1].toLocaleString()).join("\n");

  dist_heading.innerHTML=title+" "+labelHTML.y;

  copyButton.innerHTML=" "+language.GUI.copyDiagram;
  copyButtonTable.innerHTML=language.GUI.copyDiagramTable;
  copyButtonDiagram.innerHTML=language.GUI.copyDiagramImage;
  saveButton.innerHTML=" "+language.GUI.saveDiagram;
  saveButtonTable.innerHTML=language.GUI.saveDiagramTable;
  saveButtonDiagram.innerHTML=language.GUI.saveDiagramImage;

  copyButtonTable.onclick=()=>{
    navigator.clipboard.writeText(exportString);
  };

  copyButtonDiagram.onclick=()=>{
    if (typeof(ClipboardItem)!="undefined") {
      document.getElementById("dist_plot").toBlob(blob=>navigator.clipboard.write([new ClipboardItem({"image/png": blob})]));
    } else {
      alert(language.GUI.copyDiagramImageError);
    }
  };

  saveButtonTable.onclick=()=>{
    const element=document.createElement("a");
    element.href="data:attachment/text,"+encodeURI(exportString);
    element.download="table.txt";
    element.click();
  };

  saveButtonDiagram.onclick=()=>{
    const element=document.createElement("a");
    element.href=document.getElementById("dist_plot").toDataURL("image/png");
    element.download="diagram.png";
    element.click();
  };

} else {
  exportArea.style.display="none";
}

/* Start */

document.addEventListener('readystatechange',event=>{if (event.target.readyState=="complete") {
  mainContent.style.display="";
  infoLoading.style.display="none";
}});