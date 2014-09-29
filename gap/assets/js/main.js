$(document).ready(function(){



   
  // var static_after = $('.tester g.static_after circle');
  // var st_after_len = static_after.length;
  // var start_offset = 0;//st_after_len*40+(st_after_len)*cir_offset;
  // var static_before = $('.tester g.static_before circle');
  // var st_before_len = static_before.length;

  //var circles = $('.tester g.for_mutation circle');
 // var cir_count = circles.length;
 
  var cir_offset = 20;
  var cir_dur = 100;
  var cir_radius = 16;
  var start_offset = 0;
  var interest_count = 10;
  var medium_point =  Math.ceil10(interest_count/2);
  var interest_icons = ["bag.svg","boat.svg","coconut.svg","compass.svg","credit.svg","directions.svg"];//,"earth.svg","passport.svg","photo.svg","place.svg","plane.svg","plate.svg","sun.svg","taxi.svg","wallet.svg"];


  var centerX = initCenterX = (interest_count*cir_radius*2+(interest_count-1)*cir_offset)/2 + start_offset;
  var centerY = 0;
  var intere = [6,3,1,0,0,0];
  var mapper = [4,2,2,3,3,3];
  var test = $("<div class='test_block'></div>").appendTo('.tester');
  [1,2,3,4,5,6].forEach(function(d,i){
    test.append('<div class="int_group" data-id="'+i+'">');
  });

    

  
  var index = 1;
  interest_icons.forEach(function(d,i){

    if(i<interest_count && intere[i] > 0 )
    {
      var map = mapper[i];
      var tmp = 0;
      //var started = false;
      var started = false;
      //var started_pos = 0;
      var started_pos = 0;
      var cur_intere_val = intere[i];
      var cur_offset = cur_intere_val % map;

      var parent = $('.tester .test_block > div.int_group[data-id=' + (i+1) + ']');
      for(var j = 0; j < cur_intere_val; ++j)
      {

        var item = $('<div data-id=' + (j+1) + '>').css({
          'background-image':"url(assets/images/svg/interests/"+ d + ")",
          'left':2*cir_radius*index - cir_radius + cir_offset * (index-1) + start_offset,
          'top':0
        });  
        if(!started && j >= cur_offset && j+map <= intere[i])
        {
          started_pos = j;
          item.attr({'data-mut-startpoint':true,'data-mut-count':map});
          started = true;
        }
        else
        {
          if(started_pos+map-1 == j)
          {
              //item.attr('data-end',true);
              started = false;
          }
        }

        parent.append(item);

        var left = item.position().left;
        var data_left = (index <= medium_point ? centerX - left : left - centerX);
        item.attr({'data-left':data_left, 'data-ileft':data_left});
        ++index;
      }
    }
  });

//spiral_redraw();
function spiral_redraw()
{

    $('.tester div[data-mut-startpoint=true]').each(function(i,d){
       var t = $(d);
       var id = +t.attr('data-id');
       var par = t.parent();
      var mut_count = +t.attr('data-mut-count');
      var mut_cx = (mut_count*cir_radius*2 + (mut_count-1)*cir_offset)/2 + t.position().left;
      t.attr({'data-mut-cx': mut_cx});
      t.attr({'data-mut-distance': mut_cx-t.position().left - cir_radius });
      //console.log(t,id,par,mut_count,mut_cx);
      for(var j = id; j < id + mut_count; ++j)
      {
        console.log(par,j);
        var item = par.find('.div[data-id='+j+']');
        item.animate({'color':'white'},{ duration:1000,
          process:function(a,b,c){
            console.log(b);
          }
        });
        console.log(item.attr('data-left'));
      }
    });
 //  centerX = initCenterX = (interest_count*cir_radius*2+(interest_count-1)*cir_offset)/2 + start_offset; 
 //  var centerDistance = centerX - start_offset - cir_radius;
 // //$('.test_block > div.int_group > div').removeAttr('data-start data-end');

 // $('.test_block > div.int_group > div').each(function(i,d)
 //  {  
 //    var t = $(d);
 //     t.css({  'left':2*cir_radius*(i+1) - cir_radius + cir_offset * i + start_offset, 'top':0 });  
 //      t.attr({'data-left': t.attr('data-ileft') });
 //      t.animate({'color':'white'},{duration:1000,
 //        progress:function(a,b,c){
 //          var th = $(this);  
 //          console.log(th.attr('data-left'));
 //          x = centerX + +th.attr('data-left') * Math.cos(Math.radians(360-360*b + (i+1 <= medium_point ? 180 : 0 )));
 //          y = centerY - +th.attr('data-left') * Math.sin(Math.radians(360-360*b + (i+1 <= medium_point ? 180 : 0 )));
 //          th.attr('data-left',+th.attr('data-ileft')-+th.attr('data-ileft')*b);
 //          th.css({'left':x, 'top':y});
 //          //console.log(x,y);
 //          centerX = initCenterX - centerDistance*b;
 //          //$(circles[cir_medium-1]).attr('cx',centerX);
 //          // $('.static_after circle').each(function(i,d){
 //          //     $(d).attr('cx',+$(d).attr('icx') - +$(d).attr('distance') * b);
 //          //   });
 //        }
 //      });
 //  });          
}
function spiral_redraw1()
{
  centerX = initCenterX = (interest_count*cir_radius*2+(interest_count-1)*cir_offset)/2 + start_offset; 
  var centerDistance = centerX - start_offset - cir_radius;
 //$('.test_block > div.int_group > div').removeAttr('data-start data-end');

 $('.test_block > div.int_group > div').each(function(i,d)
  {  
    var t = $(d);
     t.css({  'left':2*cir_radius*(i+1) - cir_radius + cir_offset * i + start_offset, 'top':0 });  
      t.attr({'data-left': t.attr('data-ileft') });
      t.animate({'color':'white'},{duration:1000,
        progress:function(a,b,c){
          var th = $(this);  
          console.log(th.attr('data-left'));
          x = centerX + +th.attr('data-left') * Math.cos(Math.radians(360-360*b + (i+1 <= medium_point ? 180 : 0 )));
          y = centerY - +th.attr('data-left') * Math.sin(Math.radians(360-360*b + (i+1 <= medium_point ? 180 : 0 )));
          th.attr('data-left',+th.attr('data-ileft')-+th.attr('data-ileft')*b);
          th.css({'left':x, 'top':y});
          //console.log(x,y);
          centerX = initCenterX - centerDistance*b;
          //$(circles[cir_medium-1]).attr('cx',centerX);
          // $('.static_after circle').each(function(i,d){
          //     $(d).attr('cx',+$(d).attr('icx') - +$(d).attr('distance') * b);
          //   });
        }
      });
  });          
}

$('.repeat').on('click', spiral_redraw);
//spiral_redraw();
//

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