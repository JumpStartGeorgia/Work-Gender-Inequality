function queueObject(t){var e=[],n=this,r=!0;this.length=0,this.empty=!0;var i=null;this.push=function(t){e.push(t),this.empty=0==e.length?!0:!1,this.length=e.length},this.splice=function(t,n){e.splice(t,0,n),this.empty=0==e.length?!0:!1,this.length=e.length},this.unshift=function(t){this.length=e.unshift(t),this.empty=0==e.length?!0:!1},this.shift=function(){var t=e.shift();this.empty=0==e.length?!0:!1,this.length=e.length,r=!1,"function"==typeof t&&t(),this.timer()},this.start=function(){return this.empty?void(r=!0):void(r?this.shift():this.timer())},this.wait=function(){return this.empty?void this.timer():void(r?this.shift():this.timer())},this.resume=function(){r=!0},this.timer=function(){this.empty&&r?this.complete():(clearTimeout(i),i=setTimeout(function(){n.wait()},100))},this.stop=function(){clearTimeout(i)},this.toString=function(){for(var t=0;t<this.length;++t)console.log(e[t])},this.init=function(){"undefined"!=typeof t&&"function"==typeof t.complete&&(this.complete=t.complete)},this.init()}var queueAmount=0,queueCompleteCallback=function(){--queueAmount,0==queueAmount&&"function"==typeof queueCompleteCallback&&(reward=!1,player.stop("applause"))};