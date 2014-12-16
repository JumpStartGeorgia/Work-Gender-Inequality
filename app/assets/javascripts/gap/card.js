
function cardObject(p)
{
	this.p = p; // human object link
	this._coins = 0;
	this.from_land = 168;
	this.scard = null;
	this.scoins = null;
	this.stext = null;
	this.__defineGetter__("coins", function(){
	   return this._coins;
	});
	this.__defineSetter__("coins", function(val){
	   this._coins = val;
	});

	this.init = function()
	{
		var treasure = $('.' + this.p.place + ' .treasure');
		treasure.find('.card').remove();
		$('<div class="card"><div class="coins"></div><div class="text"><div class="title">'+locale.general.congrat+'</div><div class="data"></div></div><div class="fb" title="'+locale.general.share_hint+'"></div></div>')
			.appendTo(treasure);
		this.scard = treasure.find('.card');		
		this.scoins = this.scard.find('.coins');
		this.stext = this.scard.find('.text .data');
	};
	this.next = function()
	{
		this.show();
		this.text(interest[0]);
		var cnt = this.p.event_by_period[gap.pos-1];
		this.scoins.empty();
		for(var i = 0; i < cnt; ++i)		
		{
			this.scoins.append('<div class="coin item '+interestAlias+'-1"></div>');
		}
	};
	this.prev = function()
	{
		this.hide(true);
		this.p.pedestal.move(false,gap.pos);
	};
	this.text = function(text)
	{
		if(typeof text !== undefined)
			this.stext.html(locale.general.you_can_buy + text.title + "<br/><br/>" + locale.general.details + ": " + text.descr + "<br/>" + locale.general.cost + ": " + text.cost + ' ' + lg.gel);
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
	this.show = function(immediate)
	{
		if(typeof immediate === undefined) immediate = false;		
		if(immediate) 
		{
			this.scard.show();
		}
		else
		{
			var time = 1000;
			this.scard.fadeIn(time);
		}
	};
}