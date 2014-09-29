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