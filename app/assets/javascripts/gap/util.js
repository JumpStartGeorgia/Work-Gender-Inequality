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
  return (a >=0 && b >= 0) || (a < 0 && b < 0) || false;
}

if(!String.prototype.lpad)
{
  String.prototype.lpad = function(p, l) { // string to pad, length of padding string
      var s = this;
      while (s.length < l)
          s = p + s;
      return s;
  }
}
if(!String.prototype._trim)
{
  String.prototype._trim = function(c) { 
    var r = (!c) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+c+'+|'+c+'+$', 'g');
    return this.replace(r, '');
  };
}
if(!String.prototype._trimLeft)
{
  String.prototype._trimLeft = function(c) { 
    var r = (!c) ? new RegExp('^\\s+') : new RegExp('^'+c+'+');
    return this.replace(r, '');
  };
}
if(!String.prototype._trimRight)
{
  String.prototype._trimRight = function(c) { 
    var r = (!c) ? new RegExp('\\s+$') : new RegExp(c+'+$');
    return this.replace(r, '');
  };
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
function isDecimal(v) { return /^\s*-?[1-9]\d*(\.\d+)?\s*$/.test(v); }
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

function getMonth(v) { return locale.general.monthNames[v.getMonth()]; }
function getMonthS(v) { return locale.general.monthNamesShort[v.getMonth()]; }
function monthDiff(from, to) {
    var d1 = from;
    var d2 = to;
    if(d1 > d2) { d1 = to; d2 = from; }
    
    var months = ((d2.getFullYear() - d1.getFullYear()) * 12) - (d1.getMonth()) + (d2.getMonth()); // (years) - (from months) + (to months)
    return months <= 0 ? 0 : months;
}

/***************************************************************
                  Utility Functions
***************************************************************/
function fstart(v) { console.time(v); console.log("< " + v); }
function fend(v) { console.timeEnd(v); console.log(v + " >");  }
function log(v) { console.log("\t" + v); }
function tt(){ console.log("------------------test-------------------"); }
function exist(v) { return typeof v !== 'undefined' && v !== null && v !== '';}
function empty() {log('empty');};
var func = jQuery.isFunction;
function quadrant(x,y)
{
  if(x>=0 && y>=0) return 1;
  else if(x<0 && y >= 0) return 2;
  else if(x<=0 && y<0) return 3;
  else return 4;
}
function degree_from_radian(rad)
{
  return (rad/Math.PI*180) + (rad > 0 ? 0 : 360);
}
function sample()
{
  fstart(arguments.callee.name);
  // put code here
  fend(arguments.callee.name);
} 
(function($) {
  $.fn.invisible = function() {
    return this.each(function() {
      $(this).css("visibility", "hidden");
    });
  };
  $.fn.visible = function() {
    return this.each(function() {
      $(this).css("visibility", "visible");
    });
  };
}(jQuery));
function coordinateFromPath(progress,path,pathLength,widthScaler,heightScaler)
{
  var percent = Math.round10(progress*100);
  var p1 = path.getPointAtLength(pathLength * (percent-1)/100);
  var p2 = path.getPointAtLength(pathLength * (percent+1)/100);
  var a = Math.atan2(p2.y-p1.y,p2.x-p1.x)*180 / Math.PI;
  var p =  path.getPointAtLength(pathLength * percent/100);
  return { x:p.x*widthScaler,y:p.y*heightScaler, a:a };
} 
function formatNumber(num) { return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); }

/***************************************************************
                  Utility Functions End
***************************************************************/