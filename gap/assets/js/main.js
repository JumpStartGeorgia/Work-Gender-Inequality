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
  var mutation_step = [4,2,2,3,3,3];
  var index = 1;
  var current_interests_count = 0;
  current_interests.forEach(function(d,i){current_interests_count+=d;});

  function pedestal_object()
  {
    this.ach = [0,0,0,0,0,0]; // achievements per item in interest
    this.ach_count = 0;   
    this.mutation = [[],[],[],[],[],[]]; 
    this.mutation_empty = [[],[],[],[],[],[]]; 
    this.mutation_count = 0;
    this.up = function(which,how)
    {
      if(this.inrange(which) && how > 0)
      {
        var zIndex = which - 1;
        //console.log("ach_up",which,how);
        var from = this.ach[zIndex];
        var parent = $('.tester .test_block > div.int_group[data-id=' + which + ']');

        var before_which = 0;
        this.ach.forEach(function(d,i){ if(i <= zIndex) before_which += d; });
        //console.log(before_which);
        for(var i = from+1; i <= from+how; ++i)
        {
          var item = $('<div data-id=' + i + '>').css(
          {
            'background-image':"url(assets/images/svg/interests/"+ interest[zIndex].image + ")",
            'left':interest_w*before_which + interest_offset * before_which + interest_start_offset,
            'top':200
          });  
          parent.append(item);
          ++before_which;
        }
        this.ach[zIndex] += how;
        if(this.ach[zIndex]/mutation_step[zIndex] >= 1)
          this.mutate(zIndex);
      }
    };
    this.down = function(which,how) // which 1 based
    {
      console.log("ach_down");
    };
    this.inrange = function(which)
    {
      if(which >=1 && which < this.ach.length)
        return true;
      return false;
    };
    this.init = function()
    {
      var test = $("<div class='test_block'></div>").appendTo('.tester');
      this.ach.forEach(function(d,i){
        test.append('<div class="int_group" data-id="'+(i+1)+'">');
      }); 
    }
    this.mutate = function(which)
    {
      var t = this;        
      var ca = t.ach[which];
      var cm = mutation_step[which];
      var mut_count = Math.floor10(ca/cm);
      t.mutation = t.mutation_empty;
      if(mut_count >= 1)
      {

        var looper = mut_count;
        var tmpA = [];
        var tca = ca;        
        while(looper != 0)
        {
          var centTmp = tca-cm + Math.floor10(cm/2);
          var cxTmp = centTmp*interest_w + (centTmp-1)*interest_offset + (cm%2==0?interest_offset/2:interest_w2) - interest_w2;
          var cyTmp = 200;
          var merTmp = tca-cm + Math.ceil10(cm/2) + (cm%2==1 ? -0.5 : 0);
          var distTmp = cxTmp - (tca-cm)*interest_w - (tca-cm)*interest_offset;
          tmpA = { from: tca-cm+1, to: tca, cx: cxTmp, cxi: cxTmp, cy: cyTmp, cyi: cyTmp, meridian : merTmp, distance : distTmp }; //,
          tca-=cm;
          t.mutation[which].push(tmpA);
          --looper;
        }    
      }
      //console.log(t.mutation);
    };
    this.play_mutation = function()
    {
      //console.log(mp.mutation);
      mp.mutation.forEach(function(d,i)
      { 
        if(d.length > 0)
        {
          var par = $('.tester .test_block > div.int_group[data-id='+(i+1)+']');
          d.forEach(function(dd,ii)
          {   
            for(var j = dd.from; j <= dd.to; ++j)
            {
              //console.log(dd.from,dd.to);           
              var item = par.find('div[data-id=' + j + ']');
              var left = item.position().left;
              
              //console.log(left,dd.cx,left-dd.cx,j,dd.meridian);
              var r = (j <= dd.meridian ? dd.cx - left - interest_w2 : left - dd.cx + interest_w2);
              //console.log(r,j <= dd.meridian ? 180 : 0);
              //console.log(left);
              item.data({'r':r, 'ir':r});

              item.animate({"color":"white"},{duration:1000, 
                progress:function(a,b,c){
                  var th = $(this); 
                  console.log(dd.cx,dd.cy,th.data('id'),th.data('r'),th.data('ir'));
                  x = dd.cx + +th.data('r') * Math.cos(Math.radians(360-360*b + (+th.data('id') <= dd.meridian ? 180 : 0 )));
                  y = dd.cy - +th.data('r') * Math.sin(Math.radians(360-360*b + (+th.data('id') <= dd.meridian ? 180 : 0 )));
                  th.data('r',th.data('ir')*(1-b));
                  th.css({'left':x, 'top':y});
                  dd.cx = dd.cxi - dd.distance*b;                
                },
                complete:function()
                {
                  //$(this).remove();
                }
              });
            }
          });
        }
        
      });
    };
    this.init();
  }

  mp = new pedestal_object(); // male pedestal object  
  current_interests.forEach(function(d,i){ mp.up(i+1,d); });
  $('.repeat').on('click', mp.play_mutation);
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