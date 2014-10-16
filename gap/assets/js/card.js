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
		//console.log(this.p);
	
		var treasure = $('.' + this.p.place + ' .treasure');
		treasure.find('.card').remove();
		$('<div class="card"><div class="coins"></div><div class="text"></div></div>')
			.css({left:w*0.5,top: (this.p.place == "top" ? lh - 168 : h - 168) }).appendTo(treasure);
		this.scard = treasure.find('.card');		
		this.scoins = this.scard.find('.coins');
		this.stext = this.scard.find('.text');
	};
	this.next = function()
	{
		this.show();
		this.text(interest[0].descr);
		var cnt = this.p.event_by_period[pos];
		this.scoins.empty();
		for(var i = 0; i < cnt; ++i)		
		{
			this.scoins.append('<div class="coin item iboat"></div>');
		}
		//if(cnt > 0) this.hide();
	};
	this.prev = function()
	{
		//this.hide(true);
		this.p.pedestal.move(false,pos);
	};
	this.text = function(text)
	{
		if(typeof text !== undefined)
			this.stext.text(text);
	};
	this.hide = function(immediate)
	{
		//console.log("Card hide",this.p.title);
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