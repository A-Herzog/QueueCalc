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

export {selectLanguage, buildMultiNavDropdown, showTab, getPlaceholder, getNextStepsButtons, getSimplePlaceholder, initObserver, TilesBuilder, Table}

import {getPositiveFloat, getNotNegativeFloat, getPositiveInt, getNotNegativeInt, isVariabel} from './tools.js';
import {language} from './Language.js';

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
    const showValues=(typeof(record.modes)=='undefined' || record.modes.values==true);
    const showTable=(typeof(record.modes)=='undefined' || record.modes.table==true);
    const showDiagram=(typeof(record.modes)=='undefined' || record.modes.diagram==true);
    if (showValues && !showTable && !showDiagram) {
      block+="<li role=\"tab\"><a class=\"dropdown-item bi-123\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Values\" data-bs-target=\"#"+record.id+"Values\"> "+language.GUI.modeValuesOnly+"</a></li>";
    } else {
      if (showValues) block+="<li role=\"tab\"><a class=\"dropdown-item bi-123\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Values\" data-bs-target=\"#"+record.id+"Values\"> "+language.GUI.modeValues+"</a></li>";
      if (showTable) block+="<li role=\"tab\"><a class=\"dropdown-item bi-table\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Table\" data-bs-target=\"#"+record.id+"Table\"> "+language.GUI.modeTable+"</a></li>";
      if (showDiagram) block+="<li role=\"tab\"><a class=\"dropdown-item bi-graph-up\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Diagram\" data-bs-target=\"#"+record.id+"Diagram\"> "+language.GUI.modeDiagram+"</a></li>";
    }
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
}

/* Platzhalter */

function valuesFormulaVisiblity(elementId, buttonId) {
  setTimeout(()=>{
    const isVisible=(document.getElementById(elementId).clientHeight>=50);
    const button=document.getElementById(buttonId);
    if (isVisible) {
      button.innerHTML=" "+language.model.formulaHide;
      button.classList.remove("btn-success");
      button.classList.add("btn-warning");
      button.classList.remove("bi-arrows-expand");
      button.classList.add("bi-arrows-collapse");
    } else {
      button.innerHTML=" "+language.model.formulaShow;
      button.classList.remove("btn-warning");
      button.classList.add("btn-success");
      button.classList.remove("bi-arrows-collapse");
      button.classList.add("bi-arrows-expand");
    }
  },400);
}
window.valuesFormulaVisiblity=valuesFormulaVisiblity;

function initObserver(elementId, content) {
  setTimeout(()=>{
  const targetNode=document.getElementById(elementId);
  const visibleObserver=new MutationObserver((records,observer)=>{
    for (let record of records) if (record.target.style.display!='none') {
        if (record.target.childNodes.length==0) {
          const id=record.target.id;
          record.target.innerHTML=content;
          if (typeof(window["update"+id])!='undefined') window["update"+id]();
        }
        setTimeout(()=>window.scrollTo(0,0),100);
    }
  });
  visibleObserver.observe(targetNode,{attributes: true});
  },100);
}

function getPlaceholder(record) {
  let block="";
  let content;

  if (typeof(record.imageMaxWidth)=='undefined') record.imageMaxWidth=650;

  /* Einzelwerte */

  block+="<div class=\"tab-pane fade\" id=\""+record.id+"Values\" role=\"tabpanel\">";
  block+="</div>";

  content="";
  content+="<h2>"+record.title+"</h2>";

  content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
  const dark=(document.documentElement.dataset.bsTheme=='dark')?"_dark":"";
  content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\">";
  content+=record.valuesInfo;

  content+='<div class="mb-2">';
  if (typeof(record.valuesFormula)=='string' && record.valuesFormula!='') {
    const formulaId=record.id+'ValuesFormula';
    content+='<button class="btn btn-success my-1 bi-arrows-expand me-3" type="button" id="'+formulaId+'Button" data-bs-toggle="collapse" data-bs-target="#'+formulaId+'" aria-expanded="false" aria-controls="'+formulaId+'" onclick="valuesFormulaVisiblity(\''+formulaId+'\',\''+formulaId+'Button\')">';
    content+=" "+language.model.formulaShow;
    content+='</button>';
  }
  if (record.valuesTilesButtons) content+=record.valuesTilesButtons;
  content+='</div>';

  if (typeof(record.valuesFormula)=='string' && record.valuesFormula!='') {
    const formulaId=record.id+'ValuesFormula';
    content+='<div class="collapse mb-3" id="'+formulaId+'">';
    content+='<div class="card card-body">';
    content+=record.valuesFormula;
    content+='</div>';
    content+='</div>';
  }

  content+=record.valuesTiles;

  if (typeof(record.valuesInfoCards)!='undefined') {
    content+="<div class=\"row\">";
    const len=record.valuesInfoCards.length;
    const width=Math.round(12/len);
    for (let card of record.valuesInfoCards) {
      content+="<div class=\"col-lg-"+width+"\"><div class=\"card\">";
      content+="<div class=\"card-header\"><h5>"+card.head+"</h5></div>";
      content+="<div class=\"card-body\">"+card.body+"</div>";
      content+="</div></div>";
    }
    content+="</div>";
  }

  initObserver(record.id+"Values",content);

  /* Tabelle */

  if (typeof(record.tableTiles)!='undefined') {
    block+="<div class=\"tab-pane fade\" id=\""+record.id+"Table\" role=\"tabpanel\">";
    block+="</div>";

    content="";
    content+="<h2>"+record.title+"</h2>";
    content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
    content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\">";
    if (typeof(record.tableInfo)!='undefined') content+=record.tableInfo;
    if (record.tableTilesButtons) content+=record.tableTilesButtons;
    content+=record.tableTiles;

    initObserver(record.id+"Table",content);
  }

  /* Diagramm */

  if (typeof(record.diagramTiles)!='undefined') {
    block+="<div class=\"tab-pane fade\" id=\""+record.id+"Diagram\" role=\"tabpanel\">";
    block+="</div>";

    content="";
    content+="<h2>"+record.title+"</h2>";
    content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
    content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\">";
    content+=record.diagramInfo;
    if (record.diagramTilesButtons) content+=record.diagramTilesButtons;
    content+=record.diagramTiles;

    initObserver(record.id+"Diagram",content);
  }

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

function buildInputField(id, value, isPercent, updateCallback, label, errorInfo='') {
  if (typeof(value)=='number') {
    if (isPercent) {
      value=(value*100).toLocaleString()+"%";
    } else {
      value=value.toLocaleString();
    }
  }
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

function buildInputTile(size, title, id, value, isPercent, updateCallback, label, errorInfo, info='', info2='') {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h5>"+title+"</h5></div>";
  block+="<div class=\"card-body\">";
  block+="<p class=\"card-text\">"+buildInputField(id,value,isPercent,updateCallback,label,errorInfo)+"</p>";
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

function buildRangeTile(size, title, id, value, step, valueTo, isPercent, tabChangeCallback, updateCallback, label, errorInfo='', errorInfoStep='', active=false) {
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
  block+=buildInputField(id+"_Fix_Input",value,isPercent,updateCallback,label,errorInfo);
  block+="</div>";
  block+="<div class=\"tab-pane"+(active?" show active":"")+"\" id=\""+id+"_Variabel\" role=\"tabpanel\">";
  block+=buildInputField(id+"_Variabel_From",value,isPercent,updateCallback,language.GUI.modeRangeStart+" "+label,errorInfo);
  block+=buildInputField(id+"_Variabel_Step",step,isPercent,updateCallback,language.GUI.modeRangeStep,errorInfoStep);
  block+=buildInputField(id+"_Variabel_To",valueTo,isPercent,updateCallback,language.GUI.modeRangeEnd+" "+label,errorInfo);
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

  add(name, label, id, valueFrom, valueStep, valueTo, errorValue, errorStep, info1, info2, format, optional=false, variable=true) {
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
    tile.valueIsPercent=this.#formatIsPercent(format);
    tile.optional=optional;
    tile.variable=variable;
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

  get valueTilesButtons() {
    let block='';

    block+='<button type="button" class="btn btn-warning my-1 bi-arrows-collapse '+this.formula+'ValuesInfoHide" onclick="hideValueInfo(\''+this.formula+'\')"> '+language.model.explanationsHide+'</button>';
    block+='<button type="button" class="btn btn-success my-1 bi-arrows-expand '+this.formula+'ValuesInfoShow" onclick="showValueInfo(\''+this.formula+'\')" style="display: none;"> '+language.model.explanationsShow+'</button>';

    return block;
  }

  get valueTiles() {
    let block='';

    block+="<div class=\"row\" id=\""+this.formula+"InputArea\">";

    for (let tile of this.tiles) {
      if (tile.type=="input") {
        block+=buildInputTile(
          3,
          tile.name,
          this.formula+"Values_"+tile.id,
          tile.valueFrom,
          tile.valueIsPercent,
          "update"+this.formula+"Values",
          tile.label,
          tile.errorValue,
          tile.info1,
          tile.info2,
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
    let block="<div class=\"row\" id=\""+this.formula+mode+"InputArea\">";

    let firstInput=true;
    for (let tile of this.tiles) {
      if (tile.type=="input") {
        if (tile.variable) {
          block+=buildRangeTile(
            3,
            tile.name,
            this.formula+mode+"_"+tile.id,
            tile.valueFrom,
            tile.valueStep,
            tile.valueTo,
            tile.valueIsPercent,
            "changeTab"+this.formula+mode,
            "update"+this.formula+mode,
            tile.label,
            tile.errorValue,
            tile.errorStep,
            firstInput
          );
          firstInput=false;
        } else {
          block+=buildInputTile(
            3,
            tile.name,
            this.formula+mode+"_"+tile.id,
            tile.valueFrom,
            tile.valueIsPercent,
            "update"+this.formula+mode,
            tile.label,
            tile.errorValue,
            tile.info1,
            tile.info2,
          );
        }
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

  #formatIsPercent(format) {
    if (format=='rho') return true;
    return false;
  }

  #loadValue(id, format) {
    if (format=='PositiveFloat') return getPositiveFloat(id);
    if (format=='NotNegativeFloat') return getNotNegativeFloat(id);
    if (format=='PositiveInt') return getPositiveInt(id);
    if (format=='NotNegativeInt') return getNotNegativeInt(id);
    if (format=='rho') {const value=getNotNegativeFloat(id); return (value==null || value>=1.0)?null:value;}
    return null;
  }

  get valuesValues() {
    const values=[];
    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      let value=null;
      if (tile.type=="input") {
        const id=this.formula+'Values_'+tile.id;
        value=this.#loadValue(id,tile.format);
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
      if (tile.type=="input" && tile.variable && isVariabel(this.formula+mode+'_'+tile.id)) {hasVariabelParameter=true; break;}
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
        if (tile.variable) {
          if (isVariabel(this.formula+mode+'_'+tile.id)) {
            const from=this.#loadValue(id+'From',tile.format);
            const step=this.#loadValue(id+'Step',tile.format);
            const to=this.#loadValue(id+'To',tile.format);
            if (from==null || step==null || to==null) {
              document.getElementById(this.formula+mode+'_results').innerHTML=tile.optional?language.model.noParameterChosen:language.model.invalid;
              return null;
            }
            value=[from, step, to];
          } else {
            const id=this.formula+mode+'_'+tile.id+'_Fix_Input';
            value=this.#loadValue(id,tile.format);
            if (value==null && !tile.optional) {
              document.getElementById(this.formula+mode+'_results').innerHTML=language.model.invalid;
              return null;
            }
          }
        } else {
          const id=this.formula+mode+'_'+tile.id;
          value=this.#loadValue(id,tile.format);
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
  for (let element of document.getElementsByClassName(formula+'ValuesInfoHide')) element.style.display="none";
  for (let element of document.getElementsByClassName(formula+'ValuesInfoShow')) element.style.display="";

  const modes=["InputArea","TableInputArea", "DiagramInputArea"];

  for (let mode of modes) {
    for (let element of document.querySelectorAll('#'+formula+mode+' .card-input-info1')) element.classList.add("hidden");
    for (let element of document.querySelectorAll('#'+formula+mode+' .card-input-info2')) element.classList.add("hidden");
    for (let element of document.querySelectorAll('#'+formula+mode+' .card-body')) element.style.padding='0rem 1rem';
  }
}

function showValueInfo(formula) {
  for (let element of document.getElementsByClassName(formula+'ValuesInfoHide')) element.style.display="";
  for (let element of document.getElementsByClassName(formula+'ValuesInfoShow')) element.style.display="none";

  const modes=["InputArea","TableInputArea", "DiagramInputArea"];

  for (let mode of modes) {
    for (let element of document.querySelectorAll('#'+formula+mode+' .card-input-info1')) element.classList.remove("hidden");
    for (let element of document.querySelectorAll('#'+formula+mode+' .card-input-info2')) element.classList.remove("hidden");
    for (let element of document.querySelectorAll('#'+formula+mode+' .card-body')) element.style.padding='1rem 1rem';
  }
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
    this.headingInfo=[];
    this.rows=[];
    this.cols=null;
  }

  addHeading(column, info) {
    this.heading.push(column);
    this.headingInfo.push((typeof(info)=='undefined')?"":info);
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
      if (column==null) this.cols.push(''); else this.cols.push(column+' '+unit); /* Das Leerzeichen zwischen dem Zahlenwert und der Einheit (meist '%') ist notwendig, damit die Diagrammkomponente den Wert als Protenzangabe interpretieren kann. */
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

  get legend() {
    const result=[];
    for (let i=0;i<this.heading.length;i++) result.push("<b>"+this.heading[i]+"</b>="+this.headingInfo[i]);
    return result;
  }

  get legendHtml() {
    return "<p class='small'>"+this.legend.join("<br>")+"</p>";
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

  get buttons() {
    let downloadCode="";
    downloadCode="const element=document.createElement(\"a\");";
    downloadCode+="element.href=\"data:attachment/text,\"+encodeURI(atob(\""+btoa(this.text)+"\"));";
    downloadCode+="element.download=\"table.txt\";";
    downloadCode+="element.click();";

    let html="";
    html+="<p>";
    html+="<button type='button' class='btn btn-primary bi-clipboard my-1' onclick='navigator.clipboard.writeText(atob(\""+btoa(this.text)+"\"));'> "+language.GUI.copyTable+"</button>"
    html+="&nbsp";
    html+="<button type='button' class='btn btn-primary bi-download my-1' onclick='"+downloadCode+"'> "+language.GUI.saveTable+"</button>"
    html+="</p>";

    html+=this.legendHtml;

    return html;
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

    html+='<p class="small">'+ySetup.map(setup=>setup.columnIndex).map(index=>"<b>"+this.removeSpecialChars(this.heading[index])+"</b>="+this.headingInfo[index]).join("<br>")+'</p>';

    html+='<p class="small">'+language.GUI.diagramInfo+'</p>';

    let downloadCodeTable="";
    downloadCodeTable="const element=document.createElement(\"a\");";
    downloadCodeTable+="element.href=\"data:attachment/text,\"+encodeURI(atob(\""+btoa(this.text)+"\"));";
    downloadCodeTable+="element.download=\"table.txt\";";
    downloadCodeTable+="element.click();";

    let downloadCodeImage="";
    downloadCodeImage="const element=document.createElement(\"a\");";
    downloadCodeImage+="element.href=document.getElementById(\""+id+"_plot\").toDataURL(\"image/png\");";
    downloadCodeImage+="element.download=\"diagram.png\";";
    downloadCodeImage+="element.click();";

    html+="<p>";

    html+="<div class='dropdown' style='display: inline-block;'>";
    html+="<button class='btn btn-primary bi-clipboard dropdown-toggle my-1' type='button' data-bs-toggle='dropdown' aria-expanded='false'>&nbsp;"+language.GUI.copyDiagram+"</button>";
    html+="<ul class='dropdown-menu'>";
    html+="<li><a class='dropdown-item' style='cursor: pointer;' onclick='navigator.clipboard.writeText(atob(\""+btoa(this.text)+"\"));'>"+language.GUI.copyDiagramTable+"</a></li>";
    html+="<li><a class='dropdown-item' style='cursor: pointer;' onclick='if (typeof(ClipboardItem)!=\"undefined\") { document.getElementById(\""+id+"_plot\").toBlob(blob=>navigator.clipboard.write([new ClipboardItem({\"image/png\": blob})])); } else {alert(\""+language.GUI.copyDiagramImageError+"\")}'>"+language.GUI.copyDiagramImage+"</a></li>";
    html+="</ul>";
    html+="</div>";
    html+="&nbsp;";
    html+="<div class='dropdown' style='display: inline-block;'>";
    html+="<button class='btn btn-primary bi-download dropdown-toggle my-1' type='button' data-bs-toggle='dropdown' aria-expanded='false'>&nbsp;"+language.GUI.saveDiagram+"</button>";
    html+="<ul class='dropdown-menu'>";
    html+="<li><a class='dropdown-item' style='cursor: pointer;' onclick='"+downloadCodeTable+"'>"+language.GUI.saveDiagramTable+"</a></li>";
    html+="<li><a class='dropdown-item' style='cursor: pointer;' onclick='"+downloadCodeImage+"'>"+language.GUI.saveDiagramImage+"</a></li>";
    html+="</ul>";
    html+="</div>";

    html+="</p>";

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