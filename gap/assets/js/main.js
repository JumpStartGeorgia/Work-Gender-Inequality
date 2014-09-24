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
      //collision(delta < 0 ? 1 : -1);
      walk(delta < 0 ? 1 : 0);
      lookinfuture(delta < 0 ? 1 : -1);
    }

    if(func(onscrollafter)) onscrollafter()
  });


  $(window).on("swipeleft",function(){ walk(1); });
  $(window).on("swiperight",function(){ walk(0); });
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