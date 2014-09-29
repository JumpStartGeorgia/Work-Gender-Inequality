$(document).ready(function(){



    var cir_offset = 10;
  var static_after = $('.tester g.static_after circle');
  var st_after_len = static_after.length;
  var start_offset = st_after_len*40+(st_after_len)*cir_offset;
  var static_before = $('.tester g.static_before circle');
  var st_before_len = static_before.length;

  var circles = $('.tester g.for_mutation circle');
  var cir_count = circles.length;
  var cir_medium = cir_count%2 == 0 ? [cir_count/2,cir_count/2+1] : [Math.ceil10(cir_count/2)];

  var cir_dur = 100;
  var cir_radius = 20;
  //console.log(cir_count,cir_medium);

$('.repeat').on('click', spiral_redraw);
//spiral_redraw();
function spiral_redraw()
{

  var centerX = initCenterX = (cir_count*cir_radius*2+(cir_count-1)*cir_offset)/2 + start_offset;
  var centerY = 250;
console.log(centerX,centerY);
  circles.each(function(i,d)
  {     
    var t = $(d); 
    t.attr({'cx':2*cir_radius*(i+1)+(cir_offset*(i))+start_offset-cir_radius}).show(); 


    if(i+1 <= cir_medium[0])          
     t.attr({'br':centerX - +t.attr('cx'),'ibr':centerX - +t.attr('cx') });
    else  t.attr({'br':+t.attr('cx')-centerX,'ibr':+t.attr('cx')-centerX  });
    console.log(t.attr('br'),centerX,+t.attr('cx'),i+1 <= cir_medium[0]);
  });
  var centerDistance = centerX - start_offset - cir_radius;
  
  $('.tester g.static_after circle').each(function(i,d){
    $(d).attr('cx',320);
    $(d).attr({'icx':$(d).attr('cx'), 'distance':$(d).attr('cx') - centerX - (20 + 10 + 20) + centerDistance });
   // console.log($(d).attr('cx'),$(d).attr('cx') - centerX + 20 + 10 + 20 );
   });
      circles.each(function(i,d)
      {    
       
        var t = $(d);

          t.animate({'color':'white'},{duration:1000,
            progress:function(a,b,c){
              var th = $(this);  
              x = centerX + +th.attr('br') * Math.cos(Math.radians(360-360*b + (i+1 <= cir_medium[0] ? 180 : 0 )));
              y = centerY - +th.attr('br') * Math.sin(Math.radians(360-360*b + (i+1 <= cir_medium[0] ? 180 : 0 )));
              th.attr('br',+th.attr('ibr')-+th.attr('ibr')*b);
              th.attr({'cx':x, 'cy':y});
              centerX = initCenterX - centerDistance*b;
              //$(circles[cir_medium-1]).attr('cx',centerX);
              $('.static_after circle').each(function(i,d){
                  $(d).attr('cx',+$(d).attr('icx') - +$(d).attr('distance') * b);
                });
            }
          });
      });
}

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