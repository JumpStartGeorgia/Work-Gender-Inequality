function cardObject(t){this.p=t,this._coins=0,this.from_land=168,this.scard=null,this.scoins=null,this.stext=null,this.__defineGetter__("coins",function(){return this._coins}),this.__defineSetter__("coins",function(t){this._coins=t}),this.init=function(){var t=$("."+this.p.place+" .treasure");t.find(".card").remove(),$('<div class="card"><div class="coins"></div><div class="text"></div></div>').css({left:.5*w,top:"top"==this.p.place?lh-168:h-168}).appendTo(t),this.scard=t.find(".card"),this.scoins=this.scard.find(".coins"),this.stext=this.scard.find(".text")},this.next=function(){this.show(),this.text(interest[0].descr);var t=this.p.event_by_period[pos];this.scoins.empty();for(var e=0;t>e;++e)this.scoins.append('<div class="coin item iboat"></div>')},this.prev=function(){this.p.pedestal.move(!1,pos)},this.text=function(t){void 0!==typeof t&&this.stext.text(t)},this.hide=function(t){if(void 0===typeof t&&(t=!1),t)this.scard.hide();else if(this.scard.is(":visible")){var e=2e3;this.scard.delay(e).fadeOut(e)}},this.show=function(t){if(void 0===typeof t&&(t=!1),t)this.scard.show();else{var e=1e3;this.scard.fadeIn(e)}}}