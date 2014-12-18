function human(selector,title,alias) 
{
//****************************var**********************************
  this.title = exist(title) ? title : "Human";
  this.alias = alias;
  this.age = 0;
  this.height = 0;
  this.width = 0;
  this.init_height = 0;
  this.init_width = 0;
  this.extra_height = 0;
  this.extra_width = 0;
  this.init_extra_height = 0;
  this.init_extra_width = 0;
  this.canvas = 200;
  this.x = 0;
  this.y = 0;
  this.prevX = -1;
  this.prevY = -1;
  this.initX = 0;
  this.initY = 0;
  this.angle = 0;
  this.land = 0;  
  this.selector = selector;
  this._salary = 0;
  this._saved = 0;
  this._tsalary = 0; // total salary
  this._tsaved = 0; // total saved
  this._stage = [];
  this.outrun = false;
  this.gap_percent = 0;
  this.saving_for_tick = 0;
  this.animated = false;
  this.treasure = [0,0,0,0,0,0];
  this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  this.path_length = 0;
  this.traversed_path = 0;
  this.path_loop = false;
  this.movement = 0;
  this.event_by_month = []; 
  this.event_by_period = []; 
  this.place = '';
  this.card = new cardObject(this);
  this.pedestal = new pedestalObject(this);   
  this.queue = new queueObject({complete:queueCompleteCallback});
  this.oppenent = null;
  this.working = false;
  this.distance = 0;
  this.walk_distance = 0;
  this.initialized = false; 
  this.carpet = null;   
  this.mutate_by_period = [];
  this.treasure_by_period = [];
  this.frames = [
    { w:0, h:0 },
    { w:0, h:0 },
    { w:0, h:0 },
    { w:0, h:0 },
    { w:0, h:0 }
  ];
  var mutator = {
    left:[],
    right:[],
    rightCount:[],
    //place:[],
    empty:function()
    {
      this.left=[];
      this.right=[];
      this.rightCount=[];
      //this.place=[];
    } 
  };
//*************************set & get**********************************
	this.__defineGetter__("salary", function(){
	   return this._salary;
	});
	this.__defineSetter__("salary", function(val){
	   this._salary = val; 
     this.saving_for_tick = user.salary_percent * this._salary / 100;
	});
	this.__defineGetter__("saved", function(){
	   return this._saved;
	});
	this.__defineSetter__("saved", function(val){
	   this._saved = val;
	});
	this.__defineGetter__("tsalary", function(){
	   return this._tsalary;
	});
	this.__defineSetter__("tsalary", function(val){
	   this._tsalary = val;
     $(this.selector).parent().find('.score .tsalary .value').text(val >= 0 ? formatNumber(Math.round10(val)) : NaN);
	});
	this.__defineGetter__("tsaved", function(){
	     return this._tsaved;
	 });
	this.__defineSetter__("tsaved", function(val){
	   this._tsaved = val;
     $(this.selector).parent().find('.score .tsaved .value').text(val >= 0 ? formatNumber(Math.round10(val)) : NaN);
	});
	this.__defineGetter__("stage", function(){
	   return this._stage;
	});
	this.__defineSetter__("stage", function(val){
	   this._stage = val;
	});
	this.__defineGetter__("path", function(){
	   return this._path;
	});
	this.__defineSetter__("path", function(val){
	   this._path.setAttribute('d',val);
	   this.path_length = this._path.getTotalLength();
	});
  this.__defineGetter__("treasure_count", function(){
      var tmp = 0;
      this.treasure.forEach(function(d,i){ tmp+=d; });
     return tmp;
  });
//*************************methods**********************************
this.stop_counter = -3;
  this.position = function position(coord,scale) {   
    //  console.log(coord); 
      var t = this;
      //this.prevX = this.x;
     // this.prevY = this.y;
     // console.log(coord,noscale);
      if(typeof scale === 'undefined') scale = false;
      if(exist(coord))
      {
        if(exist(coord.x)) t.x = scale ? coord.x*img_scaler + $('.top .stage .fg img').first().offset().left-t.width/2 : coord.x;
        t.choose_movement();
        if(exist(coord.y)) t.y = scale ? t.land - ((t.land - ($('.top .stage .fg img').first().offset().top + coord.y*img_scaler)) + t.frames[t.movement].h) : coord.y;//lh-t.frames[t.movement].h-coord.y; 
        //if(t.working)
        //{
        //  t.x ;
          //t.y += $('.top .stage .fg img').first().offset().top;
        //}
        //if(exist(coord.a)) this.angle = coord.a;
      }      
      //else this.toground();

      if(!t.stopped)
      {
        $(t.selector).css({ left: t.x , top: t.y });   
      }
  };
  
  this.toground = function toground() 
  {
    this.land = lh;
    this.y = lh - this.height;
  };
  this.reset = function reset() 
  { 
    //console.log('here',this.title);
    this.get_dimentions();   
    this.scale();
    this.toground();
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = 0;
    $(this.selector).css({ left: 0 , top: this.y });   
  };
  this.scale = function()
  {
    var t = this;
    $(t.selector).css({
      width : t.frames[t.movement].w,
      height : t.frames[t.movement].h,
      'background-size':t.frames[t.movement].w + 'px ' + t.frames[t.movement].h + 'px'
    }); 
  };
  var actionsBound = 1;
  this.step_size = 0;
  this.get_dimentions = function()
  {
    var t = this;
    for(i = 0; i < movementBound; ++i)
    {
      var hTmp = assets.filter(function(a){ return a.name == t.alias + i + '_' + category.dress; })[0].element;
      var hTmpCloned = hTmp.clone();      
      $('.black-hole').append(hTmpCloned);
      hTmpCloned.height(hTmpCloned.height()*img_scaler);
      t.frames[i].h = hTmpCloned.height();
      t.frames[i].w = hTmpCloned.width();
      $('.black-hole').empty();
    }
    t.step_size = t.frames[0].w/2.3;

    if(category.action)
    {
      for(i = 0; i < actionsBound; ++i)
      {
        var hTmp = assets.filter(function(a){ return a.name == t.alias  +'a'+ i + '_' + category.dress; })[0].element;
        var hTmpCloned = hTmp.clone();      
        $('.black-hole').append(hTmpCloned);
        hTmpCloned.height(hTmpCloned.height()*img_scaler);
        t.frames[movementBound+i].h = hTmpCloned.height();
        t.frames[movementBound+i].w = hTmpCloned.width();
        $('.black-hole').empty();
      }
    }

    $(this.selector).css({
        width : t.frames[t.movement].w,
        height : t.frames[t.movement].h,
        'background-size':t.frames[t.movement].w + 'px ' + t.frames[t.movement].h + 'px'
    });    
  };
 
 // this.prevXTmp = 0;
 // this.prevYTmp = 0;
  var movementBound = 3;
  this.rewardStarted = false;
    this.stopped = false;
  this.was_stopped = false;
  

  this.choose_movement = function choose_movement()
  {
    var t = this;
    if(t.prevX == -1) // after animation prev is not correct so reseting them
    {
      t.prevX = t.x;
      t.prevY = t.y;
      return;
    }
    var distanceDiff = Math.abs(t.prevX - t.x);
    if(distanceDiff > t.step_size)
    {
      if(!t.stopped)
      {
        if(t.working && category.action &&  !t.was_stopped && t.stop_counter != -1 &&
               ((category.action_points[0].d == 1 && t.prevX < t.x &&
               t.x > category.action_points[0].x*img_scaler + $('.top .stage .fg img').first().offset().left - t.frames[3].w) ||
               (category.action_points[0].d == -1 && t.prevX > t.x &&
               t.x < category.action_points[0].x*img_scaler + $('.top .stage .fg img').first().offset().left - t.frames[3].w)))
        {
          t.action_movement();
          t.stop_counter = 4;  
          t.stopped = true; 
          t.was_stopped = true;
        }  
        if(t.x > t.prevX) // moving right
        {
          $(this.selector).removeClass('l'); 
          if(!t.stopped) this.next_movement();
        }
        else 
        {
          $(this.selector).addClass('l');  
          if(!t.stopped) this.prev_movement();      
        }
        t.prevX = t.x;
        t.prevY = t.y;
      }
    }
  };
  this.next_movement = function next_movement()
  {      
    var t = this; 
    t.movement = ++t.movement;
    if(t.movement >= 3) t.movement = 0;
    t.before_movement();
  };
  this.prev_movement = function prev_movement()
  {
    var t = this;
    t.movement = --t.movement;
    if(t.movement == -1) t.movement = 2;
    t.before_movement();
  };
  this.action_movement = function action_movement()
  {
    var t = this;
    if(category.action)
    { 
      t.movement = 3; 
      var hDiff = t.frames[t.movement].h-t.height;      
      var wDiff = t.frames[t.movement].w-t.width;

      t.prevX = t.prevX - wDiff;
      t.prevY = t.prevY - hDiff; 
      t.x = t.x - wDiff;
      t.y = t.y - hDiff;
      $(t.selector).css({ left: t.x, top: t.y });  
      

      t.before_movement('a0');
    }
  };
  this.before_movement = function before_movement(ext)
  {
    var t = this;
    if(typeof ext === 'undefined') ext = t.movement;
    t.width = t.frames[t.movement].w;
    t.height = t.frames[t.movement].h;

    $(t.selector).css({
      width : t.width,
      height : t.height,
      'background-size':t.width + 'px ' + t.height + 'px'
    });
    $(t.selector).css("background-image","url(/assets/gap/svg/human/" + category.dress + "/" + t.alias + ext + ".svg)");
  };
  this.stand_movement = function stand_movement(v)
  { 
    var t = this;
    t.movement = 0;    
    t.before_movement(); 
    if(v === 'l') $(t.selector).addClass('l');
    else $(t.selector).removeClass('l');
  };
  this.step_right = function step_right()
  {    
    var t = this;
    if(t.stop_counter-- == 0) t.stopped = false;
    if(!t.stopped)
    {
      var tmp = (this.traversed_path + 4);//(100/scrolls_for_reward));
      if(this.path_loop)
         tmp = tmp == 100 ? 100 : tmp%100;
      else if(tmp > 100) return;
      
      if(t.was_stopped && tmp < 5) t.was_stopped = false;
      this.traversed_path = tmp;
      this.position(this.getpathcoordinates(this.traversed_path/100),true);
    } 
  };
  this.step_left = function step_left()
  {    
      var tmp = (this.traversed_path - 4);
      if(this.path_loop)
         tmp =  tmp <= 0 ? 100 : tmp%100;
      else if(tmp <= 0) return;

      this.traversed_path = tmp;
      this.position(this.getpathcoordinates(this.traversed_path/100),true);
  };
  this.work_frame = function work_frame()
  {
    this.working = true;
    var frame = category.work;
    this.path = frame.path;
    this.path_loop = exist(frame.loop) ? frame.loop : false;
  };
  this.getpathcoordinates = function getpathcoordinates(progress)
  {	
		var percent = Math.round10(progress*100);
		var p1 = this.path.getPointAtLength(this.path_length * (percent-1)/100);
		var p2 = this.path.getPointAtLength(this.path_length * (percent+1)/100);
    //console.log(p1,p2);
		var a = Math.atan2(p2.y-p1.y,p2.x-p1.x)*180 / Math.PI;
		var p =  this.path.getPointAtLength(this.path_length * percent/100);
		return { x:p.x,y:p.y, a:a };
  };
  this.prepare_reward = function prepare_reward(step,start)
  {
    var t = this;
    var istep = step;
    if(!start) step = 1 - step;
    if(!t.rewardStarted)
    {
      t.rewardStarted = true;
      t.working = false;
      t.initX = t.x;
      t.initY = t.y;
    }
    t.position({ x:t.initX - (t.initX - w2)*step, y:t.initY + (lh - t.initY - t.height)*step, a:0 }, false);

   // if(Math.abs(t.prevXTmp-t.x) > 3 || Math.abs(t.prevYTmp-t.y) > 3)
    //{
      //start ? t.next_movement() : t.prev_movement();
     // t.prevXTmp = t.x;
     // t.prevYTmp = t.y;
    //}    
    if(!start && istep == 1)
    {
      t.working = true;
      t.rewardStarted = false;
    }
  }; 
  this.event_by_period_sum = []; 
  this.card_moment = [999,999,999,999,999,999];
  this.prepare_for_game = function prepare_for_game()
  {    
    var t = this;
    var life = (max_age - user.age) * 12;
    var overall = 0;
    t.event_by_month = [];
    t.event_by_period = [];

    var periodIndex = -1;
    var treasureTmp = [0,0,0,0,0,0];
    var prevTreasureTmp = [0,0,0,0,0,0];


    for (var i = 1; i <= life; ++i) 
    {
      if(i % reward_period == 0) 
      {
        ++periodIndex;

        if(typeof t.event_by_period[periodIndex] === 'undefined')
          t.event_by_period.push([0,0,0,0,0,0]);

        if(typeof t.mutate_by_period[periodIndex] === 'undefined')
          t.mutate_by_period.push([0,0,0,0,0,0]);
        

        if(typeof t.event_by_period_sum[periodIndex] === 'undefined')
          t.event_by_period_sum.push(0);

        //t.event_by_month.push([0,0,0,0,0,0]);

        var overall = i*t.saving_for_tick;

        for(j = 5; j >= 0; --j)
        {
          var tmp = Math.floor10(overall / interest[j].cost);
          var mut = prevTreasureTmp[j]-tmp > 0 ? prevTreasureTmp[j]-tmp : 0;
          if(tmp >= 1)
          {
            if(t.card_moment[j]==999) t.card_moment[j] = periodIndex;
            var tt = tmp-prevTreasureTmp[j];
            tt = tt > 0 ? tt : 0;
            t.event_by_period[periodIndex][j] = tt;
            t.event_by_period_sum[periodIndex] += tt;
            overall -= tmp*interest[j].cost;  
          } 
          t.mutate_by_period[periodIndex][j] = mut;
          treasureTmp[j] = tmp; 
        }
        prevTreasureTmp = treasureTmp;

        t.treasure_by_period.push([0,0,0,0,0,0]);
        for(j = 0; j < 6; ++j)
           t.treasure_by_period[periodIndex][j] = treasureTmp[j];
        
      }
    }
    if(this.place == 'top')
    {
      jumper_threshold = 60;
      if(jumper_threshold*this.saving_for_tick < interest[0].cost)
      {
         for(var i = jumper_threshold+1; i <= life; ++i) 
         {
            if(i*this.saving_for_tick > interest[0].cost)
            {
              jumper_threshold = Math.floor10(i/reward_period)-1;
              show_jumper_prompt = true;
              break;
            }
         }
      }

      show_not_enough_prompt = (this.place == 'top' && this.saving_for_tick*life < interest[0].cost);

    }
  
  };
  this.animate = function animate()
  { 
    var t = this;

    this.animated = true;
    this.working = false;

    //this.reset();

    var t = this;
    var st = $('.' + t.place + ' .stage');
    var xDistance = w2 - fgw/2 + bg_width/7 + (category.work_point.x*img_scaler) - t.frames[t.movement].w;
    var yDistance = category.work_point.y*img_scaler;
    $(this.selector).animate({"color":'white'},{ 
      duration: Math.round10(xDistance/(t.frames[t.movement].w/2.3)) * 250,      
      progress:function(a,b,c) 
      { 
        if(b>0.1)$(this).show();
        t.position({ x:xDistance*b, y:(lh-t.height-yDistance*b), a:0 }, false);
        st.css('left',-1*b* (bg_width*screenCount + bg_width/2 - w2 - bg_width/7));
      },
      complete:function() 
      {
        t.animated = false;
        animated = t.animated || t.oppenent.animated;
        if(animated) canScroll = true;       
        t.stand_movement();
        t.work_frame();
        t.prevX = -1;
        t.prevY = -1;   
      }
    });
  };
  this.has_future_reward = function has_future_reward()
  {    
    return this.event_by_period_sum[gap.pos-1] > 0;
  };
  
  this.init = function()
  {
    var t = this;
    this.card.init();    
    this.pedestal.init();
    this.reset();
    this.carpet = $('.' + t.place + ' .treasure .red-carpet');
    
  };
}; // human object with basic properties
male = new human('.m.character',locale.poll.male,'m'); // male human object
female = new human('.f.character',locale.poll.female,'f'); // female human object
humans = male.outrun ? [male,female] : [female,male];

function h_go_right()
{
  male.step_right();
  female.step_right();
}
function h_go_left()
{
  male.step_left();
  female.step_left();
}