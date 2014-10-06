var mp = null;
var fp = null;
  var interest_offset = 10;
  var interest_animation_duration = 100;
  var interest_w = 32;
  var interest_w2 = interest_w/2;
  var interest_start_offset = 0;
  var current_interests = [6,3,1,0,0,0]; // todo when more then one mutation needed
  var states_mutation = [4,4,2,3,3,0];
  var index = 1;
  var current_interests_count = 0;
  var mutation_restriction = [0,0,0,0,0,0];
$(document).ready(function(){



// bind events
  $(document).on('DOMMouseScroll mousewheel', function(e, delta) {

   
    // do nothing if is already animating
    //if($("html,body").is(":animated")) return false;

    // normalize the wheel delta -1 down, 1 up
    delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;

    if(func(onscrollbefore)) onscrollbefore();

    if(delta < 0) // forward up next
    {      
      if(func(onscrollup)) onscrollup();
    }
    else // backward down previous
    {
      if(func(onscrolldown)) onscrolldown();
    }
    if(ingame && !animated) 
    { 
      clearInterval(noscrollTimerId); // clear last noscroll catcher
      //collision(delta < 0 ? 1 : -1);
      walk(delta < 0 ? 1 : -1);
//      lookinfuture(delta < 0 ? 1 : -1);

      noscrollTimerId = setInterval(function(){ console.log("Tap"); },noscrollEventTime); // create new noscroll interval trigger
    }

    if(func(onscrollafter)) onscrollafter()
    
  });


  $(window).on("swipeleft",function(){ walk(1); });
  $(window).on("swiperight",function(){ walk(-1); });
  // on resize redraw game   
  $( window ).resize(function() { init(); });

  history.replaceState({},'',window.location.href);




// ***************************************************************************************************************
// ***********************************************  
  // ***********************************************    
      init(); // start game       
  // ***********************************************  
// ***********************************************  


  current_interests.forEach(function(d,i){current_interests_count+=d;});



  function pedestal_object(human)
  {
    this.ach = [0,0,0,0,0,0]; // achievements per item in interest
    this.achTmp = [0,0,0,0,0,0];
    this.ach_count = this.ach.length;   
    this.mutation = [{},{},{},{},{},{}]; 
    this.mutation_empty = [{},{},{},{},{},{}]; 
    this.mutation_count = 0;
    this.human = human;
    this.par = $('.' + this.human.place + ' .treasure .pedestal');
    this.mutationDone = true;
    this.up_stack = [];

    this.up = function(which,how,hidden)
    { 

      if(typeof hidden === undefined) hidden = false;
      //console.log(which,how,hidden);
      var t = this;
      // if(!t.mutationDone) // todo delaying up till previous end
      // {
      //   t.up_stack.push({which:which,how:how,hidden:hidden});
      //   t.delay();
      //   return;
      // }

      var zIndex = which-1;  // change from zero based
      if(t.inrange(which) && how > 0)
      {
        //this.achTmp = this.ach.slice();
        //this.achTmp[0] += how;

        var ca = this.ach[zIndex] + how;
        var sm = states_mutation[zIndex];
        var smc = Math.floor10(ca/sm); 
        var mutation_count = 0;
        t.mutation = t.mutation_empty.slice();
        //console.log(ca,sm,smc);

        if(!t.human.outrun) mutation_restriction[zIndex] = 0;

        if(smc >= 1)
        {
          if(t.human.outrun && smc > mutation_restriction[which]) 
          {
            //this.add(which,t.ach[zIndex],(smc - mutation_restriction[which]) * how);
            smc =  mutation_restriction[zIndex];
            mutation_restriction[zIndex] = 0;
          }
          mutation_count+=smc;
          t.mutation[zIndex] = { count: smc };

          var looper = smc;
          var tmpA = [];
          var tca = this.ach[zIndex]+how;        
          var interestB = t.par.find('.interestB[data-id='+which+']');

          if(!t.human.outrun) mutation_restriction[zIndex] = smc;
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
          if(mutation_count > 0)
          {
            var tocardpath = "M 0.0473509,55.968433 C 22.205826,24.60457 55.704178,5.2051051 100.0051,0.03123545";
            var pathTmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathTmp.setAttribute('d', tocardpath);
            var pathTmpLength = pathTmp.getTotalLength();


             var delay = 300;
             var muts = interestB.find('.mutationB');
             //console.log(muts.length-1,muts);
             for(var j = muts.length-1; j >= 0; --j)
             {
                var mut = $(muts[j]);
                var from = + mut.attr('data-from');
                var to = + mut.attr('data-to');
                var mut_start = mut.position().left;
                //console.log(from,to);
                var first = mut.find('div.item[data-id=' + from + ']');
                var last = mut.find('div.item[data-id=' + to + ']');
                //console.log();
                var moveLeft = last.position().left;//- first.position().left;
                console.log(to,from);
                for(var h = to; h >= from; --h)
                {
                  var d = mut.find('div.item[data-id=' + h + ']');
                  d.css("position","relative");

                  if(h == to)
                  {
                    //console.log("Last one");
                    d.delay(delay).animate({'color':'#ffffff'},{duration:500,
                      progress:function(a,b,c){
                        var coord = t.coordinateFromPath(b,pathTmp,pathTmpLength);
                        $(this).css({ left:coord.x, top: -(56 - coord.y) });
                      }
                    }); 
                  }
                  else
                  {
                    //console.log("Others");
                    //console.log(moveLeft-d.position().left);
                    var left = moveLeft-d.position().left;
                     console.log(d.position().left);
                      d.delay(delay).animate({left:left},{ duration:500,
                      complete:function()
                      {
                        // todo positioning problem
                        console.log($(this).position().left);//(this)
                        //console.log(d,$(d),$(d).position(), d.position());
                        //  var leftOffset = $(this).position().left - mut_start;
                        //  //console.log(leftOffset);
                        // // console.log(leftOffset);
                        // $(this).animate({'color':'#ffffff'},{ duration:500,
                        //   progress:function(a,b,c){
                        //     var coord = t.coordinateFromPath(b,pathTmp,pathTmpLength);
                        //     $(this).css({ left: leftOffset + coord.x , top: -(56 - coord.y) });
                        //   }
                        // }); 
                      }});
                  }
                  delay+=500;
                }
             }
            // console.log();
            // console.log(muts);
            // muts.forEach(function(d,i){
            //   console.log(d,i,$(muts[0]).attr('data-from'));
            // });
            // muts.each(function(i,d){
            //   console.log(d,i,$(d).attr('from'));
            //   //console.log(d.attr('from'));
            //   //var from = + this.attr('from');
            //   //var to = + this.attr('to');
            //   //console.log(from,to);
            // });
            // wrapper.find('.item').each(function(i,d)
            // { 
            //   d = $(d);
            //   c
              
            //   d.delay(delay).animate({'color':'#ffffff'},{duration:3000,
            //     progress:function(a,b,c){
         
            //       var coord = t.coordinateFromPath(b,pathTmp,pathTmpLength);
            //              //  console.log(b,coord);
            //       $(this).css({ left:coord.x, top: -(56 - coord.y) });
            //     }
            //   }); 
            //   delay+=500;
            // });
            // move via path
          }
         // go ahead and check if parent needs mutation
         if(true)
         {
          // mutate last step
         }
         else { // mutate to parent 
         }
 
        }
        else
        {
          this.add(which,t.ach[zIndex],how);
        }

     
        this.ach[zIndex]+=how;
      
      }
      // play mutation
      // if(mutation_count > 0)
      // {
      //   t.mutationDone = false;
      //  // setTimeout(function(){ t.mutate();},1000);
      // }

        // temp calculate how many mutations and how many objects should be moved 
        // move them
        // finish treasue bar
        
      

        // //var before_which = 0;
        // //t.ach.forEach(function(d,i){ if(i <= zIndex) before_which += d; });
      
        // for(var i = from+1; i <= from+how; ++i)
        // {
        //   var item = $('<div data-id=' + i + '>').addClass('item i' + interest[zIndex].class); 
        //   if(hidden) 
        //   {
        //     item.addClass('hidden').hide();
        //   }
        //   parent.append(item);
        //   //++before_which;
        // }
        // t.ach[zIndex] += how;
       
     
      // if(!hidden)
      // {
      //   t.prepare_mutator();          
      // }




      // OLD
      /*var zIndex = which-1;  // change from zero based
      if(t.inrange(which) && how > 0)
      {
        // temp calculate how many mutations and how many objects should be moved 
        // move them
        // finish treasue bar
        
        var from = t.ach[zIndex];
        var parent = t.par.find('> div.interestB[data-id=' + which + ']');

        //var before_which = 0;
        //t.ach.forEach(function(d,i){ if(i <= zIndex) before_which += d; });
      
        for(var i = from+1; i <= from+how; ++i)
        {
          var item = $('<div data-id=' + i + '>').addClass('item i' + interest[zIndex].class); 
          if(hidden) 
          {
            item.addClass('hidden').hide();
          }
          parent.append(item);
          //++before_which;
        }
        t.ach[zIndex] += how;
       
      }
      if(!hidden)
      {
        t.prepare_mutator();          
      }*/
    };    
    this.coordinateFromPath = function(progress,path,pathLength)
    {
       var percent = Math.round10(progress*100);
        var p1 = path.getPointAtLength(pathLength * (percent-1)/100);
        var p2 = path.getPointAtLength(pathLength * (percent+1)/100);
        var a = Math.atan2(p2.y-p1.y,p2.x-p1.x)*180 / Math.PI;
        var p =  path.getPointAtLength(pathLength * percent/100);
        return { x:p.x,y:p.y, a:a };
    } 
    this.add = function(which,start,how)
    {
      var t = this;
      //console.log(this.human,which, start,how);
      var parent = t.par.find('div.interestB[data-id=' + which + ']');
      for(var i = start+1; i <= start+how; ++i)
      {
        var item = $('<div data-id=' + i + '>').addClass('item i' + interest[which-1].class); 
        parent.append(item);
      }
    };
    this.down = function() // go back one step calculate data based on pos
    {
      var t = this;
      var states = [0,0,0,0,0,0];
      t.mutation = t.mutation_empty;
      var treasure_count = 0;
      for(var i = 0; i < pos*reward_period; ++i)
        treasure_count += this.human.event_by_month[i];

      var state_cost = 0; 
      states_mutation.forEach(function(d,i){ state_cost+=d; });
      for(var i = 5; i > 0; --i)
      {
        state_cost-=states_mutation[i];
        //console.log(state_cost);
        var tmp =  Math.floor10(treasure_count/state_cost);
        if(t.human.outrun && tmp > mutation_restriction[i])
        {
          tmp =  mutation_restriction[i];
          mutation_restriction[i] = 0;      
        }
        if(tmp >= 1)
        {
          states[i] = tmp;
          treasure_count -= tmp * state_cost;
        }
      }
      states[0] = treasure_count;

      if(!t.human.outrun) mutation_restriction = states;

      this.resume(states);
    };
    this.next = function(v)
    {     
      this.up(1,this.human.event_by_month[v]);
    };
    this.prev = function(v)
    {     
      this.down();
    };
    this.move = function(c,v)
    {  
    //  console.log("something should happen, move this to blank");
      if(c)
      {

        // var cur_pos = pos*reward_period;
        // var tmp = 0; 
        // //console.log(cur_pos)
        // for(var i = cur_pos-1; i >= cur_pos-reward_period;--i)
        //   tmp+=this.human.event_by_month[i];   
        // console.log(tmp,);
        // this.up(1,tmp);
        this.up(1,this.human.event_by_period[pos-1]);
      }
      else 
        this.down();
    };
    this.delay = function()
    {
      //console.log("delaying");
      var t = this;
      setTimeout(function()
      {        
        if(t.mutationDone)
        {
          var item = t.up_stack.shift();
          t.up(item.which,item.how,item.hidden);
        }
        else
        {
          t.delay();
        }          
      },1000);      
    }; 
    this.prepare_mutator = function()
    {
      // preparations
      var t = this;
      //console.log(mutation_restriction,t.human.outrun);
      var mutation_count = 0;
      t.mutation = t.mutation_empty;
      for(var i = 0; i < 5; ++i)
      {
        var ca = t.ach[i];
        var sm = states_mutation[i];
        var smc = Math.floor10(ca/sm); 
            
        t.mutation[i] = { count: 0 };
        if(!t.human.outrun) mutation_restriction[i] = 0;
        if(smc >= 1)
        {
         
          if(t.human.outrun && smc > mutation_restriction[i]) 
          {
            smc =  mutation_restriction[i];
            mutation_restriction[i] = 0;
          }
          mutation_count+=smc;
          var looper = smc;
          var tmpA = [];
          var tca = ca;        
          var interestB = t.par.find('.interestB[data-id='+(i+1)+']');
          t.mutation[i] = { count: smc };

          if(!t.human.outrun) mutation_restriction[i] = smc;

          while(looper != 0)
          {
            var from = tca - sm;
            var to = tca;

            var beforeItem = interestB.find('.item[data-id=' + (from++) + ']');
            var wrapper = $('<div class="mutationB" data-id="'+looper+'"></div>');
            if(beforeItem.length == 0) 
               interestB.prepend(wrapper);
            else wrapper.insertAfter(beforeItem);

            for(var j = from; j <= to; ++j)
            {
              var item = interestB.find('.item[data-id=' + j + ']');            
              wrapper.append(item.detach());
            }
            t.up(i+2,1,true);
            //console.log(smc);
            tca-=sm;        
            --looper;
          }
         
        }
      }
      // play mutation
      if(mutation_count > 0)
      {
        t.mutationDone = false;
        setTimeout(function(){ t.mutate();},1000);
      }
      //console.log(t.ach);
    }; 
    this.mutate = function()
    {
      var t = this;
      var dur = 2000;     
      t.mutation.forEach(function(d,i)
      { 
        var hiddens = t.par.find('.interestB[data-id='+(i+1)+'] .item.hidden');
        if(d.count > 0)
        {
          if(hiddens.length != 0)
          {
            hiddens.delay(i*dur).removeClass('hidden').fadeIn(dur,function(){
              for(var j = 1; j <= d.count; ++j)
              {
                t.par.find('> div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + j + ']').fadeOut(dur,function(){
                  this.remove();
                });            
              }          
            });              
          }      
          else
          {
            for(var j = 1; j <= d.count; ++j)
            {
                t.par.find('> div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + j + ']').fadeOut(dur,function(){
                  this.remove();
                });            
            }  
          }  
          t.ach[i]-=d.count*states_mutation[i];          
        }
        else 
        {
           hiddens.delay(i*dur).removeClass('hidden').fadeIn(dur,function(){t.mutationDone = true;});
        }
      });
    };

    this.inrange = function(which)
    {
      if(which >=1 && which < 6)
        return true;
      return false;
    };
    this.init = function()
    {    
      var t = this;  //$("<div class='treasureB'></div>").appendTo('.tester');
      //console.log(t,t.par);
      t.ach.forEach(function(d,i){
        t.par.append('<div class="interestB" data-id="'+(i+1)+'">');
      }); 
    };
    this.resume = function(states)
    {
      var t = this;
      if(typeof states !== Array && states.length != 6) return;

      for(var i = 0; i < 6; ++i)
      {
        var state = states[i];
        // if(i != 5)        
        // {
        //   var sm = states_mutation[i]; // state mutation for current interest item                 
        //   state -= Math.floor10(state/sm) * sm;
        // }
        var parent = t.par.find('> div.interestB[data-id=' + (i+1) + ']').empty();
        for(var j = 0; j < state; ++j)
        {
          var item = $('<div data-id=' + (j+1) + '>').addClass('item i' + interest[i].class); 
          parent.append(item);
        }
        this.ach[i] = state;
      }
    }; 
    this.init();
  }

  mp = new pedestal_object(male); // male pedestal object 
  fp = new pedestal_object(female); 
 // mp.resume(current_interests);
 // fp.resume(current_interests);

  //$('.repeat').on('click', function() { mp.up(1,6); });
}); 

 window.onpopstate = function(e){
      if(e.state !== null) 
      { 
         hist = true;       
         init();   
         hist = false;
      } 
      //else { // no state data availableload initial page which was there at first page load }
  }