var loader = 
{
	timerId:null,
	timerStarted:false,
	load:function ()
	{
		if(!this.timerStarted)
		{
			this.timerStarted = true;
			this.starttimer();			
		}				
	},
	loading:function()
	{
		if(this.ready()) 
		{
			this.stoptimer();
			this.complete();
		}
	},
	ready:function()
	{
		//if(isSoundLoaded) console.log("Sounded is loaded");
		//else console.log("Sounded is not loaded");
		//if(isTimelineLoaded) console.log("Timeline is created");
		//else console.log("Timeline is not loaded");
		return true;//isSoundLoaded && isTimelineLoaded;
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
		        init(); // start game       
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
		clearInterval(this.timerId);
	}
};