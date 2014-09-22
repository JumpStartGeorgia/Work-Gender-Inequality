var transform = {
	queue:{},
	transform: function(type, selector, params)
	{
		var t = this;
		if(!this.queue.hasOwnProperty(selector))
		{			
			this.queue[selector] = { count:0, callstack:[], waiting:false };		
		}
		++this.queue[selector].count;			
		this.queue[selector].callstack.push({ type:type, selector:selector, params:params });	
		if(!this.queue[selector].waiting && this.queue[selector].count == 1) 
		{				
			this.queue[selector].waiting = true;		
			setTimeout( function() { t.next(selector); }, 500);
		}
	},
	next: function(selector)
	{

			this.queue[selector].waiting = false;
			var p = this.queue[selector].callstack.shift();
//console.log("--------------------------------------------",p.type);
			var par = p.params;
			var t = this;
			var delay = 500;
			
			--this.queue[selector].count;
			switch(p.type)
			{
				case 'rotate':
					this.rotate(selector,par.a);
				break;
				case 'move':
					this.move(selector,par.x,par.y);
				break;
				case 'scale':
					this.scale(selector,par.x,par.y);
				break;
				case 'skew':
					this.skew(selector,par.x,par.y);
				break;
			}
			console.log(this.queue[selector].count)
			if(this.queue[selector].count >= 1) 
			{
				this.queue[selector].waiting = true;
				setTimeout( function(){ t.next(selector); }, delay);

			}
	},
	rotate: function(selector,a)
	{		 
		//console.log(selector,a,"rotatinggggggggggggggggggggggggg");
		t = this.rotateM(a),
		c = this.fromString($(selector).css('transform')),
		n = c.x(t),
		css = this.toString(n);
		$(selector).css({ transform: css });	
	},
	move: function(selector,x,y)
	{		 
		t = this.translateM(x,y),
		c = this.fromString($(selector).css('transform')),
		n = c.x(t),
		css = this.toString(n);

		$(selector).css({ transform: css });
	},
	scale: function(selector,x,y)
	{		 		
		//console.log(selector,x,y);
		t = this.scaleM(x,y),
		c = this.fromString($(selector).css('transform')),
		n = c.x(t),
		css = this.toString(n);
		$(selector).css('transform',css);
	},
	skew: function(selector,x,y)
	{		 
		t = this.skewM(x,y),
		c = this.fromString($(selector).css('transform')),
		n = c.x(t),
		css = this.toString(n);

		$(selector).css({ transform: css });
	},
	reset: function(selector)
	{
		$(selector).css({ transform: '' });
	},
  

    rotateM: function(deg)
     {
        var rad = parseFloat(deg) * (Math.PI/180),
            costheta = Math.cos(rad),
            sintheta = Math.sin(rad);
 
        var a = costheta,
            b = sintheta,
            c = -sintheta,
            d = costheta;
 
        return $M([
          [a, c, 0],
          [b, d, 0],
          [0, 0, 1]
        ]);
     },
 
    skewM: function(dx, dy)
     {
        var radX = parseFloat(dx) * (Math.PI/180),
            radY = parseFloat(dy) * (Math.PI/180),
            c = Math.tan(radX),
            b = Math.tan(radY);
 
 
        return $M([
          [1, c, 0],
          [b, 1, 0],
          [0, 0, 1]
        ]);
     },
 
    translateM: function(x, y)
     {
        var e = x || 0,
            f = y || 0;
 
        return $M([
          [1, 0, e],
          [0, 1, f],
          [0, 0, 1]
        ]);
     },
 
    scaleM: function(x, y)
     {
        var a = x || 0,
            d = y || 0;
 
        return $M([
          [a, 0, 0],
          [0, d, 0],
          [0, 0, 1]
        ]);
     },

	toString: function (m)
	{
		var s = 'matrix(', r, c;

		for (c=1;c<=3;c++)
		{
		 for (r=1;r<=2;r++)
		    s += m.e(r,c)+', ';
		}

		s = s.substr(0, s.length-2) + ')';

		return s;
	},
	 
	fromString: function (s)
	{
	 	var t = /^matrix\((\S*), (\S*), (\S*), (\S*), (\S*), (\S*)\)$/g.exec(s),
	     a = parseFloat(!t ? 1 : t[1]),
	     b = parseFloat(!t ? 0 : t[2]),
	     c = parseFloat(!t ? 0 : t[3]),
	     d = parseFloat(!t ? 1 : t[4]),
	     e = parseFloat(!t ? 0 : t[5]),
	     f = parseFloat(!t ? 0 : t[6]);

		 return $M([
		   [a, c, e],
		   [b, d, f],
		   [0, 0, 1]
		 ]);
	},
	//css:function(v)
	//{

	  // -webkit-transform:rotate(39deg);
	  //  -moz-transform:rotate(39deg);
	  //   -ms-transform:rotate(39deg);
	  //    -o-transform:rotate(39deg);
	  //       transform:rotate(39deg);
	//}

};

