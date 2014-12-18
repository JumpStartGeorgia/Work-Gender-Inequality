
function cardObject(p)
{
	this.p = p; // human object link
	this.scard = null;
	this.scoins = null;
	this.ssubtitle = null;

	this.init = function()
	{
		this.scard = $('.' + this.p.place + ' .treasure .card');
		this.scoins = this.scard.find('.coins');
		this.ssubtitle = this.scard.find('.sub-title');
	};
	this.show = function(which)
	{		
		var t = this;
	  t.p.queue.push(function() { prepare_for_reward(t.p);  });
	  t.p.queue.push(function() { t.show_process(which);  });
	  t.p.queue.push(function() { prepare_for_work(t.p);  });
	};
	this.show_process = function(which)
	{
		var t = this;
		var congrat = locale.general.you_can_buy;
		t.scoins.empty();
		for(i = 0; i < 6; ++i)
		{
			if(which[i])
			{
				t.scoins.append($("<div class='coin'><div class='icon "+interest[i].class+"'></div><div class='text'>"+  lg.details + ": " + interest[i].descr + "<br/>" + lg.cost + ": " + formatNumber(+interest[i].cost) + ' ' + lg.gel+"</div></div>"));
				congrat += interest[i].title + " " + lg.and + " ";
			}
		}
		congrat = congrat.substr(0,congrat.length-lg.and.length-1);
		t.ssubtitle.text(congrat);
		this.scard.fadeIn(2000,function(){ player.play('upgrade'); });
		this.scard.delay(4000).fadeOut(2000,function(){});

	  t.p.queue.resume();  
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