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

export {getFloat, getPositiveFloat, getNotNegativeFloat, getInt, getPositiveInt, getNotNegativeInt, isVariabel, parseFloatStrict}

function parseFloatStrict(value) {
  value=value.trim();
  if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
    .test(value))
    return Number(value);
return NaN;
}

function getFloat(id) {
  const element=document.getElementById(id);
  if (element==null) console.log("element id='"+id+"' is null.");
  let s=element.value;
  if (typeof(s.replaceAll)=='function') s=s.replaceAll(",",".");
  let scale=1;
  if (s.endsWith('%')) {
    scale=0.01;
    s=s.substring(0,s.length-1);
  }
  const num=parseFloatStrict(s);
  if (isNaN(num)) {
    setValid(id,false);
    return null;
  }
  setValid(id,true);
  return num*scale;
}

function getPositiveFloat(id) {
  let result=getFloat(id);
  if (result==null) return null;
  if (result<=0) {
    setValid(id,false);
    return null;
  }
  return result;
}

function getNotNegativeFloat(id) {
  let result=getFloat(id);
  if (result==null) return null;
  if (result<0) {
    setValid(id,false);
    return null;
  }
  return result;
}

function parseIntStrict(value) {
if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
  return Number(value);
return NaN;
}

function getInt(id) {
const element=document.getElementById(id);
if (element==null) console.log("element id='"+id+"' is null.");
const num=parseIntStrict(element.value);
if (isNaN(num)) {
  setValid(id,false);
  return null;
}
setValid(id,true);
return num;
}

function getPositiveInt(id) {
  let result=getInt(id);
  if (result==null) return null;
  if (result<=0) {
    setValid(id,false);
    return null;
  }
  return result;
}

function getNotNegativeInt(id) {
  let result=getInt(id);
  if (result==null) return null;
  if (result<0) {
    setValid(id,false);
    return null;
  }
  return result;
}

function setValid(id, valid) {
  const element=document.getElementById(id);
  if (element==null) console.log("element id='"+id+"' is null.");
  if (valid) element.classList.remove('is-invalid'); else element.classList.add('is-invalid');
}

function isVariabel(id) {
  const element=document.getElementById(id+'_Variabel');
  if (element==null) console.log("element id='"+id+"' is null.");
  return element.classList.contains("active");
}