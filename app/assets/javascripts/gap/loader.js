var loader = 
{
	timerId:null,
	timerStarted:false,
	elapsedTime:0,
	splash:null,
	load:function ()
	{
		if(!this.timerStarted)
		{
			this.timerStarted = true;
			this.splash();
			this.starttimer();			
		}				
	},
	splash:function()
	{
  		this.splash = $("<div class='splash'></div>").appendTo(s);  	

  		var t = $('<div class="title">'+sintro.title+'</div>').appendTo(this.splash);
  		var prg = $('<div id="cont" data-pct="0">'+
                '<svg id="svg" width="120" height="120" viewPort="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
                  '<circle class="bk" r="50" cx="60" cy="60" fill="transparent" stroke-dasharray="314.16"></circle>'+
                  '<circle id="bar" r="50" cx="60" cy="60" fill="transparent" stroke-dasharray="314.16"></circle>'+
                '</svg>'+
              '</div>').appendTo(this.splash);    		

		t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 });
	},
	loading:function()
	{
		var t = this;
		this.elapsedTime+=100;		
		if(this.ready()) 
		{
			this.stoptimer();
			this.splash.fadeOut(3000,'linear',function()
			{
				t.splash.remove();
				t.complete();
			});
			
		}
	},
	ready:function()
	{
		return isSoundLoaded;// && isTimelineLoaded;
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
			   if(e.state !== null) { hist = true; init(); hist = false; } 
			   //else { // no state data available,load initial page which was there at first page load }
			};


		  // ***********************************************  
		    // ***********************************************    
		        afterinit(); // start game       
		    // ***********************************************  
		  // ***********************************************  
	},
	starttimer:function()
	{		  
		var t = this;
		this.timerId = setInterval(function(){ t.loading(); }, 100);
	},
	stoptimer:function()
	{
		this.timerStarted=false;
		clearInterval(this.timerId);
	}
};