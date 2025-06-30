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

export {getMainGUI};

import {getPlaceholder, getNextStepsButtons, getSimplePlaceholder, showTab, initObserver} from './tools_gui.js';

import {tilesErlangB, tilesErlangB2} from './gui_ErlangB.js';
import {tilesErlangC, tilesErlangC2} from './gui_ErlangC.js';
import {tilesExtErlangC} from './gui_ExtErlangC.js';
import {tilesPC} from './gui_PC.js';
import {tilesKingman} from './gui_Kingman.js';
import {tilesAC} from './gui_AC.js';
import {tilesExtAC} from './gui_ExtAC.js';
import {tilesCompare} from './gui_Compare.js';
import {tilesShortestQueue} from './gui_ShortestQueue.js';
import {tilesEconomyOfScale} from './gui_EconomyOfScale.js';
import {tilesCallCenter} from './gui_CallCenter.js';
import {formulasErlangB, formulasErlangC, formulasExtErlangC, formulasPC, formulasKingman, formulasAC, formulasExtAC, formulasCompare, formulasShortestQueue} from './FormulaBuilder.js';
import {language} from './Language.js';

/**
 * Generates the html code for a tile for the home page.
 * @param {Number} size Width in Bootstrap columns
 * @param {String} title Text to be displayed in the tile title
 * @param {String} text Info text in the tile
 * @param {String} id Id of the queueing model
 * @param {String} imgWidth Width of the queueing model image in the tile (optional, defaults to "100%")
 * @param {Boolean} showMore Show "More information" button instead of values, table and diagram buttons (optional, defaults to false)
 * @param {String} fileFormat File extension of the image to be displayed (optional, defaults to "svg")
 * @param {String} aspectRatio Aspect ratio of the image to allow the html renderer to process before image is loaded (optional, defaults to null, which means "do not output aspect ratio information")
 * @param {Object} modes Defines if values, table and diagram buttons are to be displayed (optional, defaults to {values: true, values2: false, table: true, diagram: true})
 * @param {String} icon Html code for an optional icon to be displayed left of the tile title (optional, defaults to "")
 * @returns {String} Html code for the tile as text
 */
function buildStartTile(size, title, text, id, imgWidth="100%", showMore=false, fileFormat="svg", aspectRatio=null, modes={values: true, values2: false, table: true, diagram: true}, icon="") {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class=\"h5\">"+icon+title+"</h3></div>";
  block+="<div class=\"card-body\">";
  let aspectRatioStyle='';
  if (aspectRatio!=null) aspectRatioStyle=' aspect-ratio: '+aspectRatio+';';
  if (showMore) {
    block+="<button class='btn btn-link' onclick=\"showTab('"+id+"');\" title='"+title+"'>";
  } else {
    block+="<button class='btn btn-link' onclick=\"showTab('"+id+"Values');\" title='"+title+"'>";
  }
  const dark=(document.documentElement.dataset.bsTheme=='dark')?"_dark":"";
  block+='<img class="img-fluid" loading=\"lazy\" style="margin: 20px 0px; width: '+imgWidth+';'+aspectRatioStyle+'" src="./images/'+id+'_'+language.GUI.imageMode+dark+'.'+fileFormat+'" alt="'+title+'">';
  block+='</button>';
  block+="<p class=\"card-text\">"+text+"</p>";
  if (showMore) {
    block+="<button onclick=\"showTab('"+id+"');\" class=\"btn btn-primary my-1 bi-info-circle\"> "+language.GUI.modeMore+"</button>\n";
  } else {
    const showValues=(modes.values==true);
    const showValues2=(modes.values2==true);
    const showTable=(modes.table==true);
    const showDiagram=(modes.diagram==true);
    if (showValues && !showTable && !showDiagram) {
      block+="<button onclick=\"showTab('"+id+"Values');\" class=\"btn btn-primary my-1 bi-123\"> "+language.GUI.modeValuesOnly+"</button>\n";
    } else {
      if (showValues) block+="<button onclick=\"showTab('"+id+"Values');\" class=\"btn btn-primary my-1 bi-123\"> "+language.GUI.modeValues+"</button>\n";
      if (showTable) block+="<button onclick=\"showTab('"+id+"Table');\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.modeTable+"</button>\n";
      if (showDiagram) block+="<button onclick=\"showTab('"+id+"Diagram');\" class=\"btn btn-primary my-1 bi-graph-up\"> "+language.GUI.modeDiagram+"</button>\n";
      if (showValues2) block+="<button onclick=\"showTab('"+id+"2Values');\" class=\"btn btn-primary my-1 bi-person-plus\"> "+language.GUI.modeValues2+"</button>\n";
    }
  }
  block+="</div></div></div>";

  return block;
}

/**
 * Generates the html code for the tiles on the home page.
 * @param {Boolean} isDesktopApp Is the web app running in desktop app mode? (When its already a desktop app the download options will be hidden.)
 * @returns {String} Html code for the tiles as text
 */
function buildStartTiles(isDesktopApp) {
  let block="";

  block+="<div class=\"row\">";

  block+=buildStartTile(6,language.GUI.formulaErlangB,language.GUI.formulaErlangBInfo,"ErlangB","100%",false,"svg","114.02 / 62.19", {values: true, values2: true, table: true, diagram: true});
  block+=buildStartTile(6,language.GUI.formulaErlangC,language.GUI.formulaErlangCInfo,"ErlangC","100%",false,"svg","159.82 / 47.24", {values: true, values2: true, table: true, diagram: true});
  block+=buildStartTile(6,language.GUI.formulaExtErlangC,language.GUI.formulaExtErlangCInfo,"ExtErlangC","100%",false,"svg","159.81 / 74.6");
  block+=buildStartTile(6,language.GUI.formulaPC,language.GUI.formulaPCInfo,"PC","100%",false,"svg","159.81 / 74.6");
  block+=buildStartTile(6,language.GUI.formulaKingman,language.GUI.formulaKingmanInfo,"Kingman","100%",false,"svg","159.82 / 52.78");
  block+=buildStartTile(6,language.GUI.formulaAC,language.GUI.formulaACInfo,"AC","100%",false,"svg","159.82 / 52.78");
  block+=buildStartTile(6,language.GUI.formulaExtAC,language.GUI.formulaExtACInfo,"ExtAC","100%",false,"svg","159.82 / 74.05");
  block+=buildStartTile(6,language.GUI.formulaCompare,language.GUI.formulaCompareInfo,"Compare","100%",false,"svg","602.67 / 279.23",{values: true});
  block+=buildStartTile(6,language.GUI.formulaShortestQueue,language.GUI.formulaShortestQueueInfo,"ShortestQueue","100%",false,"svg","602.67 / 319.07");
  block+=buildStartTile(6,language.GUI.formulaEconomyOfScale,language.GUI.formulaEconomyOfScaleInfo,"EconomyOfScale","100%",false,"svg","151.34 / 93.66",{table: true, diagram: true});
  block+=buildStartTile(6,language.GUI.formulaCallCenter,language.GUI.formulaCallCenterInfo,"CallCenter","100%",false,"svg","151.34 / 61.89",{diagram: true});
  block+=buildStartTile(6,language.GUI.tabSimulation,language.GUI.tabSimulationInfo,"Simulation","100%",true,'webp','640 / 481',false,"<i class='bi-caret-right-square'></i> ");

  block+="<div class=\"col-lg-6\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class=\"h5 bi-download\"> "+language.GUI.tabDownloads+"</h3></div>";
  block+="<div class=\"card-body\">";
  if (!isDesktopApp) {
    block+="<p class=\"card-text\">"+language.GUI.tabDownloadAppInfo+"</p>";
    block+="<a id=\"downloadApp\" target=\"_blank\" href=\"https://github.com/A-Herzog/QueueCalc/releases/latest/download/QueueCalc.exe\" title=\""+language.GUI.tabDownloadAppExe+"\" style=\"display: none;\"></a>";
    block+="<button onclick=\"document.getElementById('downloadApp').click();\" class=\"btn btn-primary my-1 bi-windows\"> "+language.GUI.tabDownloadAppExe+"</button>\n";

    block+="<a id=\"downloadAppZip\" target=\"_blank\" href=\"https://github.com/A-Herzog/QueueCalc/releases/latest/download/QueueCalc_Linux_MacOS.zip\" title=\""+language.GUI.tabDownloadAppZip+"\" style=\"display: none;\"></a>";
    block+="<button onclick=\"document.getElementById('downloadAppZip').click();\" class=\"btn btn-primary my-1 bi-file-zip\"> "+language.GUI.tabDownloadAppZip+"</button>\n";

    block+="<p class=\"card-text mt-4\">"+language.GUI.tabDownloadsInfo+"</p>";
  } else {
    block+="<p class=\"card-text\">"+language.GUI.tabDownloadsInfo+"</p>";
  }
  block+="<a id=\"downloadXLSM\" target=\"_blank\" href=\"./Erlang/Erlang.xlsm\" download=\"Erlang.xlsm\" title=\""+language.GUI.tabDownloadsExcel+"\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadODS\" target=\"_blank\" href=\"./Erlang/Erlang.ods\" download=\"Erlang.ods\" title=\""+language.GUI.tabDownloadsLibreOffice+"\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadJS\" target=\"_blank\" href=\"./Erlang/Erlang.js\" download=\"Erlang.js\" title=\""+language.GUI.tabDownloadsJS+"\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadPY\" target=\"_blank\" href=\"./Erlang/Erlang.py\" download=\"Erlang.py\" title=\""+language.GUI.tabDownloadsPython+"\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadIPYNB\" target=\"_blank\" href=\"./Erlang/Erlang.ipynb\" download=\"Erlang.ipynb\" title=\""+language.GUI.tabDownloadsPythonNB+"\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadR\" target=\"_blank\" href=\"./Erlang/Erlang.R\" download=\"Erlang.R\" title=\""+language.GUI.tabDownloadsR+"\" style=\"display: none;\"></a>";

  block+="<button onclick=\"document.getElementById('downloadXLSM').click();\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.tabDownloadsExcel+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadODS').click();\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.tabDownloadsLibreOffice+"</button>\n";
  block+="<br>";
  block+="<button onclick=\"document.getElementById('downloadJS').click();\" class=\"btn btn-primary my-1 bi-code\"> "+language.GUI.tabDownloadsJS+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadPY').click();\" class=\"btn btn-primary my-1 bi-filetype-py\"> "+language.GUI.tabDownloadsPython+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadIPYNB').click();\" class=\"btn btn-primary my-1 bi-filetype-py\"> "+language.GUI.tabDownloadsPythonNB+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadR').click();\" class=\"btn btn-primary my-1 bi-code\"> "+language.GUI.tabDownloadsR+"</button>\n";

  block+="</div></div></div>";

  block+="</div>";

  return block;
}

/**
 * Generates the html code for all pages.
 * @param {Boolean} isDesktopApp Is the web app running in desktop app mode? (When its already a desktop app the download options will be hidden.)
 * @returns {String} Html code for all pages as text
 */
function getMainGUI(isDesktopApp) {
  let result="";

  /* Start */

  result+="<div class=\"tab-pane fade active show\" id=\"Home\" role=\"tabpanel\">";
  result+="<h2>"+language.GUI.Name+"</h2>";
  /*
  if (typeof(language.GUI.OtherLanguage)!="undefined" && language.GUI.OtherLanguage!="") {
    result+="<div class=\"container border bg-light rounded small\" style=\"display: inline-block; margin: 20px 0px; padding: 4px 10px; width: fit-content;\">";
    result+=language.GUI.OtherLanguage;
    result+="</div>";
  }
  */
  result+=language.text.start;
  result+=buildStartTiles(isDesktopApp);
  result+="</div>";

  /* Erlang B formula */

  result+=getPlaceholder({
    id: "ErlangB",
    title: language.GUI.formulaErlangBLong,
    valuesInfo: language.text.ErlangBValues,
    values2Info: language.text.ErlangBValues2,
    valuesTilesButtons: tilesErlangB.valueTilesButtons,
    valuesTiles2Buttons: tilesErlangB2.valueTilesButtons,
    valuesTiles: tilesErlangB.valueTiles,
    valuesTiles2: tilesErlangB2.valueTiles,
    valuesFormula: formulasErlangB,
    valuesInfoCards: [
      {head: language.GUI.formulaErlangBLimitations, body: language.text.ErlangBValuesLimitations},
      getNextStepsButtons("ErlangB",language.GUI.nextStepsErlangBTable,language.GUI.nextStepsErlangBDiagram)
    ],
    tableInfo: language.text.ErlangBTable,
    tableTiles: tilesErlangB.tableTiles,
    diagramInfo: language.text.ErlangBDiagram,
    diagramTiles: tilesErlangB.diagramTiles
  });

  /* Erlang C formula */

  result+=getPlaceholder({
    id: "ErlangC",
    title: language.GUI.formulaErlangCLong,
    valuesInfo: language.text.ErlangCValues,
    values2Info: language.text.ErlangCValues2,
    valuesTilesButtons: tilesErlangC.valueTilesButtons,
    valuesTiles2Buttons: tilesErlangC2.valueTilesButtons,
    valuesTiles: tilesErlangC.valueTiles,
    valuesTiles2: tilesErlangC2.valueTiles,
    valuesFormula: formulasErlangC,
    valuesInfoCards: [
      {head: language.GUI.formulaErlangCLimitations, body: language.text.ErlangCValuesLimitations},
      getNextStepsButtons("ErlangC",language.GUI.nextStepsErlangCTable,language.GUI.nextStepsErlangCDiagram)
    ],
    tableInfo: language.text.ErlangCTable,
    tableTiles: tilesErlangC.tableTiles,
    diagramInfo: language.text.ErlangCDiagram,
    diagramTiles: tilesErlangC.diagramTiles
  });

  /* Extended Erlang C formula*/

  result+=getPlaceholder({
    id: "ExtErlangC",
    title: language.GUI.formulaExtErlangCLong,
    valuesInfo: language.text.ExtErlangCValues,
    valuesTilesButtons: tilesExtErlangC.valueTilesButtons,
    valuesTiles: tilesExtErlangC.valueTiles,
    valuesFormula: formulasExtErlangC,
    valuesInfoCards: [
      {head: language.GUI.formulaExtErlangCLimitations, body: language.text.ExtErlangCValuesLimitations},
      getNextStepsButtons("ExtErlangC",language.GUI.nextStepsExtErlangCTable,language.GUI.nextStepsExtErlangCDiagram)
    ],
    tableInfo: language.text.ExtErlangCTable,
    tableTiles: tilesExtErlangC.tableTiles,
    diagramInfo: language.text.ExtErlangCDiagram,
    diagramTiles: tilesExtErlangC.diagramTiles
  });

  /* Pollaczek-Chintschin formula */

  result+=getPlaceholder({
    id: "PC",
    title: language.GUI.formulaPCLong,
    valuesInfo: language.text.PCValues,
    valuesTilesButtons: tilesPC.valueTilesButtons,
    valuesTiles: tilesPC.valueTiles,
    valuesFormula: formulasPC,
    valuesInfoCards: [
      {head: language.GUI.formulaPCLimitations, body: language.text.PCValuesLimitations},
      getNextStepsButtons("PC",language.GUI.nextStepsPCTable,language.GUI.nextStepsPCDiagram)
    ],
    tableInfo: language.text.PCTable,
    tableTiles: tilesPC.tableTiles,
    diagramInfo: language.text.PCDiagram,
    diagramTiles: tilesPC.diagramTiles
  });

  /* Kingman approximation formula */

  result+=getPlaceholder({
    id: "Kingman",
    title: language.GUI.formulaKingmanLong,
    valuesInfo: language.text.KingmanValues,
    valuesTilesButtons: tilesKingman.valueTilesButtons,
    valuesTiles: tilesKingman.valueTiles,
    valuesFormula: formulasKingman,
    valuesInfoCards: [
      {head: language.GUI.formulaKingmanLimitations, body: language.text.KingmanValuesLimitations},
      getNextStepsButtons("Kingman",language.GUI.nextStepsKingmanTable,language.GUI.nextStepsKingmanDiagram)
    ],
    tableInfo: language.text.KingmanTable,
    tableTiles: tilesKingman.tableTiles,
    diagramInfo: language.text.KingmanDiagram,
    diagramTiles: tilesKingman.diagramTiles
  });

  /* Allen-Cunneen approximation formula */

  result+=getPlaceholder({
    id: "AC",
    title: language.GUI.formulaACLong,
    valuesInfo: language.text.ACValues,
    valuesTilesButtons: tilesAC.valueTilesButtons,
    valuesTiles: tilesAC.valueTiles,
    valuesFormula: formulasAC,
    valuesInfoCards: [
      {head: language.GUI.formulaACLimitations, body: language.text.ACValuesLimitations},
      getNextStepsButtons("AC",language.GUI.nextStepsACTable,language.GUI.nextStepsACDiagram)
    ],
    tableInfo: language.text.ACTable,
    tableTiles: tilesAC.tableTiles,
    diagramInfo: language.text.ACDiagram,
    diagramTiles: tilesAC.diagramTiles
  });

  /* Extended Allen-Cunneen approximation formula */

  result+=getPlaceholder({
    id: "ExtAC",
    title: language.GUI.formulaExtACLong,
    valuesInfo: language.text.ExtACValues,
    valuesTilesButtons: tilesExtAC.valueTilesButtons,
    valuesTiles: tilesExtAC.valueTiles,
    valuesFormula: formulasExtAC,
    valuesInfoCards: [
      {head: language.GUI.formulaExtACLimitations, body: language.text.ExtACValuesLimitations},
      getNextStepsButtons("ExtAC",language.GUI.nextStepsExtACTable,language.GUI.nextStepsExtACDiagram)
    ],
    tableInfo: language.text.ExtACTable,
    tableTiles: tilesExtAC.tableTiles,
    diagramInfo: language.text.ExtACDiagram,
    diagramTiles: tilesExtAC.diagramTiles
  });

  /* System design: Comparison of different strategies */

  result+=getPlaceholder({
    id: "Compare",
    imageMaxWidth: 1200,
    title: language.GUI.formulaCompareLong,
    valuesInfo: language.text.CompareValues,
    valuesTilesButtons: tilesCompare.valueTilesButtons,
    valuesTiles: tilesCompare.valueTiles,
    valuesFormula: formulasCompare,
    valuesInfoCards: [
      {head: language.GUI.formulasCompareMoreInfo, body: language.text.formulasCompareMoreInfo}
    ]
  });

  /* System design: Shortest queue */

  result+=getPlaceholder({
    id: "ShortestQueue",
    title: language.GUI.formulaShortestQueueLong,
    valuesInfo: language.text.ShortestQueueValues,
    valuesTilesButtons: tilesShortestQueue.valueTilesButtons,
    valuesTiles: tilesShortestQueue.valueTiles,
    valuesFormula: formulasShortestQueue,
    tableInfo: language.text.ShortestQueueTable,
    tableTiles: tilesShortestQueue.tableTiles,
    diagramInfo: language.text.ShortestQueueDiagram,
    diagramTiles: tilesShortestQueue.diagramTiles
  });

  /* System design: Economy of Scale */

  result+=getPlaceholder({
    id: "EconomyOfScale",
    title: language.GUI.formulaEconomyOfScaleLong,
    tableInfo: language.text.EconomyOfScaleTable,
    tableTilesButtons: tilesEconomyOfScale.valueTilesButtons,
    tableTiles: tilesEconomyOfScale.tableTiles,
    diagramInfo: language.text.EconomyOfScaleDiagram,
    diagramTilesButtons: tilesEconomyOfScale.valueTilesButtons,
    diagramTiles: tilesEconomyOfScale.diagramTiles
  });

  /* System design: Call center */

  result+=getPlaceholder({
    id: "CallCenter",
    title: language.GUI.formulaCallCenterLong,
    diagramInfo: language.text.CallCenterDiagram,
    diagramTilesButtons: tilesCallCenter.valueTilesButtons,
    diagramTiles: tilesCallCenter.diagramTiles
  });

  /* Simulation */

  result+=getSimplePlaceholder("Simulation");

  /* Queueing theory */

  result+=getSimplePlaceholder("QueueingTheory");

  /* Glossary */

  result+=getSimplePlaceholder("Glossary");

  /* Init */

  setTimeout(()=>{
    showTab("Home");

    const dark=(document.documentElement.dataset.bsTheme=="dark")?"_dark":"";

    fetch('./js/info_sim_'+language.GUI.imageMode+'.html').then(response=>response.text().then(text=>initObserver('Simulation',text.replace("%%%DARK%%%",dark))));
    fetch('./js/info_qt_'+language.GUI.imageMode+'.html').then(response=>response.text().then(text=>initObserver('QueueingTheory',text.replace("%%%DARK%%%",dark))));
    fetch('./js/info_glossary_'+language.GUI.imageMode+'.html').then(response=>response.text().then(text=>initObserver('Glossary',text.replace("%%%DARK%%%",dark))));
  },100);

  return result;
}