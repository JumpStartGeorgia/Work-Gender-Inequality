var mp = null;
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

  var interest_offset = 10;
  var interest_animation_duration = 100;
  var interest_w = 32;
  var interest_w2 = interest_w/2;
  var interest_start_offset = 0;
  var current_interests = [6,3,1,0,0,0]; // todo when more then one mutation needed
  var states_mutation = [4,4,2,3,3,0];
  var index = 1;
  var current_interests_count = 0;
  current_interests.forEach(function(d,i){current_interests_count+=d;});

  function pedestal_object()
  {
    this.ach = [0,0,0,0,0,0]; // achievements per item in interest
    this.ach_count = this.ach.length;   
    this.mutation = [[],[],[],[],[],[]]; 
    this.mutation_empty = [{},{},{},{},{},{}]; 
    this.mutation_count = 0;

    this.up = function(which,how,hidden)
    {
      var t = this;
      //console.log(which,how,hidden);
      if(typeof hidden === undefined) hidden = false;
      var zIndex = which-1;  // change from zero based
      if(t.inrange(which) && how > 0)
      {
        var from = t.ach[zIndex];
        var parent = $('.tester .treasureB > div.interestB[data-id=' + which + ']');

        var before_which = 0;
        t.ach.forEach(function(d,i){ if(i <= zIndex) before_which += d; });
      
        for(var i = from+1; i <= from+how; ++i)
        {
          var item = $('<div data-id=' + i + '>').addClass('item i' + interest[zIndex].class); 
          if(hidden) 
          {
            item.addClass('hidden').hide();
          }
          parent.append(item);
          ++before_which;
        }
        t.ach[zIndex] += how;
        if(!hidden)
        {
          setTimeout(function(){t.prepare_for_mutation();},1000);
        }
      }
    };
    this.down = function(which,how) // which 1 based
    {
      console.log("ach_down");
    };
    this.inrange = function(which)
    {
      if(which >=1 && which < 6)
        return true;
      return false;
    };
    this.init = function()
    {
      var test = $("<div class='treasureB'></div>").appendTo('.tester');
      this.ach.forEach(function(d,i){
        test.append('<div class="interestB" data-id="'+(i+1)+'">');
      }); 
    };
    this.resume = function(states)
    {
      if(typeof states !== Array && states.length != 6) return;

      for(var i = 0; i < 6; ++i)
      {
        var state = states[i];
        if(i != 5)        
        {
          var sm = states_mutation[i]; // state mutation for current interest item                 
          state -= Math.floor10(state/sm) * sm;
        }
        var parent = $('.tester .treasureB > div.interestB[data-id=' + (i+1) + ']').empty();
        for(var j = 0; j < state; ++j)
        {
           var item = $('<div data-id=' + (j+1) + '>').addClass('item i' + interest[i].class); 
           parent.append(item);
        }
        this.ach[i] = state;
      }
    };
    this.prepare_for_mutation = function()
    {
      // preparations
      var t = this;
      var mutation_count = 0;
      t.mutation = t.mutation_empty;
      for(var i = 0; i < 5; ++i)
      {
        var ca = t.ach[i];
        var sm = states_mutation[i];
        var smc = Math.floor10(ca/sm);
        console.log(ca,sm,smc);
        t.mutation[i] = { count: 0 };
        if(smc >= 1)
        {
          var looper = smc;
          var tmpA = [];
          var tca = ca;        
          var interestB = $('.tester .treasureB .interestB[data-id='+(i+1)+']');
          t.mutation[i] = { count: smc };

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
            tca-=sm;        
            --looper;
          }
         
        }
      }
      // play mutation
      var dur = 2000;
      t.mutation.forEach(function(d,i)
      { 
        var hiddens = $('.tester .treasureB .interestB[data-id='+(i+1)+'] .item.hidden');
        if(d.count > 0)
        {
          if(hiddens.length != 0)
          {
            hiddens.delay(i*dur).removeClass('hidden').fadeIn(dur,function(){
              for(var j = 1; j <= d.count; ++j)
              {
                $('.tester .treasureB > div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + j + ']').fadeOut(dur,function(){
                  this.remove();
                });            
              }          
            });              
          }      
          else
          {
            for(var j = 1; j <= d.count; ++j)
            {
                $('.tester .treasureB > div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + j + ']').fadeOut(dur,function(){
                  this.remove();
                });            
            }  
          }  
          t.ach[i]-=d.count*states_mutation[i];          
        }
        else 
        {
           hiddens.delay(i*dur).removeClass('hidden').fadeIn(dur);
        }
      });

      //console.log(t.ach);
    };  
    this.init();
  }

  mp = new pedestal_object(); // male pedestal object  
  mp.resume(current_interests);
  $('.repeat').on('click', function() { mp.up(1,6); });

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