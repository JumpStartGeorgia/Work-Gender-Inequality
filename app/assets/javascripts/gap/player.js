function playerObject()
{
	this.sounds = {};
	this.sounds_list = [];
	// this.background_sounds = {};
	// this.background_sounds_list = [];
	this.bgcat = null;
	this.bgint = null;

	var mute = false;
	var prev_volume = 1;
	var volume = 1;	
	var readySoundCount = 0;
	var bgBothLoaded = 2;
	var sound_ext = 'mp3';
	this.init = function()
	{
		if(isOpera) sound_ext = 'ogg';
		for(var i = 0; i < sounds.length; ++i)
		{			
			var item = sounds[i];
			this.sounds[item.name] = new Audio(item.path);
			this.sounds[item.name].loop = item.loop;
			this.sounds[item.name].preload = "auto";
			$(this.sounds[item.name]).on('canplaythrough', this.canplaythrough);
			this.sounds_list.push(item.name);
		}		
	};
	this.background_play = function()
	{
		var t = this;
		//var sOrig = assets.filter(function(a){ return a.name == 'sound_'+(user.gender +user.category); })[0].element;  
		//this.bgcat = sOrig.clone()[0];
		//console.log(category,interest);

		this.bgcat = $('<audio>',
		{
	  			on: 
	  			{
					canplay: function() { t.background_ready(); },
					error: function(e) { console.log(this,e,"error");}
			  	},
			  	"src":'/assets/gap/sounds/category/' +(user.gender + category.fg + '.' + sound_ext) 
	  	}).get(0);
		 //assets.filter(function(a){ return a.name == 'sound_'+(user.gender + category.fg); })[0].element[0];
		this.bgcat.loop = true;
		//$(this.bgcat).on('canplaythrough', function(){ t.background_ready(t); });
		//sOrig = assets.filter(function(a){ return a.name == 'sound_i'+user.interest; })[0].element;  
		//this.bgint = sOrig.clone()[0];
		//console.log();
		//
		this.bgint = $('<audio>',
		{
	  			on: 
	  			{
					canplay: function() { t.background_ready(); },
					error: function(e) { console.log(this,e,"error");}
			  	},
			  	"src":'/assets/gap/sounds/interest/' + interestAlias + '.' + sound_ext
	  	}).get(0);
		//assets.filter(function(a){ return a.name == 'sound_i'+user.interest; })[0].element[0];
		this.bgint.loop = true;
		//$(this.bgint).on('canplaythrough', function(){ t.background_ready(t); });
		$(this.bgcat).on('playing', function() { t.bgint.currentTime = t.bgcat.currentTime; } );
		//t.bgcat.muted = true;
		//t.bgint.muted = true;
		t.bgcat.volume = 0.2;
		t.bgint.volume = 0.2;
			//t.bgcat.play();
		//	t.bgint.play();

	};	
	this.background_ready = function(t)
	{	
		var t = this;
		--bgBothLoaded;
		$(t).off('canplaythrough');

		if(bgBothLoaded == 0)
		{
			t.bgcat.play();
			t.bgint.play();
		}
		
	}
	this.play = function play(name)
	{		
	
		if(this.valid(name))
		{
			this.stop(name);
			this.sounds[name].muted = false;
			this.sounds[name].play();
		}
	};
	this.stop = function(name)
	{
		if(this.valid(name))
		{
			this.sounds[name].pause();
			this.sounds[name].currentTime = 0;
			if (window.chrome) this.sounds[name].load()	
		}
	};
	this.stop_all = function()
	{
		for(var i = 0; i < this.sounds_list.length; ++i)
		{
			var name = this.sounds_list[i];
			if(this.valid(name))
			{
				this.sounds[name].pause();
				this.sounds[name].currentTime = 0;		
				if (window.chrome) this.sounds[name].load()	
			}
		}
	};
	this.mute = function()
	{
		try
		{
			mute = true;
			for(var i = 0; i < this.sounds_list.length; ++i)
			{
				var name = this.sounds_list[i];
				if(this.valid(name))
				{
					this.sounds[name].muted = true;
					
					
				}
			}
			this.bgcat.muted = true;
			this.bgint.muted = true;
			return true;
		}
		catch(e)
		{
			return false;
		}
	};
	this.unmute = function(name)
	{
		try
		{

			mute = false;
			this.bgcat.muted = false;
			this.bgint.muted = false;
			for(var i = 0; i < this.sounds_list.length; ++i)
			{
				var name = this.sounds_list[i];
				if(this.valid(name))
				{
					this.sounds[name].muted = false;
			
				}
			}
		}
		catch(e)
		{
			return false;
		}
	};
	this.valid = function(name)
	{				
		var r = typeof this.sounds[name] !== "undefined" && this.sounds[name].readyState == 4;
		//if(!r) console.log("Audio file can't be played, please check path and additional parameters. File:",name); // when file is missing or not ready
		return r;
	};	
	this.canplaythrough = function()
	{
		$(this).off('canplaythrough');
		if(readySoundCount+1 == sounds.length)
		{
			isSoundLoaded = true;
		}
		else ++readySoundCount;
	};
	// this.background_switch = function()
	// {

	// };
	this.init();
}