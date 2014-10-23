function playerObject(p)
{
	this.sounds = {};
	this.sounds_list = [];
	var mute = false;
	var prev_volume = 1;
	var volume = 1;

	this.init = function()
	{
		for(var i = 0; i < sounds.length; ++i)
		{
			var item = sounds[i];
			this.sounds[item.name] = new Audio(item.path);
			this.sounds[item.name].loop = item.loop;
			this.sounds_list.push(item.name);
		}

	};
	this.play = function(name)
	{		
		if(this.valid(name))
			this.sounds[name].play();
	};
	this.stop = function(name)
	{
		if(this.valid(name))
		{
			this.sounds[name].pause();
			this.sounds[name].currentTime = 0;		
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
		var r = typeof this.sounds[name] !== "undefined" && this.sounds[name].canPlayType('audio/mpeg;').replace(/^no$/,'');
		if(!r) console.log("Audio file can't be played, please check path and additional parameters. File:",name);
		return r;
	};		
	this.init();
}