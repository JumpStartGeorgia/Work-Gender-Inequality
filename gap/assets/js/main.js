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
  var current_interests = [6,3,1,0,0,0];
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
        for(var i = from+1; i <= from+how; ++i)
        {
          var item = $('<div data-id=' + i + '>').css(
          {
            'background-image':"url(assets/images/svg/interests/"+ interest[zIndex].image + ")",
            'left':0,//2*interest_w2*i - interest_w2 + interest_offset * (i-1) + interest_start_offset,
            'top':0
          });  
          parent.append(item);
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
          var cxTmp = centTmp*interest_w + (centTmp-1)*interest_offset + (cm%2==0?interest_offset/2:interest_w2);
          var merTmp = tca-cm + Math.ceil10(cm/2) + (cm%2==1 ? -0.5 : 0);
          var distTmp = cxTmp - (tca-cm)*interest_w - (tca-cm-1)*interest_offset - interest_w2;
          tmpA = { start: tca-cm+1, end: tca, cx: cxTmp, cxi: cxTmp, meridian : merTmp, distance : distTmp }; //,
          tca-=cm;
          t.mutation[which].push(tmpA);
          --looper;
        }    
      }
      console.log(t.mutation);
    };
    this.play_mutation = function()
    {
      mp.mutation.forEach(function(d,i)
      { 
        if(d.length > 0)
        {
          d.forEach(function(dd,ii)
          {
            console.log(dd,ii);     
          });
          
        }
        
      });
    };
    this.init();
  }

  mp = new pedestal_object(); // male pedestal object  
  current_interests.forEach(function(d,i){ mp.up(i+1,d); });


$('.repeat').on('click', mp.play_mutation);

function spiral_redraw()
{
  mp.play_mutation();

    $('.tester div[data-mut-startpoint=true]').each(function(i,d){
       var t = $(d);
       var id = +t.attr('data-id');
       var par = t.parent();
      var mut_count = +t.attr('data-mut-count');
      var mut_cx = (mut_count*interest_w2*2 + (mut_count-1)*interest_offset)/2 + t.position().left;
      var mut_icx = mut_cx;
      var meridian = id + Math.floor10(mut_count/2) + (mut_count % 2 == 0 ? -0.5 : 0);
      var mut_distance = mut_cx-t.position().left - interest_w2;

      t.attr({'data-mut-cx': mut_cx});
      t.attr({'data-mut-icx': mut_icx});
      t.attr({'data-mut-meridian': meridian});
      t.attr({'data-mut-distance':mut_distance });

      //console.log(t,id,par,mut_count,mut_cx);
      for(var j = id; j < id + mut_count; ++j)
      {
        
        var item = par.find('div[data-id='+j+']');        
        var left = item.position().left;
        var data_r = (j <= meridian ? mut_cx - left - interest_w2 : left - mut_cx + interest_w2);

        //console.log(meridian,left,j, data_r);
        item.attr({'data-r':data_r, 'data-ir':data_r});

        
        item.animate({'color':'white'},{ duration:1000,
          progress:function(a,b,c){
            var th = $(this); 
            var pr = th.parent(); 
            x = +pr.attr('data-mut-cx') + +th.attr('data-r') * Math.cos(Math.radians(360-360*b + (i+1 <= +pr.attr('data-mut-meridian') ? 180 : 0 )));
            y = +pr.attr('data-mut-cx') - +th.attr('data-r') * Math.sin(Math.radians(360-360*b + (i+1 <= +pr.attr('data-mut-meridian') ? 180 : 0 )));
            th.attr('data-r',+th.attr('data-ir')-+th.attr('data-ir')*b);
            th.css({'left':x, 'top':y});
            pr.attr('data-mut-cx',+pr.attr('data-mut-icx') - +pr.attr('data-mut-distance')*b);
          }
        });
        
      }
    });
        
}


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