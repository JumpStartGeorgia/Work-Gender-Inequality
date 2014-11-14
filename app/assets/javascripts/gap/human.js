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
  this.outrun = false;
  this.gap_percent = 0;
  this.saving_for_tick = 0;
  this.animated = false;
  //this.current_frame = 0;
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
  this.future_reward = 0;
  this.oppenent = null;
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
     $(this.selector).parent().find('.score .tsalary .value').text(val >= 0 ? Math.round10(val) : NaN);
	});
	this.__defineGetter__("tsaved", function(){
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
		var t = this;
    var slow_time = 150;
    //var time_slower = v.duration*1000/150;
    var slowerIndex = 4000/slow_time;
		$(this.selector).animate({"color":'white'},{ duration:4000, easing:'linear',
      start:function()
      {
        $(t.selector).show();
         t.next_movement();    
      },
			progress:function(a,b,c) 
			{ 
        t.position(t.getpathcoordinates(b));
        if(Math.floor10(c/slow_time) < slowerIndex)
        {
          --slowerIndex;          
          t.next_movement();           
        }
			},
			complete:function() 
			{
				t.animated = false;
        animated = t.animated || t.oppenent.animated;
        t.work_frame();
			}
		});
  };
  var prevX = 0;
  var prevY = 0;
  var movementBound = 3;
  this.prepare_reward = function prepare_for_reward(step,start)
  {
    var t = this;
    var istep = step;
    if(!start) step = 1 - step;
    if(t.path != category.stage.frame['reward'].path)
    {
      var frame = category.stage.frame['reward'];
      t.path = frame.path;
      t.path_loop = exist(frame.loop) ? frame.loop : false;
    }

    
    t.position(coordinateFromPath(step,t.path,t.path_length,1,1));
    if(Math.abs(prevX-t.x) > movementBound)
    {
      start ? t.next_movement() : t.prev_movement();
      prevX = t.x;
    }
    if(Math.abs(prevY-t.y) > movementBound)
    {
      start ? t.next_movement() : t.prev_movement();
      prevY = t.y;
    }
    if(!start && istep == 1)
    {
      var frame = category.stage.frame['work'];
      t.path = frame.path;
      t.path_loop = exist(frame.loop) ? frame.loop : false;
    }
  };  
  this.next_movement = function next_movement()
  {        
    this.movement = ++this.movement;
    if(this.movement == 3) this.movement = 1;
    $(this.selector).css("background-image","url(/assets/gap/svg/human/" + category.dress + "/" + this.alias +"r"+ this.movement + ".svg)");    
  };
  this.prev_movement = function prev_movement()
  {
    this.movement = --this.movement;
    if(this.movement == 0) this.movement = 2;

    $(this.selector).css("background-image","url(/assets/gap/svg/human/" + category.dress + "/" + this.alias +"l" + this.movement + ".svg)");    
  };
  this.step_right = function step_right()
  {
    
    var tmp = (this.traversed_path + (100/scrolls_for_reward));
    if(this.path_loop)
       tmp = tmp == 100 ? 100 : tmp%100;
    else if(tmp > 100) return;
    
    this.next_movement();      
    this.traversed_path = tmp;
    //this.position(this.getpathcoordinates(this.traversed_path/100));
  };
  this.step_left = function step_left()
  {    
    var tmp = (this.traversed_path - (100/scrolls_for_reward));
    if(this.path_loop)
       tmp =  tmp <= 0 ? 100 : tmp%100;
    else if(tmp <= 0) return;
    this.prev_movement();
    this.traversed_path = tmp;
    //this.position(this.getpathcoordinates(this.traversed_path/100));
  };
  this.work_frame = function work_frame()
  {
    // if(this.current_frame < frame_sequence_length)
    //   ++this.current_frame;
    // else this.current_frame = 0;
    //console.log(category.stage.frame,this.current_frame,frame_sequence_length,frame_sequence,category.stage.frame[frame_sequence[this.current_frame]]);
    //console.log(frame);
    
    var frame = category.stage.frame['work'];
    this.path = frame.path;
    this.path_loop = exist(frame.loop) ? frame.loop : false;
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
  };
  this.has_future_reward = function has_future_reward()
  {    
    this.future_reward = this.event_by_period[gap.pos + 1];
    return this.future_reward > 0;
  };
  this.mutate = function(which,events)
  {
    var t = this;
    if(typeof which === "undefined") return;
    if(which == 1) events = t.event_by_period[gap.pos-1];
    console.log("pos",gap.pos)
    if (typeof events === "undefined" || events == 0) 
    {
      this.queue.resume();  
      return;
    }
    var treasure = t.treasure;
    var hasMutation = false;
    var zIndex = which - 1;
    var mutateCount = 0;
    var tmp = 0;
    
    if(t.inrange(which) && events > 0)
    { 

      var ca = treasure[zIndex] + events; // all events for current steps
      var sm = states_mutation[zIndex];
      var mutateCount = Math.floor10(ca/sm);    
      if(t.outrun)
      {
        var restrictor = t.oppenent.hasLevelMutation(which);
        //console.log("restrictor",restrictor,mutateCount,t.title);

        if(mutateCount > restrictor) { mutateCount = restrictor; }
      }

      if(mutateCount >= 1)
      {
        
        hasMutation = true;

        var looper = mutateCount;
        var tca = ca;     
        var interestB = $('.' + t.place + ' .treasure .pedestal .interestB[data-id='+which+']');

        var eventL = treasure[zIndex];
        var eventR = events;
        var cnt = mutateCount;
        var tmpCount = 1;
        
        var checker = sm-1;
       
        mutator.empty();
        for(var i = 1; i <= eventR; ++i)
        {
          if(tmpCount <= cnt)
          {
            mutator.right.push(tmpCount);
            ++tmpCount;
          }
          else 
          {
            if(checker != 0)
            {
              mutator.right.push(tmpCount-1);
              --checker;
            }
            else 
            {
              mutator.right.unshift(0);     
            }
          }
        }
      
        // After preparing mutator.right array, calculating count of each different items, ex: can be 1 without mutation mutator.rightCount[0] will be one ...
        tmpCount = 1;
        for(var i = 0; i < eventR-1; ++i)
        {
          if(mutator.right[i] != mutator.right[i+1])
          {
            mutator.rightCount.push(tmpCount);
            tmpCount = 1;
          }
          else
          {
            ++tmpCount;
          }
        }

        if(typeof mutator.right[0] !== undefined && mutator.right[0]!=0)  mutator.rightCount.unshift(0);
        mutator.rightCount.push(tmpCount);

        // Preparing left mutator.left
        var mutatorRightCountIndex = mutator.rightCount.length - 1;
        tmp = sm - mutator.rightCount[mutatorRightCountIndex];
        treasure[zIndex]-=tmp;
        for(var i = eventL; i >= 1; --i)
        {
          if(mutatorRightCountIndex  == 0) mutator.left.unshift(0);
          else 
          {
            if(tmp!=0)
            {
              mutator.left.unshift(mutatorRightCountIndex );
              if(tmp-1 == 0)
              { 
                --mutatorRightCountIndex;
                tmp = sm - mutator.rightCount[mutatorRightCountIndex];
              }
              else --tmp;
            }
          }
        }
        for(var i = 1; i <= cnt; ++i)
        {
          var placeOnCard = 0;
          for(var j = 0; j < eventR; ++j)
          {
            if(mutator.right[j] == i) 
            {
              placeOnCard = j;
              break;
            }
          }
          var isFirst = true;
          var itemNumber = 0;
          var last = {};
          var globalItemNumber = 0;
          var putIndex = 0;
          for(var j = eventL-1; j >= 0; --j)
          {
            if(mutator.left[j] == i) 
            {
              if(isFirst)  
              {
                var lastTmp = $('.' + t.place + ' .treasure .pedestal .interestB[data-id='+which+'] div.item[data-id=' + (j+1)+ ']');
                last.offset = lastTmp.offset();
                last.position = lastTmp.position();
              }
               var mutateF = (function(which, j, placeOnCard, isFirst, i, itemNumber, last,globalItemNumber) {
                  return function(){ t.moveTreasureCoinToCard(which, j, placeOnCard, isFirst, i, itemNumber, last,globalItemNumber); };
                })(which, j, placeOnCard, isFirst, i, itemNumber, last,globalItemNumber);
                this.queue.splice(putIndex++, mutateF,t.title);
            
              if(isFirst)  isFirst = false;
              ++itemNumber;
              ++globalItemNumber;
            }
          }
          isFirst = true;
          var first = {};
          var firstTmp;
          itemNumber = 0;
          for(var j = 0; j < eventR; ++j)
          {
            if(mutator.right[j] == i)
            {
              if(isFirst) 
              {
                isFirst = false;
                firtsTmp = $('.' + t.place + ' .treasure .card .coins .coin:nth-child('+(j+1)+')');
                first.offset = firtsTmp.offset();
                first.position = firtsTmp.position();
              }
              else 
              {
                var mutateF = (function(which,j,placeOnCard,first,itemNumber,globalItemNumber) {
                  return function(){ t.moveCardCoinToParentCardCoin(which,j,placeOnCard,first,itemNumber,globalItemNumber); };
                })(which,j,placeOnCard,first,itemNumber,globalItemNumber);
                this.queue.splice(putIndex++, mutateF,t.title);
                ++globalItemNumber;
              }
              ++itemNumber;
   
            } 
          }
          var tmpIndex = 0;
          var zeroCount = mutator.rightCount[0];

          var mutateF = (function(zeroCount,i) 
          {
                  return function(){ 
                    var convert = $('.' + t.place + ' .treasure .card .coins .coin:nth-child('+(zeroCount+i)+')');
                    convert.animate({"color":"white"},{duration:2000,
                    progress:function(a,b,c){
                        var val = jQuery.easing.easeOutBounce(b*0.3);
                        $(this).css({'transform':'scale(' + (1+val)+','+(1+val) + ')',opacity:1-b})
                     },
                    complete:function(){ 
                      var prevImage = interest[zIndex].class;
                      var nextImage = interest[zIndex+1].class;
                      $(this).removeClass(prevImage).css('transform','scale(1,1)').addClass(nextImage).css('opacity',1);
                      t.queue.resume();
                    }
                  });
                  };
          })(zeroCount,i);
          this.queue.splice(putIndex++, mutateF);
        }
      }
      else
      {        
        treasure[zIndex]+=events;
        this.pedestal.add(which,events);
      }
    }

    if(mutateCount > 0 && which <= 6)
    {
      this.queue.splice(-4, (function(w,m)
      { 
        return function(){ t.mutate(w,m); }; 
      })(which+1,mutateCount));
    }
    this.queue.resume();
  };
  var fromTreasureCoinToCardPath = "M 0.0473509,55.968433 C 22.205826,24.60457 55.704178,5.2051051 100.0051,0.03123545";
  var pathTmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathTmp.setAttribute('d', fromTreasureCoinToCardPath);
  var pathTmpLength = pathTmp.getTotalLength();

  this.moveTreasureCoinToCard = function(level,who,where,isFirst,parent,itemNumber,last,globalItemNumber)
  {
    var t = this;
    var interestB = $('.' + t.place + ' .treasure .pedestal .interestB[data-id='+level+']');
    var item = interestB.find('div.item[data-id='+(who+1)+']');
    var offsetLeft = last.offset.left;
    var cardItem = $('.' + t.place + ' .treasure .card .coins .coin:nth-child('+(where+1)+')');
    var widthScaler = (cardItem.offset().left - offsetLeft)/100;
    var hForScaler = 0;
    if(t.place=='top') hForScaler = lh - cardItem.offset().top - 32 - 10;
    else  hForScaler = cardItem.offset().top - lh - th - 10;
    var heightScaler = hForScaler/56;
    var dur = 200;//1500;   
    var delay = 300 * itemNumber;
    item.data('itemNumber',globalItemNumber);
    if(isFirst)
    {
      item.animate({'color':'#ffffff'},{duration:dur,
        progress:function(a,b,c){
          var coord = coordinateFromPath(b,pathTmp,pathTmpLength,widthScaler,heightScaler);
          $(this).css({ left:coord.x, top: (t.place=='top' ? -1 : 1) * (56*heightScaler - coord.y) });
        },
        complete:function()
        {
          var glb = +item.data('itemNumber');
          item.remove();
          cardItem.css('transform','scale('+(1+glb/10)+','+(1+(glb+1)/10)+')');
          t.queue.resume();
        }
      }); 
    }
    else
    {
      item.data('ileft',item.position().left);
      item.delay(delay).animate({left:last.position.left-item.position().left},{ duration:500,
        complete:function()
        {
          $(this).animate({'color':'#ffffff'},{ duration:dur,
            progress:function(a,b,c){
              var coord = coordinateFromPath(b,pathTmp,pathTmpLength,widthScaler,heightScaler);
              $(this).css({ left: coord.x + (last.position.left- +item.data('ileft')), top: (t.place=='top' ? -1 : 1) * (56*heightScaler - coord.y) });
            },
            complete:function()
            {
               var glb = +item.data('itemNumber');
               item.remove();
               cardItem.css('transform','scale('+(1+glb/10)+','+(1+(glb+1)/10)+')');
               t.queue.resume();
            }
          }); 
        }
      });
    }
  };
  this.moveCardCoinToParentCardCoin = function(level,who,where,first,itemNumber,globalItemNumber)
  {
    
    var t = this;
    var delay = 300 * itemNumber;
    var cardItem = $('.' + t.place + ' .treasure .card .coins .coin:nth-child('+(where+1)+')');
    var item     = $('.' + t.place + ' .treasure .card .coins .coin:nth-child('+(who+1)+')');
    item.data('itemNumber',globalItemNumber);
    item.delay(delay).animate({left:item.position().left-first.position.left},{ duration:500,
      complete:function()
      {
        var glb = +item.data('itemNumber');
        item.remove();
        cardItem.css('transform','scale('+(1+glb/10)+','+(1+(glb+1)/10)+')');
        t.queue.resume();
      }
    });
  };
  this.hasLevelMutation = function(which,p)
  {
    var t = this;  
    if(!(which>=1 && which <= 4)) return 999;

    var prevTmp = 0;
    for(var i = 0; i < gap.pos-1; ++i)
    {
      prevTmp += t.event_by_period[i];
    }
    for(var i = 4; i >= 0; --i)
    {
      prevTmp -= Math.floor10(prevTmp / states_mutation_based[i]) * states_mutation_based[i];
      if(i == which-1)   break;
    }
    return Math.floor10((t.event_by_period[gap.pos-1] + prevTmp) / states_mutation_based[which-1]);
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