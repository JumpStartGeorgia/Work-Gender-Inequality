$(document).ready(function(){
  var circles = $('.tester ellipse');
  var cir_count = circles.length;
  var cir_medium = cir_count%2 == 0 ? [cir_count/2,cir_count/2+1] : [Math.ceil10(cir_count/2)];
  var cir_offset = 50;
  var cir_dur = 100;
  console.log(cir_count,cir_medium);

$('.repeat').on('click',circle_redraw);
circle_redraw();
  function circle_redraw()
  {

    var vl = [50,150,250];
    circles.each(function(i,d){ $(d).attr('cx',vl[i]).attr('rx',40).show(); });

    circles.each(function(i,d){    
      var t = $(d);
      t.attr('data-cx',t.attr('cx'));

      if(i+1 < cir_medium) 
      {
        //console.log(i,"left");
        t.animate({'color':'white'},{duration:cir_dur,
          progress:function(a,b,c){
            $(this).attr('cx',+$(this).attr('data-cx')-cir_offset*b);
          },
          complete:function()
          {
            $(this).attr('data-cx',t.attr('cx')).animate({'color':'white'},{duration:500,
              progress:function(a,b,c){
                $(this).attr('cx',+$(this).attr('data-cx')+130*b);
              }
            });          
          }
        });
      }
      else if(i+1 > cir_medium)
      {
        //console.log(i,"right");
        t.animate({'color':'white'},{duration:cir_dur,
          progress:function(a,b,c){
            $(this).attr('cx',+$(this).attr('data-cx')+cir_offset*b);
          },
          complete:function()
          {
            $(this).attr('data-cx',t.attr('cx')).animate({'color':'white'},{duration:500,
              progress:function(a,b,c){
                $(this).attr('cx',+$(this).attr('data-cx')-130*b);
               
              },
              complete:function()
              {
                 ellipse();
              }
            });   
          }
        });
      }
    });
}
function ellipse()
{
  $('.tester ellipse[data-id=1]').hide();
  $('.tester ellipse[data-id=3]').hide();

   $('.tester ellipse[data-id=2]').animate({'color':'white'},{duration:150,
          progress:function(a,b,c){
            $(this).attr('rx',20*b+40).attr("fill","url(#myLinearGradient1)");
          },
          complete:function()
          {
            $(this).attr('rx',40);
          }    
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