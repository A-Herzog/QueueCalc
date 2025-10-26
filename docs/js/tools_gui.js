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

export {selectLanguage, buildMultiNavDropdown, showTab, initObserver, getPlaceholder, getNextStepsButtons, getSimplePlaceholder, TilesBuilder, Table}

import {getPositiveFloat, getNotNegativeFloat, getPositiveInt, getNotNegativeInt, isVariabel, setValid} from './tools.js';
import {language} from './Language.js';
import {permaLinkLoadingDone} from './PermalinkTools.js';

/* Language selection */

/**
 * Ensures the current location is the location for the right language.
 * @param {String} file
 */
function selectLanguageFile(file) {
  if (window.location.pathname.endsWith(file)) return false;
  window.location.pathname=document.location.pathname.substring(0,document.location.pathname.lastIndexOf("/")+1)+file;
}

/**
 * Selects the language of the web app by the preferred browser language or the user selection (via local storage)
 * @param {Array} languages Object containing the language ids and the names of the web app main files per language
 */
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

/* Menu */

/**
 * Generates the html code for a dropdown menu as text
 * @param {String} id Base name for the id of the menu (the id will be this string with "Menu" added)
 * @param {String} name Name for the menu to be shown in the menu bar
 * @param {Array} records Array of entries in the menu
 * @returns {String}  Html code for the menu
 */
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
    const showValues2=(typeof(record.modes)!='undefined' && record.modes.values2==true);
    const showTable=(typeof(record.modes)=='undefined' || record.modes.table==true);
    const showDiagram=(typeof(record.modes)=='undefined' || record.modes.diagram==true);
    if (showValues && !showTable && !showDiagram) {
      block+="<li role=\"tab\" id=\"menu"+record.id+"Values\"><a class=\"dropdown-item bi-123\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Values\" data-bs-target=\"#"+record.id+"Values\"> "+language.GUI.modeValuesOnly+"</a></li>";
    } else {
      if (showValues) {
        block+="<li role=\"tab\" id=\"menu"+record.id+"Values\"><a class=\"dropdown-item bi-123\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Values\" data-bs-target=\"#"+record.id+"Values\"> "+language.GUI.modeValues+"</a></li>";
      }
      if (showTable) {
        block+="<li role=\"tab\" id=\"menu"+record.id+"Table\"><a class=\"dropdown-item bi-table\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Table\" data-bs-target=\"#"+record.id+"Table\"> "+language.GUI.modeTable+"</a></li>";
      }
      if (showDiagram) {
        block+="<li role=\"tab\" id=\"menu"+record.id+"Diagram\"><a class=\"dropdown-item bi-graph-up\" data-bs-toggle=\"tab\" href=\"#"+record.id+"Diagram\" data-bs-target=\"#"+record.id+"Diagram\"> "+language.GUI.modeDiagram+"</a></li>";
      }
      if (showValues2) {
        block+="<li role=\"tab\" id=\"menu"+record.id+"2Values\"><a class=\"dropdown-item bi-person-plus\" data-bs-toggle=\"tab\" href=\"#"+record.id+"2Values\" data-bs-target=\"#"+record.id+"2Values\"> "+language.GUI.modeValues2+"</a></li>";
      }
    }
  }
  block+="</ul>";

  li.innerHTML=block;

  return li;
}

/**
 * Activates a page of the web app (as a tab)
 * @param {String} id Id attribute value of the element to be shown as tab
 */
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

/* Placeholders for the tabs */

/**
 * Configures the button to show or hide the formulas for a queueing model
 * @param {String} elementId Value of the id attribute of the formulas area from which visibility the button configuration should be derived
 * @param {String} buttonId Value of the id attribute of the button to change
 */
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

/**
 * Added the content to a placeholder element when it gets visible for the first time.
 * @param {String} elementId Value of the id attribute of the element which should be filled when it gets visible for the first time
 * @param {String} content Content for the element
 */
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

/**
 * Generates the html code for the placeholders for individual values, table and diagram for a queueing model
 * @param {Object} record Configuration of the queueing model
 * @returns {String} Html code as text
 */
function getPlaceholder(record) {
  let block="";
  let content;

  if (typeof(record.imageMaxWidth)=='undefined') record.imageMaxWidth=650;

  /* Individual values */

  block+="<div class=\"tab-pane fade\" id=\""+record.id+"Values\" role=\"tabpanel\">";
  block+="</div>";

  content="";
  content+="<h2>"+record.title+"</h2>";

  content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
  const dark=(document.documentElement.dataset.bsTheme=='dark')?"_dark":"";
  content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\" alt=\""+language.GUI.ModelImage+" - "+record.title+"\" title=\""+language.GUI.ModelImage+" - "+record.title+"\">";
  content+=record.valuesInfo;

  content+='<div class="mb-2">';
  if (typeof(record.valuesFormula)=='string' && record.valuesFormula!='') {
    const formulaId=record.id+'ValuesFormula';
    content+='<button class="btn btn-success my-1 bi-arrows-expand me-3" type="button" id="'+formulaId+'Button" data-bs-toggle="collapse" data-bs-target="#'+formulaId+'" aria-expanded="false" aria-controls="'+formulaId+'" onclick="valuesFormulaVisiblity(\''+formulaId+'\',\''+formulaId+'Button\')">';
    content+=" "+language.model.formulaShow;
    content+='</button>';
  }
  if (record.valuesTilesButtons) content+=record.valuesTilesButtons;
  if (!isDesktopApp) {
    content+="<a href=\"\" id=\""+record.id+"ValuesPermalink\">"+language.GUI.Permalink+"</a>";
  }
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
      content+="<div class=\"card-header\"><h3 class='h5'>"+card.head+"</h3></div>";
      content+="<div class=\"card-body\">"+card.body+"</div>";
      content+="</div></div>";
    }
    content+="</div>";
  }

  initObserver(record.id+"Values",content);

  /* Individual values (2) */

  if (record.valuesTiles2) {

    block+="<div class=\"tab-pane fade\" id=\""+record.id+"2Values\" role=\"tabpanel\">";
    block+="</div>";

    content="";
    content+="<h2>"+record.title+"</h2>";

    content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
    const dark=(document.documentElement.dataset.bsTheme=='dark')?"_dark":"";
    content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\" alt=\""+language.GUI.ModelImage+" - "+record.title+"\" title=\""+language.GUI.ModelImage+" - "+record.title+"\">";
    content+=record.values2Info;

    content+='<div class="mb-2">';
    if (typeof(record.valuesFormula)=='string' && record.valuesFormula!='') {
      const formulaId=record.id+'2ValuesFormula';
      content+='<button class="btn btn-success my-1 bi-arrows-expand me-3" type="button" id="'+formulaId+'Button" data-bs-toggle="collapse" data-bs-target="#'+formulaId+'" aria-expanded="false" aria-controls="'+formulaId+'" onclick="valuesFormulaVisiblity(\''+formulaId+'\',\''+formulaId+'Button\')">';
      content+=" "+language.model.formulaShow;
      content+='</button>';
    }
    if (record.valuesTiles2Buttons) content+=record.valuesTiles2Buttons;
    if (!isDesktopApp) {
      content+="<a href=\"\" id=\""+record.id+"2ValuesPermalink\">"+language.GUI.Permalink+"</a>";
    }
    content+='</div>';

    if (typeof(record.valuesFormula)=='string' && record.valuesFormula!='') {
      const formulaId=record.id+'2ValuesFormula';
      content+='<div class="collapse mb-3" id="'+formulaId+'">';
      content+='<div class="card card-body">';
      content+=record.valuesFormula;
      content+='</div>';
      content+='</div>';
    }

    content+=record.valuesTiles2;

    if (typeof(record.valuesInfoCards)!='undefined') {
      content+="<div class=\"row\">";
      const len=record.valuesInfoCards.length;
      const width=Math.round(12/len);
      for (let card of record.valuesInfoCards) {
        content+="<div class=\"col-lg-"+width+"\"><div class=\"card\">";
        content+="<div class=\"card-header\"><h3 class='h5'>"+card.head+"</h3></div>";
        content+="<div class=\"card-body\">"+card.body+"</div>";
        content+="</div></div>";
      }
      content+="</div>";
    }

    initObserver(record.id+"2Values",content);
  }

  /* Table */

  if (typeof(record.tableTiles)!='undefined') {
    block+="<div class=\"tab-pane fade\" id=\""+record.id+"Table\" role=\"tabpanel\">";
    block+="</div>";

    content="";
    content+="<h2>"+record.title+"</h2>";

    content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
    content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\" alt=\""+language.GUI.ModelImage+" - "+record.title+"\" title=\""+language.GUI.ModelImage+" - "+record.title+"\">";
    if (typeof(record.tableInfo)!='undefined') content+=record.tableInfo;

    if (record.tableTilesButtons) content+=record.tableTilesButtons;

    content+="<a href=\"\" id=\""+record.id+"TablePermalink\">"+language.GUI.Permalink+"</a>";

    content+=record.tableTiles;

    initObserver(record.id+"Table",content);
  }

  /* Diagram */

  if (typeof(record.diagramTiles)!='undefined') {
    block+="<div class=\"tab-pane fade\" id=\""+record.id+"Diagram\" role=\"tabpanel\">";
    block+="</div>";

    content="";
    content+="<h2>"+record.title+"</h2>";

    content+="<button type=\"button\" class=\"btn-close\" aria-label=\"Close\" onclick=\"showTab('Home');\"></button><br>";
    content+="<img class=\"img-fluid\" loading=\"lazy\" style=\"margin: 20px 0px; width: 100%; max-width: "+record.imageMaxWidth+"px;\" src=\"./images/"+record.id+"_"+language.GUI.imageMode+dark+".svg\" alt=\""+language.GUI.ModelImage+" - "+record.title+"\" title=\""+language.GUI.ModelImage+" - "+record.title+"\">";
    content+=record.diagramInfo;

    if (record.diagramTilesButtons) content+=record.diagramTilesButtons;

    content+="<a href=\"\" id=\""+record.id+"DiagramPermalink\">"+language.GUI.Permalink+"</a>";

    content+=record.diagramTiles;

    initObserver(record.id+"Diagram",content);
  }

  return block;
}

/**
 * Returns an object containing title and content of the "Next steps" box on the individual values tab.
 * @param {String} id Base id for the current queueing model
 * @param {String} tableButtonText Text in the "Table" button
 * @param {String} diagramButtonText Text in the "Diagram" button
 * @returns {Object}  Object with attributes "head" and "body" with information for the "Next steps" box
 */
function getNextStepsButtons(id, tableButtonText, diagramButtonText) {
  return {
   head: language.GUI.nextSteps,
  body:
    "<button onclick=\"showTab('"+id+"Table');\" class=\"btn btn-primary my-1 bi-arrow-right-circle\"> "+tableButtonText+"</button>"+
    "<button onclick=\"showTab('"+id+"Diagram');\" class=\"btn btn-primary my-1 bi-arrow-right-circle\"> "+diagramButtonText+"</button>"
  };
}

/**
 * Generates the html code for a plain placeholder element (not for individual values, tables and diagrams).
 * @param {String} id Full id value for the placeholder
 * @returns {String} Html code of the placeholder element as text
 */
function getSimplePlaceholder(id) {
  let block="";

  block+="<div class=\"tab-pane fade\" id=\""+id+"\" role=\"tabpanel\">";
  block+="</div>";

  return block;
}

/* Input lines */

/**
 * Generates the html code for an input element (for a fixed value, not multiple element for a range).
 * @param {String} id Value for the id attribute of the input element
 * @param {any} value Initial value (can be a string or a number)
 * @param {Boolean} isPercent If this is true and if the initial value is a number its converted to a percent string
 * @param {String} updateCallback Name of the callback function to be invoked on changes
 * @param {String} label  Label to be displayed before the input element ("label:=")
 * @param {String} errorInfo Error info to be shown below the input element if the element is switched to invalid
 * @returns {String} Html code of the input element (and the surrounding elements) as text
 */
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
  block+="<label class=\"input-group-text\" for=\""+id+"\">"+label+":=</label>";
  let percentInfo="";
  if (isPercent) percentInfo=" data-percent='true'";
  block+="<input type=\"text\" class=\"form-control\" id=\""+id+"\" value=\""+value+"\" oninput=\""+updateCallback+"()\""+percentInfo+">";
  if (errorInfo!='') block+="<div class=\"invalid-feedback\">"+errorInfo+"</div>";
  block+="</div>";
  block+="</form></p>";
  block+="<script>";
  block+="document.getElementById('"+id+"').addEventListener(\"keypress\",function(event) {if (event.key===\"Enter\") event.preventDefault();});";
  block+="</script>";

  return block;
}

/**
 * Generates the html code for a yes/no switch element.
 * @param {String} id Value for the id attribute of the element
 * @param {String} updateCallback Name of the callback function to be invoked on changes
 * @param {String} label Label to be shown on the right side of the switch
 * @returns {String} Html code of the element (and the surrounding elements) as text
 */
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

/* Input tiles */

/**
 * Generates the html code for a tile containing an input element for an individual value.
 * @param {Number} size Width in boostrap columns
 * @param {String} title Title of the tile
 * @param {String} id Value for the id attribute of the input element
 * @param {any} value Initial value (can be a string or a number)
 * @param {Boolean} isPercent If this is true and if the initial value is a number its converted to a percent string
 * @param {String} updateCallback Name of the callback function to be invoked on changes
 * @param {String} label  Label to be displayed before the input element ("label:=")
 * @param {String} errorInfo  Error info to be shown below the input element if the element is switched to invalid
 * @param {String} info Text to be shown directly below the input element (optional)
 * @param {String} info2 Text to be shown in the footer of the tile (optional)
 * @returns {String} Html code of the tile as text
 */
function buildInputTile(size, title, id, value, isPercent, updateCallback, label, errorInfo, info='', info2='') {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class='h5'>"+title+"</h3></div>";
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

/**
 * Generates the html code for a tile containing a single input element (fixed value) and three input elements (start, step, end) for a range value as tabs.
 * @param {Number} size Width in boostrap columns
 * @param {String} title Title of the tile
 * @param {*} id Base id of the elements
 * @param {any} value Initial value (can be a string or a number) for the fixed value input element and for the start input element in range mode
 * @param {any} step Initial value for the step input element
 * @param {any} valueTo Initial value for the end value input element
 * @param {Boolean} isPercent If this is true and if the initial value is a number its converted to a percent string
 * @param {String} tabChangeCallback Name of the callback function to be invoked on switching between fixed value and range mode
 * @param {String} updateCallback Name of the callback function to be invoked on changes in the input elements
 * @param {String} label Label to be displayed before the fixed value, the start and the end value input element ("label:=")
 * @param {String} errorInfo Error info to be shown below the fixed value and the start/end value input elements if the elements are switched to invalid (optional)
 * @param {String} errorInfoStep Error info to be shown below the step wide range input element if the element is switched to invalid (optional)
 * @param {Boolean} active Is range mode initially active? (optional)
 * @returns {String} Html code of the tile as text
 */
function buildRangeTile(size, title, id, value, step, valueTo, isPercent, tabChangeCallback, updateCallback, label, errorInfo='', errorInfoStep='', active=false) {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class='h5'>"+title+"</h3></div>";
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

/**
 * Generates the html code for a tile containing switches.
 * @param {Number} size Width in boostrap columns
 * @param {String} title Title of the tile
 * @param {Array} ids Array of the ids of the switches
 * @param {String} updateCallback Name of the callback function to be invoked on changes to the switches
 * @param {Array} labels Array of the labels to be displayed next to the switches
 * @param {String} info Text to be shown directly below the switches (optional)
 * @param {String} info2 Text to be shown in the footer of the tile (optional)
 * @returns {String} Html code of the tile as text
 */
function buildSwitchTile(size, title, ids, updateCallback, labels, info='', info2='') {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class='h5'>"+title+"</h3></div>";
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

/* Output tiles */

/**
 * Generates the html code for an output tile
 * @param {String} id Value of the id attribute of the content element in the tile
 * @returns {String} Html code of the tile as text
 */
function buildResultsTile(id) {
  let block="";

  block+="<div class=\"row\">";
  block+="<div class=\"col-lg-12\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class='h5'>"+language.GUI.results+"</h3></div>";
  block+="<div class=\"card-body\">";
  block+="<p class=\"card-text\" id=\""+id+"_results\">";
  block+="</p>";
  block+="</div>";
  block+="</div></div>";
  block+="</div>";

  return block;
}

/* Tiles system */

/**
 * System for generating and managing input tiles.
 */
class TilesBuilder {
  /**
   * Constructor
   * @param {String} formula Base name for the formula display system for the queueing system
   */
  constructor(formula) {
    this.formula=formula;
    this.tiles=[];
  }

  /**
   * Adds an input tile.
   * @param {String} name Name to be shown in the title of the tile.
   * @param {String} label Label to be displayed before the fixed value, the start and the end value input element ("label:=")
   * @param {String} id Base id for the input elements
   * @param {any} valueFrom Initial start value and initial fixed value
   * @param {any} valueStep Initial step size
   * @param {any} valueTo Initial end value
   * @param {String} errorValue Error info to be shown below the fixed value and the start/end value input elements if the elements are switched to invalid (optional)
   * @param {String} errorStep Error info to be shown below the step wide range input element if the element is switched to invalid
   * @param {String} info Text to be shown directly below the input element (optional)
   * @param {String} info2 Text to be shown in the footer of the tile (optional)
   * @param {String} format One of the values 'PositiveFloat', 'NotNegativeFloat', 'PositiveInt', 'NotNegativeInt' or 'rho'
   * @param {Boolean} optional Is this value optional for calculating the model? (optional, defaults to false)
   * @param {Boolean} variable Can this value be switched to range mode? (optional, defaults to true)
   */
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

  /**
   * Adds a tile containing switches.
   * @param {String} name Name to be shown in the title of the tile.
   * @param {Array} labels Array of the labels to be displayed next to the switches
   * @param {Array} ids Array of the ids of the switches
   * @param {String} info Text to be shown directly below the input element (optional)
   * @param {String} info2 Text to be shown in the footer of the tile (optional)
   */
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

  /**
   * {String} Returns the html code for the show/hide formulas and the show/hide tile information buttons.
   */
  get valueTilesButtons() {
    let block='';

    block+='<button type="button" class="btn btn-warning my-1 me-3 bi-arrows-collapse '+this.formula+'ValuesInfoHide" onclick="hideValueInfo(\''+this.formula+'\')"> '+language.model.explanationsHide+'</button>';
    block+='<button type="button" class="btn btn-success my-1 me-3 bi-arrows-expand '+this.formula+'ValuesInfoShow" onclick="showValueInfo(\''+this.formula+'\')" style="display: none;"> '+language.model.explanationsShow+'</button>';

    return block;
  }

  /**
   * {String} Return the html code for the configured tiles in individual values mode.
   */
  get valueTiles() {
    let block='';

    /* Input area */
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

    /* Output area */
    block+=buildResultsTile(this.formula+"Values");

    return block;
  }

  /**
   * Return the html code for the configured tiles in range mode (this means for tables and diagrams).
   * @param {String} mode Additional value for the id tags (usually "Table" or "Diagram")
   * @returns {String}  Html code for the range tiles as text
   */
  #rangeTiles(mode) {
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

  /**
   * Return the html code for the configured tiles in range mode for tables.
   */
  get tableTiles() {
    return this.#rangeTiles('Table');
  }

  /**
   * Return the html code for the configured tiles in range mode for diagrams.
   */
  get diagramTiles() {
    return this.#rangeTiles('Diagram');
  }


  /**
   * Returns the ids of all input elements in range mode for tables or diagrams.
   * @param {String} mode Additional value for the id tags (usually "Table" or "Diagram")
   * @returns {Array} List of all id attribute values of the input elements
   */
  #getIDs(mode) {
    const IDs=[];
    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      IDs.push(this.formula+mode+"_"+tile.id);
    }
    return IDs;
  }

  #updateTabsWorking=false;

  /**
   * Notifies the elements that the fixed/range tab has changed.
   * @param {Object} sender Changed input element
   * @param {String} mode "Table" or "Diagram"
   */
  updateTabs(sender, mode) {
    if (this.#updateTabsWorking) return;
    this.#updateTabsWorking=true;
    const changedId=sender.getAttribute("data-bs-target");
    const allIds=this.#getIDs(mode);

    if (!changedId.endsWith("_Fix"))
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

  /**
   * Tests if a format is a percent style format.
   * @param {String} format Format (one of 'PositiveFloat', 'NotNegativeFloat', 'PositiveInt', 'NotNegativeInt' or 'rho')
   * @returns {Boolean} Returns true, if the format is a percent style format.
   */
  #formatIsPercent(format) {
    if (format=='rho' || format=='reject' || format=='servicelevel' || format=='PUp') return true;
    return false;
  }

  /**
   * Reads the numerical value from one input element.
   * @param {String} id Value of the id attribute of the input element
   * @param {String} format Format (one of 'PositiveFloat', 'NotNegativeFloat', 'PositiveInt', 'NotNegativeInt' or 'rho')
   * @returns {Number} Returns the number or null, if the value in the input element is invalid
   */
  #loadValue(id, format) {
    if (format=='PositiveFloat') return getPositiveFloat(id);
    if (format=='NotNegativeFloat') return getNotNegativeFloat(id);
    if (format=='PositiveInt') return getPositiveInt(id);
    if (format=='NotNegativeInt') return getNotNegativeInt(id);
    if (format=='rho') {const value=getNotNegativeFloat(id); return (value==null || value>=1.0 || value==0)?null:value;}
    if (format=='reject') {const value=getNotNegativeFloat(id); return (value==null || value>=1.0)?null:value;}
    if (format=='servicelevel') {const value=getNotNegativeFloat(id); return (value==null || value>1.0)?null:value;}
    if (format=='PUp') {const value=getNotNegativeFloat(id); return (value==null || value>1.0 || value==0)?null:value;}
    return null;
  }

  #buildPermalink(mode, values) {
    /* Collect values */
    const settings=new Map();
    for (let i=0;i<Math.min(this.tiles.length,values.length);i++) {
      const id=this.tiles[i].id;
      if (typeof(id)=='undefined') continue;
      const value=values[i];
      if (Array.isArray(value)) {
        settings.set(id+"From",value[0]);
        settings.set(id+"Step",value[1]);
        settings.set(id+"To",value[2]);
      } else {
        settings.set(id,value);
      }
    }
    const settingsArray=[];
    settings.forEach((value,key)=>settingsArray.push(key+"="+value.toLocaleString()));

    /* Get current menu item number */
    const currentItemA=document.getElementsByClassName("dropdown-item active");
    if (currentItemA.length!=1) return;
    const currentItemId=currentItemA[0].parentNode.id;
    if (!currentItemId.startsWith("menu")) return null;
    const currentFunction="function="+currentItemId.substring(4);

    /* Get location */
    const url=window.location.protocol+"//"+window.location.host+window.location.pathname;

    /* Build link */
    return url+"?"+currentFunction+"&"+settingsArray.join("&");
  }

  /**
   * Updates to permalink for this tile
   * @param {String} mode "Values", "Table" or "Diagram"
   * @param {*} values Current values of the input fields
   */
  #updatePermalink(mode, values) {
    const permalink=this.#buildPermalink(mode,values);
    if (permalink==null) return;

    /* Update link */
    const link=document.getElementById(this.formula+mode+"Permalink");
    if (link!=null) link.href=permalink;

    /* Update history */
    if (window.history && window.history.replaceState && permaLinkLoadingDone) {
      if (window.history.state && window.history.state.link==permalink) return;
      window.history.pushState({link: permalink}, '', permalink);
    }
  }

  /**
   * {Array} Returns a list of the numerical values from the individual values input elements (or null, if one ore multiple values are invalid).
   */
  get valuesValues() {
    const values=[];
    for (let i=0;i<this.tiles.length;i++) {
      const tile=this.tiles[i];
      let value=null;
      if (tile.type=="input") {
        const id=this.formula+'Values_'+tile.id;
        value=this.#loadValue(id,tile.format);
        if (value==null && !tile.optional) {
          setValid(id,false);
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

    this.#updatePermalink("Values",values);

    return values;
  }

  /**
   * Returns a list of the numerical values from the table or diagram values input elements (or null, if one ore multiple values are invalid).
   * @param {String} mode "Table" or "Diagram"
   * @returns {Array} List of numerical input values
   */
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
              setValid(id,false);
              document.getElementById(this.formula+mode+'_results').innerHTML=language.model.invalid;
              return null;
            }
          }
        } else {
          const id=this.formula+mode+'_'+tile.id;
          value=this.#loadValue(id,tile.format);
          if (value==null && !tile.optional) {
            setValid(id,false);
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

    this.#updatePermalink(mode,values);

    return values;
  }
}

/**
 * Hides the information elements in the tiles.
 * @param {String} formula Queueing model
 */
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

/**
 * Shows the information elements in the tiles.
 * @param {String} formula Queueing model
 */
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

/* Diagram system loader */

/** Is Chart.js already loaded? */
let chartJsLoaded=false;

/**
 * Loaded Chart.js (if not already loaded) and then executes a lambda expression.
 * @param {Function} then Will be executed when Chart.js is available.
 */
function loadChartJs(then) {
  if (chartJsLoaded) {
    then();
    return;
  }

  chartJsLoaded=true;

  const script=document.createElement("script");
  script.src="./libs/chart.umd.min.js";
  script.async = false;
  script.onload=then;
  document.head.appendChild(script);
}

/* Diagram configuration */

/**
 * Generates a Chart.js options object.
 * @param {String} xAxisTitle Title for the x-axis
 * @param {Boolean} hasTimeYAxis Will there be data sets with a time-based y-axis?
 * @param {Boolean} hasNumberYAxis Will there be data sets with a plain-numbers-based y-axis?
 * @param {Boolean} hasPercentYAxis Will there be data sets with a percent-based y-axis?
 * @returns Chart.js options object
 */
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

/* Helper functions for tables */

/**
 * Return the locale decimal separator character (for example "," in German locale and "." in English locale).
 * @returns Locale decimal separator character.
 */
function getDecimalSeparatorChar() {
    const n=1.1;
    return n.toLocaleString().substring(1,2);
}

/* Table */

/**
 * Table data handling class
 */
class Table {
  /**
   * Caption of the table
   */
  #caption;

  /**
   * Constructor
   */
  constructor(caption) {
    this.heading=[];
    this.headingInfo=[];
    this.rows=[];
    this.cols=null;
    this.#caption=caption;
  }

  /**
   * Adds a column to the table.
   * @param {String} column Text to be displayed in the column heading
   * @param {String} info Legend info for the column.
   */
  addHeading(column, info) {
    this.heading.push(column);
    this.headingInfo.push((typeof(info)=='undefined')?"":info);
  }

  /**
   * Adds a value to the next column in the current row.
   * @param {any} column Value to be displayed in the cell (String or Number)
   */
  addCol(column) {
    if (this.cols==null) this.cols=[];
    if (typeof(column)=='number') column=column.toLocaleString();
    if (column==null) this.cols.push(''); else this.cols.push(column);
  }

  /**
   * Adds a value to the next column in the current row.
   * @param {any} column Value to be displayed in the cell (String or Number)
   * @param {String} unit Unit to be displayed next to the value
   */
  addCol(column, unit) {
    if (this.cols==null) this.cols=[];
    if (typeof(column)=='number') column=column.toLocaleString();
    if (unit==null || unit=='') {
      if (column==null) this.cols.push(''); else this.cols.push(column);
    } else {
      if (column==null) this.cols.push(''); else this.cols.push(column+' '+unit); /* The space between the number and the unit (mostly "%") is required since the diagram system can not interpret the value otherwise. */
    }
  }

  /**
   * Adds a value (which is to be displayed as a percent value) to the next column in the current row.
   * @param {Number} column Value to be displayed in the cell ("0.5" will become "50 %")
   */
  addColPercent(column) {
    if (this.cols==null) this.cols=[];
    if (column==null) this.cols.push(''); else this.addCol(column*100,'%');
  }

  /**
   * Starts a new row.
   */
  #startRow() {
    if (this.cols==null) return;
    this.rows.push(this.cols);
    this.cols=null;
  }

  /**
   * Recalculates the values in the table.
   * @param {Array} input Input values
   * @param {Function} lambda Calculation lambda (will get the table object and the input as parameters)
   */
  calc(input, lambda) {
    for (let i=0;i<input.length;i++) if (typeof(input[i])=='object') {
      let range=input[i];
      if (range[2]>range[0]) {
        let rowCount=0;
        for (let v=range[0];v<=range[2];v+=range[1]) {
          const values=[];
          for (let j=0;j<input.length;j++) values.push(input[j]);
          values[i]=v;
          this.#startRow();
          lambda(this,values);
          rowCount++;
          if (rowCount>=500) break; /* Zu viele Einträge überlasten sonst ggf. die Chart-Engine */
        }
      } else {
        for (let v=range[0];v>=range[2];v-=range[1]) {
          const values=[];
          for (let j=0;j<input.length;j++) values.push(input[j]);
          values[i]=v;
          this.#startRow();
          lambda(this,values);
        }
      }
      this.xValuesCol=i;
      return;
    }
  }

  /**
   * {Array} Returns the legend as a list of html lines.
   */
  get legend() {
    const result=[];
    for (let i=0;i<this.heading.length;i++) result.push("<b>"+this.heading[i]+"</b>="+this.headingInfo[i]);
    return result;
  }

  /**
   * {String} Returns the legend as a html paragraph.
   */
  get legendHtml() {
    return "<p class='small'>"+this.legend.join("<br>")+"</p>";
  }

  #headingId(index) {
    if (index<0 || index>=this.headingInfo.length) return '';
    let id=this.#caption+' - '+this.headingInfo[index];
    id=id.replace(/[^A-Za-z0-9]/g,'');
    return id;
  }

  /**
   * {String} Returns the html code for the table.
   */
  get html() {
    this.#startRow();
    let table='<div style="overflow-x: scroll; margin: 0; padding: 0;"><table class="table table-hover"><caption style="display: none;">'+this.#caption+'</caption>';
    table+='<thead><tr>';
    for (let i=0;i<this.heading.length;i++) table+='<th scope="col" title=\"'+this.headingInfo[i]+'\" id=\"'+this.#headingId(i)+'\">'+this.heading[i]+'</th>';
    table+='</tr></thead>';
    table+='<tbody>';
    for (let i=0;i<this.rows.length;i++) {
      table+="<tr>";
      const row=this.rows[i];
      for (let j=0;j<row.length;j++) {
        let cell=row[j];
        if (cell.endsWith(' %')) cell=cell.replaceAll(' %','%');
        table+='<td headers="'+this.#headingId(j)+'">'+cell+'</td>';
      }
      table+="</tr>";
    }
    table+='</tbody>';
    table+='</table></div>';
    return table;
  }

  /**
   * {String} Returns the html code for the copy/export buttons.
   */
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

  /**
   * Removes html tags and entities from a string.
   * @param {String} s String with html tags and entities
   * @returns String without html tags and entities
   */
  #removeSpecialChars(s) {
    if (typeof(s)=='undefined') return '';
    s=s.replaceAll("<sub>","");
    s=s.replaceAll("</sub>","");
    s=s.replaceAll("&le;","<=");
    s=s.replaceAll("&gt;",">");
    s=s.replaceAll("&rho;","rho");
    return s;
  }

  /**
   * {String} Returns the table as plain text (for export / copy to clipboard).
   */
  get text() {
    this.#startRow();
    let table=this.#removeSpecialChars(this.heading[0]);
    for (let i=1;i<this.heading.length;i++) table+="\t"+this.#removeSpecialChars(this.heading[i]);
    for (let i=0;i<this.rows.length;i++) {
      table+="\n";
      const row=this.rows[i];
      table+=row[0];
      for (let j=1;j<row.length;j++) table+="\t"+row[j];
    }
    return table;
  }

  /**
   * {Number} Number of columns.
   */
  get colCount() {
    return this.heading.length;
  }

  /**
   * Returns the values in a column as numbers
   * (used as data sets for diagrams).
   * @param {Number} index 0-based index of the column
   * @returns {Array} List of all values (not including the heading) in a column as numbers
   */
  #column(index) {
    this.#startRow();

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

  /**
   * Generates a delta between the old and the new value
   * @param {String} oldValue Old value
   * @param {String} newValue New value
   * @returns Text for the delta between the values
   */
  #calcDelta(oldValue, newValue) {
    let isPercent=false;
    if (oldValue.endsWith(" %")) {
      isPercent=true;
      oldValue=oldValue.substring(0,oldValue.length-2);
    }
    if (newValue.endsWith(" %")) {
      isPercent=true;
      newValue=newValue.substring(0,newValue.length-2);
    }
    oldValue=parseFloat(oldValue.replaceAll(",","."));
    newValue=parseFloat(newValue.replaceAll(",","."));
    const delta=newValue-oldValue;

    let result=delta.toLocaleString();
    if (delta>0) result="+"+result;
    if (isPercent) result+="%";
    return result;
  }

  /**
   * Generates a html table containing one input and the defined output values and delta vales between the rows
   * @param {Object} deltaTableSetup Object has to have to properties "x": number of the input column, "y": list of the numbers of the output columns
   * @returns html code for the table
   */
  #buildDeltaTable(deltaTableSetup) {
    const html=[];

    html.push("<div style=\"overflow-x: scroll; margin: 0; padding: 0;\">");
    html.push("<table class=\"table table-hover\"><caption style=\"display: none;\">"+this.#caption+"</caption>");

    html.push("<thead>");
    html.push("<tr>");
    html.push("<th scope=\"col\" title=\""+this.headingInfo[deltaTableSetup.x]+"\" id=\""+this.#headingId(deltaTableSetup.x)+"\">"+this.heading[deltaTableSetup.x]+"</th>");
    for (let y of deltaTableSetup.y) html.push("<th scope=\"col\" title=\""+this.headingInfo[y]+"\" id=\""+this.#headingId(y)+"\">"+this.heading[y]+"</th>");
    html.push("</tr>");
    html.push("</thead>");

    html.push("<tbody>");
    let last=null;
    for (let row of this.rows) {
      if (last!=null) {
        html.push("<tr>");
        html.push("<td></td>");
        for (let y of deltaTableSetup.y) {
          const lastValue=last[y];
          const currentValue=row[y];
          html.push("<td class=\"small text-muted\" headers=\""+this.#headingId(y)+"\"><strong>&darr;</strong> "+this.#calcDelta(lastValue,currentValue)+"</td>");
        }
        html.push("</tr>");
      }

      html.push("<tr>");
      let cell=row[deltaTableSetup.x];
      if (cell.endsWith(' %')) cell=cell.replaceAll(' %','%');
      html.push("<th scope=\"row\">"+cell+"</th>");
      for (let y of deltaTableSetup.y) {
        cell=row[y];
        if (cell.endsWith(' %')) cell=cell.replaceAll(' %','%');
        html.push("<td headers=\""+this.#headingId(y)+"\">"+cell+"</td>");
      }
      html.push("</tr>");

      last=row;
    }
    html.push("</tbody>");

    html.push("</table>");
    html.push("</div>");

    return html.join("\n");
  }

  /**
   * Generates a Chart.js diagram and sets it a inner html in an existing html tag.
   * @param {String} id Value of the id attribute of the element with is to be filled with the diagram.
   * @param {Number} xColIndex 0-based index of the column to be used for the x-axis
   * @param {String} xAxisTitle Title of the x-axis
   * @param {Array} ySetup Columns setup (list of objects with attributes 'columnIndex', 'color' and 'mode')
   * @param {Object} addDeltaTable Generates a value delta table below the diagram (optional, defaults to false). Object has to have to properties "x": number of the input column, "y": list of the numbers of the output columns
   */
  diagram(id, xColIndex, xAxisTitle, ySetup, addDeltaTable=false) {
    let html='';
    html+='<canvas id="'+id+'_plot" style="width:100%;"></canvas>';

    html+='<p class="small">'+ySetup.map(setup=>setup.columnIndex).map(index=>"<b>"+this.#removeSpecialChars(this.heading[index])+"</b>="+this.headingInfo[index]).join("<br>")+'</p>';

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
    html+="<li><button class='dropdown-item' style='cursor: pointer;' onclick='navigator.clipboard.writeText(atob(\""+btoa(this.text)+"\"));'>"+language.GUI.copyDiagramTable+"</button></li>";
    html+="<li><button class='dropdown-item' style='cursor: pointer;' onclick='if (typeof(ClipboardItem)!=\"undefined\") { document.getElementById(\""+id+"_plot\").toBlob(blob=>navigator.clipboard.write([new ClipboardItem({\"image/png\": blob})])); } else {alert(\""+language.GUI.copyDiagramImageError+"\")}'>"+language.GUI.copyDiagramImage+"</button></li>";
    html+="</ul>";
    html+="</div>";
    html+="&nbsp;";
    html+="<div class='dropdown' style='display: inline-block;'>";
    html+="<button class='btn btn-primary bi-download dropdown-toggle my-1' type='button' data-bs-toggle='dropdown' aria-expanded='false'>&nbsp;"+language.GUI.saveDiagram+"</button>";
    html+="<ul class='dropdown-menu'>";
    html+="<li><button class='dropdown-item' style='cursor: pointer;' onclick='"+downloadCodeTable+"'>"+language.GUI.saveDiagramTable+"</button></li>";
    html+="<li><button class='dropdown-item' style='cursor: pointer;' onclick='"+downloadCodeImage+"'>"+language.GUI.saveDiagramImage+"</button></li>";
    html+="</ul>";
    html+="</div>";

    html+="</p>";

    if (addDeltaTable) html+=this.#buildDeltaTable(addDeltaTable);

    document.getElementById(id).innerHTML=html;

    const datasets=[];
    let hasY1=false;
    let hasY2=false;
    let hasY3=false;
    for (let i=0;i<ySetup.length;i++) {
      const setup=ySetup[i];
      const set={};
      set.label=this.#removeSpecialChars(this.heading[setup.columnIndex]);
      set.fill=false;
      set.borderColor=setup.color;
      set.data=this.#column(setup.columnIndex);
      if (setup.mode=='time') hasY1=true;
      if (setup.mode=='number') {set.yAxisID='y2'; hasY2=true;}
      if (setup.mode=='percent') {set.yAxisID='y3'; hasY3=true;}
      datasets.push(set);
    }

    const labels=this.#column(xColIndex);
    const options=getChartOptions(xAxisTitle,hasY1,hasY2,hasY3);
    loadChartJs(()=>{
      initChart(id,labels,datasets,options);
    });
  }
}

const charts=new Map();

function initChart(id, labels, datasets, options) {
  if (typeof(Chart)=='undefined') {
    setTimeout(()=>initChart(id,labels,datasets,options),100);
    return;
  }

  if (charts.has(id)) {
    charts.get(id).destroy();
  }

  const chart=new Chart(id+'_plot', {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: options
  });

  charts.set(id,chart);
}


window.addEventListener("popstate",(event)=>{
  window.location= event.state?.link || document.location.href;
});
