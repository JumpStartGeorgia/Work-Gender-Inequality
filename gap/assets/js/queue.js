
var queueAmount = 0;
var queueCompleteCallback = function() { walk(1); };

function queueObject()
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
	this.shift = function()
	{
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
		if(!this.empty || !nextFlag)
		{
			clearTimeout(timerId);
			timerId = setTimeout(function(){ t.wait(); }, 100);
		}		
		else this.complete();
	};
	this.complete = function()
	{
		--queueAmount;
		if(queueAmount == 0)
		{				
		 	if (typeof queueCompleteCallback === "function")
		 	{ 
		 		queueCompleteCallback();	 		
	 		}
		}
	};
	this.stop = function()
	{
		clearTimeout(timerId);
	};
	this.toString = function()
	{
		for(var i = 0; i < this.length; ++i)
		{
			console.log(q[i]);
		}
	};

}