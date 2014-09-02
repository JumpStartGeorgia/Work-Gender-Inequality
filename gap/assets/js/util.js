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
