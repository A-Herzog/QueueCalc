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

export {selectLanguage, buildMultiNavDropdown, showTab, getPlaceholder, getNextStepsButtons, getSimplePlaceholder, TilesBuilder, Table}

import {getPositiveFloat, getNotNegativeFloat, getPositiveInt, getNotNegativeInt, isVariabel} from './tools.js';

/* Sprachauswahl */

function selectLanguageFile(file) {
  if (window.location.href.endsWith(file)) return;
  window.location.href='./'+file;
}

function selectLanguage(languages) {
  let selectedLanguage=localStorage.getItem('selectedLanguage');

  if (selectedLanguage==null) {
    const userLang=(navigator.language || navigator.userLanguage).toLocaleLowerCase();
    let preferredFile=languages.find(language=>language.name=='default').file;
    for (let language of languages) if (userLang.startsWith(language.name)) {preferredFile=language.file; break;}
    selectLanguageFile(preferredFile);
  } else {
    selectLanguageFile(languages.find(language=>language.name==selectedLanguage).file);
  }
}

/* Menü */

function buildMultiNavDropdown(id, name, records) {
  const li=document.createElement("li");
  li.className="nav-item dropdown";
  li.role="tab";

  let block="";

  block+="<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbar"+id+"Menu\" role=\"button\" data-bs-toggle=\"dropdown\" area-expanded=\"false\">"+name+"</a>";
  block+="<ul class=\"dropdown-menu dropdown-menu-dark bg-primary\" aria-labelledby=\"navbar"+id+"Menu\">";
  let first=true;
  for (let record of records) {
    if (first) first=false; else block+=" <li><hr class=\"dropdown-divider\"></li>";
    let info="";
    if (typeof(record.info)=='string') info=" <small>("+record.info+")</small>";
    block+="<li><h6 class=\"dropdown-header\"><strong>"+record.name+"</strong>"+info+"</h6></li>";
    block+="<li role=\"tab\"><a class=\"dropdown-item bi-123\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Values\" data-bs-target=\"#"+record.id+"Values\"> "+language.GUI.modeValues+"</a></li>";
    block+="<li role=\"tab\"><a class=\"dropdown-item bi-table\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Table\" data-bs-target=\"#"+record.id+"Table\"> "+language.GUI.modeTable+"</a></li>";
    block+="<li role=\"tab\"><a class=\"dropdown-item bi-graph-up\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Diagram\" data-bs-target=\"#"+record.id+"Diagram\"> "+language.GUI.modeDiagram+"</a></li>";
  }
  block+="</ul>";

  li.innerHTML=block;

  return li;
}

function showTab(id) {
  const element=document.querySelector('#navbar_main a[href=\'#'+id+'\']');
  element.click();

  const p1=element.parentElement;
  const p2=p1.parentElement;
  const p3=p2.parentElement;
  if (p3.nodeName=='LI') {
    /* Durch den ersten Klick öffnet sich das Menü. Durch diesen das Menü wieder schließen. */
    p3.querySelector("a").click();
  }

  setTimeout(()=>window.scrollTo(0,0),100);
}

/* Platzhalter */

function getPlaceholder(record) {
  let block="";

  /* Einzelwerte */

  block+="<div class=\"tab-pane fade\" id=\""+record.id+"Values\" role=\"tabpanel\">";
  block+="<h2>"+record.title+"</h2>";

  block+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
  block+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: 650px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+".svg\">";
  block+=record.valuesData;

  block+="<div class=\"row\">";
  for (let card of record.valuesInfoCards) {
    block+="<div class=\"col-lg-6\"><div class=\"card\">";
    block+="<div class=\"card-header\"><h5>"+card.head+"</h5></div>";
    block+="<div class=\"card-body\">"+card.body+"</div>";
    block+="</div></div>";
  }
  block+="</div>";

  block+="</div>";

  /* Tabelle */

  block+="<div class=\"tab-pane fade\" id=\""+record.id+"Table\" role=\"tabpanel\">";
  block+="<h2>"+record.title+"</h2>";

  block+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
  block+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: 650px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+".svg\">";
  block+=record.tableData;

  block+="</div>";

  /* Diagramm */

  block+="<div class=\"tab-pane fade\" id=\""+record.id+"Diagram\" role=\"tabpanel\">";
  block+="<h2>"+record.title+"</h2>";

  block+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
  block+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: 650px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+".svg\">";
  block+=record.diagramData;

  block+="</div>";

  return block;
}

function getNextStepsButtons(id, tableButtonText, diagramButtonText) {
  return {
   head: language.GUI.nextSteps,
  body:
    "<button onclick=\"showTab('"+id+"Table');\" class=\"btn btn-primary my-1 bi-arrow-right-circle\"> "+tableButtonText+"</button>"+
    "<button onclick=\"showTab('"+id+"Diagram');\" class=\"btn btn-primary my-1 bi-arrow-right-circle\"> "+diagramButtonText+"</button>"
  };
}

function getSimplePlaceholder(id) {
  let block="";

  block+="<div class=\"tab-pane fade\" id=\""+id+"\" role=\"tabpanel\">";
  block+="</div>";

  return block;
}

/* Eingabezeile */

function buildInputField(id, value, updateCallback, label, errorInfo='') {
  let block="";
  block+="<p class=\"card-text\"><form class=\"form-floating\">";
  block+="<div class=\"input-group\">";
  block+="<span class=\"input-group-text\">"+label+":=</span>";
  block+="<input type=\"text\" class=\"form-control\" id=\""+id+"\" value=\""+value+"\" oninput=\""+updateCallback+"()\">";
  if (errorInfo!='') block+="<div class=\"invalid-feedback\">"+errorInfo+"</div>";
  block+="</div>";
  block+="</form></p>";
  block+="<script>";
  block+="document.getElementById('"+id+"').addEventListener(\"keypress\",function(event) {if (event.key===\"Enter\") event.preventDefault();});";
  block+="</script>";

  return block;
}

function buildSwitchField(id, updateCallback, label) {
  let block="";
  block+="<p class=\"card-text\"><form class=\"form-floating\">";
  block+="<div class=\"form-check form-switch\">";
  block+="<input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\""+id+"\" onclick=\""+updateCallback+"()\">";
  block+="<label class=\"form-check-label\" for=\""+id+"\">"+label+"</label>";
  block+="</div>";
  block+="</form></p>";

  return block;
}

/* Eingabekacheln */

function buildInputTile(size, title, id, value, updateCallback, label, errorInfo, info='', info2='') {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h5>"+title+"</h5></div>";
  block+="<div class=\"card-body\">";
  block+="<p class=\"card-text\">"+buildInputField(id,value,updateCallback,label,errorInfo)+"</p>";
  if (info!='') block+="<p class=\"card-text card-input-info1\">"+info+"</p>";
  block+="</div>";
  if (info2!='') {
    block+="<div class=\"card-footer card-input-info2\">";
    block+="<p class=\"card-text small bi-info-circle\"> "+info2+"</p>";
    block+="</div>";
  }
  block+="</div></div>";

  return block;
}

function buildRangeTile(size, title, id, value, step, valueTo, tabChangeCallback, updateCallback, label, errorInfo='', errorInfoStep='', active=false) {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h5>"+title+"</h5></div>";
  block+="<div class=\"card-body\">";
  block+="<ul class=\"nav nav-tabs\" id=\""+id+"_Tabs\" role=\"tablist\">";
  block+="<li class=\"nav-item\" role=\"presentation\">";
  block+="<button class=\"nav-link"+(active?"":" active")+" bi-123\" data-bs-toggle=\"tab\" data-bs-target=\"#"+id+"_Fix\" type=\"button\" role=\"tab\" onclick=\""+tabChangeCallback+"(this)\"> Fest</button>";
  block+="</li>";
  block+="<li class=\"nav-item\" role=\"presentation\">";
  block+="<button class=\"nav-link"+(active?" active":"")+" bi-sliders\" data-bs-toggle=\"tab\" data-bs-target=\"#"+id+"_Variabel\" type=\"button\" role=\"tab\" onclick=\""+tabChangeCallback+"(this)\"> Variabel</button>";
  block+="</li>";
  block+="</ul>";
  block+="<div class=\"tab-content\">";
  block+="<div class=\"tab-pane"+(active?"":" show active")+"\" id=\""+id+"_Fix\" role=\"tabpanel\">";
  block+=buildInputField(id+"_Fix_Input",value,updateCallback,label,errorInfo);
  block+="</div>";
  block+="<div class=\"tab-pane"+(active?" show active":"")+"\" id=\""+id+"_Variabel\" role=\"tabpanel\">";
  block+=buildInputField(id+"_Variabel_From",value,updateCallback,"Startwert "+label,errorInfo);
  block+=buildInputField(id+"_Variabel_Step",step,updateCallback,"Schrittweite",errorInfoStep);
  block+=buildInputField(id+"_Variabel_To",valueTo,updateCallback,"Endwert "+label,errorInfo);
  block+="</div>";
  block+="</div>";
  block+="</div>";
  block+="</div></div>";

  return block;
}

function buildSwitchTile(size, title, ids, updateCallback, labels, info='', info2='') {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h5>"+title+"</h5></div>";
  block+="<div class=\"card-body\">";
  for (let i=0;i<ids.length;i++) block+=buildSwitchField(ids[i],updateCallback,labels[i]);
  if (info!='') block+="<p class=\"card-text card-input-info1\">"+info+"</p>";
  block+="</div>";
  if (info2!='') {
    block+="<div class=\"card-footer card-input-info2\">";
    block+="<p class=\"card-text small bi-info-circle\"> "+info2+"</p>";
    block+="</div>";
  }
  block+="</div></div>";

  return block;
}

/* Ausgabekachel */

function buildResultsTile(id) {
  let block="";

  block+="<div class=\"row\">";
  block+="<div class=\"col-lg-12\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h5>"+language.GUI.results+"</h5></div>";
  block+="<div class=\"card-body\">";
  block+="<p class=\"card-text\" id=\""+id+"_results\">";
  block+="</p>";
  block+="</div>";
  block+="</div></div>";
  block+="</div>";

  return block;
}

/* Kachel-System */

class TilesBuilder {
  constructor(formula) {
    this.formula=formula;
    this.tiles=[];
  }

  add(name, label, id, valueFrom, valueStep, valueTo, errorValue, errorStep, info1, info2, format, optional=false) {
    const tile={};
    tile.type="input";
    tile.name=name;
    tile.label=label;
    tile.id=id;
    tile.valueFrom=valueFrom;
    tile.valueStep=valueStep;
    tile.valueTo=valueTo;
    tile.errorValue=errorValue;
    tile.errorStep=errorStep;
    tile.info1=info1;
    tile.info2=info2;
    tile.format=format;
    tile.optional=optional;
    this.tiles.push(tile);
  }

  addSwitch(name, labels, ids, info1, info2) {
    const tile={};
    tile.type="switch";
    tile.name=name;
    tile.labels=labels;
    tile.ids=ids;
    tile.info1=info1;
    tile.info2=info2;
    this.tiles.push(tile);
  }

  get valueTiles() {
    let block='';

    block+='<p><button type="button" class="btn btn-warning bi-arrows-collapse" id="'+this.formula+'ValuesInfoHide" onclick="hideValueInfo(\''+this.formula+'\')"> '+language.model.explanationsHide+'</button></p>';
    block+='<p><button type="button" class="btn btn-success bi-arrows-expand" id="'+this.formula+'ValuesInfoShow" onclick="showValueInfo(\''+this.formula+'\')" style="display: none;"> '+language.model.explanationsShow+'</button></p>';

    block+="<div class=\"row\" id=\""+this.formula+"InputArea\">";

    for (let tile of this.tiles) {
      if (tile.type=="input") {
        block+=buildInputTile(
          3,
          tile.name,
          this.formula+"Values_"+tile.id,
          tile.valueFrom,
          "update"+this.formula+"Values",
          tile.label,
          tile.errorValue,
          tile.info1,
          tile.info2
        );
      }
      if (tile.type=="switch") {
        block+=buildSwitchTile(
          3,
          tile.name,
          tile.ids.map(id=>this.formula+"Values_"+id),
          "update"+this.formula+"Values",
          tile.labels,
          tile.info1,
          tile.info2
        );
      }
    }

    block+="</div>";
    block+=buildResultsTile(this.formula+"Values");
    return block;
  }

  rangeTiles(mode) {
    let block="<div class=\"row\">";

    let firstInput=true;
    for (let tile of this.tiles) {
      if (tile.type=="input") {
        block+=buildRangeTile(
          3,
          tile.name,
          this.formula+mode+"_"+tile.id,
          tile.valueFrom,
          tile.valueStep,
          tile.valueTo,
          "changeTab"+this.formula+mode,
          "update"+this.formula+mode,
          tile.label,
          tile.errorValue,
          tile.errorStep,
          firstInput
        );
        firstInput=false;
      }
      if (tile.type=="switch") {
        block+=buildSwitchTile(
          3,
          tile.name,
          tile.ids.map(id=>this.formula+mode+"_"+id),
          "update"+this.formula+mode,
          tile.labels,
          tile.info1,
          tile.info2
        );
      }
    }

    block+="</div>";
    block+=buildResultsTile(this.formula+mode);
    return block;
  }

  get tableTiles() {
    return this.rangeTiles('Table');
  }

  get diagramTiles() {
    return this.rangeTiles('Diagram');
  }

  getIDs(mode) {
    const IDs=[];
    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      IDs.push(this.formula+mode+"_"+tile.id);
    }
    return IDs;
  }

  #updateTabsWorking=false;

  updateTabs(sender, mode) {
    if (this.#updateTabsWorking) return;
    this.#updateTabsWorking=true;
    const changedId=sender.getAttribute("data-bs-target");
    const allIds=this.getIDs(mode);

    for (let i=0;i<allIds.length;i++) {
      if ("#"+allIds[i]+"_Variabel"!=changedId) {
        let showTabId='#'+allIds[i]+"_Fix";
        for (let element of document.querySelectorAll('[data-bs-target="'+showTabId+'"]')) {
          element.click();
          break;
        }
      }
    }

    this.#updateTabsWorking=false;
  }

  get valuesValues() {
    const values=[];
    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      let value=null;
      if (tile.type=="input") {
        const id=this.formula+'Values_'+tile.id;
        if (tile.format=='PositiveFloat') value=getPositiveFloat(id);
        if (tile.format=='NotNegativeFloat') value=getNotNegativeFloat(id);
        if (tile.format=='PositiveInt') value=getPositiveInt(id);
        if (tile.format=='NotNegativeInt') value=getNotNegativeInt(id);
        if (value==null && !tile.optional) {
          document.getElementById(this.formula+'Values_results').innerHTML=language.model.invalid;
          return null;
        }
      }
      if (tile.type=="switch") {
        value=[];
        for (let id of tile.ids) value.push(document.getElementById(this.formula+'Values_'+id).checked);
      }
      values.push(value);
    }
    return values;
  }

  rangeValues(mode) {
    const values=[];

    let hasVariabelParameter=false;
    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      if (tile.type=="input" && isVariabel(this.formula+mode+'_'+tile.id)) {hasVariabelParameter=true; break;}
    }
    if (!hasVariabelParameter) {
      document.getElementById(this.formula+mode+'_results').innerHTML=language.model.noParameterChosen;
      return null;
    }

    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      let value;
      const id=this.formula+mode+'_'+tile.id+'_Variabel_';
      if (tile.type=="input") {
        if (isVariabel(this.formula+mode+'_'+tile.id)) {
          let from;
          if (tile.format=='PositiveFloat') from=getPositiveFloat(id+'From');
          if (tile.format=='NotNegativeFloat') from=getNotNegativeFloat(id+'From');
          if (tile.format=='PositiveInt') from=getPositiveInt(id+'From');
          if (tile.format=='NotNegativeInt') from=getNotNegativeInt(id+'From');
          let step;
          if (tile.format=='PositiveFloat') step=getPositiveFloat(id+'Step');
          if (tile.format=='NotNegativeFloat') step=getPositiveFloat(id+'Step');
          if (tile.format=='PositiveInt') step=getPositiveInt(id+'Step');
          if (tile.format=='NotNegativeInt') step=getPositiveInt(id+'Step');
          let to;
          if (tile.format=='PositiveFloat') to=getPositiveFloat(id+'To');
          if (tile.format=='NotNegativeFloat') to=getNotNegativeFloat(id+'To');
          if (tile.format=='PositiveInt') to=getPositiveInt(id+'To');
          if (tile.format=='NotNegativeInt') to=getNotNegativeInt(id+'To');
          if (from==null || step==null || to==null) {
            document.getElementById(this.formula+mode+'_results').innerHTML=tile.optional?language.model.noParameterChosen:language.model.invalid;
            return null;
          }
          value=[from, step, to];
        } else {
          const id=this.formula+mode+'_'+tile.id+'_Fix_Input';
          if (tile.format=='PositiveFloat') value=getPositiveFloat(id);
          if (tile.format=='NotNegativeFloat') value=getNotNegativeFloat(id);
          if (tile.format=='PositiveInt') value=getPositiveInt(id);
          if (tile.format=='NotNegativeInt') value=getNotNegativeInt(id);
          if (value==null && !tile.optional) {
            document.getElementById(this.formula+mode+'_results').innerHTML=language.model.invalid;
            return null;
          }
        }
      }
      if (tile.type=="switch") {
        value=[];
        for (let id of tile.ids) value.push(document.getElementById(this.formula+mode+'_'+id).checked);
      }
      values.push(value);
    }

    return values;
  }
}

function hideValueInfo(formula) {
  document.getElementById(formula+'ValuesInfoHide').style.display="none";
  document.getElementById(formula+'ValuesInfoShow').style.display="";

  for (let element of document.querySelectorAll('#'+formula+'InputArea .card-input-info1')) element.classList.add("hidden");
  for (let element of document.querySelectorAll('#'+formula+'InputArea .card-input-info2')) element.classList.add("hidden");

  for (let element of document.querySelectorAll('#'+formula+'InputArea .card-body')) element.style.padding='0rem 1rem';
}

function showValueInfo(formula) {
  document.getElementById(formula+'ValuesInfoHide').style.display="";
  document.getElementById(formula+'ValuesInfoShow').style.display="none";

  for (let element of document.querySelectorAll('#'+formula+'InputArea .card-input-info1')) element.classList.remove("hidden");
  for (let element of document.querySelectorAll('#'+formula+'InputArea .card-input-info2')) element.classList.remove("hidden");

  for (let element of document.querySelectorAll('#'+formula+'InputArea .card-body')) element.style.padding='1rem 1rem';
}

window.hideValueInfo=hideValueInfo;
window.showValueInfo=showValueInfo;

/* Diagrammkonfiguration */

function getChartOptions(xAxisTitle, hasTimeYAxis, hasNumberYAxis, hasPercentYAxis) {
  const options={
    scales: {
      x: {
        title: {display: true, text: xAxisTitle}
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  if (hasTimeYAxis) options.scales.y={
    title: {display: true, text: language.statistics.unitTime},
    min: 0
  };
  if (hasNumberYAxis) options.scales.y2={
    position: 'left',
    title: {display: true, text: language.statistics.unitNumber},
    min: 0
  };
  if (hasPercentYAxis) options.scales.y3={
    position: 'right',
    title: {display: true, text: language.statistics.unitFraction},
    min: 0,
    max: 1,
    ticks: {callback: function(value, index, values) {return (value*100).toLocaleString()+'%';}}
  };

  return options;
}

/* Hilfsfunktionen für Tabelle */

function getDecimalSeparatorChar() {
    const n=1.1;
    return n.toLocaleString().substring(1,2);
}

/* Tabelle */

class Table {
  constructor() {
    this.heading=[];
    this.rows=[];
    this.cols=null;
  }

  addHeading(column) {
    this.heading.push(column);
  }

  addCol(column) {
    if (this.cols==null) this.cols=[];
    if (typeof(column)=='number') column=column.toLocaleString();
    if (column==null) this.cols.push(''); else this.cols.push(column);
  }

  addCol(column, unit) {
    if (this.cols==null) this.cols=[];
    if (typeof(column)=='number') column=column.toLocaleString();
    if (unit==null || unit=='') {
      if (column==null) this.cols.push(''); else this.cols.push(column);
    } else {
      if (column==null) this.cols.push(''); else this.cols.push(column+' '+unit);
    }
  }

  addColPercent(column) {
    if (this.cols==null) this.cols=[];
    if (column==null) this.cols.push(''); else this.addCol(column*100,'%');
  }

  startRow() {
    if (this.cols==null) return;
    this.rows.push(this.cols);
    this.cols=null;
  }

  calc(input, lambda) {
    for (let i=0;i<input.length;i++) if (typeof(input[i])=='object') {
      let range=input[i];
      if (range[2]>range[0]) {
        let rowCount=0;
        for (let v=range[0];v<=range[2];v+=range[1]) {
          const values=[];
          for (let j=0;j<input.length;j++) values.push(input[j]);
          values[i]=v;
          this.startRow();
          lambda(this,values);
          rowCount++;
          if (rowCount>=500) break; /* Zu viele Einträge überlasten sonst ggf. die Chart-Engine */
        }
      } else {
        for (let v=range[0];v>=range[2];v-=range[1]) {
          const values=[];
          for (let j=0;j<input.length;j++) values.push(input[j]);
          values[i]=v;
          this.startRow();
          lambda(this,values);
        }
      }
      this.xValuesCol=i;
      return;
    }
  }

  get html() {
    this.startRow();
    let table='<table class="table table-hover">';
    table+='<thread><tr>';
    for (let i=0;i<this.heading.length;i++) table+='<th scope="col">'+this.heading[i]+'</th>';
    table+='</tr></thread>';
    table+='<tbody>';
    for (let i=0;i<this.rows.length;i++) {
      table+="<tr>";
      const row=this.rows[i];
      for (let j=0;j<row.length;j++) table+='<td>'+row[j]+'</td>';
      table+="</tr>";
    }
    table+='</tbody>';
    table+='</table>';
    return table;
  }

  removeSpecialChars(s) {
    if (typeof(s)=='undefined') return '';
    s=s.replaceAll("<sub>","");
    s=s.replaceAll("</sub>","");
    s=s.replaceAll("&le;","<=");
    s=s.replaceAll("&gt;",">");
    s=s.replaceAll("&rho;","rho");
    return s;
  }

  get text() {
    this.startRow();
    let table=this.removeSpecialChars(this.heading[0]);
    for (let i=1;i<this.heading.length;i++) table+="\t"+this.removeSpecialChars(this.heading[i]);
    for (let i=0;i<this.rows.length;i++) {
      table+="\n";
      const row=this.rows[i];
      table+=row[0];
      for (let j=1;j<row.length;j++) table+="\t"+row[j];
    }
    return table;
  }

  get colCount() {
    return this.heading.length;
  }

  column(index) {
    this.startRow();

    const keep=getDecimalSeparatorChar();
    const remove=(keep==',')?'.':',';

    const col=[];
    if (index>=0 && index<this.heading.length) for (let i=0;i<this.rows.length;i++) {
      const row=this.rows[i];
      if (row.length<=index) {
        col.push(null);
      } else {
        let cell=row[index];
        /* 1000er Punkte entfernen */
        if (cell.indexOf(remove)>=0) {
          cell=cell.replaceAll(remove,"");
        }
        /* Alles auf Dezimalpunkte ändern */
        cell=cell.replaceAll(",",".");
        /* In Zahl umwandeln */
        if (cell.endsWith(' %')) {
          cell=cell.substr(0,cell.length-2);
          const val=parseFloat(cell);
          if (isNaN(val)) col.push(null); else col.push(val/100.0);
        } else {
          const val=parseFloat(cell);
          if (isNaN(val)) col.push(null); else col.push(val);
        }
      }
    }
    return col;
  }

  diagram(id, xColIndex, xAxisTitle, ySetup) {
    let html='';
    html+='<canvas id="'+id+'_plot" style="width:100%;"></canvas>';
    html+='<p class="small">'+language.GUI.diagramInfo+'</p>';
    globalThis[id+"DiagramData"]=this.text;
    html+="<p><button type='button' class='btn btn-primary bi-clipboard' onclick='navigator.clipboard.writeText(globalThis."+id+"DiagramData);'> "+language.GUI.copyDiagram+"</button></p>";

    document.getElementById(id).innerHTML=html;

    const datasets=[];
    let hasY1=false;
    let hasY2=false;
    let hasY3=false;
    for (let i=0;i<ySetup.length;i++) {
      const setup=ySetup[i];
      const set={};
      set.label=this.removeSpecialChars(this.heading[setup.columnIndex]);
      set.fill=false;
      set.borderColor=setup.color;
      set.data=this.column(setup.columnIndex);
      if (setup.mode=='time') hasY1=true;
      if (setup.mode=='number') {set.yAxisID='y2'; hasY2=true;}
      if (setup.mode=='percent') {set.yAxisID='y3'; hasY3=true;}
      datasets.push(set);
    }

    new Chart(id+'_plot', {
      type: "line",
      data: {
        labels: this.column(xColIndex),
        datasets: datasets
      },
      options: getChartOptions(xAxisTitle,hasY1,hasY2,hasY3)
    });
  }
}