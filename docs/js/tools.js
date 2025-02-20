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

export {parseFloatStrict, getFloat, getFloatFromString, getPositiveFloat, getNotNegativeFloat, getInt, getPositiveInt, getNotNegativeInt, isVariabel, factorial, powerFactorial, binom}

/**
 * Converts a string to a floating point number.
 * A comma has to be used a decimal separator.
 * @param {String} value String value to be converted to a floating point number
 * @returns {Number} Floating point number or NaN if the string could not be interpreted as a number
 */
function parseFloatStrict(value) {
  value=value.trim();
  if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
    .test(value))
    return Number(value);
return NaN;
}

/**
 * Converts a number in a string to a floating point number.
 * The string can also represent a percent value (i.e. ends with "%").
 * @param {String} s String containing the number
 * @returns Floating point number or null if the string could not be interpreted as a number
 */
function getFloatFromString(s) {
  if (typeof(s.replaceAll)=='function') s=s.replaceAll(",",".");
  let scale=1;
  if (s.endsWith('%')) {
    scale=0.01;
    s=s.substring(0,s.length-1);
  }
  const num=parseFloatStrict(s);
  if (isNaN(num)) {
    return null;
  }
  return num*scale;

}

/**
 * Converts a number in a html input element to a floating point number.
 * The string can also represent a percent value (i.e. ends with "%").
 * @param {String} id Value of the ID attribute of the input element
 * @returns Floating point number or null if the string in the input field could not be interpreted as a number
 */
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

/**
 * Converts a positive number in a html input element to a floating point number.
 * The string can also represent a percent value (i.e. ends with "%").
 * @param {String} id Value of the ID attribute of the input element
 * @returns Floating point number or null if the string in the input field could not be interpreted as a positive number
 */
function getPositiveFloat(id) {
  let result=getFloat(id);
  if (result==null) return null;
  if (result<=0) {
    setValid(id,false);
    return null;
  }
  return result;
}

/**
 * Converts a non-negative number in a html input element to a floating point number.
 * The string can also represent a percent value (i.e. ends with "%").
 * @param {String} id Value of the ID attribute of the input element
 * @returns Floating point number or null if the string in the input field could not be interpreted as a non-negative number
 */
function getNotNegativeFloat(id) {
  let result=getFloat(id);
  if (result==null) return null;
  if (result<0) {
    setValid(id,false);
    return null;
  }
  return result;
}

/**
 * Converts a string to an integer number.
 * @param {String} value String value to be converted to an integer number
 * @returns {Number} Integer number or NaN if the string could not be interpreted as a number
 */
function parseIntStrict(value) {
if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
  return Number(value);
return NaN;
}

/**
 * Converts a number in a html input element to an integer number.
 * @param {String} id Value of the ID attribute of the input element
 * @returns Integer number or null if the string in the input field could not be interpreted as an integer number
 */
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

/**
 * Converts a positive number in a html input element to an integer number.
 * @param {String} id Value of the ID attribute of the input element
 * @returns Integer number or null if the string in the input field could not be interpreted as a positive integer number
 */
function getPositiveInt(id) {
  let result=getInt(id);
  if (result==null) return null;
  if (result<=0) {
    setValid(id,false);
    return null;
  }
  return result;
}

/**
 * Converts a non-negative number in a html input element to an integer number.
 * @param {String} id Value of the ID attribute of the input element
 * @returns Integer number or null if the string in the input field could not be interpreted as a non-negative integer number
 */
function getNotNegativeInt(id) {
  let result=getInt(id);
  if (result==null) return null;
  if (result<0) {
    setValid(id,false);
    return null;
  }
  return result;
}

/**
 * Marks a html input element as valid or nor valid (via a css class)
 * @param {String} id Value of the ID attribute of the input element
 * @param {Boolean} valid Is the content of the input element valid?
 */
function setValid(id, valid) {
  const element=document.getElementById(id);
  if (element==null) console.log("element id='"+id+"' is null.");
  if (valid) element.classList.remove('is-invalid'); else element.classList.add('is-invalid');
}

/**
 * Returns if the input element is in range mode (true) or in fixed value mode (false)
 * @param {String} id Value of the ID attribute of the input element
 * @returns Is the input element used as the range for the x-axis / the changing input value in the table
 */
function isVariabel(id) {
  const element=document.getElementById(id+'_Variabel');
  if (element==null) console.log("element id='"+id+"' is null.");
  return element.classList.contains("active");
}

/**
 * Calculates n!.
 * @param {Number} n n
 * @returns n!
 */
function factorial(n) {
  let result=1;
  for (let i=2;i<=n;i++) result*=i;
  return result;
}

/**
 * Calculates a^c/c!.
 * @param {Number} a a
 * @param {Number} c c
 * @returns a^c/c!
 */
function powerFactorial(a, c) {
	let result=1;
	for (let i=1;i<=c;i++) result*=(a/i);
	return result;
}

/**
 * Calculates the binomial coefficient binom(n,k).
 * @param {Number} n n in binom(n,k)
 * @param {Number} k k in binom(n,k)
 * @returns Binomial coefficient binom(n,k)
 */
function binom(n,k) {
  let prod=1;
  for (let i=1;i<=k;i++) prod*=(n-i+1)/i;
  return prod;
}