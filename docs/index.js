  /* Offline mode */

  const isDesktopApp=(typeof(NL_OS)!='undefined');
  if (isDesktopApp) Neutralino.init();

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
    {id: "AC", name: language.GUI.tabAC, info: language.GUI.tabACInfo},
    {id: "ExtAC", name: language.GUI.tabExtAC, info: language.GUI.tabExtACInfo}
  ]),mainNavBar.children[insertCount++]);

  mainNavBar.insertBefore(buildMultiNavDropdown("DesignMenu",language.GUI.tabDesign,[
    {id: "Compare", name: language.GUI.tabCompare, onlyValues: true},
    {id: "ShortestQueue", name: language.GUI.tabShortestQueue}
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