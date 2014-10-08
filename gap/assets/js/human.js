function human(selector,title) 
{
//****************************var**********************************
  this.title = exist(title) ? title : "Human";
  this.alias = this.title[0].toLowerCase();
  this.age = 0;
  this.height = 100;
  this.width = 46;
  this.canvas = 200;
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.land = 0;  
  this.selector = selector;
  this._salary = 0;
  this._saved = 0;
  this._tsalary = 0; // total salary
  this._tsaved = 0; // total saved
  this._stage = [];
  //this.inside = false;
 // this.items = [];
  this.outrun = false;
  this.gap_percent = 0;
  this.saving_for_tick = 0;
  this.animated = false;
  this.current_frame = 0;
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
  this.queue = new queueObject();
  this.future_reward = 0;


//*************************set & get**********************************
	this.__defineGetter__("salary", function(){
	   return this._salary;
	});
	this.__defineSetter__("salary", function(val){
	   this._salary = val;      
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
     $(this.selector).parent().find('.score .tsalary .value').text(val >= 0 ? Math.round10(val) : NaN);
	});
	this.__defineGetter__("tsaved", function(){
	 //console.log("getter tsaved ", this._tsaved);
	     return this._tsaved;
	 });
	this.__defineSetter__("tsaved", function(val){
	   this._tsaved = val;
     $(this.selector).parent().find('.score .tsaved .value').text(val >= 0 ? Math.round10(val) : NaN);
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

  this.position = function position(coord) {
      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*img_scaler;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*img_scaler + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }      
      $(this.selector).css({ left: this.x + stage_offset, top: this.y });   
      return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  };
  // this.lookinfuture = function lookinfuture(coord)
  // {
  //     var scaleX = current_path_width/100;
  //     var scaleY = this.land/56;
  //     if(exist(coord))
  //     {
  //       if(exist(coord.x)) this.x = coord.x*scaleX;
  //       if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
  //       if(exist(coord.a)) this.angle = coord.a;
  //     }       
  //     return { human:this.title , x:this.x + stage_offset, y:this.y };
  // };
  this.toground = function toground() 
  {
    var half = (h-th)/2;
    this.land = half;
    this.y = half - this.height;
  };
  this.tosky = function toground() 
  {
    this.y = 0 - this.height;
  };
  
  this.animate = function animate(v)
  {
  		this.animated = true;
  		
  		this.path = v.path;
  		var parent = this;
      var time_slower = v.duration*1000/150;
//  		console.log(this._path,this.path_length);
  		$(this.selector).animate({"color":'white'},{ duration:v.duration*1000, 
        start:function()
        {
          $(parent.selector).show();
         // console.log("start");
        },
  			progress:function(a,b,c) 
  			{ 
  				parent.position(parent.getpathcoordinates(b));
          if(Math.floor10(c/150) < time_slower )
          {
            parent.next_movement();            
            --time_slower;
            
          }
  			},
  			complete:function() 
  			{
  				parent.animated = false;
          animated = male.animated || female.animated;
          parent.next_frame();
          //console.log(male.animated, female.animated);
  			}
  		});
  		//console.log(this,v);
  };
  this.next_movement = function next_movement()
  {
    this.movement = ++this.movement;
    if(this.movement == 11) this.movement = 1;
    //console.log(this.movement);
    $(this.selector).css("background-image","url(assets/images/svg/"+ this.alias + "/" + this.alias + this.movement + "r.svg)");    
  };
  this.prev_movement = function prev_movement()
  {
   // console.log(this.movement);
    this.movement = --this.movement;
    if(this.movement == 0) this.movement = 10;
    $(this.selector).css("background-image","url(assets/images/svg/"+ this.alias + "/" + this.alias  + this.movement + "l.svg)");    
  };
  this.step_right = function step_right()
  {
    
    var tmp = (this.traversed_path + (100/scrolls_for_reward));
    if(this.path_loop)
       tmp = tmp == 100 ? 100 : tmp%100;
    else if(tmp > 100) return;
    
    this.next_movement();      
    this.traversed_path = tmp;
    this.position(this.getpathcoordinates(this.traversed_path/100));
  };
  this.step_left = function step_left()
  {    
    var tmp = (this.traversed_path - (100/scrolls_for_reward));
    if(this.path_loop)
       tmp =  tmp <= 0 ? 100 : tmp%100;
    else if(tmp <= 0) return;
   // console.log("step_left",tmp);
    this.prev_movement();
    this.traversed_path = tmp;
    this.position(this.getpathcoordinates(this.traversed_path/100));
  };


  this.next_frame = function next_frame()
  {
    if(this.current_frame < frame_sequence_length)
      ++this.current_frame;
    else this.current_frame = 0;
    this.current_frame%=3;
    var frame = category.stage.frame[frame_sequence[this.current_frame]];
    this.path = frame.path;
    this.path_loop = exist(frame.loop) ? frame.loop : false;
    //console.log(frame);
  };
  this.getpathcoordinates = function getpathcoordinates(progress)
  {	
		var percent = Math.round10(progress*100);
		var p1 = this.path.getPointAtLength(this.path_length * (percent-1)/100);
		var p2 = this.path.getPointAtLength(this.path_length * (percent+1)/100);
		var a = Math.atan2(p2.y-p1.y,p2.x-p1.x)*180 / Math.PI;
		var p =  this.path.getPointAtLength(this.path_length * percent/100);
		return { x:p.x,y:p.y, a:a };
  };
  this.prepare_for_game = function prepare_for_game()
  {
    var life = (max_age - user.age) * 12;
    var overall = 0;
    this.event_by_month = [];
    this.event_by_period = [];
    var periodIndex = -1;
    var periodPush = true;
    for (var i = 0; i <= life; ++i) 
    {
      if(i % reward_period == 0) 
      {
        ++periodIndex;
        periodPush = true;
      }

      overall += this.saving_for_tick;    
      var tmp = Math.floor10(overall / interest[0].cost);
      if(tmp > 0)
      {
        this.event_by_month.push(tmp);
        overall -= tmp*interest[0].cost;
        if(periodPush)
        {
          this.event_by_period.push(tmp);
          periodPush = false;
        }
        else 
          this.event_by_period[periodIndex] += tmp;
      }
      else 
      {
        if(periodPush)
        {
          this.event_by_period.push(0);
          periodPush = false;
        }
        this.event_by_month.push(0);
      }
    }
    //console.log(this.event_by_month);

    for (var i = 1; i <= 10; ++i) {
      var img = new Image();
      img.src = "assets/images/svg/"+this.alias + "/" + this.alias +i+"l.svg";   
      img = new Image(); 
      img.src = "assets/images/svg/"+this.alias + "/" + this.alias +i+"r.svg";           
    };

    //console.log(this.event_by_month);
  };
  this.has_future_reward = function has_future_reward()
  {    
    this.future_reward = this.event_by_period[pos + 1];
    return this.future_reward > 0;
  };
  this.mutate = function()
  {
    // recreate this point todo
    var t = this;
    var treasure = t.treasure;
    console.log("inner mutation",treasure,this.event_by_period[pos]);
    var how = events = this.event_by_period[pos];
    var zIndex = 0;
    treasure[zIndex]+=how;
   
    // if(!t.mutationDone) // todo delaying up till previous end
    // {
    //   t.up_stack.push({which:which,how:how,hidden:hidden});
    //   t.delay();
    //   return;
    // }
    var which = 1;
  
    if(t.inrange(which) && how > 0)
    {      
      var ca = treasure[zIndex]+how;
      var sm = states_mutation[zIndex];
      var smc = Math.floor10(ca/sm); 
      console.log(ca,sm,smc,treasure,how,mutation_restriction);
      var mutation_count = 0;
      t.mutation = mutation_empty.slice();

      if(!t.outrun) mutation_restriction[zIndex] = 0;

      if(t.outrun && smc > mutation_restriction[which]) 
      {
        smc =  mutation_restriction[zIndex];
        mutation_restriction[zIndex] = 0;
      }
      
      if(smc >= 1)
      {
        
        mutation_count+=smc;
        t.mutation[zIndex] = { count: smc };

        var looper = smc;
        var tca = ca;        
        var interestB = t.sp.find('.interestB[data-id='+which+']');

        if(!t.outrun) mutation_restriction[zIndex] = smc;
        while(looper != 0)
        {
          var from = tca - sm;
          var to = tca - how;

          var beforeItem = interestB.find('.item[data-id=' + (from++) + ']');
          var wrapper = $('<div class="mutationB" data-id="'+looper+'" data-from="'+from+'" data-to="'+to+'"></div>');
          if(beforeItem.length == 0) 
             interestB.prepend(wrapper);
          else wrapper.insertAfter(beforeItem);

          for(var j = from; j <= to; ++j)
          {
            var item = interestB.find('.item[data-id=' + j + ']');            
            wrapper.append(item.detach());
          }
          tca-=sm;        
          --looper;
        }
        if(mutation_count > 0)// && this.p.title != 'Male')
        {
          //console.log(this.p,mutation_count);
          this.animatePathToCard(which);
          treasure[zIndex]-=mutation_count * sm;
        }
      }
      else
      {        
        this.add(which,treasure[zIndex],how);
        treasure[zIndex]+=how;
      }
      
      
    }

    this.queue.resume();
  };
  this.inrange = function(which)
  {
    if(which >=1 && which < 6)
      return true;
    return false;
  };
  this.init = function()
  {
    this.card.init();    
    this.pedestal.init();
  };
}; // human object with basic properties


male = new human('.m.character','Male'); // male human object
female = new human('.f.character','Female'); // female human object
humans = [male,female];

 
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
  // this.positionXYA = function positionXYA(x,y,a) {
  //     var scaleX = $(document).width()/100;
  //     var scaleY = (h2-th/2)/56;

  //     if(exist(coord))
  //     {
  //       if(exist(coord.x)) this.x = coord.x*scaleX;
  //       if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
  //       if(exist(coord.a)) this.angle = coord.a;
  //     }

  //     $(this.selector).css({ left: this.x, top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

  //     //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
  //     return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  // };