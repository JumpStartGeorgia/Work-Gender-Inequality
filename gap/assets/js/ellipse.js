ellipse with bounce
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
    $(circles[1]).attr("fill",'white');
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

   $('.tester ellipse[data-id=2]').animate({'rx': 20},{duration:1500, easing:'easeOutBounce',
          start:function()
          {
             $(this).attr("fill","url(#myLinearGradient1)");
          },
          step:function(a,b)
          {
            $(this).attr('rx',a + 05);
            console.log("--------------------------------------------",a,b);
          },
          // progress:function(a,b,c){
          //   //$(this).attr('rx',20*b+40);
          //  // console.log(a,b,c);
          // },
          complete:function()
          {
            $(this).attr('rx',40);
          }    
        });

}







//--------------------------------------
//circle_redraw();
  function circle_redraw()
  {

    var vl = [50,150,250];
    circles.each(function(i,d){ $(d).attr('cx',vl[i]).attr('rx',40).show(); });
    $(circles[1]).attr("fill",'white');
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
//drawSpiral();
function   drawSpiral() 
{ 
  //   Get   the   canvas   element.      Note   that   the   id   attribute   is   set   to   "canvas". 
  var   canvas   =   document.getElementById("canvasDiv"); 
  var   co   =   canvas.getContext('2d'); 
    co.beginPath();
    co.strokeStyle="red"; 
  //   centre   coordinates 
  var   cx   =   200; 
  var   cy   =   200; 

  var   numIterations=1000; 

        co.moveTo(cx,cy); 
        co.save(); 

  var   x2=cx,y2=cy; 

  //   loop   through   the   iterations 
  for   (var   i=0;i<=numIterations;i++) 
  { 
        var   angle   =   i/10; 
        var   radius   =   angle*2; 

        var   x   =   cx+radius*Math.cos(angle); 
        var   y   =   cy+radius*Math.sin(angle); 

        var   val   =   Math.floor(radius*4); 

        if   (val>255)   val=255; 
        co.strokeStyle='rgb('+(255)+','+val+','+val+')'; 

        co.beginPath(); 
        co.moveTo(x2,y2); 
        co.lineTo(x,y); 
        co.stroke();    

        x2=x; 
        y2=y; 
  } 
       

}

function ellipse()
{
  $('.tester ellipse[data-id=1]').hide();
  $('.tester ellipse[data-id=3]').hide();

   $('.tester ellipse[data-id=2]').animate({'rx': 20},{duration:1500, easing:'easeOutBounce',
          start:function()
          {
             $(this).attr("fill","url(#myLinearGradient1)");
          },
          step:function(a,b)
          {
            $(this).attr('rx',a + 05);
            console.log("--------------------------------------------",a,b);
          },
          // progress:function(a,b,c){
          //   //$(this).attr('rx',20*b+40);
          //  // console.log(a,b,c);
          // },
          complete:function()
          {
            $(this).attr('rx',40);
          }    
        });

}
     <svg height="100" width="100">
      <defs>
    <linearGradient id="myLinearGradient1"
                    x1="0%" y1="0%"
                    x2="100%" y2="0%"
                    spreadMethod="pad">
      <stop offset="0%"   stop-color="red" stop-opacity="1"/>
      <stop offset="100%" stop-color="green" stop-opacity="1"/>
    </linearGradient>
  </defs>
 <g class="static_before" style="width:auto">
      <circle cx="20" cy="250" r="20"  stroke="black" class="circle" data-id="0" stroke-width="1" fill="lightgreen" />
  </g>
  <g class="for_mutation" style="width:auto">
  <circle cx="70" cy="250" r="20"stroke="black" class="circle" data-id="1" stroke-width="1" fill="green" />
  <circle cx="120" cy="250" r="20"  stroke="black" class="circle" data-id="2" stroke-width="1"  fill="red" />
  <circle cx="170" cy="250" r="20"  stroke="black" class="circle" data-id="3" stroke-width="1" fill="white" />
  <circle cx="220" cy="250" r="20"  stroke="black" class="circle" data-id="4" stroke-width="1" fill="purple" />
   <circle cx="270" cy="250" r="20"  stroke="black" class="circle" data-id="5" stroke-width="1" fill="blue" /> 
  </g>
  <g class="static_after" style="width:auto">
      <circle cx="320" cy="250" r="20"  stroke="black" class="circle" data-id="6" stroke-width="1" fill="lightblue" />
  </g>
    <!-- <ellipse cx="50" cy="250" rx="40" ry="40" stroke="black" class="circle" data-id="1" stroke-width="1" fill="green" />
  <ellipse cx="150" cy="250" rx="40" ry="40" stroke="black" class="circle" data-id="2" stroke-width="1"  fill="white" />
  <ellipse cx="250" cy="250" rx="40" ry="40" stroke="black" class="circle" data-id="3" stroke-width="1" fill="red" /> -->
</svg>
<style>
.tester svg
{overflow:visible; position:fixed;}
.tester circle
{
   display:inline-block;
   z-index:7;
}
.tester .repeat 
{
   position:absolute;
   z-index:6;
   top:400px;
}
</style>



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
  //
  //
  var interest_count = 6;
  var interest_icons = ["bag.svg","boat.svg","coconut.svg","compass.svg","credit.svg","directions.svg","earth.svg","passport.svg","photo.svg","place.svg","plane.svg","plate.svg","sun.svg","taxi.svg","wallet.svg"];
$('.repeat').on('click', spiral_redraw);
//spiral_redraw();
var test = $("<div class='test_block'></div>").appendTo('.tester');
test = $('<ul>').appendTo(test);
 interest_icons.forEach(function(d,i){
  if(i<interest_count)
    test.append($("<li>").css('background-image',"url(assets/images/svg/interests/"+ d + ")"));  
 });


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





var centerX = initCenterX = (interest_count*cir_radius*2+(interest_count-1)*cir_offset)/2 + start_offset;
  var centerY = 0;

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


/*
  interest.map(function(d,i){ return d.image;}).forEach(function(d,i){

    if(index<current_interests_count && current_interests[i] > 0 )
    {
      var map = mapper[i];
      var tmp = 0;
      var started = false;
      var started_pos = 0;
      var cur_intere_val = current_interests[i];
      var cur_offset = cur_intere_val % map;

      var parent = $('.tester .test_block > div.int_group[data-id=' + (i+1) + ']');
      for(var j = 0; j < cur_intere_val; ++j)
      {
        var item = $('<div data-id=' + (j+1) + '>').css({
          'background-image':"url(assets/images/svg/interests/"+ d + ")",
          'left':2*interest_w2*index - interest_w2 + interest_offset * (index-1) + interest_start_offset,
          'top':0
        });  
        if(!started && j >= cur_offset && j+map <= current_interests[i])
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
        ++index;
      }
    }
  });
*/

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