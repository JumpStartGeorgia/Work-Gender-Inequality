var imageLoaderCount = 0;
var imageLoadedCount = 0;
function app_validity_check()
{
  for(var i = 0; i < stages.length; ++i)
  {
    var bk = 0;
    var layer = stages[i].layers;
    imageLoaderCount += layer.length;
    for(var j = 0; j < layer.length; ++j)
    {     
      if(layer[j].type == 1) ++bk;
    }
    if(bk != 1) {
      throw { name: 'FatalError', message: 'Something went badly wrong' };
      console.error('Each stage have only one layer with type 1(background)'); 
    }
  }
}


app_validity_check();
//console.log(imageLoaderCount);

$(document).ready(function(){

  $(document).on('DOMMouseScroll mousewheel', function(e, delta) {

    // do nothing if is already animating
    if($("html,body").is(":animated")) return false;

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

    walk(delta < 0 ? 1 : 0);

    if(func(onscrollafter)) onscrollafter()
  });


  $(window).on("swipeleft",function(){ walk(1); });
  $(window).on("swiperight",function(){ walk(0); });
  // on resize redraw game   
  $( window ).resize(function() { init(); });

  history.replaceState({},'',window.location.href)

  // ***********************************************  
  // init game engine

  init();

  // ***********************************************  

});

// ******************** Variable Declaration *************************** 
// *************************** Flags ***********************************

var ingame = false; // if you are in game true, else false (intro, epilogue, etc.)
var hist = false;

// *************************** Flags End *******************************
var params = {};
var steptogo = 0;
var t = null; // variable for testing
var w = 0; // viewport width
var h = 0; // viewport height
var h2 = 0; // half of height viewport 
var w2 = 0; // half of width viewport 
var s = null; // screen jquery object
var s3 = null; // screen jquery object
var lh = 0; // screen part height, land for character
var curr_date = new Date(); // current date

var timeline = null; // timeline jq pointer
var th = 30; // timeline height in px
var timeline_point = new Date(curr_date.getFullYear(),curr_date.getMonth(),1,0,0,0,0);
var timeline_end_point = new Date();
timeline_end_point.setTime(timeline_point.getTime());
timeline_end_point.setYear(timeline_end_point.getFullYear()+65);

var timeline_points = [timeline_point];

var time_step = "3m"; // increment for on each scroll is 3 months, available formats m:month, y:year
var time_step_number = 3;
var timeline_scale = 0.5; // each time interval will occupy timeline_scale*viewport_width
var timeline_scroll_to_tick_value = 0;
var timeline_scroll_to_tick = 10;
var timeline_scroll_curr_size = 0;

var curr_screen = 1; // current screen intro is 1
var cnt_screen = 2; // screens count calculated from sframe array plus 2(intro,epilogue)
var def_age = 21;
var min_age = 18;
var max_age = 60;
var male_max_age = 65;
var female_max_age = 60;
var onscrollbefore = null;
var onscrollup = null;
var onscrolldown = null;
var onscrollafter = null;
var fade_time = 0; // fade time
var land = 0; // y position for land in each screen part(top, bottom)
var tick_count = 4; // year ticks to show in info bar
var is = false;
var max_salary = 99999;
var current_path_width = 0;
var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
var pathl = 0;
var stage_offset = 0;


function human(selector,title) 
{

  this.title = exist(title) ? title : "Human";
  this.age = 0;
  this.height = 100;
  this.width = 46;
  this.canvas = 200;
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.land = 0;  
  this.selector = selector;
  _tsalary = 0; // total salary
  _tsaved = 0; // total saved
  _stage = [];


  this.position = function position(coord) {
      console.log(current_path_width,this.land,coord);
      var scaleX = current_path_width/100;
      var scaleY = this.land/56;

      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }      
      $(this.selector).css({ left: this.x + stage_offset, top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

      //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
      return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  };

  this.positionXYA = function positionXYA(x,y,a) {
      var scaleX = $(document).width()/100;
      var scaleY = (h2-th/2)/56;

      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }

      $(this.selector).css({ left: this.x, top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

      //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
      return { human:this.title ,x:this.x, y:this.y, a:this.angle };
  };
  this.toground = function toground() 
  {
    var half = (h-th)/2;
    this.land = half;
    this.y = half - this.height;
  };
  
  //setters and getters
  this.__defineGetter__("tsalary", function(){
      return _tsalary;
  });
 
  this.__defineSetter__("tsalary", function(val){
      _tsalary = val;
      if(val > 0)
        $(this.selector).parent().find('.score .tsalary .value').text(val);
  });

this.__defineGetter__("tsaved", function(){
      return _tsaved;
  });
 
  this.__defineSetter__("tsaved", function(val){
      _tsaved = val;
      if(val > 0)
        $(this.selector).parent().find('.score .tsaved .value').text(val);
  });

  this.__defineGetter__("stage", function(){
      return _stage;
  });
 
  this.__defineSetter__("stage", function(val){
      _stage = val;
  });


}; // human object with basic properties

var user =
{
  gender : 'n',
  age : def_age,
  category : null,
  salary : 100,
  interest : null,
  salary_percent : 0
};

var hash_map = [ // for hash build from user object(simplifies creating with loop)
  {"name":"gender","alias":"g","nf":"poll.age"},
  {"name":"age","alias":"a","nf":"poll.category"},
  {"name":"category","alias":"c","nf":"poll.category"},
  {"name":"salary","alias":"s","nf":"poll.interest"},
  {"name":"interest","alias":"i","nf":"poll.interest"},
  {"name":"salary_percent","alias":"p","nf":"play"}
];
var color = {
  'female':'rgb(255,148,248)',
  'male':'rgb(173,210,255)',
  'white':'rgb(255,255,255)',
  'black':'rgb(0,0,0)'
};
var male = new human('.m.character','Male'); // male human object
var female = new human('.f.character','Female'); // female human object


  function init()
  {
    fstart(arguments.callee.name);

    redraw(); // calculate all dimensions 

    params_init();

    s = $('#screen');    
    s3 = d3.select('#screen');    
    cnt_screen += sframe.length;

    intro();  // play game intro and choose where to go based on params poll part or game itself     

    // start preloading data while playing, by stage loading 
    // for each stage collect data, switch flag for stage if not show progress bar 
    // manipulate layers in stage, with positions and points to start and end, transition delay, duration

    fend(arguments.callee.name);
  }
  function loadResources()
  {

  }
  function redraw()
  {
    console.trace();
    fstart(arguments.callee.name);

     w = $(this).width();
     h = $(this).height(); 
     w2 = w/2;
     h2 = h/2; //log("w:" + w + "/ h:" + h);
     lh = (h - th)/2;
    if(ingame) game_redraw();

    fend(arguments.callee.name);
  }
  function game_redraw()
  {      
    var half = (h-th)/2;
    $("#screen .top").each(function(i,d){ $(d).height(half).css('top',0); });
    $("#screen .timeline").each(function(i,d){ $(d).height(th).css('top',h2-th/2); });
    $("#screen .bottom").each(function(i,d){ $(d).height(half).css('top',half+th); });
    screen(curr_screen);

    redraw_human();
    

  }
  function screen(v){ cur_screen = v; }
  function nexts(){ screen(++curr_screen); }
  function prevs(){ screen(--curr_screen); } 
  function scr_clean(klass)
  {
    s.empty();
    if(exist(klass)) s.removeClass(klass);
  }  
  var prev_stage_id = -1;
  var stage_id = -1;
function calculate()
{
  var life = (max_age - user.age) * 12;
  var tickCount = (life / time_step_number) * timeline_scroll_to_tick;
  var lifePercent = (timeline_scroll_to_tick_value*100)/tickCount;
  stage_id = Math.floor10(timeline_scroll_to_tick_value/timeline_scroll_to_tick)%2;
  pathSwitch(stages[stage_id].path);

  if(stage_id != prev_stage_id)
  {
    stage_offset = 0;
    for(var i = 1; i <= stage_id; ++i)
      stage_offset += stages[i].w;  
  }

  //console.log(stage_id);
  var percent = (timeline_scroll_to_tick_value%timeline_scroll_to_tick)*100/timeline_scroll_to_tick;
  var coord = pathCoordinateByPercent(percent);
  

  //var coord = pathCoordinateByPercent(lifePercent*8);
  redraw_human(coord);
}
function walk(v)
{
   if(ingame)
    {        
      if(v==1)
      {  
        if(timeline_scroll_to_tick_value%1==0)
        {
          var stage = $('.stage');
          stage.css('left', stage.position().left-50);
        }
        ++timeline_scroll_to_tick_value;
        var scaler = w*timeline_scale;
        var t1 = (scaler)/timeline_scroll_to_tick * (timeline_scroll_to_tick_value + 1) + w;
       
        var len = timeline_points.length;
         console.log(t1,len*scaler);
        if(t1 > len*scaler) 
        {
          var toadd = Math.round10(t1/(scaler)) + 1 - len;
           timeline_tick(time_step,toadd);
        }
        calculate();
      }
      else 
      {
  

        if(timeline_scroll_to_tick_value > 0)
        {

        if(timeline_scroll_to_tick_value%1==0)
        {
          var stage = $('.stage');
          stage.css('left', stage.position().left+50);
        }


          --timeline_scroll_to_tick_value;      
           calculate();
        }
       
      }
      $('.canvas').css({left:-timeline_scroll_to_tick_value* (w*timeline_scale/timeline_scroll_to_tick)});

    }
}
function redraw_human(v)
{
  if(typeof v === undefined) v = null;
  male.position(v);
  female.position(v);
}
function intro()
{  
  fstart(arguments.callee.name);

  scr_clean();
  s.toggleClass(sintro.class);
  var t = $('<div class="title">'+sintro.title+'</div>').appendTo(s);
  var prg = $('<div id="cont" data-pct="0">'+
                '<svg id="svg" width="120" height="120" viewPort="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
                  '<circle class="bk" r="50" cx="60" cy="60" fill="transparent" stroke-dasharray="314.16"></circle>'+
                  '<circle id="bar" r="50" cx="60" cy="60" fill="transparent" stroke-dasharray="314.16"></circle>'+
                '</svg>'+
              '</div>').appendTo(s);  
  intro_fade();

  fend(arguments.callee.name);
}
function intro_fade()
{
    var t = $('.title');
    t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 }).fadeOut(fade_time, "linear", function(){
    scr_clean(s.toggleClass(sintro.class)); 
 
    if(steptogo < 6) 
      poll.show();
    else 
    {
      play();
    }
  });
}

function gameon() { ingame = true; }
function gameoff() { ingame = false; }
function play() { gameon(); game(); }
function game()
{
  fstart(arguments.callee.name);

  scr_clean();

  var top = $('<div class="top"></div>').appendTo(s);
  var top_score = $('<div class="top-score score"><div class="tsalary"><div class="label">Total Salary:&nbsp;</div><div class="value">30</div></div>'+
    '<div class="tsaved"><div class="label">&nbsp;|&nbsp;Total Saved:&nbsp;</div><div class="value">30</div></div></div>').appendTo(top);  
  top_score.css({ left: w-top_score.width()-30});  

  top.append('<div class="stage"></div>');

  top_stage_draw();

  timeline = $('<div class="timeline"><div class="canvas"></div></div>').appendTo(s);
  timeline = timeline.find('.canvas');
  timeline_tick(time_step);

  var bottom = $('<div class="bottom"></div>').appendTo(s);
  var bottom_score = $('<div class="bottom-score score"><div class="tsalary"><div class="label">Total Salary:&nbsp;</div><div class="value">30</div></div>'+
    '<div class="tsaved"><div class="label">&nbsp;|&nbsp;Total Saved:&nbsp;</div><div class="value">30</div></div></div>').appendTo(bottom);
  bottom_score.css({ left: w-bottom_score.width()-30, top: lh + th + 20});

  var m = $('<div class="m character"></div>').appendTo(top);
  var f = $('<div class="f character"></div>').appendTo(bottom);
  
  male.toground();
  female.toground();
  game_redraw();



  fend(arguments.callee.name);
}
   var bk_offset = 0;
   var bk_offset_prev = 0;
   var last_image_width = 0;
   var stage_index = 0;
   var layer_index = 0;
  // var new_stage = true;
   var stage_first = true;
var img_scaler = 1;
function top_stage_draw()
{

  var tmp = null; 
  var top = $('.top .stage');

  var layers = stages[stage_index].layers; 

  if(layer_index == layers.length && stage_index+1==stages.length) { current_path_width = $('.stage-id-1 .layer.1 img').width(); return;}

    //console.log(layers,layer_index,stage_index,stages.length);  
    //console.log('layer_index',layer_index, 'layers.length',layers.length, 'stage_index',stage_index, 'stage.length',stages.length);
    //console.log(stage_first , (layer_index == layers.length ),  stage_index != stages.length , stage_index <= stages.length-1);

  if(stage_first || (layer_index == layers.length && stage_index <= stages.length-1))
  {      

    if(!stage_first) ++stage_index;
    layer_index = 0;
    //console.log(stages,stage_index);
    layers =  stages[stage_index].layers;     
    $('<div class="stage-id-'+(stage_index+1)+'"></div>').appendTo(top) ;  
    stage_first = false;
  }
  var stage_id = '.stage-id-'+(stage_index+1);
  tmp = $(stage_id);

  var li = layer_index;
  ++layer_index;
  var l = layers[li];
  l.i = li+1;

  var img = $('<img src="'+l.image+'"/>');
  tmp.append($('<div class="layer '+(li+1)+'"></div>').css('z-index',(exist(l.z) ? l.z : 20)).append(img));
  img.data(l);

  img.load((exist(l.bk) && l.bk) ? image_background : image_object);

};
function image_background()
{
    var img = $(this);
    var init_img_height = img.height();

    bk_offset+=bk_offset_prev;        
    var l = img.data();
    console.log(l);
    //console.log(img,img.length,"asdfsdf",bk_offset_prev,bk_offset,(bk_offset + v.position.x*w/100), v.position.y*lh/100 );

    img.css({ 
      height:lh, 
      left: (bk_offset + l.position.x*w/100),
      top:l.position.y*lh/100 
    });
    last_image_width=bk_offset_prev=img.width();     

    img_scaler =  img.height() / init_img_height ;
    stages[stage_index].w = img.width();

  ++imageLoadedCount;  
  progress(Math.ceil10(imageLoadedCount*100/imageLoaderCount));

  top_stage_draw();
}
function image_object()
{
  var img = $(this);
  var l = img.data();

  var wtmp = (exist(l.fullscreen) && l.fullscreen) ? w : last_image_width;      
  img.css({ height:img.height()*img_scaler });
  img.css({ 
    left:bk_offset + l.position.x*wtmp/100,
    top: Math.abs(l.position.y*lh/100 - img.height()) });

  ++imageLoadedCount;
  progress(Math.ceil10(imageLoadedCount*100/imageLoaderCount));
  //console.log(Math.ceil10(imageLoadedCount*100/imageLoaderCount));

  top_stage_draw();
}
        //$(this).css({ transform:"scale(" + t1 + "," + t2 + ")"
     // });

function timeline_tick(v,n)
{
  if(exist(v))
  {    
    if(typeof v === "number") v = Math.round10(v);
    if(typeof v === "string" && v.length >= 2 && v.match(/[my]/g).length == 1) 
    {
      if(v.indexOf('m') != -1) 
      {
        v = v.replace('m','');
        if(isNumberWithSign(v)) v=+v;
      }
      else if(v.indexOf('y') != -1)
      {
        v = v.replace('y','');
        if(isNumberWithSign(v)) v=+v*12; 
      }
    }
    if(isNumberWithSign(v)) 
    {
      //var point = $('.point-in-time');
      //var curTimeString = point.attr('data-time');
      for(var i = 0; i < n; ++i)
      {
        var curTime = new Date();
        size = timeline_points.length;
        curTime.setTime(timeline_points[size-1].getTime());

        curTime.setMonth(curTime.getMonth() + v);

        if(curTime > timeline_end_point) epilogue();

        timeline_point = curTime;
        timeline_points.push(curTime);  
      }
      timeline_point_draw(v);  
    }
    else console.log("timeline step is incorrect");  
  }
}
var prevPositionLeft = 0;
var prevPosition = 0;
function timeline_point_draw(v)
{
  var startOffset = w/2;
  var offset = w*timeline_scale;
  timeline_points.forEach(function(d,i){
    if(!timeline.find('.point-in-time[data-time=' + d.getTime() + ']').length)
    {
      var point = $('<div class="point-in-time" data-time="'+ d.getTime()+'"><div class="point">'+getMonthS(d)+ " " + d.getFullYear() + '</div><div class="mask"></div></div>').appendTo(timeline);
      point.css({heigth:th,line_height:th});
      if(i == 0) 
      { 
        prevPosition = startOffset;
        prevPositionLeft = startOffset - point.width()/2;
        point.css({left: prevPositionLeft });
      }
      else 
      {       
        prevPosition += offset;
        prevPositionLeft = prevPosition - point.width()/2;
        point.css({left: prevPositionLeft });    
      }
      
      var ticks = v;//monthDiff(timeline_points[i],timeline_points[i-1]);
      var scaler = w*timeline_scale/ticks;
      for(var j = 0; j < ticks-1; ++j)
      {
         $('<div class="serif"></div>').css({ left: prevPosition+(j+1)*scaler,heigth:th,line_height:th }).appendTo(timeline);        
      }

      point.find('.point').text(getMonthS(d) + " " + d.getFullYear());    
      point.attr('data-time',d.getTime());
    }
  });
  timeline.css({width:timeline_points.length*w});

}
function epilogue()
{
  fstart(arguments.callee.name);

  gameoff();
  scr_clean();
  s.toggleClass(sepilogue.class);
  var t = $('<div class="title">'+sepilogue.title+'</div>').appendTo(s);

  t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 }).fadeIn(fade_time, "linear", function(){  } );

  fend(arguments.callee.name);
}


/***************************************************************
                  Utility Functions
***************************************************************/
function fstart(v) { console.time(v); console.log("< " + v); }
function fend(v) { console.timeEnd(v); console.log(v + " >");  }
function log(v) { console.log("\t" + v); }
function tt(){ console.log("------------------test-------------------"); }
function exist(v) { return typeof v !== 'undefined' && v !== null && v !== '';}
function empty() {log('empty');};
function m(){ user.gender = 'm'; max_age = male_max_age; }
function f(){ user.gender = 'f'; max_age = female_max_age;  }
function g(v) { return user.gender; }
function gender(v) { v=='m' ? m() : f(); }
function ism(){ return user.gender=='m' }
function isf(){ return user.gender=='f' }
var func = jQuery.isFunction;
function quadrant(x,y)
{
  if(x>=0 && y>=0) return 1;
  else if(x<0 && y >= 0) return 2;
  else if(x<=0 && y<0) return 3;
  else return 4;
}
function degree_from_radian(rad)
{
  return (rad/Math.PI*180) + (rad > 0 ? 0 : 360);
}
function sample()
{
  fstart(arguments.callee.name);
  // code todo
  fend(arguments.callee.name);
} 
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
/***************************************************************
                  Utility Functions End
***************************************************************/
/***************************************************************
                  General Functions
***************************************************************/
function agegroup_by_age(v)
{
  for(var i = 0; i < age_groups.length; ++i)
  {
    if(v >= age_groups[i].min && v <= age_groups[i].max)
      return i+1;
  }
}
function params_init()
{
  var hash = window.location.hash.trimLeft('#'); 
  params = {}; 
  steptogo = 0;
  if(exist(hash))
  {
    if(hash[0]=='#') hash=hash.substr(1);
    var ahash = hash.split("&");
    for(var i = 0; i < ahash.length; ++i)
    {
      
      var kv = ahash[i].split("=");
      if(kv.length==2)
      {
        params[kv[0]] = isDecimal(kv[1]) ? +kv[1] : kv[1];      
      }
    }
    params_validate();
  } 
}
function params_validate()
{
  if(steptogo == 0 && exist(params.g) && (params.g=="f" || params.g=="m"))
  {  
    steptogo = 1;   
    gender(params.g);
  }
  if(steptogo == 1 && exist(params.a) && params.a >= min_age && 
      ((params.g=="f" && params.a <= female_max_age) || (params.g=="m" && params.a <= male_max_age)))
  {
    steptogo = 2;
    user.age = params.a;
  }
  if(steptogo == 2 && exist(params.c) && cat_ids.indexOf(params.c)!=-1)
  {
    steptogo = 3;
    user.category = params.c;
  }
  if(steptogo == 3 && exist(params.s) && isNumber(params.s) && params.s > 0 && params.s <= max_salary)
  {   
      steptogo = 4;
      user.salary = params.s;
  }
  if(steptogo == 4 && exist(params.i) && int_ids.indexOf(params.i)!=-1)
  {
    steptogo = 5;
    user.interest = params.i;
  }
  if(steptogo == 5 && exist(params.p) && isNumber(params.p) && params.p >= 0 && params.p <= 100)
  {   
      steptogo = 6;
      user.salary_percent = params.p;
  }
}
function params_set(v)
{
  if(exist(v) && v > 0 && v <= 6) steptogo = v;
  var hash = "";
  if(steptogo > 0 && steptogo <= 6)
  {
    for(var i = 0; i < steptogo; ++i)
      hash+= "&" + hash_map[i].alias + "=" + user[hash_map[i].name];
    if(hash[0]=='&') hash=hash.substr(1);
    // if(window.location.hash != hash)
    //   window.location.hash = hash; 
    if(!hist) history.pushState({'hash':hash},'',window.location.pathname + "#" + hash);
  }  
}
window.onpopstate = function(e){
    if(e.state !== null) 
    { 
       hist = true;       
       init();   
       hist = false;
    } 
    //else { // no state data availableload initial page which was there at first page load }
}
/***************************************************************
                  General Functions End
***************************************************************/
/***************************************************************
                  Poll Part Start
***************************************************************/

var poll = {
  p : null,
  stage :null,
  stage_d3 :null,
  ftmp : null,
  mtmp : null,
  previous_scroll_time : 0,
  knobCX : 210,
  knobCY : 210,
  knobR : 210,
  knobC : "green",
  indicatorRadius : 8,
  degrees_male : [1,47,313], // first and last point in degrees for male , 1 means invert arc 
  degrees_female : [0,133,227], // first and last point in degrees for male , 0 means general arc
  degrees : null,
  degree_steps : [],
  degree_step : 0,
  next_function : null,
  npicker_function : null,
  stage_size:400,
  stage_size2: 0,  
  stage_w: 400,
  stage_h: 400,
  npicker_sal_size:5,
  show:function show()
  {
    fstart(arguments.callee.name);
    poll.stage_size2 = poll.stage_size/2;

    scr_clean();
    this.init();
    this.show_thumbnails();
    if(steptogo == 0)
      this.gender();
    else 
    {
      poll.draw_character();
      fn(hash_map[steptogo-1].nf);      
    };
  
    this.create_next_button();

    fend(arguments.callee.name);
  },
  init:function init()
  {    
    fstart(arguments.callee.name);

    s3.append('div')
      .classed('poll',true)
        .selectAll('div')
        .data(['poll-label','stage'])
        .enter()
        .append('div')
        .attr('class',function(d){return d;});

    this.stage = s.find('.stage');
    this.stage_d3 = s3.select('.stage');

    fend(arguments.callee.name);
  },
  add_layer:function add_layer()
  {
    fstart(arguments.callee.name);

    poll.stage_d3.select('.character').style('background-color','transparent');
    poll.stage_d3.insert('svg','.character')
      .classed({'stage-bk':true,'abs':true})
      .style({width: poll.stage_w+2, height: poll.stage_h+2, top: h/2-poll.stage_h/2+1, left: w/2-poll.stage_w/2+1})
      .append("circle")
        .classed('bk',true)
        .attr({"cx":poll.stage_w/2+1,"cy":poll.stage_h/2+1,"r":poll.stage_w/2});
    poll.stage_d3.insert('div').classed('poll-sub-label abs',true);

    fend(arguments.callee.name);
  },
  draw_character:function draw_character()
  {     
    $('.poll').addClass(g());
    $('<div class="'+g()+'char character" title="Female"></div>').appendTo(this.stage);
    poll.add_layer();
             
    var b = isf();
    var ch = document.getElementsByClassName("character")[0];
    var chh = ch.clientHeight;
    var chw = ch.clientWidth;
    var ch = s3.select('.character')
      .style(
      {
              'width': poll.stage_w + "px",
              'height': poll.stage_h + "px",
              'top': h/2-poll.stage_h/2 + "px",
              'left': w/2-poll.stage_w/2 + "px",
              'background-size': 46*4 + "px " + 100*4+ "px",
              'background-position': (b ? (poll.stage_w-chw) : (chw - 46*4)) + "px " + (chh - chh/1.5)+ "px"
      });  
  },
  character_picked:function character_picked() // v selected gender, o oposite
  {
      is = true;   
      var opts = { width: poll.stage_w, height: poll.stage_h, top: h/2-poll.stage_h/2, left: w/2-poll.stage_w/2};
      var bool = isf();
      var ch = bool ? 'fcharh' : 'mcharh';
      var picked = bool ? $('.fchar') : $('.mchar');
      var other =  bool ? $('.mchar') : $('.fchar');

      other.removeClass('selected').fadeOut(1000,"linear",function(){this.remove();});
      picked.addClass('selected').removeClass('b')
        .animate(opts,
          { duration:1000, 
            progress:function(a,b,c)
            {             
                tmp_width = picked.width();
                tmp_height = picked.height();
                $(this).css("background-size", b*46*4 + "px " + b*100*4+ "px");
                $(this).css("background-position", 
                (bool 
                ? (tmp_width*b - b*46*4) + "px " + (tmp_height - tmp_height/1.5*b)+ "px"
                : (tmp_width - tmp_width*b) + "px " + (tmp_height - tmp_height/1.5*b)+ "px"));
            },
            complete:function()
            {
              $(this).removeClass('selected ' + ch);
              console.log('selected ' + ch);
              poll.add_layer('selected ' + ch);
              poll.age();
              is = false;
            }
          });
  },
  gender:function gender()
  {
    fstart(arguments.callee.name);

    this.label("Choose Gender"); 
    
    var margin_between = 100;

    var ftmp = poll.stage_d3.append('div').classed("fchar fcharh character b", true).attr('title','Female')
      .style({top:h/2-male.canvas/2 + "px",left:w/2-margin_between/2-male.canvas+ "px"})
      .on('click',function(){ f(); poll.character_picked(); d3.select(this).on('click', null); });
    var mtmp = poll.stage_d3.append('div').classed("mchar mcharh character b", true).attr('title','Male')
      .style({top:h/2-male.canvas/2 + "px",left:w/2 + margin_between/2 + "px"})
      .on('click',function(){ m(); poll.character_picked(); d3.select(this).on('click', null); });

    onscrollafter = function(){ 

      if(ftmp.classed('selected'))
      {
        ftmp.classed('selected',false);
        mtmp.classed('selected',true);
        m();
      }
      else if(mtmp.classed('selected'))
      {
        mtmp.classed('selected',false);
        ftmp.classed('selected',true);
        f();
      }
      else 
      {
        ftmp.classed('selected',true);
        f();
      }     
    };

    poll.next_function = function(){ 
      if(!is)
      {
        if(g() != "n") 
        {       
          if(isf()) poll.stage_d3.select('.fchar').on('click')();
          else poll.stage_d3.select('.mchar').on('click')();  
        } 
        else 
        {
          switchStyle('.mchar',1000,500,'sin-in','sin-out','background-color',color.female,color.white);
          switchStyle('.fchar',1000,500,'sin-in','sin-out','background-color',color.male,color.white);        
        }
      }
    };

    fend(arguments.callee.name);
  },
  age:function age()
  {
    fstart(arguments.callee.name);

    onscrollafter = null;  

    poll.label("Choose the Age"); 

    params_set(1);    
    
    s3.select('.poll').classed(g(),true);

    poll.next_function = function()
    {
      onscrolldown = null;
      onscrollup = null;
      $(document).off('mousedown');
      $('.age-mover').draggable('destroy');    
      poll.stage_d3.select('.age-picker').remove();
      

      poll.category(); 
    };

    poll.age_picker_show();

    fend(arguments.callee.name);
  },
  category:function category()
  {
    fstart(arguments.callee.name);

    poll.label("Choose Category"); 

    params_set(2); 

    user.category = user.category == null ? cat_ids[0] : user.category;
    poll.npicker_function = null;
    poll.next_function = function(){

      onscrolldown = null;
      onscrollup = null;
      user.salary = poll.category_salary();
      poll.stage_d3.select('.category-picker').remove();
      poll.stage_d3.select('.salary-picker').remove();

      poll.interest();
    };

    poll.category_picker_show();

    fend(arguments.callee.name);
  },
  interest:function interest()
  {
    fstart(arguments.callee.name);

    poll.label("Choose Interest");

    params_set(4); 

    user.interest = user.interest == null ? int_ids[0] : user.interest;

    poll.next_function = function(){

      onscrolldown = null;
      onscrollup = null;
      poll.npicker_function = null;
      $('.character').off();
      poll.stage_d3.select('.interest-picker').remove();
      poll.stage_d3.select('.percent-picker').remove();
      params_set(6); 

      play(); console.log(user);
      
    };
    poll.interest_picker_show();

    fend(arguments.callee.name);
  }, 
  category_picker_show:function category_picker_show()
  {
    fstart(arguments.callee.name);

    var outer_radius = 280;
    var cat_radius = 30;
    var size = cat_radius*2; 
    var cat_step = 360/category.length;

    var picker = poll.stage_d3.append('div').classed("category-picker",true);

    poll.npicker_create('.stage','.salary-picker',99999,poll.npicker_sal_size,h2,(w2+(isf()?-180:0)),user.salary);

    var pick_items = picker
    .selectAll("svg")
    .data(category)
    .enter()
    .append("svg")
    .attr("class",function(d){return "category_item " + g(); }) 
    .attr("id",function(d){return "c"+d.id;})   
    .attr({"width":size, "height":size})
    .style("top",function(d,i){ return h2 + (outer_radius) * Math.sin(Math.radians(i*cat_step)) - cat_radius })
    .style("left",function(d,i){ return w2 - (outer_radius) * Math.cos(Math.radians(i*cat_step)) - cat_radius;})
    .on('click',function(d){ poll.by_category(d.id);});

    pick_items.append("circle").attr({"cx":cat_radius,"cy":cat_radius,"r":cat_radius});
    pick_items.append("text").text(function(d){return d.name.substr(0,4);}).attr({x:12,y:35});

    poll.sublabel(picker.select('.category_item').classed('selected',true).select('text').text());


    onscrollup=function(){ poll.category_down(); };
    onscrolldown=function(){ poll.category_up(); };

    fend(arguments.callee.name);
  },  
  category_draw:function category_draw()
  {
    fstart(arguments.callee.name);
    d3.selectAll('.category-picker .category_item').classed('selected',false); 
    poll.sublabel(d3.select('.category-picker .category_item#c'+user.category).classed('selected',true).select('text').text()); 

    fend(arguments.callee.name);   
  },
  category_up:function category_up()
  {
    fstart(arguments.callee.name); 

    var ind = cat_ids.indexOf(user.category);
    if(ind != -1)
    {
      user.category = ind < category.length-1 ? cat_ids[ind+1] : cat_ids[0];
    }
    this.category_draw();   
    fend(arguments.callee.name); 
  }, 
  category_down:function category_down()
  {
    fstart(arguments.callee.name);     
    var ind = cat_ids.indexOf(user.category);
    if(ind != -1)
    {
      user.category =  ind > 0 ? cat_ids[ind-1] : cat_ids[category.length-1];
    }
    this.category_draw();
    fend(arguments.callee.name);
  },
  by_category:function by_category(v)
  {        
    fstart(arguments.callee.name);   
    if(user.category != v)
    {
      user.category = v;        
      this.category_draw();
    }
    fend(arguments.callee.name);
  },
  category_salary:function category_salary(v)
  {
    if(exist(v)) poll.npicker_set('.salary-picker',v,poll.npicker_sal_size);
    else return poll.npicker_get('.salary-picker.npicker',poll.npicker_sal_size);
  },
  age_picker_show:function age_picker_show()
  {
    fstart(arguments.callee.name);

    var ap = this.stage_d3
      .append('svg')
        .attr({'class':g()+ ' age-picker'})
        .style({
          'x':'0px', 'y':'0px', 'height':'420px', 'width':'420px', 
          'top': h/2-420/2, left: w/2-420/2});
    ap.append('path')
      .attr({'fill':'none', 'stroke':'#231F20','stroke-miterlimit':'10',
         'd':(isf() ? 'M66.726,363.473c-40.734-38.326-66.17-92.732-66.17-153.076c0-60.347,25.435-114.751,66.169-153.078'
                    : 'M353.304,57.544c40.734,38.328,66.17,92.732,66.17,153.078c0,60.346-25.435,114.75-66.169,153.077') });
    ap.append('circle')
      .attr({'class':'age-mover',
             'cx':'0', 'cy':'0', 'r':poll.indicatorRadius,
             'draggable':'true','ondrag':'poll.drag_age(event)'});      


    var diff = max_age-min_age;

    if(ism()) poll.degrees = poll.degrees_male;
    else poll.degrees = poll.degrees_female;
    

    var degree_sum = 0;
    if(poll.degrees[0] == 0) degree_sum = (poll.degrees[2]-poll.degrees[1]);
    else degree_sum = poll.degrees[1] + 360 - poll.degrees[2];
    poll.degree_step = degree_sum / diff;
    for(var i = 0; i <= diff; ++i)
    {
      if(poll.degrees[0] == 0)
      {            
        poll.degree_steps.push(poll.degrees[1] + (i)*poll.degree_step);            
      }
      else
      {
        poll.degree_steps.push(poll.degrees[1] - (diff-i)*poll.degree_step);       
      }
    }           

    $('.age-mover').draggable();

      $(document).on('mousedown',function (e) {
          poll.agemousedown(e);
      });

    onscrollup = function(){ poll.age_up(); };
    onscrolldown = function(){ poll.age_down(); };

    poll.by_age(user.age);

    fend(arguments.callee.name);
  },
  age_check:function age_check()
  {     
    fstart(arguments.callee.name); 
      if(user.age<min_age) user.age = min_age;
      else if(user.age>max_age) user.age = max_age;   
    fend(arguments.callee.name);
  },
  age_up:function age_up()
  {
    fstart(arguments.callee.name); 
    this.age_check();
    if(user.age<max_age) ++user.age;
    this.agepicker_draw();  
    fend(arguments.callee.name);  
  }, 
  age_down:function age_down()
  {
    fstart(arguments.callee.name); 
    this.age_check();
    if(user.age>min_age) --user.age;
    this.agepicker_draw();
    fend(arguments.callee.name);
  },
  by_age:function by_age(v)
  {      
    fstart(arguments.callee.name);   

    user.age = v;        
    this.age_check();
    this.agepicker_draw();

    fend(arguments.callee.name);
  },
  agepicker_draw:function agepicker_draw()
  {
    fstart(arguments.callee.name); 
    var rad = this.get_radian_by_age(user.age);
   
      var c = Math.cos(rad);
      var s = Math.sin(rad);

      var cx = this.knobR * c + this.knobCX;
      var cy = this.knobCY - this.knobR * s;      
      $(".age-mover").attr("cx",cx).attr("cy",cy);
      poll.sublabel(user.age + "(" +agegroup_by_age(user.age)+")");

    fend(arguments.callee.name);
  },
  agepicker_age_by_coord:function agepicker_age_by_coord(x, y){
    fstart(arguments.callee.name); 
    // given mousePosition, what is the nearest point on the knob
    // result = atan2 (y,x) * 180 / PI;
    var rad = Math.atan2(y,x);
    var degree = Math.degrees(rad);//degree_from_radian(Math.atan2(y,x)); //rad * 180 / PI;
    if(degree < 0 ) degree = 360 + degree;
      
        var inside = false;
        for(var i = 0; i <= max_age-min_age; ++i)
        {
          var d1 = (360+this.degree_steps[i])%360;
          var d2 = (360+this.degree_steps[i+1])%360;
          //console.log(d1,degree,d2);
          if(poll.degrees[0]==0)
          {
              if(degree >= this.degree_steps[i] && degree < this.degree_steps[i+1])
              {   
                var index = i;      
                if(degree-this.degree_steps[i] > this.degree_steps[i+1]-degree) ++index;
                this.by_age(min_age+index);  
                inside = true;
              }
          }
          else
          {
            if(same_sign(this.degree_steps[i],this.degree_steps[i+1]))
            {
              if(degree >= d1 && degree < d2)
              {   
                var index = i;      
                if(degree-d1 > d2-degree) ++index;
                this.by_age(max_age-index);  
                inside = true;
              }
            }
            else
            {
              if((degree >= d1 && degree < 360)||(degree >= 0 && degree < d2))
              {   
                var index = i;      
                if(degree >= 0 && degree < d2) ++index;
                this.by_age(max_age-index);  
                inside = true;
              }             
            }
          }
        }      
        if(!inside)
        {
          var d1 = (360+this.degrees[1])%360;
          var d2 = (360+this.degrees[2])%360;
          if(this.degrees[0]==0)
          {            
            this.by_age((degree < d1 ? min_age : max_age));
          }
          else 
          {        
            this.by_age((degree-this.degrees[1]<this.degrees[2]-degree ? min_age : max_age));
          }
          fend(arguments.callee.name);
        }
  },
  get_degree_by_age:function get_degree_by_age(v)
  {
    fstart(arguments.callee.name); 

    var tmp = (v>=min_age && v<=max_age) ? this.degree_steps[v-min_age] : this.degrees[1];
    if(tmp < 0) tmp = 360 + tmp;   

    fend(arguments.callee.name);   

    return tmp;
  },
  get_radian_by_age:function get_radian_by_age(v)
  {   
    fstart(arguments.callee.name); 

    var index = v-min_age; 
    //console.log(v, index,max_age-min_age,v-min_age);
    if(poll.degrees[0] == 1)  index = max_age-min_age-(v-min_age);
    //console.log(index);

    var tmp = (v>=min_age && v<=max_age) ?  this.degree_steps[index] : this.degrees[1];
    if(tmp < 0) tmp = 360 + tmp; 

    fend(arguments.callee.name);

    return Math.radians(tmp);
  },
  drag_age:function drag_age(e) {

    fstart(arguments.callee.name); 

    var x = parseInt(e.x-w2);
    var y = parseInt(h2-e.y);
    this.agepicker_age_by_coord(x, y);

    fend(arguments.callee.name);
  },
  agemousedown:function agemousedown(e) {

    var x = parseInt(e.clientX-w2);
    var y = parseInt(h2-e.clientY);
    this.agepicker_age_by_coord(x, y);
  },
  interest_picker_show:function interest_picker_show()
  {
    fstart(arguments.callee.name);

    var outer_radius = 280;
    var item_radius = 30;
    var size = item_radius*2; 
    var item_step = 360/interest.length;
    poll.stage_d3.select('.character').attr('data-percent',user.salary_percent);
    var picker = poll.stage_d3.append('div').classed('interest_picker',true);
    

    var pick_items = picker
    .selectAll("svg")
    .data(interest)
    .enter()
    .append("svg")
    .attr("class",function(d){return "interest_item " + g(); }) 
    .attr("id",function(d){return "i"+d.id;})   
    .attr({"width":size, "height":size})
    .style("top",function(d,i){ return h2 + (outer_radius) * Math.sin(Math.radians(i*item_step)) - item_radius })
    .style("left",function(d,i){ return w2 - (outer_radius) * Math.cos(Math.radians(i*item_step)) - item_radius;})
    .on('click',function(d){ poll.by_interest(d.id);});

    poll.stage_d3.select('.stage-bk').append('defs').append('clipPath').attr('id','clip-mask').append('rect').attr({'width':poll.stage_w+20,'height':poll.stage_h+20,'x':0,'y':poll.stage_h+2});
    poll.stage_d3.select('.stage-bk').append("circle").classed('mask',true).attr({"cx":poll.stage_w/2+1,"cy":poll.stage_h/2+1,"r":poll.stage_h/2 , "clip-path":'url(#clip-mask)'});    

    pick_items.append("circle").attr({"cx":item_radius,"cy":item_radius,"r":item_radius});
    pick_items.append("text").text(function(d){return d.name.substr(0,4);}).attr({x:12,y:35});

    poll.sublabel(picker.select('.interest_item').classed('selected',true).select('text').text());


   poll.npicker_function = function(v){ v=+v; 
      if(user.salary >= v) {
        user.salary_percent = Math.round10((v*100)/user.salary);
        poll.stage_d3.select('.character').attr('data-percent',user.salary_percent);
        poll.sublabel(poll.stage_d3.select('.interest_picker .interest_item#i'+user.interest+'.selected text').text() + " (" + user.salary_percent + "%)");         
        poll.interest_percent_draw((v*100)/user.salary/100);
      }  
    }

    poll.npicker_create('.stage','.percent_picker',user.salary,poll.npicker_sal_size,h2,(w2+(isf()?-180:0)),0);

    poll.stage.find(".character").on('DOMMouseScroll mousewheel', function(e, delta) {
      var tval = +$('.character').attr('data-percent');

      if(up(e,delta)) { if(tval < 100) ++tval; }
      else { if(tval > 0) --tval; }

      $('.character').attr('data-percent',tval);

      poll.interest_percent_draw(tval/100);
      user.salary_percent = tval;
      
      poll.npicker_set('.percent_picker',Math.round10(user.salary*tval/100),poll.npicker_sal_size);      
      e.stopPropagation();  
    });

    onscrollup=function(){ poll.interest_down(); };
    onscrolldown=function(){ poll.interest_up(); };

    fend(arguments.callee.name);
  },
  interest_draw:function interest_draw()
  {
    fstart(arguments.callee.name);

    d3.selectAll('.interest_picker .interest_item').classed('selected',false); 
    poll.sublabel(d3.select('.interest_picker .interest_item#i'+user.interest).classed('selected',true).select('text').text() + " (" +user.salary_percent + "%)"); 

    fend(arguments.callee.name);   
  },
  interest_up:function interest_up()
  {
    fstart(arguments.callee.name); 

    var ind = int_ids.indexOf(user.interest);
    if(ind != -1)
    {
      user.interest = ind < interest.length-1 ? int_ids[ind+1] : int_ids[0];
    }
    this.interest_draw();   

    fend(arguments.callee.name); 
  }, 
  interest_down:function interest_down()
  {
    fstart(arguments.callee.name);     
    var ind = int_ids.indexOf(user.interest);
    if(ind != -1)
    {
      user.interest =  ind > 0 ? int_ids[ind-1] : int_ids[interest.length-1];
    }
    this.interest_draw();
    fend(arguments.callee.name);
  },  
  by_interest:function by_interest(v)
  {        
    fstart(arguments.callee.name);   
    if(user.interest != v)
    {
      user.interest = v;        
      this.interest_draw();
    }
    fend(arguments.callee.name);
  },  
  interest_percent_draw:function interest_percent_draw(k)
  {  tt();
    var r = 200; 
    var h = 2 * r * k, y = 2*r - h;  
    d3.select("#clip-mask rect").attr("y", y).attr("height", h);
  },
  create_next_button:function create_next_button(){

    fstart(arguments.callee.name); 
    $('.poll').append($("<div class='next-slider slider' data-steps-for-on='3'><div class='off'>></div><div class='on'>Next</div></div>").on('DOMMouseScroll mousewheel', function(e, delta) {
      var t = $(this);


      var stepstillon = +t.attr('data-steps-for-on');
      var off = t.find('.off');
      var on = t.find('.on'); 
      var todo = false;
      if(up(e,delta)) // forward up next
      {      
          if(stepstillon > 1 && stepstillon <= 3)
          {
            --stepstillon;
            todo = true;
          }
          else 
          {
            --stepstillon;
            var step = 3-stepstillon;         
            var width_step = off.width()/3;
            var opacity_step = 0.7/3;    
            on.css({'color': (step >= 2 ? "#ededed" : "#939393")});        
            off.text(step != 0 ? "" : ">").css({left:step*width_step, "background-color":"rgba(19, 166, 17," + (0.3+opacity_step*step) + ")"})

             fn('poll.next_function');
            on.animate({'color': "#939393"});        
            off.animate({left:0, "background-color":"rgba(19, 166, 17," + 0.3 + ")"},{complete:function(){off.text(">");}})
            t.attr('data-steps-for-on',3);
          }
      }
      else if(stepstillon < 3) // backward down previous
      {      
         ++stepstillon; todo = true;
      }

      if(todo)
      {
        var step = 3-stepstillon;         
        var width_step = off.width()/3;
        var opacity_step = 0.7/3;    
        on.css({'color': (step >= 2 ? "#ededed" : "#939393")});        
        off.text(step != 0 ? "" : ">").css({left:step*width_step, "background-color":"rgba(19, 166, 17," + (0.3+opacity_step*step) + ")"})
        t.attr('data-steps-for-on',stepstillon);
      }
      e.stopPropagation();
    
    }));

    var slider = $('.slider');
 
    slider.css({top:h-slider.outerHeight()-25,left:w-slider.outerWidth()-200});
    slider.find('.on').on('click',function(e){  tt(); fn('poll.next_function'); })
                      .on('mousedown',function(e){  e.stopPropagation(); });

    fend(arguments.callee.name);

  },
  npicker_create:function npicker_create(p,t,max,size,top,left,def)
  {    
    //d3
    var td = d3.select(p).append('div')
                      .classed(t.replace(".","") + " abs npicker",true)
                      .attr({"max":max})
                      .style({'top':top+'px', 'left':left+'px'});
    //jQuery
    var tj = poll.stage.find(t);    
    var tmpd = [];
    tmpd.length = size;

    td.selectAll('div').data(tmpd).enter().append('div').attr('data-pos',function(d,i){ return size-i;}).text(0);
    td.append('input').attr({'type':'text','value': 0, 'max':max, 'size':size, 'maxlength':size}).style('display','none');

    tj.find('input').on('keypress',validateNumber).on('DOMMouseScroll mousewheel', function(e, delta) {  e.stopPropagation();  })
    .focusout(function(){ $(this).hide(); tj.find('div').show(); }).change(function(){  poll.npicker_set(t,+$(this).val(),size); });
  
    tj.find('div[data-pos]').on('DOMMouseScroll mousewheel', function(e, delta) {
      
      var t = $(this);  
      var p = t.parent('.npicker');
      var tval = +t.text();

      if(up(e,delta)) { if(tval < 9) ++tval; }
      else { if(tval > 0) --tval; }
    
      if(poll.npicker_check(p,+t.attr('data-pos'),tval,size))
      {        
        t.text(tval);
        poll.npicker_set(p,poll.npicker_get(p,size),size);        
      }
      e.stopPropagation();  
    });

    tj.on('click',function(){
      $(this).find('div').hide();
      $(this).find('input').show().focus();      
    });
    poll.npicker_set(t,def,size);
  },
  npicker_check:function npicker_check(t,n,v,size)
  {

    var max = t.attr('max') ? +t.attr('max') : Number.MAX_VALUE;
    var vt = "";
    for(var i = 0; i < size; ++i)
    {
      if(size-i != n)
        vt+=t.find('div[data-pos='+(size-i)+']').text();
      else vt+=v;
    }
    return vt <= max;
  },
  npicker_get:function npicker_get(t,size)
  {
    t = poll.stage.find(t);
    var v = "";
    for(var i = 0; i < size; ++i)
    {
      v+=t.find('div[data-pos='+(size-i)+']').text();
    }
    return +v;
  },
  npicker_set:function setnpicker(t,v,size)
  {    
    t = poll.stage.find(t);

    var max = t.attr('max') ? +t.attr('max') : Number.MAX_VALUE;
    if(v < 0 || v > max) return false;

    v = v.toString().lpad('0',size);
    for(var i = 0; i < size; ++i)
    {
      t.find('div[data-pos='+(size-i)+']').text(v[i]);
    }
    t.find('input').val(v);

    if(func(poll.npicker_function)) poll.npicker_function(v);

    return true;
  },
  label:function label(v){ d3.select('.poll-label').text(v); },
  sublabel:function sublabel(v)
  {
    var t = $('.poll-sub-label').text(v);    
    t.css({top:h2-t.height()/2 - poll.stage_size2*0.38,left:w2-t.width()/2 - (isf() ? 1 : -1)*poll.stage_size2*0.45});    
  },
  gender_thumbnail:function gender_thumbnail(klass)
  {
    klass='gender';
    var thumb_r = 21, thumb_cx = 22;

    var thumbnail = d3.select('svg.thumbnail');
    if (thumbnail.empty()) thumbnail = s3.append('svg').classed('thumbnail',true);
    var thumb_count = thumbnail.selectAll('g').size();


    var g = thumbnail.append('g').classed(klass+'-thumbnail',true);      

    g.append('circle').attr({cx:thumb_cx,cy:2*thumb_cx*(thumb_count+1),r:thumb_r,'stroke-width':1,stroke:'lightblue',fill:color.white})
      .transition().duration(500).ease('circle-in').attr({fill:'lightblue'});

   
    g.append('svg:image').attr({
      x:4,y:27,width:35,height:35,'xlink:href':'assets/images/svg/m.svg',fill:color.female
    });       
  },
  show_thumbnails:function show_thumbnails()
  {
     var thumb_r = 21, thumb_cx = 22;
    var klass = ["gender","age","category","salary","interest","percent"];

    var thumbnail = d3.select('svg.thumbnail');
    if (thumbnail.empty()) thumbnail = s3.append('svg').classed('thumbnail',true);
    //var thumb_count = thumbnail.selectAll('g').size();


    var g = thumbnail.selectAll('g').data(klass).enter().append('g').attr('class',function(d){ return d+'-thumbnail'; });      

    g.append('circle')
      .attr('cy',function(d,i){return 2*thumb_cx*(i+1); })
      .attr({cx:thumb_cx,r:thumb_r,'stroke-width':1,stroke:'lightblue',fill:color.white});
      //.transition().duration(500).ease('circle-in').attr({fill:'lightblue'});

  g.append('text').text(function(d,i){return i+1;})  
    .style('font-size','15px')  
    .attr('y',function(d,i){return 2*thumb_cx*(i+1)+5; })
    .attr({
      x:16, width:35,height:35,'xlink:href':'assets/images/svg/m.svg',fill:color.female
    });    

    // g.append('svg:image')
    // .attr('y',function(d,i){return 2*thumb_cx*(i+1)-18; })
    // .attr({
    //   x:4, width:35,height:35,'xlink:href':'assets/images/svg/m.svg',fill:color.female
    // });       
  }


};
/***************************************************************
                  Poll Part End
***************************************************************/

  // "M0.538,55.373c0,0,4.148-5.646,9.213-11.218c0.928-1.021,1.742-2.083,3.062-2.633c1.167-0.485,2.316-0.437,3.48-0.435c6.979,0.012,12.423,0.052,19.646,0.062c1.104,0.002,2.253-0.003,3.333,0.519c0.922,0.443,1.38,1.092,2,1.891c6.737,8.681,12.645,16.525,22.126,8.415c5.08-4.345,10.668-13.485,18.482-10.994c7.814,2.49,7.98,14.396,11.785,14.396c3.126,0,5.771,0,5.771,0";


function pathSwitch(v)
{
  path.setAttribute('d', v);    
  pathl = path.getTotalLength();
}
function pathCoordinateByPercent(percent) // input percent of whole path
{
  var p1 = pointAt(percent-1);
  var p2 = pointAt(percent+1);
  var a = Math.atan2(p2.y-p1.y,p2.x-p1.x)*180 / Math.PI;
  var p = pointAt(percent);
  return { x:p.x,y:p.y, a:a };
}      
function pointAt(p){

    return path.getPointAtLength( pathl * p/100 );
}

/***************************************************************
                  Progress Bar
***************************************************************/
function progress(val)
{
  if(val==100) 
  {
    intro_fade();
  }
  var $circle = $('#svg #bar');
  
  if (isNaN(val)) {
   val = 0; 
  }
  else{
    var r = $circle.attr('r');
    var c = Math.PI*(r*2);
   
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    
    var pct = ((100-val)/100)*c;
    
    $circle.css({ strokeDashoffset: pct});
    
    $('#cont').attr('data-pct',val);
  }
}
/***************************************************************
                  Progress Bar
***************************************************************/
jwerty.key('space', function(){ 
    s.find(".m.character").animate({ top: male.y - 100 }).animate({ top: male.y });  
    s.find(".f.character").animate({ top: female.y - 100 }).animate({ top:female.y });  
});
jwerty.key('arrow-right', function(){
  walk(1); 
});
jwerty.key('W', function(){
  walk(1); 
});
jwerty.key('arrow-left', function(){
  walk(0); 
});
jwerty.key('S', function(){
  walk(0); 
});
/***************************************************************
                  Key Hooks End
***************************************************************/
// function Field(val){
//     var v = val;
   
//     this.__defineGetter__("value", function(){
//         return v;
//     });
   
//     this.__defineSetter__("value", function(val){
//         v = val;
//     });
// }

// pathAnimator.start( speed, step, reverse, startOffset, finish, easing);

// function step( point, angle ){
//   $('#tester').css({
//                     left:point.x*$(document).width()/100+'px',
//                     top:point.y+'px',
//                     transform:"rotate(" + angle + "deg)",
//                     "-webkit-transform":"rotate(" +  angle + "deg)" });
//  // console.log("step",point, angle);
//     // do something every "frame" with: point.x, point.y & angle
// }

// function finish(){
//   //this.stop();
//     // do something when animation is done
// }