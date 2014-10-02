//treasureBox before moving spiral animation away main.js

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
  var mutation_step = [4,4,2,3,3,3];
  var index = 1;
  var current_interests_count = 0;
  current_interests.forEach(function(d,i){current_interests_count+=d;});

  function pedestal_object()
  {
    this.ach = [0,0,0,0,0,0]; // achievements per item in interest
    this.ach_count = this.ach.length;   
    this.mutation = [[],[],[],[],[],[]]; 
    this.mutation_empty = [[],[],[],[],[],[]]; 
    this.mutation_count = 0;

    this.up = function(which,how)
    {
      var zIndex = which++;  // change from zero based
      if(this.inrange(which) && how > 0)
      {
        var from = this.ach[zIndex];
        var parent = $('.tester .treasureB > div.interestB[data-id=' + which + ']');

        var before_which = 0;
        this.ach.forEach(function(d,i){ if(i <= zIndex) before_which += d; });
        //console.log(before_which);
        for(var i = from+1; i <= from+how; ++i)
        {
          var item = $('<div data-id=' + i + '>').addClass('item i' + interest[zIndex].class); 
          //.css({
            //'background-image':"url(assets/images/svg/interests/"+ interest[zIndex].image + ")",
            //'left':0,//interest_w*before_which + interest_offset * before_which + interest_start_offset,
            //'top':0
          //})

          parent.append(item);
        
          //console.log(item.position().left);
          //console.log(item.data());

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
      var test = $("<div class='treasureB'></div>").appendTo('.tester');
      this.ach.forEach(function(d,i){
        test.append('<div class="interestB" data-id="'+(i+1)+'">');
      }); 
    }
    this.mutate = function(which)
    {

      var t = this;        
      var ca = t.ach[which];
      var cm = mutation_step[which];
      var mut_count = Math.floor10(ca/cm);
      var before_which = 0;
      this.ach.forEach(function(d,i){ if(i < which) before_which += d; });
      t.mutation = t.mutation_empty;

      if(mut_count >= 1)
      {

        var looper = mut_count;
        var tmpA = [];
        var tca = ca;        
        var interestBTmp = $('.tester .treasureB .interestB[data-id='+(which+1)+']');
        //console.log(interestBTmp);
        while(looper != 0)
        {
          var from = tca - cm;
          var to = tca;
          var beforeItem = interestBTmp.find('.item[data-id=' + (from++) + ']');
          //console.log(beforeItem);
          var wrapper = $('<div class="mutationB" data-id="'+looper+'"></div>').insertAfter(beforeItem);
          for(var i = from; i <= to; ++i)
          {
            var item = interestBTmp.find('.item[data-id=' + i + ']');
            item.data('ileft',item.position().left - wrapper.position().left); 
            //console.log(item.data());    
            wrapper.append(item.detach());
          }

          var centTmp = Math.floor10(cm/2);

          var cxTmp = centTmp*interest_w + (centTmp-1)*interest_offset + (cm%2==0?interest_offset/2:interest_w2);
          //+ before_which*interest_w + before_which*interest_offset;// - interest_w2;
          //console.log(centTmp,cxTmp);
          var cyTmp = 0;
          var merTmp = tca-cm + Math.ceil10(cm/2) + (cm%2==0 ? 0.5 : 0);
          var fl = Math.floor10(cm/2);
          var even = cm%2==0 ? true : false;
          var distTmp = cxTmp - interest_w2;// = fl*interest_w  + fl*interest_offset - (even ? interest_offset/2 : 0);  //cxTmp - Math.ceil10(cm/2)*interest_w - (Math.ceil10(cm/2)-1)*interest_offset;
          var distForParent = (cm-1)*interest_w + (cm-1)*interest_offset;  
          //console.log(fl,even,(even ? interest_w2 : -interest_w2),fl*interest_offset,interest_offset/2,distTmp);
          tmpA = { mid: looper, from: tca-cm+1, to: tca, cx: cxTmp, cxi: cxTmp, cy: cyTmp, cyi: cyTmp, meridian : merTmp, distance : distTmp, progress : 0, distance_for_parent:distForParent, which: which }; //,
          tca-=cm;
          if(which > 0)
          {
            //console.log("prev distance",t.mutation, which-1, t.mutation[which-1][0].distance_for_parent);
            tmpA.distance_to_child = t.mutation[which-1][0].distance_for_parent;

          }
          t.mutation[which].push(tmpA);
           --looper;
        }    
      }
     // console.log(t.mutation);
    };
    this.play_mutation = function()
    {
      //console.log(mp.mutation);
      var t = this;
      mp.mutation.forEach(function(d,i)
      { 
        if(d.length > 0)
        {
          d.forEach(function(dd,ii)
          {   
            var par = $('.tester .treasureB > div.interestB[data-id='+(i+1)+'] > div.mutationB[data-id=' + dd.mid + ']');
            //console.log(par);
            var par_left = par.position().left;
            for(var j = dd.from; j <= dd.to; ++j)
            {
            //   //console.log(dd.from,dd.to);           
              var item = par.find('div.item[data-id=' + j + ']');
              item.fadeOut(3000); continue;

              var left = item.position().left - par_left;
              //console.log(left,item.position().left,par_left);
              var r = (j <= dd.meridian ? dd.cx - left - interest_w2 : left - dd.cx + interest_w2);
              item.data({'r':r, 'ir':r});
              //console.log(item.data(),left,dd);

              item.animate({"color":"white"},{duration:7000, 
                progress:function(a,b,c){
                  var th = $(this); 
               
                  var less = +th.data('id') <= dd.meridian;
                  var rad = +th.data('r');
                  x = rad * Math.cos(Math.radians(360-360*b + (less ? 180 : 0 )));
                  y = rad * Math.sin(Math.radians(360-360*b + (less ? 180 : 0 )));
// todo here
                    console.log(x,y);
                  var xx = x - (+th.data('ileft')*b);
                  //console.log(th.data('ileft'),rad,2*rad, 2*rad -x,interest_w2,+th.data('ileft') + 2*rad - (2*rad - x) - interest_w2);
                  //dd.cx = th.data('ileft') - dd.distance*b;
                  th.css({'left':xx});//, 'top':y});
                  th.data('r',+th.data('ir')*(1-b));

                  //console.log(x);
                  
                  //console.log(dd.cx);
                  //console.log(dd.cx);
                  //console.log(dd.cxi,dd.distance,dd.distance*b, dd.cx,th.data('r'));   
                  // if(dd.progress < b)
                  // { 
                  //   dd.progress = b;

                  //   //console.log("move all parent to left",b,dd.progress,dd.which,mp.ach_count);
                  //   var str = dd.which;
                  //   for(var ind = dd.which+1; ind <= mp.ach_count; ++ind)  
                  //   {
                  //     var toMoveParent = $('.tester .treasureB > div.interestB[data-id='+(ind+1)+']');
                  //     str += ind + "-";
                  //     for(var ind_i = 1; ind_i <= mp.ach[ind]; ++ind_i)
                  //     {

                  //       var toMove = toMoveParent.find('div[data-id='+ind_i+']');                        
                  //       toMove.css('left', toMove.data('ileft') - dd.distance_to_child*dd.progress);

                  //       str += ind_i + ",";
                  //     }
                  //     str += "\n";
                  //   }
                  //   console.log("move",str);
                  // }
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
  current_interests.forEach(function(d,i){ mp.up(i,d); });
  $('.repeat').on('click', mp.play_mutation);


// var v1 = $('.box .boxA div.item[data-id=1]');
// var v2 = $('.box .boxA div.item[data-id=2]');
// var v3 = $('.box .boxA div.item[data-id=3]');
// var ins = $('<div class="mB"></div>').insertAfter(v1);

// v2=v2.detach();
// v3 = v3.detach();

// ins.append(v2).append(v3);
// //ins.remove();
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





  //css 
  .tester .repeat 
{
   position:absolute;
   z-index:6;
   top:400px;
}

  .treasureB
  {
     width:auto;
     position:fixed;
     left:100px;
     top:100px;
  }
  .treasureB .interestB
  {
     display:inline-block;
     position:relative;
  }
  .treasureB .interestB > div.mutationB
  {
     display:inline-block;
     height:32px;
     overflow:visible;
     white-space: nowrap;
  }
  .treasureB .interestB > div.item,
  .treasureB .interestB > div.mutationB > div.item
  {
     width:32px;
     height:32px;
     display:inline-block;
     margin-left:10px;
     background-size:32px;
     background-repeat:no-repeat;
     background-position:0px;
     position:relative;
     top:0px;
     left:0px;
  }

  .boxA > div.item,.boxA > div.mutationB > div.item { background-color:blue;}
  .boxB > div.item,.boxB > div.mutationB > div.item { background-color:lightblue;}

.ibag
{
  background-image:url("../images/svg/interests/bag.svg");
}
.icoconut
{
  background-image:url("../images/svg/interests/coconut.svg");
}
.icompass
{
  background-image:url("../images/svg/interests/compass.svg");
}
.icredit
{
  background-image:url("../images/svg/interests/credit.svg");
}
.idirections
{
  background-image:url("../images/svg/interests/directions.svg");
}
.iboat
{
  background-image:url("../images/svg/interests/boat.svg");
}