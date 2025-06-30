/*
Copyright 2025 Alexander Herzog

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

export {setupFromParameters};

import {loadSearchStringParameters} from './StringTools.js';
import {getFloatFromString} from './tools.js';


/**
 * Setup a tab from URL search parameters.
 * @param {String} id ID of the tab
 */
function setupTabFromParameters(id) {
  /* Find keys */
  const inputs=document.querySelectorAll('input[id^="'+id+'_"]');
  const keys=new Set(Array.from(inputs).map(input=>input.id).map(id=>id.split('_')[1]));

  /* Process parameters */
  const params=[];
  keys.forEach(key=>{params.push(key); params.push(key+"From"); params.push(key+"Step"); params.push(key+"To");});
  const data=loadSearchStringParameters(params);

  for (let key of keys) {
    if (data[key]) {
      /* Fixed value */
      setupTabKeyFixed(id,key,data[key]);
      continue;
    }
    if (data[key+"From"] || data[key+"Step"] || data[key+"To"]) {
      /* Variable values */
      setupTabKeyVariable(id,key,data[key+"From"],data[key+"Step"],data[key+"To"]);
      continue;
    }
  }

  /* Update results */
  const updateFunction=window["update"+id];
  if (typeof(updateFunction)=='function') updateFunction();
}

/**
 * Set a parameter in a tab to a fixed value
 * @param {String} id ID of the tab
 * @param {String} key Parameter to setup
 * @param {String} value Value for the parameter
 */
function setupTabKeyFixed(id, key, value) {
  const inputFix=document.getElementById(id+"_"+key+"_Fix_Input");
  if (inputFix!=null) inputFix.value=value;

  const input=document.getElementById(id+"_"+key);
  if (input!=null) {
    const numValue=getFloatFromString(value);
    if (numValue!=null) {
      if (input.dataset.percent) {
        input.value=(numValue*100).toLocaleString()+"%";
      } else {
        input.value=value;
      }
    }
  }

  const tabButtonLine=document.getElementById(id+"_"+key+"_Tabs");
  if (tabButtonLine!=null) tabButtonLine.childNodes[0].childNodes[0].click();
}

/**
 * Set a parameter in a tab to a range value
 * @param {String} id ID of the tab
 * @param {String} key Parameter to setup
 * @param {String} valueFrom Start value for the parameter (can be undefined)
 * @param {String} valueStep Step size for the parameter (can be undefined)
 * @param {String} valueTo End value for the parameter (can be undefined)
 */
function setupTabKeyVariable(id, key, valueFrom, valueStep, valueTo) {
  const inputFrom=document.getElementById(id+"_"+key+"_Variabel_From");
  const inputStep=document.getElementById(id+"_"+key+"_Variabel_Step");
  const inputTo=document.getElementById(id+"_"+key+"_Variabel_To");

  if (valueFrom) {
    const numValue=getFloatFromString(valueFrom);
    if (numValue!=null) inputFrom.value=valueFrom;
  }
  if (valueStep) {
    const numValue=getFloatFromString(valueStep);
    if (numValue!=null) inputStep.value=valueStep;
  }
  if (valueTo) {
    const numValue=getFloatFromString(valueTo);
    if (numValue!=null) inputTo.value=valueTo;
  }

  const tabButtonLine=document.getElementById(id+"_"+key+"_Tabs");
  if (tabButtonLine!=null) tabButtonLine.childNodes[1].childNodes[0].click();
}

/**
 * Setup webapp from URL search parameters.
 */
function setupFromParameters() {
  /* Process parameters */
  const data=loadSearchStringParameters(["function"]);
  if (!data["function"]) return;

  /* Find menu item */
  const functionName=data["function"];
  const li=document.querySelectorAll("li[id='menu"+functionName+"']");

  /* Activate and setup tab */
  if (li.length==1) setTimeout(()=>{
    li[0].childNodes[0].click();
    li[0].parentElement.parentElement.childNodes[0].click();
    setTimeout(()=>setupTabFromParameters(li[0].childNodes[0].dataset.bsTarget.substring(1)),100);
  },100);
}
