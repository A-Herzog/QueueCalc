/* Language */

import {language} from './js/Language.js';
import {parseFloatStrict} from './js/tools.js';
import {calcErlangC} from './js/gui_ErlangC.js';
import {calcExtErlangC} from './js/gui_ExtErlangC.js';

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
    'ErlangC': ["EI","ES","c"],
    'ExtErlangC': ["EI","ES","K","EWT","c"]
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

function calcErlangCTable(input) {
  const inputVec=[input.EI, input.ES, Math.round(input.c), 0];
  results=[];
  for (let t=0;t<=10_000;t++) {
    inputVec[3]=t;
    const PWlet=calcErlangC(inputVec).PWlet;
    if (PWlet==null) return null;
    results.push([t,PWlet]);
    if (PWlet>=0.99) break;
  }
  return results;
}

function calcExtErlangCTable(input) {
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
if (input!=null && input['mode']=='ErlangC') results=calcErlangCTable(input);
if (input!=null && input['mode']=='ExtErlangC') results=calcExtErlangCTable(input);

/* Diagram */

if (results!=null) {
  const set={
    label: "P(W<=t)",
    fill: false,
    borderColor: "blue",
    data: results.map(row=>row[1]),
    pointRadius: 0,
    pointHoverRadius: 10
  };

  new Chart('dist_plot', {
    type: "line",
    data: {labels: results.map(row=>row[0]), datasets: [set]},
    options: {
      scales: {
        x: {title: {display: true, text: "t"}},
        y: {title: {display: true, text: "P(W<=t)"}, min: 0, max: 1, ticks: {callback: function(value, index, values) {return (value*100).toLocaleString()+'%';}}}
      },
      plugins: {legend: {display: false}}
    }});
}

/* Table */

if (results!=null) {
  let table, tbody;
  [table,tbody]=buildTableElement(tableArea,["t","P(W&\le;t)"],results.length>100);
  for (let row of results) addRow(tbody,[row[0].toLocaleString(),(row[1]*100).toLocaleString(undefined,{minimumFractionDigits: 3})+"%"]);
}

/* Buttons */

if (results!=null) {
  const exportString="t\tP(W<=t)\n"+results.map(row=>row[0].toLocaleString()+"\t"+row[1].toLocaleString()).join("\n");

  dist_heading.innerHTML=language.WaitingTimeDist.heading+" P(W&le;t)";

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