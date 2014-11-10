var Game = {};
var assetsmeta = 
[
	{ type:"bg", path:"/assets/gap/svg/field/bg/", count:2},
	{ type:"fg",names:['agriculture','fishing','mining','manufacturing','electricity','construction',
	'trade','hotel','transport','financial','realestate','administration','education','health','community','other'],
		path:"/assets/gap/svg/field/fg/",count:16,amount:2 },
	{ type:"interest", names:[ 'vac', 'gad', 'edu', 'hou', 'tra' ],
		path:"/assets/gap/svg/interest/", amount:6, count:5,  },
	{ type:"male", names:['casual','street','business','technical','construction'], amount:6, count:5,
		path:"/assets/gap/svg/human/" },
	{ type:"female", names:['casual','street','business','technical','construction'], amount:6, count:5,
		path:"/assets/gap/svg/human/" },
	{ name:"sound", type:"image", path:"/assets/gap/svg/common/sound.svg"},
	{ name:"soundoff", type:"image", path:"/assets/gap/svg/common/soundoff.svg"},
	{ name:"arrowup", type:"image", path:"/assets/gap/svg/common/arrow-up.svg"},
	{ name:"arrowdown", type:"image", path:"/assets/gap/svg/common/arrow-down.svg"},
	{ name:"pointmask", type:"image", path:"/assets/gap/svg/common/point_mask.svg"},
	{ name:"timelinetick", type:"image", path:"/assets/gap/svg/common/timeline_tick.svg"},
	{ name:"done", type:"sound", path:"/assets/gap/sounds/done.mp3"},
	{ name:"applause", type:"sound", path:"/assets/gap/sounds/happy.mp3"},
	{ name:"long", type:"sound", path:"/assets/gap/sounds/long.mp3"},
	{ name:"select", type:"sound", path:"/assets/gap/sounds/select.mp3"}
];
var assets = [];
Game.Loader = 
{
	timerId:null,
	timerStarted:false,
	elapsedTime:0,
	splash:null,
	assetsCount:0,
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
			t.starttimer();	
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
			case 'sound': t.readsound(v); break;
		}
	},

	splash:function()
	{
  		this.splash = $("<div class='splash'></div>").appendTo(s);  	

  		var t = $('<div class="title">'+sintro.title+'</div>').appendTo(this.splash);
  		var p = $('<div class="progress" style="font-size:30px;">/</div>').appendTo(this.splash);
  		// var prg = $('<div id="cont" data-pct="0">'+
    //             '<svg id="svg" width="120" height="120" viewPort="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
    //               '<circle class="bk" r="50" cx="60" cy="60" fill="transparent" stroke-dasharray="314.16"></circle>'+
    //               '<circle id="bar" r="50" cx="60" cy="60" fill="transparent" stroke-dasharray="314.16"></circle>'+
    //             '</svg>'+
    //           '</div>').appendTo(this.splash);    		

		t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 });
	},
	loading:function()
	{
		var t = this;
		t.elapsedTime+=100;	
		//console.log(t.assetsCount);
		if(t.assetsCount==0) 
		{
			this.stoptimer();
			this.splash.fadeOut(3000,'linear',function()
			{
				t.splash.remove();
				t.complete();
			});
		}
	},
	progress:function()
	{
		var p = $('.progress');
		var tmp = p.text();
		if(tmp == '–') tmp = '\\';
		else if (tmp == '\\') tmp = '|';
		else if (tmp == '|') tmp = '/';
		else if (tmp == '/') tmp = '–';
		p.text(tmp);
	},
	complete:function()
	{		
		 $(document).on('DOMMouseScroll mousewheel', function(e, delta) {

		      // do nothing if is already animating
		      //if($("html,body").is(":animated")) return false;

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
		        noscrollTimerId = setInterval(function(){ console.log("Tap"); },noscrollEventTime); // create new noscroll interval trigger
		      }

		      if(func(onscrollafter)) onscrollafter()
		      
		    });


		    $(window).on("swipeleft",function(){ walk(1); });
		    $(window).on("swiperight",function(){ walk(-1); });
		    // on resize redraw game   
		    $( window ).resize(function() { init(); });

		    history.replaceState({},'',window.location.href);


			window.onpopstate = function(e){
			   if(e.state !== null) { hist = true; redraw(); hist = false; } 
			   //else { // no state data available,load initial page which was there at first page load }
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
		this.timerId = setInterval(function(){ t.loading(); t.progress(); }, 100);
	},
	stoptimer:function()
	{
		this.timerStarted=false;
		clearInterval(this.timerId);
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
					error: function(e) { console.log(this,e,"errror");}
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
			this.addimage(v.names[i]+'_i',v.path + v.names[i]+'_i' +'.svg');
			this.addimage(v.names[i]+'_o',v.path + v.names[i]+'_o' +'.svg');
		}
		//assets.forEach(function(d){ console.log(d.name);});
	},
	readinterest:function(v)
	{
		var t = this;
		for(var i = 0; i < v.count; ++i)
		{
			for(var j = 1; j <= v.amount; ++j)
			{
				this.addimage(v.names[i]+'_'+j, v.path + v.names[i]+'_'+j+'.svg');
			}
		}
	},
	readhuman:function(v,g)
	{
		var t = this;
		for(var i = 0; i < v.count; ++i)
		{
			for(var j = 1; j <= v.amount/2; ++j)
			{
				this.addimage(g+'r'+(j==1?'':j-1)+'_'+ v.names[i], v.path + v.names[i] + '/' + g +'r' + (j==1?'':j-1) + '.svg');
				this.addimage(g+'l'+(j==1?'':j-1)+'_'+ v.names[i], v.path + v.names[i] + '/' + g +'l' + (j==1?'':j-1) + '.svg');
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
	  			on: 
	  			{
					canplay: function() { t.dec(); },
					error: function(e) { console.log(this,e,"error");}
			  	},
			  	"src":v.path
		  	})
	  	});
	},
};