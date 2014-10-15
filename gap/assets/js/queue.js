function queueObject(opts)
{
	var q = [];
	var t = this;
	var nextFlag = true;
	this.length = 0;
	this.empty = true;
	var timerId = null;

	this.push = function(f)
	{
		q.push(f);
		this.empty = q.length == 0 ? true : false;
		this.length = q.length;
	};
	this.splice = function(index,f,title)
	{
		//console.log("Queue splice",title,index,f);
		q.splice(index,0,f);
		this.empty = q.length == 0 ? true : false;
		this.length = q.length;
	}
	this.unshift = function(f)
	{
		this.length = q.unshift(f);
		this.empty = q.length == 0 ? true : false;
	}
	this.shift = function()
	{
		//console.log("shift",q);
		var f = q.shift();		 
		this.empty = q.length == 0 ? true : false;
		this.length = q.length;

		nextFlag = false;
		if (typeof f === "function") f();	  
		this.timer();
	};
	this.start = function()
	{		
		if(this.empty) { nextFlag = true; return; }
		nextFlag ? this.shift() : this.timer();
	};
	this.wait = function()
	{	
	  if(this.empty) { this.timer(); return; }
     nextFlag ? this.shift() : this.timer();
	};
	this.resume = function()
	{
		var t = this;
		nextFlag = true;
	};
	this.timer = function()
	{		  
		//console.log("timer",q);
		if(!this.empty || !nextFlag)
		{
			clearTimeout(timerId);
			timerId = setTimeout(function(){ t.wait(); }, 100);
		}		
		else this.complete();
	};
	this.complete = function(){ console.log("complete dummy"); };
	this.stop = function()
	{
		clearTimeout(timerId);
	};
	this.toString = function()
	{
		console.log("queueObject start > ");
		for(var i = 0; i < this.length; ++i)
		{
			console.log(q[i]);
		}
		console.log("queueObject end < ");
	};
	this.init = function()
	{
		if(typeof opts !== "undefined")
		{
			if(typeof opts.complete === "function")
			{
				this.complete = opts.complete;
			}
		}
	};
	this.init();
}


// human queue, works on end of both queue ending (male.queue,female.queue)
var queueAmount = 0;
var queueCompleteCallback = function() 
{ 
	--queueAmount;
	if(queueAmount == 0)
	{				
	 	if (typeof queueCompleteCallback === "function")
	 	{ 
	 		reward = false; 
 		}
	}
};