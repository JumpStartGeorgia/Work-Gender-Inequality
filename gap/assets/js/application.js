$(document).ready(function(){

  $(document).on('DOMMouseScroll mousewheel', function(e, delta) {

    // do nothing if is already animating
    if($("html,body").is(":animated")) return false;

    // normalize the wheel delta -1 down, 1 up
    delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;

    if(ingame)
    {
      prev_pos = pos;      
      if(delta < 0)
      {
        if(pos < pos_max) ++pos;
      }       
      else
      {
       if(pos > pos_min) --pos;
      }

      if(pos != prev_pos) tick();
    }
    //pos = $(this).scrollTop();  

    // magnetoAnchor.each(function(i){    
    //   if(cp >= magnetoHeights[i]) magnetoIndex = i;           
    // }); 


    // increase the anchor magnetoIndex based on wheel direction
    // magnetoIndex = (magnetoIndex-delta) % (magnetoHeights.length);

    // animate the scrolling if scrolling from header to bottom
    // if(magnetoIndex == 0 && delta < 0)
    // {
    //   $("html,body").stop().animate({
    //       scrollTop: magnetoHeights[1]
    //   }, 1000);
    //   e.preventDefault();        
    // }
  });

  // on resize redraw game   
    $( window ).resize(function() {
      redraw();
    });

  // ***********************************************  
  // init game engine 

    init();

  // ***********************************************  
});


var t = null; // variable for testing
var w = 0; // viewport width
var h = 0; // viewport height
var s = null; // screen jquery object
var i = null; // info jquery object
var pos = 0; // position of life
var pos_min = 0; // years for life
var pos_max = 45; // years until the end
var prev_pos = pos; // previous life step
var divider_height = 6; // screen divider height in px
var curr_date = new Date(); // current date
var start_year = curr_date.getFullYear(); // start year
var end_year = start_year + pos_max; // year to end the game
var prev_year = start_year-1; // previous year
var curr_year = start_year; // current year
var diff_step = 244; // gap difference in $
var fdiff = 0; // female money calculated with diff_step based on current year
var curr_screen = 1; // current screen intro is 1
var cnt_screen = 2; // screens count calculated from sframe array plus 2(intro,epilogue)
var min_age = 18;
var max_age = 60;
var male_max_age = 65;
var female_max_age = 60;

var fade_time = 0; // fade time
var land = 0; // y position for land in each screen part(top, bottom)
var tick_count = 4; // year ticks to show in info bar
var human = 
{
 age : 21,
 height : 100,
 width: 46,
 x:30,
 y:0
}; // human object with basic properties
var user =
{
  gender : 'f',
  age : 0,
  category : 0,
  interest : []
}

var male = human; // male human object
var female = human; // female human object
//flags
var ingame = false; // if you are in game true, else false (intro, epilogue, etc.)

  function init()
  {
    fstart(arguments.callee.name);
    s = $('#screen');
    i = $('#info');
    cnt_screen += sframe.length;
    redraw(); // calculate all dimensions  
    intro();  // play game intro

    fend(arguments.callee.name);
  }
  function redraw()
  {
    fstart(arguments.callee.name);

     w = $(this).width();
     h = $(this).height(); 

    // pos = $(window).scrollTop();  
     log("w:" + w + "/ h:" + h + " / pos:" + pos);

     if(ingame) game();

     fend(arguments.callee.name);
  }
  function game_redraw()
  {
    info();    
    var half = h/2-divider_height/2;
    $("#screen .top").each(function(i,d){ $(d).height(half); });
    $("#screen .divider").each(function(i,d){ $(d).height(divider_height); });
    $("#screen .bottom").each(function(i,d){ $(d).height(half); });
    screen(curr_screen);

    land = half;
    male.y = land - male.height;
    female.y = land - female.height;
  }
  function screen(v)
  {
    cur_screen = v;   
  }
  function nexts(){ screen(++curr_screen); }
  function prevs(){ screen(--curr_screen); } 
  function scr_clean(klass)
  {
    s.empty();
    if(exist(klass)) s.removeClass(klass);
  }
function tick()
{
 fstart(arguments.callee.name);
 prev_year = curr_year;
 curr_year = start_year + pos;

 ticker_tick();
 if(curr_year == end_year) epilogue();

 calculate();

 fend(arguments.callee.name);
}
function calculate()
{
  fdiff = diff_step * pos;
  $('#info .mdiff').text(fdiff);

  male.x = male.x + (curr_year > prev_year ? 10 : -10);
  female.x = female.x + (curr_year > prev_year ? 10 : -10);

  s.find(".m.character").css({ left: male.x });  
  s.find(".f.character").css({ left: female.x });  
}
function intro()
{  
  fstart(arguments.callee.name);

  scr_clean();
  s.toggleClass(sintro.class);
  var t = $('<div class="title">'+sintro.title+'</div>').appendTo(s);

  t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 }).fadeOut(fade_time, "linear", function(){   scr_clean(s.toggleClass(sintro.class)); 
    poll.show(); });
  // ingame = true; tick(); game(); } );
   

  fend(arguments.callee.name);
}
function game()
{
  fstart(arguments.callee.name);

  scr_clean();

  var top = $('<div class="top"></div>').appendTo(s);
  s.append($('<div class="divider"></div>'));
  var bottom = $('<div class="bottom"></div>').appendTo(s);

  var m = $('<div class="m character"></div>').appendTo(top);
  var f = $('<div class="f character"></div>').appendTo(bottom);

  game_redraw();

  m.css({top:male.y}).animate({ left: male.x});
  f.css({top:female.y}).animate({ left: female.x});

  

  fend(arguments.callee.name);
}
function epilogue()
{
  fstart(arguments.callee.name);

  ingame = false;
  scr_clean();
  s.toggleClass(sepilogue.class);
  var t = $('<div class="title">'+sepilogue.title+'</div>').appendTo(s);

  t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 }).fadeIn(fade_time, "linear", function(){  } );

  fend(arguments.callee.name);
}
function info()
{
  i.append($('<div class="male">').append('<span class="mdiff">0</span><div class="piggy_happy"></div>').append());
  i.append($('<div class="y"></div>'));
  i.append($('<div class="female">').append('<span class="fdiff">0</span><div class="piggy_unhappy"></div>').append());      
  ticker_init();
}
function ticker_init()
{
  fstart(arguments.callee.name);

  var ticker = $('#info .y');
  var th = 31;
  var opacity_step = 1 / (tick_count + 1);

  for(var i = tick_count; i > 0; --i)
  {
    var item = $('<div class="prev'+i+' prev"></div>').appendTo(ticker);
    item.append('<div class="year"></div>');
    item.append('<div class="mask"></div>'); 
    var tmp = th*(tick_count-i);
    if(tmp != 0) ++tmp;
    item.css({top:tmp,opacity:1-opacity_step*i});

  }
  ticker.append($('<div class="curr"></div>').append('<div class="year"></div>').append('<div class="mask"></div>').css({top:tick_count*th+1}));

  for(var i = 1; i <= tick_count; ++i)
  {
    var item = $('<div class="next'+i+' next"></div>').appendTo(ticker);
    item.append('<div class="year"></div>');
    item.append('<div class="mask"></div>');   
    var tmp = th*(tick_count+i) + 1;

    item.css({top:tmp,opacity:(1-opacity_step*i)});
  }

  ticker.css({ height: th*(tick_count*2+1)});
  ticker.css({ top: h/2-ticker.height()/2-1});

  ticker_tick();
  fend(arguments.callee.name);
}
function ticker_tick()
{
  var ticker = $('#info .y');
  for(var i = 1; i <= tick_count; ++i)
  {
    var prev = ticker.find('.prev'+i);
    if(curr_year-start_year >= i) prev.show();
    else prev.hide();
    prev.find(".year").text(curr_year-i);


    var next = ticker.find('.next'+i);
    if(end_year - curr_year >= i) next.show();
    else next.hide();
    next.find(".year").text(curr_year+i);
  }
  ticker.find('.curr .year').text(curr_year);
}
function fstart(v) { console.log("< " + v); }
function fend(v) { console.log(v + " >"); }
function log(v) { console.log("\t" + v); }
function exist(v){ return typeof v !== 'undefined' && v !== null && v !== '';}
function age_group(v)
{
  for(var i = 0; i < age_groups.length; ++i)
  {
    if(v >= age_groups[i].min && v <= age_groups[i].max)
      return i+1;
  }
}
function t(v,o){
 v.css(o);
 t = null;
}
function sample()
{
 fstart(arguments.callee.name);
   // code todo
   fend(arguments.callee.name);
 }
// function getData()
// {
//   $.getJSON("assets/js/data.json", function( data ) {  
//     d = data;
//   });
// }
(function($) {
  $.fn.invisible = function() {
    return this.each(function() {
      $(this).css("visibility", "hidden");
    });
  };
  $.fn.visible = function() {
    return this.each(function() {
      $(this).css("visibility", "visible");
    });
  };
}(jQuery));


var poll = {
  ftmp : null,
  mtmp : null,
  show:function show()
  {
    fstart(arguments.callee.name);

    poll.gender();

    fend(arguments.callee.name);
  },
  gender:function gender()
  {
    fstart(arguments.callee.name);

    scr_clean();

    var p = $('<div class="poll"></div>').appendTo(s);
    var gender = $('<div class="gender"></div>').appendTo(p);
    var ftmp = poll.ftmp = $('<div class="fchar"></div>').appendTo(gender);
    var mtmp = poll.mtmp = $('<div class="mchar"></div>').appendTo(gender);

    ftmp.on('click',function(){ 

        ftmp.toggleClass('selected').off('click').animate({ width: 400, height: 400, top: h/2-400/2, left: w/2-400/2},{duration:1000, progress:function(a,b,c)
        {
          tmp_width = ftmp.width();
          tmp_height = ftmp.height();
          ftmp.css("background-size", b*46*4 + "px " + b*100*4+ "px");
          ftmp.css("background-position", (tmp_width*b - b*46*4) + "px " + (tmp_height - tmp_height/1.5*b)+ "px");
      }});

      mtmp.removeClass('selected').off('click').fadeOut(1000,"linear");
    
      poll.age('f');

    });
    mtmp.on('click',function(){ 
      ftmp.removeClass('selected').off('click').fadeOut(1000,"linear");
  max_age = male_max_age;

      mtmp.toggleClass('selected').off('click').animate({ width: 400, height: 400, top: h/2-400/2, left: w/2-400/2},{duration:0, progress:function(a,b,c)
        {
          tmp_width = mtmp.width();
          tmp_height = mtmp.height();
          mtmp.css("background-size", b*46*4 + "px " + b*100*4+ "px");
          mtmp.css("background-position", (tmp_width - tmp_width*b) + "px " + (tmp_height - tmp_height/1.5*b)+ "px");
          //log("start from here");log(a);log(b);log(c);
      },complete:function(){
    
    // age picker
      var ap = $('<svg version="1.1" id="age_picker" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="420px" width="420px" viewBox="0 0 420 420" enable-background="new 0 0 420 420" xml:space="preserve">').css({top: h/2-420/2, left: w/2-400/2}).appendTo(gender);
      var ap_path = '<path fill="none" stroke="#231F20" stroke-miterlimit="10" d="M353.304,57.544c40.734,38.328,66.17,92.732,66.17,153.078c0,60.346-25.435,114.75-66.169,153.077"/>';
      var ap_text = ' <text id="age_counter" x="250" y="150"></text>';
      var ap_knob = '<circle id="age_mover" cx="100" cy="100" r="'+indicatorRadius+'" draggable="true" ondrag="drag(event)" class="age_mover"/>';

        ap.html(ap_path + ap_text + ap_knob);        

        offsetX = ap.offset().left;
        offsetY = ap.offset().top;
        draw_age_mover_by_radian(-rad_max);
        $('#age_mover').draggable();
        $("#age_picker").mousedown(function (e) {
            handleMouseDown(e);
        });
          $("#age_picker").mouseup(function (e) {
            ingame = true; tick(); game();
        });
        
        //draw_age_mover(ap.width() / 2, 1); // just to get started


// <p>Drag the W3Schools image into the rectangle:</p>

// <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
// <br>
// <img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">

      }});
      poll.age('m');
    });

    var margin_between = 100;
    ftmp.css({top:h/2-ftmp.height()/2,left:w/2-margin_between/2-ftmp.width()});
    mtmp.css({top:h/2-mtmp.height()/2,left:w/2+margin_between/2});

    fend(arguments.callee.name);
  },
  age:function age(v)
  {
    fstart(arguments.callee.name);
    user.gender = v;


    // 



    fend(arguments.callee.name);
  },
  category:function category()
  {
    fstart(arguments.callee.name);
    fend(arguments.callee.name);
  },
  interest:function interest()
  {
    fstart(arguments.callee.name);
    fend(arguments.callee.name);
  }  

};







var offsetX;
var offsetY;
//var circleArc = Math.PI * 2;

// drawing design properties
var knobCX = 210;
var knobCY = 210;
var knobR = 210;
var knobC = "green";
var indicatorRadius = 8;
var indicatorColor = "yellow";

var rad_max = 0.815;
var ages = [];
var age_range = 2*rad_max/(max_age-min_age+1);
console.log(age_range);
for(var i = 0; i < max_age-min_age+1; ++i)
{
  ages.push((rad_max - i*age_range).toPrecision(5));
}
ages.push(-rad_max);
log(ages);
function draw_age_mover(mx, my) {


// given mousePosition, what is the nearest point on the knob
  var rads = Math.atan2(my - knobCY, mx - knobCX);

  if(rads>-rad_max && rads < rad_max)
  {
      for(var i = 0; i < max_age-min_age+1; ++i)
      {
        console.log(max_age-min_age);
        if(rads <= ages[i] && rads > ages[i+1])
        {   
          if(ages[i] + rads > rads+ages[i+1]) rads = ages[i+1];
          else rads = ages[i];
          user.age = max_age-i;
           $('#age_counter').text(user.age + "(" +age_group(user.age)+")");
          break;                            

        }
      }

    log(rads);
    var c = Math.cos(rads);
    var s = Math.sin(rads);

    var cx = knobR * c + knobCX;
    var cy = knobR * s + knobCY;
    $(".age_mover").attr("cx",cx).attr("cy",cy);
  }
}
function draw_age_mover_by_radian(rads) {

  $('#age_counter').text(min_age);
  if(rads>=-0.83 && rads <= 0.83)
  {
    var c = Math.cos(rads);
    var s = Math.sin(rads);

    var cx = knobR * c + knobCX;
    var cy = knobR * s + knobCY;
    $(".age_mover").attr("cx",cx).attr("cy",cy);
  }
}
function quadrant(x,y)
{
  if(x>=0 && y>=0) return 1;
  else if(x<0 && y >= 0) return 2;
  else if(x<=0 && y<0) return 3;
  else return 4;
}

function handleMouseDown(e) {
  fstart(arguments.callee.name);

  x = parseInt(e.clientX - offsetX);
  y = parseInt(e.clientY - offsetY);
  draw_age_mover(x, y);

  fend(arguments.callee.name);
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(e) {
  //fstart(arguments.callee.name);

  x = parseInt(e.x - offsetX);
  y = parseInt(e.y - offsetY);
  draw_age_mover(x, y);

  //fend(arguments.callee.name);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}

      // var age_picker = $('<svg id="age_picker" height="200" width="200"><circle cx="100" cy="100" r="100" stroke="black" stroke-width="1" fill="none" /><circle cx="0" cy="0" r="5" stroke="black" stroke-width="1" fill="green" class="age_mover"/></svg>').appendTo(gender);
