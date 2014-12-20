var Game = {};
var assetsmeta = 
[
	{ type:"bg", path:"/assets/gap/svg/field/bg/", count:3},

	{ type:"fg",names:['agriculture','fishing','mining','manufacturing','production','construction',
	'wholesale','hotel','transport','financial','realestate','administration','education','health','community','other'],
		path:"/assets/gap/svg/field/",count:16,amount:2 },

	{ type:"interest", names:[ 'vac', 'gad', 'edu', 'hou', 'tra' ], path:"/assets/gap/svg/interest/", amount:6, count:5,  },

	{ type:"male", names:['casual','solid','business','technical','construction','doctor','fisher','miner','teacher'], amount:3, count:9,
		path:"/assets/gap/svg/human/" },	

	{ type:"female", names:['casual','solid','business','technical','construction','doctor','fisher','miner','teacher'], amount:3, count:9,
		path:"/assets/gap/svg/human/" },

	//{ type:"human_sits", names:[], amount:1, count:3, path:"/assets/gap/svg/human/" },
	{ type:"human_actions", names:['fisher','miner','teacher','casual','solid','business'], amount:1, count:6, path:"/assets/gap/svg/human/" },

	{ name:"about", type:"image", path:"/assets/gap/svg/common/about.svg"},	
	{ name:"arrow-d", type:"image", path:"/assets/gap/svg/common/arrow_d.svg"},	
	{ name:"arrow-d-lblue", type:"image", path:"/assets/gap/svg/common/arrow_d_lblue.svg"},	
	{ name:"backward", type:"image", path:"/assets/gap/svg/common/backward.svg"},	
	{ name:"fb", type:"image", path:"/assets/gap/svg/common/fb.svg"},	
	{ name:"fb2", type:"image", path:"/assets/gap/svg/common/fb2.svg"},	
	{ name:"forward", type:"image", path:"/assets/gap/svg/common/forward.svg"},	
	{ name:"gel", type:"image", path:"/assets/gap/svg/common/gel.svg"},	
	{ name:"gel-white", type:"image", path:"/assets/gap/svg/common/gel-white.svg"},	
	{ name:"glogo", type:"image", path:"/assets/gap/svg/common/glogo.svg"},	
	{ name:"key-left", type:"image", path:"/assets/gap/svg/common/key_left.svg"},	
	{ name:"key-right", type:"image", path:"/assets/gap/svg/common/key_right.svg"},	
	{ name:"key-scroll", type:"image", path:"/assets/gap/svg/common/key_scroll.svg"},	
	{ name:"larrow", type:"image", path:"/assets/gap/svg/common/larrow.svg"},	
	{ name:"logo", type:"image", path:"/assets/gap/svg/common/logo.svg"},
	{ name:"next", type:"image", path:"/assets/gap/svg/common/next.svg"},
	{ name:"pointmask", type:"image", path:"/assets/gap/svg/common/point_mask.svg"},
	{ name:"rarrow", type:"image", path:"/assets/gap/svg/common/rarrow.svg"},
	{ name:"settings", type:"image", path:"/assets/gap/svg/common/settings.svg"},
	{ name:"motion", type:"sound", path:"/assets/gap/sounds/effect/motion"},
	{ name:"award", type:"sound", path:"/assets/gap/sounds/effect/award"},
	{ name:"upgrade", type:"sound", path:"/assets/gap/sounds/effect/upgrade"},
	{ name:"endbad", type:"sound", path:"/assets/gap/sounds/effect/endbad"},
	{ name:"endgood", type:"sound", path:"/assets/gap/sounds/effect/endgood"},
	{ name:"popup-arrow", type:"image", path:"/assets/gap/svg/common/popup_arrow.svg"},
	{ name:"sound", type:"image", path:"/assets/gap/svg/common/sound.svg"},
	{ name:"soundoff", type:"image", path:"/assets/gap/svg/common/soundoff.svg"},
	{ name:"splash", type:"image", path:"/assets/gap/svg/common/splash.svg"},
	{ name:"sum-arrow-down", type:"image", path:"/assets/gap/svg/common/sum_arrow_down.svg"},
	{ name:"sum-arrow-left", type:"image", path:"/assets/gap/svg/common/sum_arrow_left.svg"},
	{ name:"sum-arrow-right", type:"image", path:"/assets/gap/svg/common/sum_arrow_right.svg"},
	{ name:"sum-arrow-up", type:"image", path:"/assets/gap/svg/common/sum_arrow_up.svg"},
	{ name:"sumfb", type:"image", path:"/assets/gap/svg/common/sumfb.svg"},
	{ name:"timelinetick", type:"image", path:"/assets/gap/svg/common/timeline_tick.svg"},
	{ name:"logo_a42", type:"image", path:"/assets/gap/svg/common/logo_a42.svg"},
	{ name:"logo_css", type:"image", path:"/assets/gap/svg/common/logo_css.svg"},
	{ name:"logo_gtuc", type:"image", path:"/assets/gap/svg/common/logo_gtuc.svg"},
	{ name:"logo_js", type:"image", path:"/assets/gap/svg/common/logo_js.svg"},
	{ name:"logo_nmap", type:"image", path:"/assets/gap/svg/common/logo_nmap.png"},
	{ name:"logo_usaid", type:"image", path:"/assets/gap/svg/common/logo_usaid.png"}

];
var assets = [];
Game.Loader = 
{
	timerId:null,
	animTimerId:null,
	timerStarted:false,
	elapsedTime:0,
	splash:null,
	assetsCount:0,
	sound_ext:'mp3',
	assetsAmount:0,
	load:function ()
	{
		var t = this;
		if(!t.timerStarted)
		{
			t.timerStarted = true;
			t.splash();			
			assetsmeta.forEach(function(d){
				t.assetsCount += 'count' in d ? ('amount' in d ? d.amount*d.count:d.count) : 1;
			});
			t.assetsCount+=16+5+6; // category icons, interes icons, human_sits for second human, human_actions for second human
			t.assetsAmount = t.assetsCount;
			t.starttimer();	
			if(isOpera || isFirefox) t.sound_ext = 'ogg';
			assetsmeta.forEach(function(d){
				t.whattoload(d);			
			});			
		}				
	},
	whattoload:function(v) // v has meta information
	{	
		var t = this;
		switch (v.type)
		{
			case 'image': t.readimage(v); break;
			case 'bg': t.readbg(v); break;
			case 'fg': t.readfg(v); break;
			case 'interest': t.readinterest(v); break;
			case 'male': t.readhuman(v,'m'); break;
			case 'female': t.readhuman(v,'f'); break;
			//case 'human_sits': t.human_sits(v); break;
			case 'human_actions': t.human_actions(v); break;			
			case 'sound': t.readsound(v); break;
		}
	},

	splash:function()
	{
		var t = this;
  		t.splash = $("<div class='splash'></div>").appendTo(s);  	
  		$("<div class='box'><div class='percent'>0%</div><div class='coins'></div><div class='mask'></div></div>").appendTo(t.splash);
  		for(i = 0; i < 24; ++i)
  		{
  			var coin = $("<div class='coin'></div>").appendTo('.splash .box .coins');
  			coin.css({ top:Math.floor10(i/4)*22+(Math.floor10(i/4)*20) + randomNumber(-15,15) - 224, left:(i%4)*22+(4*(i%4)) }); //randomNumber(-20,20) 

  			if([1,3,8,10,14,15,17,19,20].indexOf(i)!= -1) coin.addClass('hidden').css('visibility','hidden');
  		}
	},
	loading:function()
	{
		var t = this;
		t.elapsedTime+=100;	
		if(t.assetsCount==0) 
		{
			t.stoptimer();
			t.animate();

			setTimeout(function()
			{	
				t.splash.remove();
				t.complete();
			},500)
		
			// this.splash.fadeOut(1000,'linear',function() {});
		}
	},
	animate:function()
	{

		var t = this;
		var per = Math.round10((t.assetsAmount - t.assetsCount) * 100 / t.assetsAmount);
		t.splash.find('.percent').text( per + '%');
		t.splash.find('.mask').css('bottom', 258*(per/100));	
		var bottomPoint = $(window).height()/2+129;

		var coins = t.splash.find('.coins .coin:not(.hidden)').each(function(i,d){
			d = $(d);
			if(d.offset().top > bottomPoint) d.css({ top: -20 });	
			else d.css({ top: $(this).position().top + 4 }); 
		});
	},
	complete:function()
	{		
		 $(document).on('DOMMouseScroll mousewheel', function(e, delta) {

		      // normalize the wheel delta -1 down, 1 up
		      delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;

		      if(func(onscrollbefore)) onscrollbefore();

		      if(delta < 0) // forward up next
		      {      
		        if(func(onscrollup)) onscrollup();
		      }
		      else // backward down previous
		      {
		        if(func(onscrolldown)) onscrolldown();
		      }
		      if(ingame && !animated && !reward) 
		      { 
		        clearInterval(noscrollTimerId); // clear last noscroll catcher
		        walk(delta < 0 ? 1 : -1);
		        noscrollTimerId = setInterval(function(){ 
		        	//console.log("Tap"); 
	        	}, noscrollEventTime); // create new noscroll interval trigger
		      }

		      if(func(onscrollafter)) onscrollafter()
		    });

		    $(window).resize(function() {
		    	if (resizeId){clearTimeout(resizeId)};
		    	resizeId = setTimeout(function(){ resize(); },100); 
		    });

		    history.replaceState({},'',window.location.href);

			 player = new playerObject();

			window.onpopstate = function(e){	
			   if(e.state !== null) { hist = true;  params_init(); afterinit(); hist = false; } 
			};


		  // ***********************************************  
		    // ***********************************************    
		        afterinit(); // start game       
		    // ***********************************************  
		  // ***********************************************  
		  isAssetsLoaded = true;
	},
	starttimer:function()
	{		  
		var t = this;
		this.timerId = setInterval(function(){ t.loading(); }, 100);
		this.animTimerId = setInterval(function(){ t.animate(); }, 50);
		
	},
	stoptimer:function()
	{
		this.timerStarted=false;
		clearInterval(this.timerId);
		clearInterval(this.animTimerId);
	},
	dec:function()
	{
		--this.assetsCount;
	},
	addimage:function(n,p)
	{
		var t = this;
		assets.push({
			name:n,
			element: $('<img>',
			{
	  			on: 
	  			{
						load: function() { t.dec(); },
						error: function(e) { 
							console.log(this,' - not loaded'); 
						}
			  	},
			  	"src":p
		  	})
	  	});
	},
	readimage:function(v) // v has meta information
	{
		this.addimage(v.name,v.path);
	},
	readbg:function(v)
	{
		for(var i = 0; i < v.count; ++i)
		{
			this.addimage('bg'+(i+1),v.path + 'bg'+(i+1)+'.svg');
		}
	},
	readfg:function(v)
	{
		var t = this;
		for(var i = 0; i < v.count; ++i)
		{
			t.addimage(v.names[i]+'_i',v.path + "fg/" + v.names[i]+'_i' +'.svg');
			t.addimage(v.names[i]+'_o',v.path + "fg/" + v.names[i]+'_o' +'.svg');
			t.addimage(v.names[i]+'_icon',v.path + "icons/" + v.names[i] +'.svg');
		}
		//assets.forEach(function(d){ console.log(d.name);});
	},
	readinterest:function(v)
	{
		var t = this;
		for(var i = 0; i < v.count; ++i)
		{
			t.addimage(v.names[i]+'_icon', v.path + 'icons/' + v.names[i] +'.svg');
			for(var j = 1; j <= v.amount; ++j)
			{
				t.addimage(v.names[i]+'_'+j, v.path + v.names[i]+'_'+j+'.svg');
			}
		}
	},
	readhuman:function(v,g)
	{
		var t = this;
		for(var i = 0; i < v.count; ++i)
		{
			for(var j = 0; j < v.amount; ++j)
			{
				t.addimage(g+(j)+'_'+ v.names[i], v.path + v.names[i] + '/' + g + j + '.svg');
			}			
		}
	},
	// human_sits:function(v)
	// {
	// 	var t = this;
	// 	for(var i = 0; i < v.count; ++i)
	// 	{
	// 		t.addimage('ms_'+ v.names[i], v.path + v.names[i] + '/ms.svg');
	// 		t.addimage('fs_'+ v.names[i], v.path + v.names[i] + '/fs.svg');			
	// 	}
	// },
	human_actions:function(v)
	{
		var t = this;
		for(var i = 0; i < v.count; ++i)
		{
			for(var j = 0; j < v.amount; ++j)
			{
				t.addimage('ma'+(j)+'_'+ v.names[i], v.path + v.names[i] + '/ma'+(j)+'.svg');	
				t.addimage('fa'+(j)+'_'+ v.names[i], v.path + v.names[i] + '/fa'+(j)+'.svg');	
			}			
		}
	},
	readsound:function(v)
	{
		var t = this;
		assets.push({
			name:v.type+'_'+v.name,
			element: $('<audio>',
			{
				preload:'auto',
	  			on: 
	  			{
						canplay: function() { t.dec(); },
						error: function(e) { 
							console.log(this,e,"error");
						}
			  	},
			  	"src":v.path + '.' +  t.sound_ext
		  	})
	  	});
	},
};