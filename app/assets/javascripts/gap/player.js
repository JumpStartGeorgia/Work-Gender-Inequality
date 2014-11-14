function playerObject()
{
	this.sounds = {};
	this.sounds_list = [];
	// this.background_sounds = {};
	// this.background_sounds_list = [];
	
	var mute = false;
	var prev_volume = 1;
	var volume = 1;	
	var readySoundCount = 0;
	this.init = function()
	{
		for(var i = 0; i < sounds.length; ++i)
		{			
			var item = sounds[i];
			this.sounds[item.name] = a1;
			this.sounds[item.name].loop = item.loop;
			this.sounds[item.name].preload = "auto";
			$(this.sounds[item.name]).on('canplaythrough', this.canplaythrough);
			this.sounds_list.push(item.name);
		}
	};
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