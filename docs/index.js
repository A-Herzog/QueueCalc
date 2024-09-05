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

/* Init Neutralino in desktop mode */

if (isDesktopApp) {
  Neutralino.init();
  Neutralino.events.on("windowClose",()=>Neutralino.app.exit());
}

/* Language selector */

import {selectLanguage, buildMultiNavDropdown, showTab} from './js/tools_gui.js';
selectLanguage([{name: "default", file: "index.html"}, {name: "de", file: "index_de.html"}]);
window.showTab=showTab;

/* Language */

import {language} from './js/Language.js';

brandName.innerHTML=" "+language.GUI.Name;

menuHome.innerHTML=" "+language.GUI.tabHome;
menuSimulation.innerHTML=" "+language.GUI.tabSimulation;
menuHelp.innerHTML=" "+language.GUI.tabHelp;
menuHelpQueueingTheory.innerHTML=language.GUI.tabHelpDoc;
menuHelpGlossary.innerHTML=language.GUI.tabHelpGlossary;
menuHelpTextbook.innerHTML=language.GUI.tabHelpTextbook;

menuLanguageMode.title=language.GUI.tabLanguageMode;
menuLanguageModeEn.innerHTML=language.GUI.tabLanguageModeEn;
menuLanguageModeDe.innerHTML=language.GUI.tabLanguageModeDe;
if (language.GUI.imageMode=="de") menuLanguageModeDe.classList.add("bi-check"); else menuLanguageModeEn.classList.add("bi-check");

menuColorMode.title=language.GUI.tabColorMode;
menuColorModeLight.innerHTML=language.GUI.tabColorModeLight;
menuColorModeDark.innerHTML=language.GUI.tabColorModeDark;
menuColorModeSystemDefault.innerHTML=language.GUI.tabColorModeSystemDefault;

let selectedColorMode=localStorage.getItem('selectedColorMode');
if (selectedColorMode==null) {
  selectedColorMode=(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light";
  menuColorModeSystemDefault.classList.add("bi-check");
  const mode=(selectedColorMode=='dark')?language.GUI.tabColorModeDark:language.GUI.tabColorModeLight;
  menuColorModeSystemDefault.innerHTML=menuColorModeSystemDefault.innerHTML+" ("+mode+")";
} else {
  if (selectedColorMode=='dark') menuColorModeDark.classList.add("bi-check"); else menuColorModeLight.classList.add("bi-check");
}
document.documentElement.dataset.bsTheme=selectedColorMode;

footerQueueCalc.innerHTML=language.GUI.Name;
footerQueueCalcImprint.innerHTML=language.GUI.Imprint;
footerQueueCalcPrivacy.innerHTML=language.GUI.Privacy;
footerQueueCalcHomeLink.href="https://"+language.GUI.homeURL;
footerQueueCalcHomeLink.innerHTML=language.GUI.homeURL;

footerPrivacyTitle.innerHTML=language.GUI.PrivacyTitle;
footerPrivacyInfo.innerHTML=language.GUI.PrivacyInfo;

footerSimulators.innerHTML=language.GUI.simulators;

/* Menu */

let insertCount=1;

mainNavBar.insertBefore(buildMultiNavDropdown("ErlangBMenu",language.GUI.tabErlangB,[
  {id: "ErlangB", name: language.GUI.tabErlangB, info: language.GUI.tabErlangBInfo}
]),mainNavBar.children[insertCount++]);

mainNavBar.insertBefore(buildMultiNavDropdown("ErlangCMenu",language.GUI.tabErlangC,[
  {id: "ErlangC", name: language.GUI.tabErlangC, info: language.GUI.tabErlangCInfo},
  {id: "ExtErlangC", name: language.GUI.tabExtErlangC, info: language.GUI.tabExtErlangCInfo}
]),mainNavBar.children[insertCount++]);

mainNavBar.insertBefore(buildMultiNavDropdown("ACMenu",language.GUI.tabGeneralS,[
  {id: "PC", name: language.GUI.tabPC, info: language.GUI.tabPCInfo},
  {id: "Kingman", name: language.GUI.tabKingman, info: language.GUI.tabKingmanInfo},
  {id: "AC", name: language.GUI.tabAC, info: language.GUI.tabACInfo},
  {id: "ExtAC", name: language.GUI.tabExtAC, info: language.GUI.tabExtACInfo}
]),mainNavBar.children[insertCount++]);

mainNavBar.insertBefore(buildMultiNavDropdown("DesignMenu",language.GUI.tabDesign,[
  {id: "Compare", name: language.GUI.tabCompare, modes: {values: true}},
  {id: "ShortestQueue", name: language.GUI.tabShortestQueue},
  {id: "EconomyOfScale", name: language.GUI.tabEconomyOfScale, modes: {table: true, diagram: true}},
  {id: "CallCenter", name: language.GUI.tabCallCenter, modes: {diagram: true}},
]),mainNavBar.children[insertCount++]);

/* Content */

import {getMainGUI} from './js/gui_Start.js';
document.querySelector("main div").innerHTML=getMainGUI(isDesktopApp);

document.addEventListener('readystatechange',event=>{if (event.target.readyState=="complete") {
  if (isDesktopApp) {
    PrivacyInfo1.style.display="none";
    PrivacyInfo2.style.display="none";
    document.querySelector("#Home h2").style.display="none";
  }
  mainContent.style.display="";
  infoLoading.style.display="none";
}});

function rewriteLinksInOfflineMode() {
  if (!isDesktopApp) return;
  for (let link of document.querySelectorAll("a")) if (link.href.startsWith('https://')) {
    const href=link.href;
    link.onclick=()=>Neutralino.os.open(href);
    link.removeAttribute("href");
    link.style.cursor="pointer";
    if (!link.classList.contains("dropdown-item") && !link.classList.contains("btn")) link.classList.add("link-primary");
  }
}

rewriteLinksInOfflineMode();
for (let link of document.querySelectorAll("a[data-bs-toggle]")) link.addEventListener('shown.bs.tab',()=>rewriteLinksInOfflineMode());