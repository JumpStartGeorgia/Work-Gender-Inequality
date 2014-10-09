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
  this.mutation = [{},{},{},{},{},{}]; 
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
  var mutator = {
    left:[],
    right:[],
    place:[]  
  };

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

    var t = this;
    var treasure = t.treasure;
    var events = t.event_by_period[pos];

    var zIndex = 0;
    var which = 1;

    
    if(t.inrange(which) && events > 0)
    {      
      var ca = treasure[zIndex] + events;
      var sm = states_mutation[zIndex];
      var smc = Math.floor10(ca/sm); 
//      console.log(ca,sm,smc,treasure);
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
         //console.log("mutate");
        mutation_count+=smc;
        t.mutation[zIndex] = { count: smc };

        var looper = smc;
        var tca = ca;     
        var interestB = $('.' + t.place + ' .treasure .pedestal .interestB[data-id='+which+']');

        if(!t.outrun) mutation_restriction[zIndex] = smc;
        while(looper != 0)
        {
          var from = tca - sm;
          var to = tca - events;

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
        //console.log(mutation_count,t);
        if(mutation_count > 0)// && this.p.title != 'Male')
        {
          //console.log(this.p,mutation_count);
          //console.log("mutate start");
          //
          


          //var v = treasure[zIndex]+events-mutation_count*sm;
          //if(v>0) this.pedestal.add(which,v);
          //console.log(treasure[zIndex]);
          //treasure[zIndex] -= mutation_count * sm;

          var eventL = treasure[zIndex];
          var eventR = events;
          var cnt = mutation_count;
          var eventsToMutate = mutation_count * sm;
          var eventsAmount = eventL + eventR;
          var eventsOffset = 0;

          var tmpCount = 1;
          var tmp = sm;
          var iEventL = 1;
          var checker = sm-1;
          for(var i = 1; i <= eventR; ++i)
          {
            if(tmpCount <= cnt)
            {
              mutator.right.push(i);
              ++tmpCount;
            }
            else 
            {
              if(checker != 0)
              {
                mutator.right.push(tmpCount-1);
                --checker;
              }
              else mutator.right.push(0);
            }
          }
          console.log(mutator,t);
          // for(var i = 1; i <= eventR; ++i)
          // {
          //   if(i == eventR && eventR - cnt > 0)
          //   {
          //     mutator.right.push(cnt);
          //     continue;
          //   }
          //   console.log("before this point");
          //   mutator.right.push(tmpCount);
          //   --tmp;
          //  // var filled = false;
          //   var start = iEventL;
          //   for(var j = start; j <= eventL; ++j)
          //   {
          //     console.log(i,j,iEventL,tmp,tmpCount);
          //     ++iEventL;
          //     if(tmp!=0) { mutator.left.push(tmpCount); --tmp; }
          //     else { ++tmpCount; tmp=sm; /*filled = true;*/ break;}
          //   }

          //   // if(!filled)
          //   // {

          //   // }
          // }
          // var start = iEventL;
          // for(var j = start; j <= eventL; ++j)
          // {
         
          //   mutator.left.push(0); 
          // }
          // console.log(eventL,eventR,t,mutator);
          // 
          // 
          // ----------------------------
          //console.log(mutator);
          // for(var i = 1; i <= cnt; ++i)
          // {
          //   for(var j = 1; j <= eventL + eventR; ++j)
          //   {
          //     if(j <= eventL + eventsOffset)
          //     {
          //       if(eventsAmount - eventsToMutate >= j)
          //       {
          //         mutator.left.push(0);
          //         ++eventsOffset;
          //       }
          //       else mutator.left.push(i);
          //     }
          //     else
          //     {

          //     }
          //     //eventsToMutate
          //   }
          //   tmp += 1;
          //   eventR -= 1;
          //   if(eventL >= sm - 1)
          //   {
          //     tmp += sm - 1;
          //     eventL -= (sm - 1);
          //   }
          //   else
          //   {
          //     tmp += eventL + eventR;
          //   }
          // }

          //this.mutatePathToCard(which,treasure[zIndex],events,mutation_count,sm);
        }
      }
      else
      {        
        treasure[zIndex]+=events;

        this.pedestal.add(which,events);

      }
    }

    this.queue.resume();
  };
  
  this.mutatePathToCard = function(which,eventL,eventR,cnt,sm)
  {
    var fromTreasureBarToCardPath = "M 0.0473509,55.968433 C 22.205826,24.60457 55.704178,5.2051051 100.0051,0.03123545";
    // calculate which object in coins need to be moved to parent
    var tmp = 0;
    for(var i = 0; i < cnt; ++i)
    {
      tmp += 1;
      eventR -= 1;
      if(eventL >= sm - 1)
      {
        tmp += sm - 1;
        eventL -= (sm - 1);
      }
      else
      {
        tmp += eventL + eventR;
      }
    }
    var t = this;

    var interestB = $('.' + t.place + ' .treasure .pedestal .interestB[data-id='+which+']');
    var pathTmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathTmp.setAttribute('d', fromTreasureBarToCardPath);
    var pathTmpLength = pathTmp.getTotalLength();
   
    var dur = 1500;
    for(var i = cnt; i > 0; --i)
    {
      var delay = 0;
      var muts = interestB.find('.mutationB[data-id='+i+']');
      //console.log(muts);
      for(var j = muts.length-1; j >= 0; --j)
      {
        var mut = $(muts[j]);
        var from = + mut.attr('data-from');
        var to = + mut.attr('data-to');
        var cnt = to - from + 1;
        var cntTmp = cnt;
        var mut_start = mut.position().left;
        //var first = mut.find('div.item[data-id=' + from + ']');
        var last = mut.find('div.item[data-id=' + to + ']');
        var moveLeft = last.offset().left;
        //console.log($('.' + t.place + ' .treasure .card .coins:nth-child('+i+')').offset(),last.position().left,last.offset().left,moveLeft);
        var widthScaler = ($('.' + t.place + ' .treasure .card .coins:nth-child('+i+')').offset().left - moveLeft - 10)/100;
        var heightScaler = (lh - $('.top .treasure .card .coins:nth-child('+1+')').offset().top - 32)/56;
        //console.log(widthScaler,heightScaler);

        for(var h = to; h >= from; --h)
        {
          var d = mut.find('div.item[data-id=' + h + ']');
          var left = moveLeft-d.position().left;
          d.css("position","relative").data('position',t.place);    
          if(h == to)
          {
            d.animate({'color':'#ffffff'},{duration:dur,
              progress:function(a,b,c){
                var coord = coordinateFromPath(b,pathTmp,pathTmpLength,widthScaler,heightScaler);
                $(this).css({ left:coord.x+10, top: (t.place=='top' ? -1 : 1) * (56*heightScaler - coord.y) });
              },
              complete:function()
              {
                --cntTmp;
                transform.transform('scale', '.'+$(this).data('position')+' .card .coin .reward .item:nth-child(1)', { x:1.1,y:1.1 });  
              }
            }); 
          }
          else
          {
            d.data('ileft',left);
            d.delay(delay).animate({left:left},{ duration:500,
              complete:function()
              {
                $(this).animate({'color':'#ffffff'},{ duration:dur,
                  progress:function(a,b,c){
                    var coord = coordinateFromPath(b,pathTmp,pathTmpLength,widthScaler,heightScaler);
                    $(this).css({ left: +$(this).data('ileft') + coord.x , top: (t.place=='top' ? -1 : 1) * (56*heightScaler - coord.y) });
                  },
                  complete:function()
                  {
                    --cntTmp;
                    transform.transform('scale', '.'+$(this).data('position')+' .card .coin .reward .item:nth-child(1)', { x:1.1,y:1.1 });  
                    if(cntTmp == 0) 
                    {
                      //mut.remove();
                    }  
                  }
                }); 
              }
            });
          }
          delay+=300;
        }
      }  
    }       
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