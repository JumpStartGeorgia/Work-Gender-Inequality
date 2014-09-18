// Closure
(function(){

   /**
    * Decimal adjustment of a number.
    *
    * @param   {String} type  The type of adjustment.
    * @param   {Number} value The number.
    * @param   {Integer}   exp      The exponent (the 10 logarithm of the adjustment base).
    * @returns {Number}       The adjusted value.
    */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
       return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
       return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
       return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
       return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
       return decimalAdjust('ceil', value, exp);
    };
  }
  if (!Math.degrees) {
    Math.degrees = function(rad)
    {
    return rad*(180/Math.PI);
    }
  }
  if (!Math.radians) {
    Math.radians = function(deg)
    {
      return deg * (Math.PI/180);
    }
  }
})();
function same_sign(a,b)
{
  return (a ^ b) >= 0;
}
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
if(!String.prototype.trimLeft)
{
  String.prototype.trimLeft = function(a) { console.log('asdfasdfasd asd fasf -----------------',a);};
  "asdfads".trimLeft('11111');


  // trim, rtrim, ltrim
function trim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+chr+'+|'+chr+'+$', 'g');
  return str.replace(rgxtrim, '');
}
function rtrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
  return str.replace(rgxtrim, '');
}
function ltrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
  return str.replace(rgxtrim, '');
}
}

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;

    if (event.keyCode == 8 || event.keyCode == 46
     || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
};
// forward up next
function up(e,delta) { return delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120 < 0; }
// backward down previous
function down(e,delta) { return !(delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120 < 0); }
function isDecimal(v) { return /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/.test(v); }
function isNumber(v) { return /^\d+$/.test(v); }
function isNumberWithSign(v) { return /^-?\d+$/.test(v); }
function fn(v)
{
  var fn = null;
  if(v.indexOf('.') != -1)
  {
    fn = window[v.split('.')[0]][v.split('.')[1]];
  }
  else fn = window[nf]

  if (typeof fn === "function") fn();
}
function switchStyle(selector,dur,dur1,ease,ease1,css,val,val1)
{
    d3.select(selector)
            .transition().duration(dur).ease(ease).style(css,val)
           .transition().duration(dur1).ease(ease1).style(css,val1);
}

function getMonth(v,lang)
{
    lang = lang ? lang : 'en-us';
    return v.toLocaleString(lang, { month: "long" });
}
function getMonthS(v,lang)
{
    lang = lang ? lang : 'en-us';
    return v.toLocaleString(lang, { month: "short" });
}
function monthDiff(from, to) {
    var d1 = from;
    var d2 = to;
    if(d1 > d2) { d1 = to; d2 = from; }
    
    var months = ((d2.getFullYear() - d1.getFullYear()) * 12) - (d1.getMonth()) + (d2.getMonth()); // (years) - (from months) + (to months)
    return months <= 0 ? 0 : months;
}