
function cardObject(p)
{
	this.p = p; // human object link
	this._coins = 0;
	this.from_land = 168;
	this.scard = null;
	this.scoins = null;
	this.ssubtitle = null;

	this.__defineGetter__("coins", function(){
	   return this._coins;
	});
	this.__defineSetter__("coins", function(val){
	   this._coins = val;
	});

	this.init = function()
	{
		var treasure = $('.' + this.p.place + ' .treasure');
		$('<div class="card"><div class="wr"><div class="title">'+locale.general.congrat+'</div><div class="sub-title"></div><div class="coins"></div></div><div class="fb" title="'+locale.general.share_hint+'"></div></div>')
			.appendTo(treasure);
		this.scard = treasure.find('.card');		
		this.scoins = this.scard.find('.coins');
		this.ssubtitle = this.scard.find('.sub-title');
	};
	this.show = function(which)
	{		
		var t = this;
		var congrat = locale.general.you_can_buy;
		t.scoins.empty();
		console.log(which);
		for(i = 0; i < 6; ++i)
		{
			if(which[i])
			{
				t.scoins.append($("<div class='coin'><div class='icon "+interest[i].class+"'></div><div class='text'>"+  lg.details + ": " + interest[i].descr + "<br/>" + lg.cost + ": " + interest[i].cost + ' ' + lg.gel+"</div></div>"));
				congrat += interest[i].title + " " + lg.and + " ";
			}
		}
		congrat = congrat.substr(0,congrat.length-lg.and.length-1);
		t.ssubtitle.text(congrat);
		var time = 2000;
		this.scard.fadeIn(time);
		this.scard.delay(time).fadeOut(time);
	};
	this.prev = function()
	{
		this.hide(true);
		this.p.pedestal.move(false,gap.pos);
	};	
	this.hide = function(immediate)
	{
		if(typeof immediate === undefined) immediate = false;
		if(immediate) 
		{
			this.scard.hide();
		}
		else
		{
			if(this.scard.is(':visible'))
			{
				var time = 2000;
				this.scard.delay(time).fadeOut(time);
			}
		}
	};
}