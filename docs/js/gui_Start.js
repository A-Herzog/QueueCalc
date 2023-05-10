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

import {getPlaceholder, getNextStepsButtons, getSimplePlaceholder} from './tools_gui.js';

import {tilesErlangB, updateErlangB} from './gui_ErlangB.js';
import {tilesErlangC, updateErlangC} from './gui_ErlangC.js';
import {tilesExtErlangC, updateExtErlangC} from './gui_ExtErlangC.js';
import {tilesPC, updatePC} from './gui_PC.js';
import {tilesAC, updateAC} from './gui_AC.js';
import {tilesExtAC, updateExtAC} from './gui_ExtAC.js';
import {tilesCompare, updateCompare} from './gui_Compare.js';
import {tilesShortestQueue, updateShortestQueue} from './gui_ShortestQueue.js';
import {formulasErlangB, formulasErlangC, formulasExtErlangC, formulasPC, formulasAC, formulasExtAC, formulasCompare, formulasShortestQueue} from './FormulaBuilder.js';
import {language} from './Language.js';



function buildStartTile(size, title, text, id, imgWidth="100%", showMore=false, fileFormat="svg", aspectRatio=null, onlyValues=false, icon="") {
  let block="";

  block+="<div class=\"col-lg-"+size+"\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class=\"h5\">"+icon+title+"</h3></div>";
  block+="<div class=\"card-body\">";
  let aspectRatioStyle='';
  if (aspectRatio!=null) aspectRatioStyle=' aspect-ratio: '+aspectRatio+';';
  if (showMore) {
    block+="<a onclick=\"showTab('"+id+"');\" style='cursor: pointer;' title='"+title+"'>";
  } else {
    block+="<a onclick=\"showTab('"+id+"Values');\" style='cursor: pointer;' title='"+title+"'>";
  }
  block+='<img class="img-fluid" loading=\"lazy\" style="margin: 20px 0px; width: '+imgWidth+';'+aspectRatioStyle+'" src="./images/'+id+'_'+language.GUI.imageMode+'.'+fileFormat+'" alt="'+title+'">';
  block+='</a>';
  block+="<p class=\"card-text\">"+text+"</p>";
  if (showMore) {
    block+="<button onclick=\"showTab('"+id+"');\" class=\"btn btn-primary my-1 bi-info-circle\"> "+language.GUI.modeMore+"</button>\n";
  } else {
    if (onlyValues) {
      block+="<button onclick=\"showTab('"+id+"Values');\" class=\"btn btn-primary my-1 bi-123\"> "+language.GUI.modeValuesOnly+"</button>\n";
    } else {
      block+="<button onclick=\"showTab('"+id+"Values');\" class=\"btn btn-primary my-1 bi-123\"> "+language.GUI.modeValues+"</button>\n";
      block+="<button onclick=\"showTab('"+id+"Table');\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.modeTable+"</button>\n";
      block+="<button onclick=\"showTab('"+id+"Diagram');\" class=\"btn btn-primary my-1 bi-graph-up\"> "+language.GUI.modeDiagram+"</button>";
    }
  }
  block+="</div></div></div>";

  return block;
}

function buildStartTiles(isDesktopApp) {
  let block="";

  block+="<div class=\"row\">";

  block+=buildStartTile(6,language.GUI.formulaErlangB,language.GUI.formulaErlangBInfo,"ErlangB","70%",false,"svg","114.02 / 62.19");
  block+=buildStartTile(6,language.GUI.formulaErlangC,language.GUI.formulaErlangCInfo,"ErlangC","100%",false,"svg","159.82 / 47.24");
  block+=buildStartTile(6,language.GUI.formulaExtErlangC,language.GUI.formulaExtErlangCInfo,"ExtErlangC","100%",false,"svg","159.81 / 74.6");
  block+=buildStartTile(6,language.GUI.formulaPC,language.GUI.formulaPCInfo,"PC","100%",false,"svg","159.81 / 74.6");
  block+=buildStartTile(6,language.GUI.formulaAC,language.GUI.formulaACInfo,"AC","100%",false,"svg","159.82 / 52.78");
  block+=buildStartTile(6,language.GUI.formulaExtAC,language.GUI.formulaExtACInfo,"ExtAC","100%",false,"svg","159.82 / 74.05");
  block+=buildStartTile(6,language.GUI.formulaCompare,language.GUI.formulaCompareInfo,"Compare","100%",false,"svg","602.67 / 279.23",true);
  block+=buildStartTile(6,language.GUI.formulaShortestQueue,language.GUI.formulaShortestQueueInfo,"ShortestQueue","100%",false,"svg","602.67 / 319.07");
  block+=buildStartTile(6,language.GUI.tabSimulation,language.GUI.tabSimulationInfo,"Simulation","100%",true,'webp','640 / 481',false,"<i class='bi-caret-right-square'></i> ");

  block+="<div class=\"col-lg-6\"><div class=\"card\">";
  block+="<div class=\"card-header\"><h3 class=\"h5 bi-download\"> "+language.GUI.tabDownloads+"</h3></div>";
  block+="<div class=\"card-body\">";
  if (!isDesktopApp && false) { // TODO: Activate download option
    block+="<p class=\"card-text\">"+language.GUI.tabDownloadAppInfo+"</p>";
    block+="<a id=\"downloadApp\" target=\"_blank\" href=\"https://github.com/A-Herzog/QueueCalc/releases/latest/download/QueueCalc.exe\" style=\"display: none;\"></a>";
    block+="<button onclick=\"document.getElementById('downloadApp').click();\" class=\"btn btn-primary my-1 bi-windows\"> "+language.GUI.tabDownloadApp+"</button>\n";
    block+="<p class=\"card-text mt-4\">"+language.GUI.tabDownloadsInfo+"</p>";
  } else {
    block+="<p class=\"card-text\">"+language.GUI.tabDownloadsInfo+"</p>";
  }
  block+="<a id=\"downloadXLSM\" target=\"_blank\" href=\"./Erlang/Erlang.xlsm\" download=\"Erlang.xlsm\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadODS\" target=\"_blank\" href=\"./Erlang/Erlang.ods\" download=\"Erlang.ods\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadJS\" target=\"_blank\" href=\"./Erlang/Erlang.js\" download=\"Erlang.js\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadPY\" target=\"_blank\" href=\"./Erlang/Erlang.py\" download=\"Erlang.py\" style=\"display: none;\"></a>";
  block+="<a id=\"downloadR\" target=\"_blank\" href=\"./Erlang/Erlang.R\" download=\"Erlang.R\" style=\"display: none;\"></a>";
  block+="<button onclick=\"document.getElementById('downloadXLSM').click();\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.tabDownloadsExcel+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadODS').click();\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.tabDownloadsLibreOffice+"</button>\n";
  block+="<br>";
  block+="<button onclick=\"document.getElementById('downloadJS').click();\" class=\"btn btn-primary my-1 bi-code\"> "+language.GUI.tabDownloadsJS+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadPY').click();\" class=\"btn btn-primary my-1 bi-code\"> "+language.GUI.tabDownloadsPython+"</button>\n";
  block+="<button onclick=\"document.getElementById('downloadR').click();\" class=\"btn btn-primary my-1 bi-code\"> "+language.GUI.tabDownloadsR+"</button>\n";

  block+="</div></div></div>";

  block+="</div>";

  return block;
}

function getMainGUI(isDesktopApp) {
  let result="";

  /* Start */

  result+="<div class=\"tab-pane fade show active\" id=\"Home\" role=\"tabpanel\">";
  result+="<h2>"+language.GUI.Name+"</h2>";
  if (typeof(language.GUI.OtherLanguage)!="undefined" && language.GUI.OtherLanguage!="") {
    result+="<div class=\"container\" style=\"margin: 20px 0px; padding-left: 0;\"><span class=\"border bg-light rounded small\" style=\"padding: 7px 10px;\">";
    result+=language.GUI.OtherLanguage;
    result+="</span></div>";
  }
  result+=language.text.start;
  result+=buildStartTiles(isDesktopApp);
  result+="</div>";

  /* Erlang-B-Formel */

  result+=getPlaceholder({
    id: "ErlangB",
    title: language.GUI.formulaErlangBLong,
    valuesInfo: language.text.ErlangBValues,
    valuesTilesButtons: tilesErlangB.valueTilesButtons,
    valuesTiles: tilesErlangB.valueTiles,
    valuesFormula: formulasErlangB,
    valuesInfoCards: [
      {head: language.GUI.formulaErlangBLimitations, body: language.text.ErlangBValuesLimitations},
      getNextStepsButtons("ErlangB",language.GUI.nextStepsErlangBTable,language.GUI.nextStepsErlangBDiagram)
    ],
    tableData: language.text.ErlangBTable+tilesErlangB.tableTiles,
    diagramData: language.text.ErlangBDiagram+tilesErlangB.diagramTiles
  });

  /* Erlang-C-Formel */

  result+=getPlaceholder({
    id: "ErlangC",
    title: language.GUI.formulaErlangCLong,
    valuesInfo: language.text.ErlangCValues,
    valuesTilesButtons: tilesErlangC.valueTilesButtons,
    valuesTiles: tilesErlangC.valueTiles,
    valuesFormula: formulasErlangC,
    valuesInfoCards: [
      {head: language.GUI.formulaErlangCLimitations, body: language.text.ErlangCValuesLimitations},
      getNextStepsButtons("ErlangC",language.GUI.nextStepsErlangCTable,language.GUI.nextStepsErlangCDiagram)
    ],
    tableData: language.text.ErlangCTable+tilesErlangC.tableTiles,
    diagramData: language.text.ErlangCDiagram+tilesErlangC.diagramTiles
  });

  /* Erweiterte Erlang-C-Formel*/

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
    tableData: language.text.ExtErlangCTable+tilesExtErlangC.tableTiles,
    diagramData: language.text.ExtErlangCDiagram+tilesExtErlangC.diagramTiles
  });

  /* Pollaczek-Chintschin-Formel */

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
    tableData: language.text.PCTable+tilesPC.tableTiles,
    diagramData: language.text.PCDiagram+tilesPC.diagramTiles
  });

  /* Allen-Cunneen-Näherungsformel */

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
    tableData: language.text.ACTable+tilesAC.tableTiles,
    diagramData: language.text.ACDiagram+tilesAC.diagramTiles
  });

  /* Erweiterte Allen-Cunneen-Näherungsformel */

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
    tableData: language.text.ExtACTable+tilesExtAC.tableTiles,
    diagramData: language.text.ExtACDiagram+tilesExtAC.diagramTiles
  });

  /* Systemdesign: Vergleich verschiedener Strategien */

  result+=getPlaceholder({
    id: "Compare",
    imageMaxWidth: 1200,
    title: language.GUI.formulaCompareLong,
    valuesInfo: language.text.CompareValues,
    valuesTilesButtons: tilesCompare.valueTilesButtons,
    valuesTiles: tilesCompare.valueTiles,
    valuesFormula: formulasCompare,
  });

  /* Systemdesign: Wahl der kürzesten Schlange */

  result+=getPlaceholder({
    id: "ShortestQueue",
    title: language.GUI.formulaShortestQueueLong,
    valuesInfo: language.text.ShortestQueueValues,
    valuesTilesButtons: tilesShortestQueue.valueTilesButtons,
    valuesTiles: tilesShortestQueue.valueTiles,
    valuesFormula: formulasShortestQueue,
    tableData: language.text.ShortestQueueTable+tilesShortestQueue.tableTiles,
    diagramData: language.text.ShortestQueueDiagram+tilesShortestQueue.diagramTiles
  });

  /* Simulation */

  result+=getSimplePlaceholder("Simulation");

  /* Warteschlangentheorie */

  result+=getSimplePlaceholder("QueueingTheory");

  /* Glossar */

  result+=getSimplePlaceholder("Glossary");

  /* Init */

  setTimeout(()=>{
    updateErlangB();
    updateErlangC();
    updateExtErlangC();
    updatePC();
    updateAC();
    updateExtAC();
    updateCompare();
    updateShortestQueue();

    fetch('./js/info_sim_'+language.GUI.imageMode+'.html').then(response=>response.text().then(text=>document.getElementById('Simulation').innerHTML=text));
    fetch('./js/info_qt_'+language.GUI.imageMode+'.html').then(response=>response.text().then(text=>document.getElementById('QueueingTheory').innerHTML=text));
    fetch('./js/info_glossary_'+language.GUI.imageMode+'.html').then(response=>response.text().then(text=>document.getElementById('Glossary').innerHTML=text));
  },100);

  return result;
}