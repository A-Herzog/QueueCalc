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

export {language}

let lang;

/* German */

const languageDE={};

lang=languageDE;

lang.GUI={};
lang.GUI.imageMode="de";
lang.GUI.Name="Warteschlangenrechner";
lang.GUI.PrivacyTitle="Info";
lang.GUI.PrivacyInfo="Alle Berechnungen laufen vollständig im Browser ab.<br>Diese Webapp führt nach dem Laden des HTML- und Skriptcodes keine weitere Kommunikation mit dem Server durch.";
lang.GUI.OtherLanguage="An <a href=\"index.html\" onclick=\"localStorage.setItem('selectedLanguage','default')\"><b>English version</b></a> of this calculator is also available.";
lang.GUI.modeValues="Einzelwerte";
lang.GUI.modeValuesOnly="Werte";
lang.GUI.modeTable="Tabelle";
lang.GUI.modeDiagram="Diagramm";
lang.GUI.modeRangeStart="Startwert";
lang.GUI.modeRangeStep="Schrittweite";
lang.GUI.modeRangeEnd="Endwert";
lang.GUI.modeMore="Mehr Informationen";
lang.GUI.formulaErlangB="Erlang-B-Formel";
lang.GUI.formulaErlangBLong="Erlang-B-Formel (M/M/c/c-Modell)";
lang.GUI.formulaErlangBInfo="Die Erlang-B-Formel ermöglicht die Berechnung der Kenngrößen eines <b>M/M/c/c</b>-Modells, d.h. eines Warteschlangenmodells ohne Warteraum mit exponentiell verteilten Zwischenankunfts- und Bedienzeiten und c&ge;1 Bedienern.";
lang.GUI.formulaErlangBLimitations="Grenzen der Erlang-B-Formel";
lang.GUI.formulaErlangC="Erlang-C-Formel";
lang.GUI.formulaErlangCLong="Erlang-C-Formel (M/M/c-Modell)";
lang.GUI.formulaErlangCInfo="Die Erlang-C-Formel ermöglicht die Berechnung der Kenngrößen eines <b>M/M/c</b>-Modells, d.h. eines Warteschlangenmodells mit exponentiell verteilten Zwischenankunfts- und Bedienzeiten und c&ge;1 Bedienern.";
lang.GUI.formulaErlangCLimitations="Grenzen der Erlang-C-Formel";
lang.GUI.formulaExtErlangC="Erweiterte Erlang-C-Formel";
lang.GUI.formulaExtErlangCLong="Erweiterte Erlang-C-Formel (M/M/c/K+M-Modell)";
lang.GUI.formulaExtErlangCInfo="Die erweiterte Erlang-C-Formel ermöglicht zusätzlich zu den Möglichkeiten der Erlang-C-Formel die Abbildung von <b>Warteabbrechern</b> sowie einer <b>Warteraumbegrenzung</b>, d.h. sie ermöglicht die Berechnung der Kenngrößen eines <b>M/M/c/K+M</b>-Modells.";
lang.GUI.formulaExtErlangCLimitations="Grenzen der erweiterten Erlang-C-Formel";
lang.GUI.formulaPC="Pollaczek-Chintschin-Formel";
lang.GUI.formulaPCLong="Pollaczek-Chintschin-Formel (M/G/1-Modell)";
lang.GUI.formulaPCInfo="Die Pollaczek-Chintschin-Formel setzt nicht mehr voraus, dass die Bediendauern exponentiell verteilt sind. Dafür aber können nur Modelle mit einem Bediener betrachtet werden (<b>M/G/1</b>-Modell).";
lang.GUI.formulaPCLimitations="Grenzen Pollaczek-Chintschin-Formel";
lang.GUI.formulaAC="Allen-Cunneen-Näherungsformel";
lang.GUI.formulaACLong="Allen-Cunneen-Näherungsformel (G/G/c-Modell)";
lang.GUI.formulaACInfo="Die Allen-Cunneen-Näherungsformel setzt nicht mehr voraus, dass die Zwischenankunfts- und die Bedienzeiten exponentiell verteilt sind (<b>G/G/c</b>-Modell). Dies ermöglicht insbesondere die Verwendung von <b>von 1 abweichenden Variationskoeffizienten</b>.";
lang.GUI.formulaACLimitations="Grenzen der Allen-Cunneen-Näherungsformel";
lang.GUI.formulaExtAC="Erweiterte Allen-Cunneen-Näherungsformel";
lang.GUI.formulaExtACLong="Erweiterte Allen-Cunneen-Näherungsformel (G<sup>b<sub>I</sub></sup>/G<sup>b<sub>S</sub></sup>/c-Modell)";
lang.GUI.formulaExtACInfo="Die erweiterte Allen-Cunneen-Näherungsformel ermöglicht zusätzlich die Betrachtung von <b>Batch-Ankünften</b>, <b>Batch-Bedienungen</b> sowie <b>Ausfallzeiten</b> der Bediener (<b>G<sup>b<sub>I</sub></sup>/G<sup>b<sub>S</sub></sup>/c</b>-Modell).";
lang.GUI.formulaExtACLimitations="Grenzen der erweiterten Allen-Cunneen-Näherungsformel";
lang.GUI.formulaCompare="Design von Warteschlangensystemen";
lang.GUI.formulaCompareLong="Design von Warteschlangensystemen";
lang.GUI.formulaCompareInfo="Mit Hilfe der Formeln der Warteschlangentheorie lassen sich alltägliche Wartesituationen, in denen das System verschieden konfiguriert ist, untersuchen.";
lang.GUI.formulasCompareMoreInfo=`Interpretation der Ergebnisse`;
lang.GUI.formulaShortestQueue="Wahl der kürzesten Schlange";
lang.GUI.formulaShortestQueueLong="Wahl der kürzesten Schlange";
lang.GUI.formulaShortestQueueInfo="Die Wahl der kürzeren Warteschlange stellt zwar einen guten Schätzer dafür, in welcher Schlange man schneller zur Kasse gelangt, dar. Mit steigender Länge der beiden Schlangen wächst allerdings die Wahrscheinlichkeit, in der längeren Schlange schneller zum Ziel zu gelangen.";
lang.GUI.formulaShortestQueueA="Länge der längeren Warteschlange";
lang.GUI.formulaShortestQueueAWaitingTime="Wartezeit in der längeren Warteschlange";
lang.GUI.formulaShortestQueueB="Länge der kürzeren Warteschlange";
lang.GUI.formulaShortestQueueBWaitingTime="Wartezeit in der kürzeren Warteschlange";
lang.GUI.formulaShortestQueueAInfo1="Diese Warteschlange wird vom Kunden nicht gewählt, da vermutet wird, dass die Wartezeit hier länger ist als an der anderen Warteschlange.";
lang.GUI.formulaShortestQueueAInfo2="";
lang.GUI.formulaShortestQueueBInfo1="Die kürzere Warteschlange stellt die natürliche Wahl für neu eintreffende Kunden dar. Es wird angenommen, dass die Wartezeit an dieser kürzer ist als an der längeren Warteschlange.";
lang.GUI.formulaShortestQueueBInfo2="";
lang.GUI.formulaEconomyOfScale="Economy of Scale";
lang.GUI.formulaEconomyOfScaleLong="Economy of Scale (Positiver Skaleneffekt)";
lang.GUI.formulaEconomyOfScaleInfo="Die Economy of Scale beschreibt in Bezug auf stochatische Systeme den Effekt, dass die Wartezeiten bei insgesamt identischer Auslastung bei größeren Systemen kürzer ausfallen, als bei kleineren Systemen. Bei Warteschlangenmodellen mit mehr Bedienern können sich Schwankungen im Ankunftsstrom und bei den Bedienzeiten besser gegenseitig ausgleichen als bei kleineren Systemen.";
lang.GUI.tabHome="Start";
lang.GUI.tabErlangB="Erlang-B-Formel";
lang.GUI.tabErlangBInfo="M/M/c/C";
lang.GUI.tabErlangC="Erlang-C-Formel";
lang.GUI.tabErlangCInfo="M/M/c";
lang.GUI.tabExtErlangC="Erweiterte Erlang-C-Formel";
lang.GUI.tabExtErlangCInfo="M/M/c/K+M";
lang.GUI.tabGeneralS="Allgemeine Bedienzeiten";
lang.GUI.tabPC="Pollaczek-Chintschin-Formel";
lang.GUI.tabPCInfo="M/G/1";
lang.GUI.tabAC="Allen-Cunneen-Näherungsformel";
lang.GUI.tabACInfo="G/G/c";
lang.GUI.tabExtAC="Erweiterte Allen-Cunneen-Näherungsformel";
lang.GUI.tabExtACInfo="G<sup>b<sub>I</sub></sup>/G<sup>b<sub>S</sub></sup>/c"
lang.GUI.tabDesign="Systemdesign";
lang.GUI.tabCompare="Vergleich verschiedener Strategien";
lang.GUI.tabShortestQueue="Wahl der kürzesten Schlange";
lang.GUI.tabEconomyOfScale="Economy of Scale";
lang.GUI.tabSimulation='Simulation';
lang.GUI.tabSimulationInfo='Wenn die Möglichkeiten der (erweiterten) Erlang-C-Formel und der (erweiterten) Allen-Cunneen-Näherungsformel zur Modellierung eines Warteschlangensystems nicht mehr ausreichen, kann eines der hier angebotenen Opensource <b>Simulationswerkzeuge</b> eingesetzt werden.';
lang.GUI.tabHelp="Hilfe";
lang.GUI.tabHelpDoc="Warteschlangentheorie";
lang.GUI.tabHelpGlossary="Glossar";
lang.GUI.tabHelpTextbook="Lehrbuch<br>\"Simulation mit dem<br>Warteschlangensimulator\"";
lang.GUI.diagramInfo="Werden nicht alle Graphen angezeigt, so kann dies daran liegen, dass diese deckungsgleich übereinander liegen.<br>Per Klick auf die Einträge in der <b>Legende</b> können die Graphen einzelner Datenreihen ein- und ausgeblendet werden.";
lang.GUI.copyTable="Tabelle kopieren";
lang.GUI.saveTable="Tabelle speichern";
lang.GUI.copyDiagram="Kopieren";
lang.GUI.saveDiagram="Speichern";
lang.GUI.copyDiagramTable="Diagrammdaten als Tabelle kopieren";
lang.GUI.saveDiagramTable="Diagrammdaten als Tabelle speichern";
lang.GUI.copyDiagramImage="Diagramm als Bild kopieren";
lang.GUI.copyDiagramImageError="Ihr Browser unterstützt das Kopieren von Bildern leider nicht.";
lang.GUI.saveDiagramImage="Diagramm als Bild speichern";
lang.GUI.results='Ergebnisse';
lang.GUI.nextSteps="Nächste Schritte";
lang.GUI.nextStepsErlangBTable="Mehrere Erlang-B Werte als Tabelle ausgeben";
lang.GUI.nextStepsErlangBDiagram="Mehrere Erlang-B Werte als Diagramm darstellen";
lang.GUI.nextStepsErlangCTable="Mehrere Erlang-C Werte als Tabelle ausgeben";
lang.GUI.nextStepsErlangCDiagram="Mehrere Erlang-C Werte als Diagramm darstellen";
lang.GUI.nextStepsExtErlangCTable="Mehrere erweiterte Erlang-C Werte als Tabelle ausgeben";
lang.GUI.nextStepsExtErlangCDiagram="Mehrere erweiterte Erlang-C Werte als Diagramm darstellen";
lang.GUI.nextStepsPCTable="Mehrere Pollaczek-Chintschin Werte als Tabelle ausgeben";
lang.GUI.nextStepsPCDiagram="Mehrere Pollaczek-Chintschin Werte als Diagramm darstellen";
lang.GUI.nextStepsACTable="Mehrere Allen-Cunneen Werte als Tabelle ausgeben";
lang.GUI.nextStepsACDiagram="Mehrere Allen-Cunneen Werte als Diagramm darstellen";
lang.GUI.nextStepsExtACTable="Mehrere erweiterte Allen-Cunneen Werte als Tabelle ausgeben";
lang.GUI.nextStepsExtACDiagram="Mehrere erweiterte Allen-Cunneen Werte als Diagramm darstellen";
lang.GUI.tabDownloads="Downloads";
lang.GUI.tabDownloadAppInfo="Der Warteschlangenrechner kann als offline-ausführbare Windows-Anwendung heruntergeladen werden:";
lang.GUI.tabDownloadApp="Windows-Anwendung (exe)";
lang.GUI.tabDownloadsInfo="Die in den Rechenroutinen auf dieser Seite hinterlegten Formeln stehen auch als Tabellenblätter und als Programmcode-Bibliotheken zum Download zur Verfügung:";
lang.GUI.tabDownloadsExcel="Excel Arbeitsmappe";
lang.GUI.tabDownloadsLibreOffice="OpenOffice/LibreOffice Arbeitsmappe";
lang.GUI.tabDownloadsJS="Javascript-Code";
lang.GUI.tabDownloadsPython="Python-Code";
lang.GUI.tabDownloadsR="R-Code";
lang.GUI.simulators="Simulatoren";
lang.GUI.homeURL="warteschlangensimulation.de";
lang.GUI.Imprint="Impressum";
lang.GUI.Privacy="Datenschutz";

lang.WaitingTimeDist={};
lang.WaitingTimeDist.button="Wartezeitverteilung anzeigen";
lang.WaitingTimeDist.heading="Wartezeitverteilung";
lang.WaitingTimeDist.closeWindow="Fenster schließen";
lang.WaitingTimeDist.closeWindowShort="Schließen";

lang.model={};
lang.model.explanationsShow="Erklärungen einblenden";
lang.model.explanationsHide="Erklärungen ausblenden";
lang.model.formulaShow="Formeln einblenden";
lang.model.formulaHide="Formeln ausblenden";
lang.model.invalid="Die Eingabeparameter sind nicht gültig.";
lang.model.invalidNotNegativeInt="Es muss eine <b>nichtnegative Ganzzahl</b> angegeben werden.";
lang.model.invalidNotNegativeFloat="Es muss eine <b>nichtnegative Zahl</b> angegeben werden.";
lang.model.invalidPositiveInt="Es muss eine <b>positive Ganzzahl</b> angegeben werden.";
lang.model.invalidPositiveFloat="Es muss eine <b>positive Zahl</b> angegeben werden.";
lang.model.noParameterChosen="Es wurde kein zu variierender Parameter gewählt.";
lang.model.inputInterArrivalTimeMean="Mittlere Zwischenankunftszeit";
lang.model.inputInterArrivalTimeMeanInfo1="Die mittlere Zwischenankunftszeit gibt die durchschnittliche Zeitspanne zwischen zwei unmittelbar aufeinander folgenden Kundenankünften an.";
lang.model.inputInterArrivalTimeMeanInfo2="In der Warteschlangentheorie wird statt der mittleren Zwischenankunftszeit E[I] auch häufig die <b>Ankunftsrate &lambda;</b> verwendet. Die Ankunftsrate ist der Kehrwert der mittleren Zwischenankunftszeit, d.h. es gilt &lambda;=1/E[I].";
lang.model.inputInterArrivalTimeCV="Variationskoeffizient der Zwischenankunftszeiten";
lang.model.inputInterArrivalTimeCVInfo1="Der Variationskoeffizient steuert die Streuung der Zwischenankunftszeiten an. Ein Variationskoeffizient von 0 bedeutet, dass die Kunden mit festen Abständen eintreffen. Ein Variationskoeffizient von 1 entspricht einer Streuung gemäß der Exponentialverteilung.";
lang.model.inputInterArrivalTimeCVInfo2="";
lang.model.inputInterArrivalBatchSize="Ankunfts-Batch-Größe";
lang.model.inputInterArrivalBatchSizeInfo1="Die Ankunfts-Batch-Größe gibt an, wie viele Kunden jeweils pro Ankunftsereignis gleichzeitig eintreffen. b(I)=1 bedeutet, dass die Kunden einzeln eintreffen.";
lang.model.inputInterArrivalBatchSizeInfo2="Eine Ankunfts-Batch-Größe von 2 und eine mittlere Zwischenankunftszeit (pro Ankunftsereignis) von 60 bedeutet, dass im Mittel alle 30 Zeiteinheiten ein Kunde eintrifft.";
lang.model.inputServiceTimeMean="Mittlere Bediendauer";
lang.model.inputServiceTimeMeanInfo1="";
lang.model.inputServiceTimeMeanInfo2="In der Warteschlangentheorie wird statt der mittleren Bediendauer E[S] auch häufig die <b>Bedienrate &mu;</b> verwendet. Die Bedienrate ist der Kehrwert der mittleren Bediendauer, d.h. es gilt &mu;=1/E[S].",
lang.model.inputServiceTimeCV="Variationskoeffizient der Bediendauern";
lang.model.inputServiceTimeCVInfo1="Der Variationskoeffizient steuert die Streuung der Bedienzeiten an. Ein Variationskoeffizient von 0 bedeutet, dass die Bediendauern alle dieselbe Länge aufweisen. Ein Variationskoeffizient von 1 entspricht einer Streuung gemäß der Exponentialverteilung.";
lang.model.inputServiceTimeCVInfo2="";
lang.model.inputServiceBatchSize="Bedien-Batch-Größe";
lang.model.inputServiceBatchSizeInfo1="Die Bedien-Batch-Größe gibt an, wie viele Kunden jeweils gleichzeitig durch einen Bediener bedient werden. b(S)=1 bedeutet, dass die Kunden einzeln bedient werden.";
lang.model.inputServiceBatchSizeInfo2="Eine Bedien-Batch-Größe von 2 und eine mittlere Bediendauer von 60 bedeutet, dass umgerechnet im Mittel 30 Zeiteinheiten zur Bedienung eines Kunden benötigt werden.";
lang.model.inputNumberOfOperators="Anzahl an Bedienern";
lang.model.inputNumberOfOperatorsInfo1="Die angegebene Anzahl an Bedienern arbeitet parallel an der Bedienstation.";
lang.model.inputNumberOfOperatorsInfo2="";
lang.model.inputServiceLevel="Service-Level";
lang.model.inputServiceLevelInfo1="Dieser Wert ist optional. Wird hier ein Wert &ge;0 angegeben, so wird zusätzlich zu den üblichen Kenngrößen berechnet, wie groß der Anzeil der Kunden ist, der höchsten so lange wie hier angegeben warten musste (<b>P(W&le;t)</b>).";
lang.model.inputServiceLevelInfo2="";
lang.model.inputSystemSize="Systemgröße";
lang.model.inputSystemSizeInfo1="Kunden, die eintreffen während alle Warteplätze belegt sind, werden abgewiesen.";
lang.model.inputSystemSizeInfo2="K ist die Summe aus Warte- und Bedienplätzen, d.h. K muss mindestens so groß wie c sein.";
lang.model.inputWaitingTimeToleranceMean="Mittlere Wartezeittoleranz";
lang.model.inputWaitingTimeToleranceMeanInfo1="";
lang.model.inputWaitingTimeToleranceMeanInfo2="In der Warteschlangentheorie wird statt der mittleren Wartezeittoleranz  E[WT] auch häufig die <b>Abbruchrate &nu;</b> verwendet. Die Abbruchrate ist der Kehrwert der mittleren Wartezeittoleranz, d.h. es gilt &nu;=1/E[WT].";
lang.model.inputAvailability="Verfügbarkeit";
lang.model.inputAvailabilityInfo1="Eine Verfügbarkeit von 1 bedeutet, dass die Bediener immer für die Bedienung von Kunden bereit stehen, eine Verfügbarkeit von 0,5, dass ein Bediener nur mit einer Wahrscheinlichkeit von 50% für eine Bedienung bereit ist usw.";
lang.model.inputAvailabilityInfo2="";
lang.model.inputDownTimeMean="Mittlere Ausfallzeit";
lang.model.inputDownTimeMeanInfo1="Wenn ein Bediener nicht immer verfügbar ist (d.h. <b>P(Up)&lt;1</b> ist), gibt E[Dt] die mittlere Ausfallzeit an.";
lang.model.inputDownTimeMeanInfo2="";
lang.model.inputDownTimeCV="Variationskoeffizient der Ausfallzeiten";
lang.model.inputDownTimeCVInfo1="Wenn ein Bediener nicht immer verfügbar ist (d.h. <b>P(Up)&lt;1</b> ist), gibt CV[Dt] den Variationskoeffizienten der Ausfallzeiten an.";
lang.model.inputDownTimeCVInfo2="";
lang.model.inputUtilization="Auslastung";
lang.model.inputUtilizationInfo1="Die Auslastung der Bediener zwischen &ge;0% und &lt;100% gewählt werden.";
lang.model.inputUtilizationInfo2="Normalerweise kann die Auslastung der Bediener nicht direkt vorgegeben werden. In diesem Modell wird werden die Zwischenankunftszeiten so gewählt, dass sich die eingestellte Auslastung ergibt: <b>E[I]=E[S]/c/rho</b>.";

lang.statistics={};
lang.statistics.unitTime='Zeit';
lang.statistics.unitNumber='Anzahl';
lang.statistics.unitFraction='Anteil';
lang.statistics.conversion="Umrechnung";
lang.statistics.characteristicsModeInput="Eingang";
lang.statistics.characteristicsModeNet="netto";
lang.statistics.headingInputParameters="Eingestellte Parameter";
lang.statistics.headingDirectCalculableParameters="Direkt berechenbare Kenngrößen";
lang.statistics.headingErlangBResults="Erlang-B-Ergebnisse";
lang.statistics.headingErlangCResults="Erlang-C-Ergebnisse";
lang.statistics.headingPCResults="Pollaczek-Chintschin-Ergebnisse";
lang.statistics.headingACResults="Allen-Cunneen-Ergebnisse";
lang.statistics.headingACCorrectionFactors="Korrekturfaktoren";
lang.statistics.headingACCorrectionFactorsInfo1="Um die Abweichungen zwischen Näherungsformel und Realität zu verringern, existieren mehrere Korrekturfaktoransätze.";
lang.statistics.headingACCorrectionFactorsInfo2="Die Korrekturterme wirken bei Variationskoeffizienten ungleich 1 (Krämer, Langenbach-Belz, 1976) und bei Batch-Größen größer als 1 (Hanschke, 2006).";
lang.statistics.headingCompareResults="Vergleich der Modelle";
lang.statistics.headingCompareResultsRank="Platz";
lang.statistics.CorrectionFactorKLB="Langenbach-Belz Korrekturfaktor";
lang.statistics.CorrectionFactorH="Hanschke Korrekturterm";
lang.statistics.rhoError="Nur für &rho;&le;1 kann sich ein stationärer Zustand einstellen. Daher können für das aktuelle Modell keine Kenngrößen berechnet werden.";
lang.statistics.arrivalAnsServiceRate="Ankunfts- und Bedienrate";
lang.statistics.arrivalRate="Ankunftsrate";
lang.statistics.arrivalRateInfo="mittlere Zwischenankunftszeit";
lang.statistics.arrivalRateNet="Netto Ankunftsrate";
lang.statistics.serviceRate="Bedienrate";
lang.statistics.serviceRateInfo="mittlere Bediendauer";
lang.statistics.cancelationRate="Abbruchrate";
lang.statistics.cancelationRateInfo="mittlere Wartezeittoleranz";
lang.statistics.NumberOfOperators="Anzahl an Bedienern";
lang.statistics.SystemSize="Systemgröße";
lang.statistics.SystemSizeInfo="Summe aus Warte- und Bedienraum";
lang.statistics.SystemSizeError="Die Systemgröße (K) ist kleiner als die Anzahl an Bedienplätzen (c) gewählt. Da die Systemgröße die Summe aus Warte- und Bedienplätzen ist, stellt dies kein gültiges Modell dar.";
lang.statistics.Workload="Arbeitslast";
lang.statistics.WorkloadErlang="Erlang";
lang.statistics.Utilization="Auslastung";
lang.statistics.UtilizationNet="Netto Auslastung";
lang.statistics.UtilizationInputInfo="Es handelt sich hierbei um theoretische Werte bezogen auf die Ankunftsrate. Aufgrund von Warteabbrechern kann die reale Ankunftsrate bei den Bedienern niedriger ausfallen.";
lang.statistics.UtilizationErlangC="Zum Vergleich ohne Abweisungen";
lang.statistics.WaitingTimeDistribution="Wartezeitverteilung";
lang.statistics.WaitingTimeDistributionInfo="wobei <i>Q</i> die regularisierte unvollständige Gamma-Funktion sei";
lang.statistics.P1="Faktor für Wartezeitverteilung";
lang.statistics.averageWaitingTime="Mittlere Wartezeit";
lang.statistics.variationWaitingTime="Variation der Wartezeiten";
lang.statistics.averageResidenceTime="Mittlere Verweilzeit";
lang.statistics.variationResidenceTime="Variation der Verweilzeiten";
lang.statistics.flowFactor="Flussgrad";
lang.statistics.averageNQ="Mittlere Anzahl an Kunden in der Warteschlange";
lang.statistics.variationNQ="Variation der Anzahl an Kunden in der Warteschlange";
lang.statistics.averageNS="Mittlere Anzahl an Kunden in Bedienung";
lang.statistics.averageN="Mittlere Anzahl an Kunden im System";
lang.statistics.variationN="Variation der Anzahl an Kunden im System";
lang.statistics.serviceLevel="Service-Level";
lang.statistics.serviceLevelInfo1="der Kunden müssen";
lang.statistics.serviceLevelInfo2="Zeiteinheiten oder weniger warten";
lang.statistics.emptySystemProbability="Wahrscheinlichkeit, dass das System leer ist";
lang.statistics.waitingProbability="Wartewahrscheinlichkeit";
lang.statistics.waitingProbabilityInfo="der Kunden müssen warten bevor sie bedient werden";
lang.statistics.blockingProbability="Blockierwahrscheinlichkeit";
lang.statistics.waitingCancelationProbability="Warteabbruchwahrscheinlichkeit";
lang.statistics.ErlangCCompare1="Zum Vergleich ohne Warteabbrecher und ohne Warteraumrestriktion";
lang.statistics.ErlangCCompare2="Zum Vergleich Erlang-C";
lang.statistics.SuccessAndCanceled="erfolgreiche Kunden + Abbrecher";
lang.statistics.BatchArrivalInfo1="bezogene auf einzelne Kunden";
lang.statistics.BatchArrivalInfo2="Eintreffende Kunden pro Ankunftsereignis";
lang.statistics.BatchServiceInfo1="umgerechnet auf einen Kunden";
lang.statistics.BatchServiceInfo2="Jeweils von einem Bediener gleichzeitig bediente Kunden";
lang.statistics.AvailabilityProbability="Wahrscheinlichkeit für die Verfügbarkeit eines Bedieners";
lang.statistics.DownTimeMean="Mittlere Ausfallzeit";
lang.statistics.DownTimeCV="Variationskoeffizient der Ausfallzeiten";
lang.statistics.rejectionProbability="Abweisungswahrscheinlichkeit";
lang.statistics.auxiliaryFormulas="Hilfsgrößen";
lang.statistics.for="für";
lang.statistics.SpecialCase="Spezialfall";

lang.statistics.compere={};
lang.statistics.compere.common="Gemeinsame Warteschlange";
lang.statistics.compere.separate="Getrennte Warteschlangen";
lang.statistics.compere.batch="Batch-Bedienung";
lang.statistics.compere.fast="Schnellerer Bediener";
lang.statistics.compere.input="Eingabeparameter";
lang.statistics.compere.inputSingle="Eingabeparameter pro Teilsystem";
lang.statistics.compere.output="Ausgabegrößen";

lang.text={};
lang.text.start=`
<p>
Mit Hilfe von warteschlangentheoretischen Formeln lassen sich Kenngrößen wie die mittlere Wartezeit,
die mittlere Warteschlangenlänge, die mittlere Durchlaufzeit usw. einfacher Modelle berechnen.
Der Vorteil der Formeln liegt darin, dass sich die Ergebnisse (ohne eine zeitaufwendige Simulation)
direkt berechnen lassen. Dafür sind die Berechnungsmöglichkeiten jedoch auf verhältnismäßig
einfache Modelle beschränkt bzw. es müssen bewusst bestimmte Modelleigenschaften vernachlässigt
werden (und damit Modellierungsfehler in Kauf genommen werden), um die Formeln anwenden zu können.
</p>

<p>
Die beiden bekanntesten Formeln zur Berechnung der Kenngrößen einfacher Warteschlangenmodelle sind
die <b>Erlang-C-Formel</b> und die <b>Allen-Cunneen-Näherungsformel</b>. Die Erlang-C-Formel geht
von <b>exponentiell</b> verteilten Zwischenankunftszeiten und Bedienzeiten aus. Ist diese Annahme
nicht erfüllt (was inbesondere in Bezug auf die Bedienzeiten sehr häufig der Fall ist), entstehen
Abweichungen zwischen Formelergebnissen und realem Modell. Die Allen-Cunneen-Näherungsformel kann
prinzipiell <b>beliebige Wahrscheinlichkeitsverteilungen</b> für Zwischenankunftszeiten und Bedienzeiten
berücksichtigen; die Zeitdauern werden hier durch Mittelwerte und Variationskoeffizieten charakterisiert.
Dafür handelt es sich bei der Allen-Cunneen-Formel jedoch generell nur noch um eine Näherungsformel, d.h. es ist
grundsätzlich mit (leichten) Abweichungen zwischen Formelergebnissen und den realen Kenngrößen zu rechnen.
Für beide Modelle existieren Erweiterungen: Das Erlang-C-Modell kann noch um ungeduldige Kunden und eine
Begrenzung der Warteraumgröße erweitert werden; das Allen-Cunneen-Modell kann um Batch-Ankünfte
und -Bedienungen sowie um Ausfallzeiten der Bediener ergänzt werden.
</p>

<p>
Weitere Erklärungen zu den Grundbegriffen der Warteschlangentheorie sowie zu den betrachteten analystischen Modellen können auf der Seite
<a href="javascript:void(0);" onclick="showTab('QueueingTheory');">Warteschlangentheorie</a>
nachgelesen werden.
</p>

<p>
Sollen komplexere Modelle und insbesondere Warteschlangennetze, d.h. Modelle mit mehreren, in Reihe und/oder parallel
verschalteten Bedienstationen oder z.B. verschiedenen Kundentypen mit verschiedenen Eigenschaften usw. betrachtet werden,
so ist dies per <a href="javascript:void(0);" onclick="showTab('Simulation');">Simulation</a>
möglich.
</p>
`;

lang.text.ErlangBValues=`
<p>
Die Erlang-B-Formel wurde Anfang des 20. Jahrhunderts von dem dänischen Mathematiker <a href="http://de.wikipedia.org/wiki/Agner_Krarup_Erlang" target="_blank">Agner Krarup Erlang</a> aufgestellt,
um die Leistungsbemessung der damals noch manuell erfolgenden Telefonvermittlung zu optimieren.
</p>
<p>
In dem Erlang-Modell wird angenommen, dass die Zwischenankunftszeiten der Kunden, die Bedienzeiten und auch die Wartezeittoleranzen der Kunden exponential verteilt sind.
Außerdem wird angenommen, dass sich das System im stationären Zustand befindet.
Das Modell besitzt <b>keinen Warteraum</b>. Kunden, die eintreffen während alle Bediener belegt sind, <b>werden abgewiesen</b>.
</p>
<p>
Zur Berechnung der Kenngrößen des Warteschlangensystems müssen lediglich die Ankunftsrate, die Bedienrate und die Anzahl an parallelen Bedienern angegeben werden.
Die Ausgabe wird bei Veränderung der Parameter jeweils automatisch aktualisiert.
</p>
`;

lang.text.ErlangBValuesLimitations=`
<p class="card-text">
Folgende häufig wichtige Eigenschaften können durch die Erlang-B-Formel nicht abgebildet werden:
<ul>
    <li>Andere Zwischenankunfts- und Bedienzeitverteilungen statt der Exponentialverteilung (&rarr; Allen-Cunneen-Näherungsformel)</li>
    <li>Wiederholer nach einer Abweisung (&rarr; Simulation)</li>
    <li>Weiterleitungen nach einer Bedienung (&rarr; Simulation)</li>
    <li>Verschiedene Kunden- und/oder Bedienertypen (&rarr; Simulation)</li>
    <li>Warteschlangennetzwerke (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ErlangBTable=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/M/c/c-Modells für die jeweiligen Parameter werden als Tabelle ausgegeben. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ErlangBValues');">Erlang-B-Formel Einzelwerte</a>.
</p>
`;

lang.text.ErlangBDiagram=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/M/c/c-Modells für die jeweiligen Parameter werden als Diagramm dargestellt. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ErlangBValues');">Erlang-B-Formel Einzelwerte</a>.
</p>
`;

lang.text.ErlangCValues=`
<p>
Die Erlang-C-Formel wurde Anfang des 20. Jahrhunderts von dem dänischen Mathematiker <a href="http://de.wikipedia.org/wiki/Agner_Krarup_Erlang" target="_blank">Agner Krarup Erlang</a> aufgestellt,
um die Leistungsbemessung der damals noch manuell erfolgenden Telefonvermittlung zu optimieren.
</p>
<p>
In dem Erlang-Modell wird angenommen, dass die Zwischenankunftszeiten der Kunden, die Bedienzeiten und auch die Wartezeittoleranzen der Kunden exponential verteilt sind.
Außerdem wird angenommen, dass sich das System im stationären Zustand befindet.
</p>
<p>
Zur Berechnung der Kenngrößen des Warteschlangensystems müssen lediglich die Ankunftsrate, die Bedienrate und die Anzahl an parallelen Bedienern angegeben werden.
Die Ausgabe wird bei Veränderung der Parameter jeweils automatisch aktualisiert.
</p>
`;

lang.text.ErlangCValuesLimitations=`
<p class="card-text">
Folgende häufig wichtige Eigenschaften können durch die Erlang-C-Formel nicht abgebildet werden:
<ul>
    <li>Andere Zwischenankunfts- und Bedienzeitverteilungen statt der Exponentialverteilung (&rarr; Allen-Cunneen-Näherungsformel)</li>
    <li>Ungeduld der Kunden (&rarr; erweiterte Erlang-C-Formel)</li>
    <li>Wiederholer nach einem Warteabbruch (&rarr; Simulation)</li>
    <li>Weiterleitungen nach einer Bedienung (&rarr; Simulation)</li>
    <li>Verschiedene Kunden- und/oder Bedienertypen (&rarr; Simulation)</li>
    <li>Warteschlangennetzwerke (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ErlangCTable=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/M/c-Modells für die jeweiligen Parameter werden als Tabelle ausgegeben. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C-Formel Einzelwerte</a>.
</p>
`;

lang.text.ErlangCDiagram=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/M/c-Modells für die jeweiligen Parameter werden als Diagramm dargestellt. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C-Formel Einzelwerte</a>.
</p>
`;

lang.text.ExtErlangCValues=`
<p>
Die erweiterte Erlang-C-Formel ergänzt das für die <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C-Formel</a>
betrachtete Modell um eine begrenzte <b>Wartezeittoleranz</b> der Kunden sowie um eine Begrenzung der <b>Größe des Warteraums</b>. Treffen Kunden ein, während
alle Warte- und Bedienplätze belegt sind, so werden diese abgewiesen.
</p>

<p>
Die generelle Einschränkung der Erlang-Modelle, dass alls Zufallsgrößen gemäß der Exponentialverteilung verteilt sein müssen, beleibt weiter bestehen. Sollen beliebige
Wahrscheinlichkeitsverteilungen (die nur noch über ihre Kenngrößen charakterisiert werden), so muss auf die
<a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen-Näherungsformel</a> zurückgegriffen werden.
</p>
`;

lang.text.ExtErlangCValuesLimitations=`
<p class="card-text">
Folgende häufig wichtige Eigenschaften können auch durch die erweiterte Erlang-C-Formel nicht abgebildet werden:
<ul>
    <li>Andere Zwischenankunfts- und Bedienzeitverteilungen statt der Exponentialverteilung (&rarr; Allen-Cunneen-Näherungsformel)</li>
    <li>Wiederholer nach einem Warteabbruch (&rarr; Simulation)</li>
    <li>Weiterleitungen nach einer Bedienung (&rarr; Simulation)</li>
    <li>Verschiedene Kunden- und/oder Bedienertypen (&rarr; Simulation)</li>
    <li>Warteschlangennetzwerke (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ExtErlangCTable=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/M/c/K+M-Modells für die jeweiligen Parameter werden als Tabelle ausgegeben. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ExtErlangCValues');">erweiterte Erlang-C-Formel Einzelwerte</a>.
</p>
`;

lang.text.ExtErlangCDiagram=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/M/c/K+M-Modells für die jeweiligen Parameter werden als Diagramm dargestellt. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ExtErlangCValues');">erweiterte Erlang-C-Formel Einzelwerte</a>.
</p>
`;

lang.text.PCValues=`
<p>
Bei der Verwendung der <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C-Formel</a> ist die Exponentialverteilung für die Zwischenankunfts- und Bedienzeiten automatisch festgelegt.
Bei der Exponentialverteilung kann lediglich der Erwartungswert eingestellt werden. Der Variationskoeffizient beträgt stets 1. Bei der Pollaczek-Chintschin-Formel ist für die Bediendauern keine konkrete Verteilung
vorgegeben. Es müssen jediglich der <b>Erwartungswert</b> und der <b>Variationskoeffizient</b> eingestellt werden, d.h. die
Pollaczek-Chintschin-Formel bietet hier mehr Freiheiten. Der Nachteil besteht jedoch darin, die Formel nur für <b>c=1</b> Bediener gilt. Sollen allgemeine Bediendauern
und Bedieneranzahlen &gt;1 betrachtet werden, so muss stattdessen zur <a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen-Näherungsformel</a>
übergegangen werden, die jedoch keine exakten Ergebnisse, sondern nur Näherungswerte liefert.
</p>
`;

lang.text.PCValuesLimitations=`
<p class="card-text">
Folgende häufig wichtige Eigenschaften können durch die Pollaczek-Chintschin-Formel nicht abgebildet werden:
<ul>
    <li>Andere Zwischenankunftszeitverteilungen statt der Exponentialverteilung (&rarr; Allen-Cunneen-Näherungsformel)</li>
    <li>Bedieneranzahlen größer als 1 (&rarr; Allen-Cunneen-Näherungsformel)</li>
    <li>Wiederholer nach einem Warteabbruch (&rarr; Simulation)</li>
    <li>Weiterleitungen nach einer Bedienung (&rarr; Simulation)</li>
    <li>Verschiedene Kunden- und/oder Bedienertypen (&rarr; Simulation)</li>
    <li>Warteschlangennetzwerke (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.PCTable=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/G/1-Modells für die jeweiligen Parameter werden als Tabelle ausgegeben. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('PCValues');">Pollaczek-Chintschin-Formel Einzelwerte</a>.
</p>
`;

lang.text.PCDiagram=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des M/G/1-Modells für die jeweiligen Parameter werden als Diagramm dargestellt. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('PCValues');">Pollaczek-Chintschin-Formel Einzelwerte</a>.
</p>
`;

lang.text.ACValues=`
<p>
Bei der Verwendung der <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C-Formel</a> ist die Exponentialverteilung für die Zwischenankunfts- und Bedienzeiten automatisch festgelegt. Bei der Exponentialverteilung kann
lediglich der Erwartungswert eingestellt werden. Der Variationskoeffizient beträgt stets 1. Bei der Allen-Cunneen-Näherungsformel ist keine konkrete Verteilung mehr für
die Zwischenankunfts- und Bedienzeiten vorgegeben. Es müssen jediglich der <b>Erwartungswert</b> und der <b>Variationskoeffizient</b> eingestellt werden, d.h. die
Allen-Cunneen-Näherungsformel bietet hier mehr Freiheiten. Der Nachteil besteht jedoch darin, dass die Ergebnisse nur noch Näherungen sind und keine exakte Übereinstimmung
mit den realen Werten in dem Modell erwartet werden kann. Außerdem können nur die Kenngrößen bestimmt werden. Eine Verteilungsfunktion der Wartezeiten (P(W&le;t)) lässt
sich nicht bestimmen.
</p>
`;

lang.text.ACValuesLimitations=`
<p class="card-text">
Folgende häufig wichtige Eigenschaften können auch durch die Allen-Cunneen-Näherungsformel nicht abgebildet werden:
<ul>
    <li>Ungeduld der Kunden (&rarr; erweiterte Erlang-C-Formel)</li>
    <li>Wiederholer nach einem Warteabbruch (&rarr; Simulation)</li>
    <li>Weiterleitungen nach einer Bedienung (&rarr; Simulation)</li>
    <li>Verschiedene Kunden- und/oder Bedienertypen (&rarr; Simulation)</li>
    <li>Warteschlangennetzwerke (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ACTable=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des G/G/c-Modells für die jeweiligen Parameter werden als Tabelle ausgegeben. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen-Formel Einzelwerte</a>.
</p>
`;

lang.text.ACDiagram=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des G/G/c-Modells für die jeweiligen Parameter werden als Diagramm dargestellt. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen-Formel Einzelwerte</a>.
</p>
`;

lang.text.ExtACValues=`
<p>
Die erweiterte Allen-Cunneen-Näherungsformel ergänzt die Modellierungsmöglichkeiten der
<a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen-Näherungsformel</a>
um <b>Ankunfts- und Bedien-Batches</b> sowie um eine <b>begrenzte Verfügbarkeit</b> der Bediener.
</p>
<p>
<b>Ankunfts-Batche</b> bedeuten, dass pro Ankunftsereignis nicht jeweils ein Kunde, sondern stets eine bestimmte Anzahl größer als 1 an Kunden
eintrifft. Die Zwischenankunftszeiten beschreiben weiterhin die Abstände zwischen den Ankunftsereignissen, d.h. beträgt die mittlere Zwischenankunftszeit
in einem Modell 60 Sekunden und ist die Ankunfts-Batch-Größe auf 2 gestellt, so trifft umgerechnet im Mittel alle 30 Sekunden ein Kunde ein.
</p>
<p>
<b>Bedien-Batche</b> bedeuten, dass ein einzelner Bediener jeweils mehrere Kunden gleichzeitig bedienen kann. Die mittlere Bediendauer bezieht sich bei der
Verwendung von Bedien-Batchen dann nicht mehr auf einzelne Kunden, sondern auf einen ganzen Batch. Dauert die Bedienung eines Batches z.B. im Mittel eine Minute
und bestehen die Bedien-Batches aus zwei Kunden, so benötigt ein Bediener umgerechnet im Mittel 30 Sekunden zu Bedienung eines Kunden.
Während eine Erhöhung der Ankunfts-Batch-Größe (bei Beibehaltung aller weiteren Parameter) bedeutet, dass die Auslastung des Systems steigt,
verringert eine Erhöhung der Bedien-Batch-Größe die Last. Bedien-Batche bergen ein ansonsten nicht auftretendes Potential für zusätzliche Wartezeiten: Sollen
stets drei Kunden gleichzeitig in einem Batch bedient werden, warten jedoch nur zwei Kunden in der Warteschlange während ein Bediener verfügbar wird, so startet
kein Bedienvorgang (bis nicht ein dritter Kunde eingetroffen ist). In diesem Fall müssen also Kunden warten, obwohl ein freier Bediener verfügbar wäre.
</p>
`;

lang.text.ExtACValuesLimitations=`
<p class="card-text">
Folgende häufig wichtige Eigenschaften können auch durch die erweiterte Allen-Cunneen-Näherungsformel nicht abgebildet werden:
<ul>
    <li>Ungeduld der Kunden (&rarr; erweiterte Erlang-C-Formel)</li>
    <li>Wiederholer nach einem Warteabbruch (&rarr; Simulation)</li>
    <li>Weiterleitungen nach einer Bedienung (&rarr; Simulation)</li>
    <li>Verschiedene Kunden- und/oder Bedienertypen (&rarr; Simulation)</li>
    <li>Warteschlangennetzwerke (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ExtACTable=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des G/G/c-Modells für die jeweiligen Parameter werden als Tabelle ausgegeben. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ExtACValues');">erweiterte Allen-Cunneen-Formel Einzelwerte</a>.
</p>
`;

lang.text.ExtACDiagram=`
<p>
Wählen Sie für einen Parameter den Modus "<b>Variabel</b>" aus. Dieser wird dann in einem vorgegebenen Bereich variiert.
Die Kenngrößen des G/G/c-Modells für die jeweiligen Parameter werden als Diagramm dargestellt. Eine Erklärungen der Bedeutung der Eingabeparameter
finden Sie auf der Seite <a href="javascript:void(0);" onclick="showTab('ExtACValues');">erweiterte Allen-Cunneen-Formel Einzelwerte</a>.
</p>
`;

lang.text.CompareValues=`
<p>
Mit Hilfe der Formeln der Warteschlangentheorie lassen sich alltägliche Wartesituationen untersuchen. Exemplarisch sollen die folgenden 4 Modelle betrachtet werden:
</p>
<ul>
  <li>Es stehen zwei Bediener zur Verfügung. Die ankommenden Kunden werden von einem sogenannten Dispatcher dem jeweils freiwerdenden Schalter zugewiesen. Nach diesem Prinzip werden z.B. beim Check-In auf dem Flughafen die Warteschlangen abgearbeitet.</li>
  <li>Auch hier stehen zwei parallele Bediener zur Verfügung. Allerdings werden die Kunden bereits bei ihrer Ankunft gleichmäßig (d.h. zu je 50%) auf die beiden Warteschlangen verteilt.</li>
  <li>Es gibt nur einen Bediener und eine Warteschlange. Der Bediener kann jedoch zwei Kunden gleichzeitig bedienen.</li>
  <li>Es gibt nur einen Bediener und eine Warteschlange. Der Bediener arbeitet jedoch mit doppelter Geschwindigkeit.</li>
</ul>`;

lang.text.formulasCompareMoreInfo=`
<p>
Am schlechtesten schneidet das System mit den <b>getrennten Warteschlangen</b> ab. Da Kunden sich beim Betreten des Systems zufällig für eine der beiden Teilwarteschlangen entscheiden, kann hier der Effekt auftreten, dass eine der beiden Warteschlangen leer läuft, während an der anderen Schlange Kunden warten müssen.
</p>
<p>
Bei der <b>Batch-Bedienung</b> kann dieses Problem nicht auftreten, da es hier nur eine Warteschlange gibt. Jedoch kann bei einem System mit Batch-Bedienungen ein anderer nachteilhafter Effekt auftreten: Es kann der Fall eintreten, dass sich der Bediener im Leerlauf befindet und dennoch ein eintreffender Kunde warten muss. Da Batch-System kann immer nur zwei Kunden gleichzeitig bedienen. Befindet sich nur ein Kunde in der Warteschlange, so muss dieser warten (obwohl der Bediener im Leerlauf ist).
</p>
<p>
Bei den Systemen mit der <b>gemeinsamen Warteschlange</b> und mit dem <b>doppelt so schnellen Bediener</b> können die oben genannten negativen Effekte nicht auftreten: Es existiert nur eine Warteschlange und eintreffende Kunden können stets (ohne Batch-Bildungs-Effekte) sofort bedient werden. Welches dieser beiden System letztendlich "besser" ist, hängt von der Betrachungsweise ab: Treffen bei dem System mit der gemeinsamen Warteschlange (und zwei Bedienernn) zwei Kunden in kurzem Abstand nacheinander ein, so können beide sofort bedient werden. Im Fall des doppelt so schnellen Bedieners müsste der zweite Kunde hingegen zunächst (kurz) warten. D.h. in Bezug auf die Wartezeiten ist die gemeinsame Warteschlange von Vorteil. Betrachtet man jedoch die Durchlaufzeiten, so ist der doppelt so schnelle Bediener besser: Hier entstehen zwar (geringfügig) mehr Wartezeiten. Diese werden jedoch meist durch die wesentlich kürzere Bediendauer überkompensiert.
</p>`;

lang.text.ShortestQueueValues=`
<p>
Stehen wie im Supermarkt mehrere Kassen zur Auswahl, so neigt man dazu, sich bei der Kasse mit der kürzesten Warteschlange anzustellen, um die eigene Wartezeit zu minimieren.
</p>
<p>
Doch offensichtlich garantiert diese Strategie nicht, dass man auch schneller abgefertigt wird. Da die Bediendauern der einzelnen Kunden zufällig schwanken (der eine hat mehr im Einkaufskorb, der andere weniger), kann es vorkommen, dass in der langen Warteschlange zufällig viele kleine Aufträge aufeinander folgen, während in der kürzeren Schlange große Aufträge vorherrschen. In diesem Fall muss man in der kürzeren Schlange möglicherweise länger warten als in der längeren Schlange.
</p>
<p>
Mathematisch lässt sich nachweisen, dass diese Situation umso häufiger eintritt, je unregelmäßiger die Arbeitsaufträge der einzelnen Kunden sind. (Sind umgekehrt alle Arbeitsaufträge etwa gleich groß, d.h. haben alle Kunden etwa gleichviele Gegenstände in ihrem Einkaufskorb, so wird man an der Kasse mit der kürzeren Warteschlange sicherlich auch schneller abgefertigt werden.)
</p>`;

lang.text.ShortestQueueTable=`
<p>
Stehen wie im Supermarkt mehrere Kassen zur Auswahl, so neigt man dazu, sich bei der Kasse mit der kürzesten Warteschlange anzustellen, um die eigene Wartezeit zu minimieren.
</p>
<p>
Doch offensichtlich garantiert diese Strategie nicht, dass man auch schneller abgefertigt wird. Da die Bediendauern der einzelnen Kunden zufällig schwanken (der eine hat mehr im Einkaufskorb, der andere weniger), kann es vorkommen, dass in der langen Warteschlange zufällig viele kleine Aufträge aufeinander folgen, während in der kürzeren Schlange große Aufträge vorherrschen. In diesem Fall muss man in der kürzeren Schlange möglicherweise länger warten als in der längeren Schlange.
</p>
<p>
Mathematisch lässt sich nachweisen, dass diese Situation umso häufiger eintritt, je unregelmäßiger die Arbeitsaufträge der einzelnen Kunden sind. (Sind umgekehrt alle Arbeitsaufträge etwa gleich groß, d.h. haben alle Kunden etwa gleichviele Gegenstände in ihrem Einkaufskorb, so wird man an der Kasse mit der kürzeren Warteschlange sicherlich auch schneller abgefertigt werden.)
</p>`;

lang.text.ShortestQueueDiagram=`
<p>
Stehen wie im Supermarkt mehrere Kassen zur Auswahl, so neigt man dazu, sich bei der Kasse mit der kürzesten Warteschlange anzustellen, um die eigene Wartezeit zu minimieren.
</p>
<p>
Doch offensichtlich garantiert diese Strategie nicht, dass man auch schneller abgefertigt wird. Da die Bediendauern der einzelnen Kunden zufällig schwanken (der eine hat mehr im Einkaufskorb, der andere weniger), kann es vorkommen, dass in der langen Warteschlange zufällig viele kleine Aufträge aufeinander folgen, während in der kürzeren Schlange große Aufträge vorherrschen. In diesem Fall muss man in der kürzeren Schlange möglicherweise länger warten als in der längeren Schlange.
</p>
<p>
Mathematisch lässt sich nachweisen, dass diese Situation umso häufiger eintritt, je unregelmäßiger die Arbeitsaufträge der einzelnen Kunden sind. (Sind umgekehrt alle Arbeitsaufträge etwa gleich groß, d.h. haben alle Kunden etwa gleichviele Gegenstände in ihrem Einkaufskorb, so wird man an der Kasse mit der kürzeren Warteschlange sicherlich auch schneller abgefertigt werden.)
</p>`;

lang.text.EconomyOfScaleTable=`
<p>
Die <a href="https://de.wikipedia.org/wiki/Skaleneffekt" target="_blank">Economy of Scale</a> (oder auf Deutsch der positive Skaleneffekt) beschreibt die Tatsache, dass größere (Produktions-)Systeme häufig wirtschaftlicher arbeiten können als kleinere. Dies kann verschiedenste Gründe haben. So kann der Einkauf größerer Mengen an Rohstoffen pro Stück kostengünstiger sein, als der Einkauf kleinerer Mengen oder aber für die doppelte Menge an zu produzierenden und zu verkaufenden Produkten werden in der Verwaltung (Buchhaltung, Vertrieb, ...) nicht doppelt so viele Mitarbeiter benötigt.
</p>
<p>
Im Kontext der Warteschlangentheorie ist jedoch besonders der Effekt, dass sich bei größeren Systemen die Schwankungen im Kundenankunftsstrom und im Bedienprozess besser gegenseitig ausgleichen können, von Bedeutung.
</p>
<p>
In dem Rechenmodell kann die mittlere Auslastung (&rho;) der Bediener fest vorgegeben werden. Wird nun die Anzahl an Bedienern (c) verändert, so ändert sich automatisch auch die Zwischenankunftszeit (E[I]), so dass insgesamt die Auslastung (&rho;=E[S]/E[I]/c) konstant bleibt. Auf diese Weise können über die Variation der Anzahl an Bedienern verschieden große Systeme jeweils bei exakt derselben Auslastung verglichen werden.
</p>`;

lang.text.EconomyOfScaleDiagram=`
<p>
Die <a href="https://de.wikipedia.org/wiki/Skaleneffekt" target="_blank">Economy of Scale</a> (oder auf Deutsch der positive Skaleneffekt) beschreibt die Tatsache, dass größere (Produktions-)Systeme häufig wirtschaftlicher arbeiten können als kleinere. Dies kann verschiedenste Gründe haben. So kann der Einkauf größerer Mengen an Rohstoffen pro Stück kostengünstiger sein, als der Einkauf kleinerer Mengen oder aber für die doppelte Menge an zu produzierenden und zu verkaufenden Produkten werden in der Verwaltung (Buchhaltung, Vertrieb, ...) nicht doppelt so viele Mitarbeiter benötigt.
</p>
<p>
Im Kontext der Warteschlangentheorie ist jedoch besonders der Effekt, dass sich bei größeren Systemen die Schwankungen im Kundenankunftsstrom und im Bedienprozess besser gegenseitig ausgleichen können, von Bedeutung.
</p>
<p>
In dem Rechenmodell kann die mittlere Auslastung (&rho;) der Bediener fest vorgegeben werden. Wird nun die Anzahl an Bedienern (c) verändert, so ändert sich automatisch auch die Zwischenankunftszeit (E[I]), so dass insgesamt die Auslastung (&rho;=E[S]/E[I]/c) konstant bleibt. Auf diese Weise können über die Variation der Anzahl an Bedienern verschieden große Systeme jeweils bei exakt derselben Auslastung verglichen werden.
</p>`;

/* English */

const languageEN={};

lang=languageEN;

lang.GUI={};
lang.GUI.imageMode="en";
lang.GUI.Name="Queue calculator";
lang.GUI.PrivacyTitle="Info";
lang.GUI.PrivacyInfo="All calculations are performed entirely in the browser.<br>This Webapp does not perform any further communication with the server after loading the HTML and script code.";
lang.GUI.OtherLanguage="Eine <a href=\"index_de.html\" onclick=\"localStorage.setItem('selectedLanguage','de')\"><b>deutsche Version</b></a> dieses Rechners steht ebenfalls zur Verfügung.";
lang.GUI.modeValues="Individual values";
lang.GUI.modeValuesOnly="Values";
lang.GUI.modeTable="Table";
lang.GUI.modeDiagram="Diagram";
lang.GUI.modeRangeStart="Start value";
lang.GUI.modeRangeStep="Step wide";
lang.GUI.modeRangeEnd="End value";
lang.GUI.modeMore="More information";
lang.GUI.formulaErlangB="Erlang-B formula";
lang.GUI.formulaErlangBLong="Erlang-B formula (M/M/c model)";
lang.GUI.formulaErlangBInfo="The Erlang B formula allows the computation of the performance indicators of an <b>M/M/c/c</b> model, i.e., a queueing model without waiting room with exponentially distributed inter-arrival and service times and c&ge;1 operators.";
lang.GUI.formulaErlangBLimitations="Limitations of the Erlang-B formula";
lang.GUI.formulaErlangC="Erlang-C formula";
lang.GUI.formulaErlangCLong="Erlang-C formula (M/M/c model)";
lang.GUI.formulaErlangCInfo="The Erlang C formula allows the computation of the performance indicators of an <b>M/M/c</b> model, i.e., a queueing model with exponentially distributed inter-arrival and service times and c&ge;1 operators.";
lang.GUI.formulaErlangCLimitations="Limitations of the Erlang-C formula";
lang.GUI.formulaExtErlangC="Extended Erlang-C formula";
lang.GUI.formulaExtErlangCLong="Extended Erlang-C formula (M/M/c/K+M model)";
lang.GUI.formulaExtErlangCInfo="In addition to the possibilities of the Erlang C formula, the extended Erlang C formula allows to map <b>>waiting cancelations</b> as well as a <b>limited waiting room size</b>, i.e. it allows the computation of the performance indicators of an <b>M/M/c/K+M</b> model.";
lang.GUI.formulaExtErlangCLimitations="Limitations of the extended Erlang-C formula";
lang.GUI.formulaPC="Pollaczek-Chintschin formula";
lang.GUI.formulaPCLong="Pollaczek-Chintschin formula (M/G/1 model)";
lang.GUI.formulaPCInfo="The Pollaczek-Chintschin formula no longer requires that the service times are distributed exponentially. But for this only models with one operator can be examined (<b>M/G/1</b> model).";
lang.GUI.formulaPCLimitations="Limitations of the Pollaczek-Chintschin formula";
lang.GUI.formulaAC="Allen-Cunneen approximation formula";
lang.GUI.formulaACLong="Allen-Cunneen approximation formula (G/G/c model)";
lang.GUI.formulaACInfo="The Allen-Cunneen approximation formula no longer requires that the inter-arrival and service times are distributed exponentially  (<b>G/G/c</b>-Modell). In particular, this allows the use of <b>coefficients of variation</b> different from 1.";
lang.GUI.formulaACLimitations="Limitations of the Allen-Cunneen approximation formula";
lang.GUI.formulaExtAC="Extended Allen-Cunneen approximation formula";
lang.GUI.formulaExtACLong="Extended Allen-Cunneen approximation formula (G<sup>b<sub>I</sub></sup>/G<sup>b<sub>S</sub></sup>/c model)";
lang.GUI.formulaExtACInfo="The extended Allen-Cunneen approximation formula additionally allows to map <b>batch arrivals</b>, <b>batch service</b> as well as <b>operator downtimes</b> (<b>G<sup>b<sub>I</sub></sup>/G<sup>b<sub>S</sub></sup>/c</b>-Modell).";
lang.GUI.formulaExtACLimitations="Limitations of the extended Allen-Cunneen approximation formula";
lang.GUI.formulaCompare="Design of queueing systems";
lang.GUI.formulaCompareLong="Design of queueing systems";
lang.GUI.formulaCompareInfo="The formulas of queueing theory can be used to study everyday queueing situations in which the system is configured differently.";
lang.GUI.formulasCompareMoreInfo=`Interpretation of the results`;
lang.GUI.formulaShortestQueue="Choice of the shortest queue";
lang.GUI.formulaShortestQueueLong="Choice of the shortest queue";
lang.GUI.formulaShortestQueueInfo="The choice of the shorter queue is a good estimator of which queue will get you to the checkout faster. However, as the length of the two queues increases, the probability of getting to the checkout faster in the longer queue increases.";
lang.GUI.formulaShortestQueueA="Length of the longer queue";
lang.GUI.formulaShortestQueueAWaitingTime="Waiting time in the longer queue";
lang.GUI.formulaShortestQueueB="Length of the shorter queue";
lang.GUI.formulaShortestQueueBWaitingTime="Waiting time in the shorter queue";
lang.GUI.formulaShortestQueueAInfo1="This queue is not selected by arriving customers because it is assumed that the waiting time here is longer than at the other queue.";
lang.GUI.formulaShortestQueueAInfo2="";
lang.GUI.formulaShortestQueueBInfo1="The shorter queue represents the natural choice for newly arriving customers. It is assumed that the waiting time at this queue is shorter than at the longer queue.";
lang.GUI.formulaShortestQueueBInfo2="";
lang.GUI.formulaEconomyOfScale="Economy of Scale";
lang.GUI.formulaEconomyOfScaleLong="Economy of Scale";
lang.GUI.formulaEconomyOfScaleInfo="In terms of stochastic systems, the economy of scale describes the effect that waiting times are shorter in larger systems than in smaller systems, with an overall identical workload. In queueing models with more operators, fluctuations in the arrival stream and in the service times can balance each other out better than in smaller systems.";
lang.GUI.tabHome="Start";
lang.GUI.tabErlangB="Erlang-B formula";
lang.GUI.tabErlangBInfo="M/M/c/C";
lang.GUI.tabErlangC="Erlang-C formula";
lang.GUI.tabErlangCInfo="M/M/c";
lang.GUI.tabExtErlangC="Extended Erlang-C formula";
lang.GUI.tabExtErlangCInfo="M/M/c/K+M";
lang.GUI.tabGeneralS="General service times";
lang.GUI.tabPC="Pollaczek-Chintschin formula";
lang.GUI.tabPCInfo="M/G/1";
lang.GUI.tabAC="Allen-Cunneen approximation formula";
lang.GUI.tabACInfo="G/G/c";
lang.GUI.tabExtAC="Extended Allen-Cunneen approximation formula";
lang.GUI.tabExtACInfo="G<sup>b<sub>I</sub></sup>/G<sup>b<sub>S</sub></sup>/c";
lang.GUI.tabDesign="System design";
lang.GUI.tabCompare="Comparison of different strategies";
lang.GUI.tabShortestQueue="Choice of the shortest queue";
lang.GUI.tabEconomyOfScale="Economy of Scale";
lang.GUI.tabSimulation='Simulation';
lang.GUI.tabSimulationInfo='If the capabilities of the (extended) Erlang-C formula and the (extended) Allen-Cunneen approximation formula are not sufficient anymore to model a queueing system, one of the open source <b>simulation tools</b> offered here can be used.';
lang.GUI.tabHelp="Help";
lang.GUI.tabHelpDoc="Queueing theory";
lang.GUI.tabHelpGlossary="Glossary";
lang.GUI.tabHelpTextbook="Textbook<br>\"Simulation mit dem<br>Warteschlangensimulator\"<br>(German)";
lang.GUI.diagramInfo="If not all graphs are visible, this may be due to the fact that they lie congruently on top of each other.<br>By clicking on the entries in the <b>legend</b> the graphs of individual data series can be shown or hidden.";
lang.GUI.copyTable="Copy table";
lang.GUI.saveTable="Save table";
lang.GUI.copyDiagram="Copy";
lang.GUI.saveDiagram="Save";
lang.GUI.copyDiagramTable="Copy diagram data as table";
lang.GUI.saveDiagramTable="Save diagram data as table";
lang.GUI.copyDiagramImage="Copy diagram image";
lang.GUI.copyDiagramImageError="Your browser does not support copying images to clipboard.";
lang.GUI.saveDiagramImage="Save diagram image";
lang.GUI.results='Results';
lang.GUI.nextSteps="Next steps";
lang.GUI.nextStepsErlangBTable="Output multiple Erlang-B values as a table";
lang.GUI.nextStepsErlangBDiagram="Display multiple Erlang-B values as a diagram";
lang.GUI.nextStepsErlangCTable="Output multiple Erlang-C values as a table";
lang.GUI.nextStepsErlangCDiagram="Display multiple Erlang-C values as a diagram";
lang.GUI.nextStepsExtErlangCTable="Output multiple extended Erlang-C values as a table";
lang.GUI.nextStepsExtErlangCDiagram="Display multiple extended Erlang-C values as a diagram";
lang.GUI.nextStepsPCTable="Output multiple Pollaczek-Chintschin values as a table";
lang.GUI.nextStepsPCDiagram="Display multiple Pollaczek-Chintschin values as a diagram";
lang.GUI.nextStepsACTable="Output multiple Allen-Cunneen values as a table";
lang.GUI.nextStepsACDiagram="Display multiple Allen-Cunneen values as a diagram";
lang.GUI.nextStepsExtACTable="Output multiple extended Allen-Cunneen values as a table";
lang.GUI.nextStepsExtACDiagram="Display multiple extended Allen-Cunneen values as a diagram";
lang.GUI.tabDownloads="Downloads";
lang.GUI.tabDownloadAppInfo="The queue calculator can be downloaded as an offline executable Windows application:";
lang.GUI.tabDownloadApp="Windows application (exe)";
lang.GUI.tabDownloadsInfo="The formulas stored in the calculation routines on this page are also available for download as spreadsheets and as program code libraries:";
lang.GUI.tabDownloadsExcel="Excel Workbook";
lang.GUI.tabDownloadsLibreOffice="OpenOffice/LibreOffice Workbook";
lang.GUI.tabDownloadsJS="Javascript code";
lang.GUI.tabDownloadsPython="Python code";
lang.GUI.tabDownloadsR="R code";
lang.GUI.simulators="Simulators";
lang.GUI.homeURL="queueingsimulation.de";
lang.GUI.Imprint="Imprint";
lang.GUI.Privacy="Privacy";

lang.WaitingTimeDist={};
lang.WaitingTimeDist.button="Show waiting time distribution";
lang.WaitingTimeDist.heading="Waiting time distribution";
lang.WaitingTimeDist.closeWindow="Close window";
lang.WaitingTimeDist.closeWindowShort="Close";

lang.model={};
lang.model.explanationsShow="Show explanations";
lang.model.explanationsHide="Hide explanations";
lang.model.formulaShow="Show formulas";
lang.model.formulaHide="Hide formulas";
lang.model.invalid="The input parameters are not valid.";
lang.model.invalidNotNegativeInt="A <b>non-negative integer</b> has to be entered.";
lang.model.invalidNotNegativeFloat="A <b>non-negative number</b> has to be entered.";
lang.model.invalidPositiveInt="A <b>positive integer</b> has to be entered.";
lang.model.invalidPositiveFloat="A <b>positive number</b> has to be entered.";
lang.model.noParameterChosen="No parameter to be varied was chosen.";
lang.model.inputInterArrivalTimeMean="Mean inter-arrival time";
lang.model.inputInterArrivalTimeMeanInfo1="The mean inter-arrival time specifies the average time span between two immediately consecutive customer arrivals.";
lang.model.inputInterArrivalTimeMeanInfo2="In queueing theory, instead of the mean inter-arrival time E[I], the <b>arrival rate &lambda;</b> is also frequently used. The arrival rate is the reciprocal of the mean inter-arrival time, i.e. &lambda;=1/E[I].";
lang.model.inputInterArrivalTimeCV="Coefficient of variation of the inter-arrival times";
lang.model.inputInterArrivalTimeCVInfo1="The coefficient of variation controls the variation of the inter-arrival times. A coefficient of variation of 0 means that the customers arrive at fixed intervals. A coefficient of variation of 1 corresponds to a variation according to the exponential distribution.";
lang.model.inputInterArrivalTimeCVInfo2="";
lang.model.inputInterArrivalBatchSize="Arrival batch size";
lang.model.inputInterArrivalBatchSizeInfo1="The arrival batch size indicates how many customers arrive at the same time per arrival event. b(I)=1 means that the customers arrive one at a time.";
lang.model.inputInterArrivalBatchSizeInfo2="An arrival batch size of 2 and a mean inter-arrival time (per arrival event) of 60 means that, on average, a customer arrives every 30 time units.";
lang.model.inputServiceTimeMean="Mean service time";
lang.model.inputServiceTimeMeanInfo1="";
lang.model.inputServiceTimeMeanInfo2="In queueing theory, instead of the mean service time E[S], the <b>service rate &mu;</b> is also frequently used. The service rate is the reciprocal of the mean service time, i.e. &mu;=1/E[S].",
lang.model.inputServiceTimeCV="Coefficient of variation of the service times";
lang.model.inputServiceTimeCVInfo1="The coefficient of variation controls the variation of the service times. A coefficient of variation of 0 means that the service times all have the same length. A coefficient of variation of 1 corresponds to a variation according to the exponential distribution.";
lang.model.inputServiceTimeCVInfo2="";
lang.model.inputServiceBatchSize="Service batch size";
lang.model.inputServiceBatchSizeInfo1="The service batch size indicates how many customers are served simultaneously by one operator. b(S)=1 means that the customers are served individually.";
lang.model.inputServiceBatchSizeInfo2="A service batch size of 2 and an average service time of 60 means that, on average, 30 time units are required to serve one customer.";
lang.model.inputNumberOfOperators="Number of operators";
lang.model.inputNumberOfOperatorsInfo1="The specified number of operators works in parallel at the service station.";
lang.model.inputNumberOfOperatorsInfo2="";
lang.model.inputServiceLevel="Service level";
lang.model.inputServiceLevelInfo1="This value is optional. If a value &ge;0 is specified here, then in addition to the usual parameters, the number of customers who had to wait the maximum time specified here is calculated (<b>P(W&le;t)</b>).";
lang.model.inputServiceLevelInfo2="";
lang.model.inputSystemSize="System size";
lang.model.inputSystemSizeInfo1="Customers arriving while all waiting spaces are occupied will be turned away.";
lang.model.inputSystemSizeInfo2="K is the sum of waiting and serving places, i.e. K must be at least as large as c.";
lang.model.inputWaitingTimeToleranceMean="Mean waiting time tolerance";
lang.model.inputWaitingTimeToleranceMeanInfo1="";
lang.model.inputWaitingTimeToleranceMeanInfo2="In queueing theory, instead of the mean waiting time tolerance E[WT], the <b>cancelation rate &nu;</b> is also frequently used. The cancelation rate is the reciprocal of the mean waiting time tolerance, i.e. &nu;=1/E[WT] applies.";
lang.model.inputAvailability="Availability";
lang.model.inputAvailabilityInfo1="An availability of 1 means that operators are always ready to serve customers, an availability of 0.5 means that an operator is only ready to serve with a probability of 50%, and so on.";
lang.model.inputAvailabilityInfo2="";
lang.model.inputDownTimeMean="Mean downtime";
lang.model.inputDownTimeMeanInfo1="If an operator is not always available (i.e., <b>P(Up)&lt;1</b>), E[Dt] indicates the mean downtime.";
lang.model.inputDownTimeMeanInfo2="";
lang.model.inputDownTimeCV="Coefficient of variation of the downtimes";
lang.model.inputDownTimeCVInfo1="If an operator is not always available (i.e., <b>P(Up)&lt;1</b>), CV[Dt] gives the coefficient of variation of the downtimes.";
lang.model.inputDownTimeCVInfo2="";
lang.model.inputUtilization="Utilization";
lang.model.inputUtilizationInfo1="The utilization of the operators can be selected between &ge;0% and &lt;100%.";
lang.model.inputUtilizationInfo2="Normally, the utilization of the operators cannot be specified directly. In this model, the inter-arrival times are adjusted so that the set utilization results: <b>E[I]=E[S]/c/rho</b>.";

lang.statistics={};
lang.statistics.unitTime='Time';
lang.statistics.unitNumber='Number';
lang.statistics.unitFraction='Fraction';
lang.statistics.conversion="Conversion";
lang.statistics.characteristicsModeInput="Input";
lang.statistics.characteristicsModeNet="net";
lang.statistics.headingInputParameters="Input parameters";
lang.statistics.headingDirectCalculableParameters="Directly calculable parameters";
lang.statistics.headingErlangBResults="Erlang-B results";
lang.statistics.headingErlangCResults="Erlang-C results";
lang.statistics.headingPCResults="Pollaczek-Chintschin results";
lang.statistics.headingACResults="Allen-Cunneen results";
lang.statistics.headingACCorrectionFactors="Correction factors";
lang.statistics.headingACCorrectionFactorsInfo1="In order to reduce the deviations between approximate formula and reality, several correction factor approaches exist.";
lang.statistics.headingACCorrectionFactorsInfo2="The correction terms are effective for coefficients of variation not equal to 1 (Krämer, Langenbach-Belz, 1976) and for batch sizes larger than 1 (Hanschke, 2006).";
lang.statistics.headingCompareResults="Comparison of the models";
lang.statistics.headingCompareResultsRank="place";
lang.statistics.CorrectionFactorKLB="Langenbach-Belz correction factor";
lang.statistics.CorrectionFactorH="Hanschke correction term";
lang.statistics.rhoError="Only for &rho;&le;1 a steady state can occur. Therefore, no parameters can be calculated for the current model.";
lang.statistics.arrivalAnsServiceRate="Arrival and service rate";
lang.statistics.arrivalRate="Arrival rate";
lang.statistics.arrivalRateInfo="average inter-arrival time";
lang.statistics.arrivalRateNet="Net arrival rate";
lang.statistics.serviceRate="Service rate";
lang.statistics.serviceRateInfo="average service time";
lang.statistics.cancelationRate="Cancelation rate";
lang.statistics.cancelationRateInfo="average waiting time tolerance";
lang.statistics.NumberOfOperators="Number of operators";
lang.statistics.SystemSize="System size";
lang.statistics.SystemSizeInfo="Sum of waiting and service room";
lang.statistics.SystemSizeError="The system size (K) is chosen to be smaller than the number of operators (c). Since the system size is the sum of waiting and services places, this is not a valid model.";
lang.statistics.Workload="Workload";
lang.statistics.WorkloadErlang="Erlang";
lang.statistics.Utilization="Utilization";
lang.statistics.UtilizationNet="Net Utilization";
lang.statistics.UtilizationInputInfo="These are theoretical values related to the arrival rate. Due to waiting cancellations, the real arrival rate at the operators may be lower.";
lang.statistics.UtilizationErlangC="For comparison without rejections";
lang.statistics.WaitingTimeDistribution="Waiting time distribution";
lang.statistics.WaitingTimeDistributionInfo="where <i>Q</i> is the regularized incomplete Gamma function";
lang.statistics.P1="Factor for waiting time distribution";
lang.statistics.averageWaitingTime="Average waiting time";
lang.statistics.variationWaitingTime="Variation of the waiting times";
lang.statistics.averageResidenceTime="Average residence time";
lang.statistics.variationResidenceTime="Variation of the residence times";
lang.statistics.flowFactor="Flow factor";
lang.statistics.averageNQ="Average number of clients in the queue";
lang.statistics.variationNQ="Variation of the number of clients in the queue";
lang.statistics.averageNS="Average number of clients in service process";
lang.statistics.averageN="Average number of clients in the system";
lang.statistics.variationN="Variation of the number of clients in the system";
lang.statistics.serviceLevel="Service level";
lang.statistics.serviceLevelInfo1="of the clients have to wait for";
lang.statistics.serviceLevelInfo2="time units maximum";
lang.statistics.emptySystemProbability="Probability for an empty system";
lang.statistics.waitingProbability="Waiting probability";
lang.statistics.waitingProbabilityInfo="of the customers have to wait before being served";
lang.statistics.blockingProbability="Blocking probability";
lang.statistics.waitingCancelationProbability="Waiting cancelation probability";
lang.statistics.ErlangCCompare1="For comparison without waiting cancelation and without waiting room restriction";
lang.statistics.ErlangCCompare2="For comparison  Erlang-C";
lang.statistics.SuccessAndCanceled="successful and canceled customers";
lang.statistics.BatchArrivalInfo1="based on individual customers";
lang.statistics.BatchArrivalInfo2="Arriving customers per arrival event";
lang.statistics.BatchServiceInfo1="converted to one customer";
lang.statistics.BatchServiceInfo2="Customers served by one operator at a time";
lang.statistics.AvailabilityProbability="Probability for the availability of an operator";
lang.statistics.DownTimeMean="Average downtime";
lang.statistics.DownTimeCV="Coefficient of variation of the down times";
lang.statistics.rejectionProbability="Rejection probability";
lang.statistics.auxiliaryFormulas="Auxiliary formulas";
lang.statistics.for="for";
lang.statistics.SpecialCase="Special case";

lang.statistics.compere={};
lang.statistics.compere.common="Common queue";
lang.statistics.compere.separate="Separate queues";
lang.statistics.compere.batch="Batch service";
lang.statistics.compere.fast="Faster operator";
lang.statistics.compere.input="Input parameters";
lang.statistics.compere.inputSingle="Input parameters per partial system";
lang.statistics.compere.output="Characteristics";

lang.text={};

lang.text.start=`
<p>
With the help of queueing theory formulas, performance indicators like the average waiting time,
the average queue length, the average cycle time, etc. of simple models can be calculated.
The advantage of the formulas is that the results can be calculated directly (without a
time-consuming simulation). However, the calculation possibilities are limited to relatively
simple models or certain model properties must be deliberately neglected (and thus modeling
errors have to be accepted) in order to be able to apply the formulas.
</p>

<p>
The two best known formulas for computing the performance indicators of simple queueing models
are the <b>Erlang-C formula</b> and the <b>Allen-Cunneen approximation formula</b>.
The Erlang C formula assumes <b>exponentially</b> distributed inter-arrival times and service times.
If this assumption is not fulfilled (which is very often the case, especially with regard to the
service times), errors occur between the formula results and the real model.
The Allen-Cunneen approximation formula can in principle take into account
<b>any probability distributions</b> for intermediate arrival times and service times;
the durations are characterized here by mean values and coefficients of variation.
However, the Allen-Cunneen formula is generally only an approximation formula, i.e. (slight)
deviations between formula results and the real parameters are always to be expected.
There are extensions for both models: The Erlang-C model can be extended to include impatient customers
and a limitation on the waiting room size; the Allen-Cunneen model can be extended to include
batch arrivals and service, as well as operator downtimes.
</p>

<p>
Further explanations of the basic concepts of queueing theory as well as the analytical models considered can be found on the
<a href="javascript:void(0);" onclick="showTab('QueueingTheory');">Queueing theory</a>
page.
</p>

<p>
If more complex models and especially queueing networks, i.e. models with several process stations
connected in series and/or in parallel or e.g. different customer types with different characteristics
etc. are to be considered, this can be done by
<a href="javascript:void(0);" onclick="showTab('Simulation');">Simulation</a>.
</p>
`;

lang.text.ErlangBValues=`
<p>
The Erlang-B formula was established in the early 20th century by the Danish mathematician <a href="https://en.wikipedia.org/wiki/Agner_Krarup_Erlang" target="_blank">Agner Krarup Erlang</a>,
to optimize the performance measurement of telephone switching, which was still done manually at the time.
</p>
<p>
In the Erlang model, it is assumed that the inter-arrival times of the customers, the service times and also the waiting time tolerances of the customers are exponentially distributed.
It is also assumed that the system is in steady state.
The model does <b>not</b> have any waiting space. Customers arriving while all operators are busy <b>will be rejected</b>.

</p>
<p>
To calculate the performance indicators of the queueing system, only the arrival rate, the service rate and the number of parallel operators have to be specified.
The output is updated automatically when the parameters are changed.
</p>
`;

lang.text.ErlangBValuesLimitations=`
<p class="card-text">
The following frequently important properties cannot be mapped by the Erlang-B formula:
<ul>
    <li>Other inter-arrival and service time distributions instead of the exponential distribution. (&rarr; Allen-Cunneen approximation formula)</li>
    <li>Retry after being rejected to enter the system (&rarr; Simulation)</li>
    <li>Forwarding after a service process (&rarr; Simulation)</li>
    <li>Different customer and/or operator types (&rarr; Simulation)</li>
    <li>Queueing networks (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ErlangBTable=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/M/c/c model for the respective parameters are output as a table. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ErlangBValues');">Erlang-B formula individual values</a>.
</p>
`;

lang.text.ErlangCDiagram=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/M/c/c model for the respective parameters are output as a diagram. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ErlangBValues');">Erlang-B formula individual values</a>.
</p>
`;

lang.text.ErlangCValues=`
<p>
The Erlang-C formula was established in the early 20th century by the Danish mathematician <a href="https://en.wikipedia.org/wiki/Agner_Krarup_Erlang" target="_blank">Agner Krarup Erlang</a>,
to optimize the performance measurement of telephone switching, which was still done manually at the time.
</p>
<p>
In the Erlang model, it is assumed that the inter-arrival times of the customers, the service times and also the waiting time tolerances of the customers are exponentially distributed.
It is also assumed that the system is in steady state.
</p>
<p>
To calculate the performance indicators of the queueing system, only the arrival rate, the service rate and the number of parallel operators have to be specified.
The output is updated automatically when the parameters are changed.
</p>
`;

lang.text.ErlangCValuesLimitations=`
<p class="card-text">
The following frequently important properties cannot be mapped by the Erlang-C formula:
<ul>
    <li>Other inter-arrival and service time distributions instead of the exponential distribution. (&rarr; Allen-Cunneen approximation formula)</li>
    <li>Impatience of the customers (&rarr; extended Erlang-C formula)</li>
    <li>Retry after a waiting cancelation (&rarr; Simulation)</li>
    <li>Forwarding after a service process (&rarr; Simulation)</li>
    <li>Different customer and/or operator types (&rarr; Simulation)</li>
    <li>Queueing networks (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ErlangCTable=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/M/c model for the respective parameters are output as a table. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C formula individual values</a>.
</p>
`;

lang.text.ErlangCDiagram=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/M/c model for the respective parameters are output as a diagram. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang-C formula individual values</a>.
</p>
`;

lang.text.ExtErlangCValues=`
<p>
The extended Erlang C formula adds a limited <b>waiting time tolerance</b> of the customers as well as a <b>limitation of the size of the waiting room</b>
to the model considered for the <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang C formula</a>.
If customers arrive while all waiting and service stations are occupied, they are rejected to enter the queue.
</p>

<p>
The general restriction of the Erlang models that all random variables must be distributed according to the exponential distribution remains.
If arbitrary probability distributions (which are characterized only by their parameters) are to be used,
the <a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen approximation formula</a> must be applied.
</p>
`;

lang.text.ExtErlangCValuesLimitations=`
<p class="card-text">
The following frequently important properties cannot be mapped by the extended Erlang-C formula:
<ul>
    <li>Other inter-arrival and service time distributions instead of the exponential distribution. (&rarr; Allen-Cunneen approximation formula)</li>
    <li>Retry after a waiting cancelation (&rarr; Simulation)</li>
    <li>Forwarding after a service process (&rarr; Simulation)</li>
    <li>Different customer and/or operator types (&rarr; Simulation)</li>
    <li>Queueing networks (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ExtErlangCTable=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/M/c/K+M model for the respective parameters are output as a table.
An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ExtErlangCValues');">extended Erlang-C formula individual values</a>.
</p>
`;

lang.text.ExtErlangCDiagram=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/M/c/K+M model for the respective parameters are output as a diagram.
An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ExtErlangCValues');">extended Erlang-C formula individual values</a>.
</p>
`;

lang.text.PCValues=`
<p>
When using the <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang C formula</a>, the exponential distribution is automatically set for the inter-arrival and service times.
With the exponential distribution, only the expected value can be set. The coefficient of variation is always 1.
In the Pollaczek-Chintschin formula, a specific distribution is no longer specified for the service times.
Only the <b>expected value</b> and the <b>coefficient of variation</b> have to be set, i.e. the Pollaczek-Chintschin formula offers more freedom here.
However, the disadvantage is it can only be used for <b>c=1</b> operator. If results for &gt;1 operators are needed, the
<a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen approximation formula</a> has to be used,
which, however, does not provide exact results, but only approximate values.
</p>
`;

lang.text.PCValuesLimitations=`
<p class="card-text">
The following frequently important properties cannot be mapped by the extended Erlang-C formula:
<ul>
    <li>Other inter-arrival distributions instead of the exponential distribution. (&rarr; Allen-Cunneen approximation formula)</li>
    <li>Operator count values larger than 1 (&rarr; Allen-Cunneen approximation formula)</li>
    <li>Retry after a waiting cancelation (&rarr; Simulation)</li>
    <li>Forwarding after a service process (&rarr; Simulation)</li>
    <li>Different customer and/or operator types (&rarr; Simulation)</li>
    <li>Queueing networks (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.PCTable=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/G/1 model for the respective parameters are output as a table.
An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('PCValues');">Pollaczek-Chintschin formula individual values</a>.
</p>
`;

lang.text.PCDiagram=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the M/G/1 model for the respective parameters are output as a diagram.
An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('PCValues');">Pollaczek-Chintschin formula individual values</a>.
</p>
`;

lang.text.ACValues=`
<p>
When using the <a href="javascript:void(0);" onclick="showTab('ErlangCValues');">Erlang C formula</a>, the exponential distribution is automatically set for the inter-arrival and service times.
With the exponential distribution, only the expected value can be set. The coefficient of variation is always 1.
In the Allen-Cunneen approximation formula, a specific distribution is no longer specified for the inter-arrival and service times.
Only the <b>expected value</b> and the <b>coefficient of variation</b> have to be set, i.e. the Allen-Cunneen approximation formula offers more freedom here.
However, the disadvantage is that the results are only approximations and no exact match with the real values in the model can be expected.
In addition, only the performance indicators can be determined. A distribution function of the waiting times (P(W&le;t)) cannot be determined.
</p>
`;

lang.text.ACValuesLimitations=`
<p class="card-text">
The following frequently important properties cannot be mapped by the Allen-Cunneen approximation formula:
<ul>
    <li>Impatience of the customers (&rarr; extended Erlang-C formula)</li>
    <li>Retry after a waiting cancelation (&rarr; Simulation)</li>
    <li>Forwarding after a service process (&rarr; Simulation)</li>
    <li>Different customer and/or operator types (&rarr; Simulation)</li>
    <li>Queueing networks (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ACTable=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the G/G/c model for the respective parameters are output as a table. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen approximation formula individual values</a>.
</p>
`;

lang.text.ACDiagram=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the G/G/c model for the respective parameters are output as a diagram. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen approximation formula individual values</a>.
</p>
`;

lang.text.ExtACValues=`
<p>
The extended Allen-Cunneen approximation formula adds <b>arrival and service batches</b> and <b>limited operator availability</b>
to the modeling capabilities of the <a href="javascript:void(0);" onclick="showTab('ACValues');">Allen-Cunneen approximation formula</a>.
</p>
<p>
<b>Arrival batches</b> mean that not one customer arrives per arrival event, but always a certain number of customers greater than 1.
The inter-arrival times also describe the intervals between the arrival events, i.e. if the average inter-arrival time in a model is
60 seconds and the arrival batch size is set to 2, then on average a customer arrives every 30 seconds.
</p>
<p>
<b>Service batches</b> mean that a single operator can serve several customers at the same time. When using service batches,
the average operating time no longer refers to individual customers, but to an entire batch. If, for example, the service
of a batch takes an average of one minute and the service batches consist of two customers, then an operator needs an average
of 30 seconds to service a customer. While increasing the arrival batch size (while keeping all other parameters unchanged)
means that the load on the system increases, increasing the queueing batch size reduces the load. Serving batches hold a
potential for additional waiting times that would not otherwise occur: If three customers are always to be served simultaneously
in a batch, but only two customers are waiting in the queue while an operator becomes available, no serving process will start
(until a third customer has arrived). In this case, customers have to wait even though a free operator would be available.
</p>
`;

lang.text.ExtACValuesLimitations=`
<p class="card-text">
The following frequently important properties cannot be mapped by the extended Allen-Cunneen approximation formula:
<ul>
    <li>Impatience of the customers (&rarr; extended Erlang-C formula)</li>
    <li>Retry after a waiting cancelation (&rarr; Simulation)</li>
    <li>Forwarding after a service process (&rarr; Simulation)</li>
    <li>Different customer and/or operator types (&rarr; Simulation)</li>
    <li>Queueing networks (&rarr; Simulation)</li>
</ul>
</p>
`;

lang.text.ExtACTable=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the G/G/c model for the respective parameters are output as a table. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ExtACValues');">extended Allen-Cunneen approximation formula individual values</a>.
</p>
`;

lang.text.ExtACDiagram=`
<p>
Select the "<b>Variable</b>" mode for a parameter. This is then varied within a specified range.
The performance indicators of the G/G/c model for the respective parameters are output as a diagram. An explanation of the meaning of the input parameters can be found on the page
<a href="javascript:void(0);" onclick="showTab('ExtACValues');">extended Allen-Cunneen approximation formula individual values</a>.
</p>
`;

lang.text.CompareValues=`
<p>
Using the formulas of queuing theory everyday waiting situations can be examined. Exemplary the following 4 models are considered:
</p>
<ul>
  <li>There are two operators available. The arriving customers are assigned by a so-called dispatcher to the next available operator. This principle is used at the check-in at the airport for example.</li>
  <li>Here are two parallel servers available, too. But the clients are divided 50%/50% to the two queues at the time of arrival.</li>
  <li>There is only one operator and one queue. But the operator can serve two customers simultaneously.</li>
  <li>There is only one operator and one queue. But the operator works at double speed.</li>
</ul>`;

lang.text.formulasCompareMoreInfo=`
<p>
The system with the <b>separate queues</b> performs worst. Since clients randomly choose one of the two partial queues when entering the system, the effect can occur here that one of the two queues runs empty while clients have to wait at the other queue.
</p>
<p>
With <b>batch service</b> this problem cannot occur, since there is only one queue. However, in a system with batch service, another disadvantageous effect can occur: It may be the case that the operator is idle and yet an arriving client has to wait. Since the batch system can serve only two clients at a time. If there is only one client in the queue, this client will have to wait (although the operator is idle).
</p>
<p>
In the systems with the <b>common queue</b> and with the <b>twice as fast operator</b>, the negative effects mentioned above cannot occur: Only one queue exists and incoming clients can always be served immediately (without batch formation effects).

Which of these two systems is ultimately "better" depends on how to look at it: In the case of the system with the common queue (and two operators), if two clients arrive in quick succession, both can be served immediately. In the case of the twice as fast operator, on the other hand, the second client would have to wait (briefly) first. I.e. in terms of waiting times, the common queue is advantageous. However, if looking at the residence times, the twice as fast operator is better: Here, there are indeed (slightly) more waiting times. However, these are usually overcompensated by the much shorter service life.
</p>`;

lang.text.ShortestQueueValues=`
<p>
If there are several checkouts to choose from, as in a supermarket, people tend to line up at the checkout with the shortest queue in order to minimize their own waiting time.
</p>
<p>
But obviously this strategy does not guarantee that one will also be processed faster. Since the waiting times of individual customers vary randomly (one has more in his basket, the other less), it may happen that in the long queue many small orders follow each other randomly, while in the shorter queue large orders predominate. In this case, one may have to wait longer in the shorter queue than in the longer queue.
</p>
<p>
Mathematically, it can be shown that the more irregular the work orders of the individual customers are, the more frequently this situation occurs. (Conversely, if all work orders are roughly the same size, i.e. all customers have roughly the same number of items in their shopping baskets, the checkout with the shorter queue will certainly also be processed more quickly).
</p>`;

lang.text.ShortestQueueTable=`
<p>
If there are several checkouts to choose from, as in a supermarket, people tend to line up at the checkout with the shortest queue in order to minimize their own waiting time.
</p>
<p>
But obviously this strategy does not guarantee that one will also be processed faster. Since the waiting times of individual customers vary randomly (one has more in his basket, the other less), it may happen that in the long queue many small orders follow each other randomly, while in the shorter queue large orders predominate. In this case, one may have to wait longer in the shorter queue than in the longer queue.
</p>
<p>
Mathematically, it can be shown that the more irregular the work orders of the individual customers are, the more frequently this situation occurs. (Conversely, if all work orders are roughly the same size, i.e. all customers have roughly the same number of items in their shopping baskets, the checkout with the shorter queue will certainly also be processed more quickly).
</p>`;

lang.text.ShortestQueueDiagram=`
<p>
If there are several checkouts to choose from, as in a supermarket, people tend to line up at the checkout with the shortest queue in order to minimize their own waiting time.
</p>
<p>
But obviously this strategy does not guarantee that one will also be processed faster. Since the waiting times of individual customers vary randomly (one has more in his basket, the other less), it may happen that in the long queue many small orders follow each other randomly, while in the shorter queue large orders predominate. In this case, one may have to wait longer in the shorter queue than in the longer queue.
</p>
<p>
Mathematically, it can be shown that the more irregular the work orders of the individual customers are, the more frequently this situation occurs. (Conversely, if all work orders are roughly the same size, i.e. all customers have roughly the same number of items in their shopping baskets, the checkout with the shorter queue will certainly also be processed more quickly).
</p>`;

lang.text.EconomyOfScaleTable=`
<p>
The <a href="https://en.wikipedia.org/wiki/Economies_of_scale" target="_blank">economy of scale</a> describes the fact that larger (production) systems can often operate more economically than smaller ones. This can have a wide variety of reasons. For example, purchasing larger quantities of raw materials can be more cost-effective than purchasing smaller quantities, or twice the number of products to be produced and sold does not require twice as many employees in administration (accounting, sales, etc.).
</p>
<p>
In the context of queueing theory, the effect that in larger systems the fluctuations in the client arrival stream and in the service process can better balance each other out is, however, of particular importance.
</p>
<p>
In the calculation model, the average utilization (&rho;) of the operators can be fixed. If the number of operators (c) is now changed, the inter-arrival time (E[I]) also changes automatically, so that the overall utilization (&rho;=E[S]/E[I]/c) remains constant. In this way, by varying the number of operators, systems of different sizes can each be compared at exactly the same workload.
</p>`;

lang.text.EconomyOfScaleDiagram=`
<p>
The <a href="https://en.wikipedia.org/wiki/Economies_of_scale" target="_blank">economy of scale</a> describes the fact that larger (production) systems can often operate more economically than smaller ones. This can have a wide variety of reasons. For example, purchasing larger quantities of raw materials can be more cost-effective than purchasing smaller quantities, or twice the number of products to be produced and sold does not require twice as many employees in administration (accounting, sales, etc.).
</p>
<p>
In the context of queueing theory, the effect that in larger systems the fluctuations in the client arrival stream and in the service process can better balance each other out is, however, of particular importance.
</p>
<p>
In the calculation model, the average utilization (&rho;) of the operators can be fixed. If the number of operators (c) is now changed, the inter-arrival time (E[I]) also changes automatically, so that the overall utilization (&rho;=E[S]/E[I]/c) remains constant. In this way, by varying the number of operators, systems of different sizes can each be compared at exactly the same workload.
</p>`;

/* Activate language */

const language=(document.documentElement.lang=='de')?languageDE:languageEN;