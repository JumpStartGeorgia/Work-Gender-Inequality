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

    collision(delta < 0 ? 1 : -1);
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
function collision(v)
{
  //var cleft = $('.m.character').position().left;
  //var cright = cleft + $('.m.character').width();
  var pleft = $('.layer.fg .part[data-part-id=1] img').parent().position().left;
  var pright = pleft + $('.layer.fg .part[data-part-id=1] img').parent().width();
  //console.log("---------------------------",timeline_scroll_to_tick_value,timeline_scroll_to_tick_value+v);
  var percent = ((timeline_scroll_to_tick_value+v)%timeline_scroll_to_tick)*100/timeline_scroll_to_tick;
  //console.log("collision ------------", percent);
  var coord = pathCoordinateByPercent(percent);  

  var pos = male.lookinfuture(coord);
//  console.log("------------------------__",pos,v);

  var cleft = pos.x;
  var cright = pos.x + $('.m.character').width();
  console.log(cleft,cright,pleft,pright);

  if((cleft >= pleft && cleft <= pright) || (cright >= pleft && cright <= pright))
  { 
    transform('.m.character','scale(0.5,0.5)');
   // $('.m.character').css('transform','scale(0.5,0.5)');
    //console.log("inside");
  }
    //console.log("-------------------------------------------duf");

}
// function transform(selector,value)
// {
//   console.log("transform---------------------",selector,value);
//   var trans = $(selector).css('transform');
//   console.log(trans);
// }
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
    //  console.log(current_path_width,this.land,coord);
      var scaleX = current_path_width/100;
      var scaleY = this.land/56;
console.log("width",current_path_width);
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
  this.lookinfuture = function lookinfuture(coord)
  {
      var scaleX = current_path_width/100;
      var scaleY = this.land/56;
      if(exist(coord))
      {
        if(exist(coord.x)) this.x = coord.x*scaleX;
        if(exist(coord.y)) this.y = this.land - (this.land - coord.y*scaleY + this.height);
        if(exist(coord.a)) this.angle = coord.a;
      }      
     // $(this.selector).css({ left: , top: this.y ,transform:"rotate(" + this.angle + "deg)","-webkit-transform":"rotate(" +  this.angle + "deg)" });  

      //console.log({ human:this.title ,x:this.x, y:this.y, a:this.angle });
      return { human:this.title , x:this.x + stage_offset, y:this.y };
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
  stage_id = Math.floor10(timeline_scroll_to_tick_value/timeline_scroll_to_tick)%1;


  pathSwitch(stages[stage_id].layers[0].path);

  if(stage_id != prev_stage_id)
  {
    stage_offset = 0;
    for(var i = 1; i <= stage_id; ++i)
      stage_offset += stages[i].w;  
  }

  //console.log(stage_id);
  var percent = (timeline_scroll_to_tick_value%timeline_scroll_to_tick)*100/timeline_scroll_to_tick;
    console.log("not collision ------------", percent);
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
          var stage = $('.stage .layer.bg');
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
          var stage = $('.stage .layer.bg');
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

  top.append('<div class="stage"><div class="layer bg"></div><div class="layer fg"></div></div>');

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
var bg_i = 1;
var fg_i = 1;
function top_stage_draw()
{

  var tmp = null; 
  var bg = $('.top .stage .layer.bg');
  var fg = $('.top .stage .layer.fg');

  var layers = stages[stage_index].layers; 

  if(layer_index == layers.length && stage_index+1==stages.length) { current_path_width = $('.stage .layer.bg img').width(); return; }

    //console.log(layers,layer_index,stage_index,stages.length);  
    //console.log('layer_index',layer_index, 'layers.length',layers.length, 'stage_index',stage_index, 'stage.length',stages.length);
    //console.log(stage_first , (layer_index == layers.length ),  stage_index != stages.length , stage_index <= stages.length-1);
  var layer = fg;
  var index = fg_i;
  if(stage_first || (layer_index == layers.length && stage_index <= stages.length-1))
  {      
    if(!stage_first) ++stage_index;
    layer_index = 0;
    layers =  stages[stage_index].layers;     
    stage_first = false;
    layer = bg;
    index = bg_i++;
  }
  else ++fg_i;
  var li = layer_index++;
  var l = layers[li];
  l.i = li+1;

  var img = $('<img src="'+l.image+'"/>');
  layer.append($('<div class="part" data-part-id="'+index+'"></div>').css('z-index', 20).append(img));
  img.data(l);

  img.load( l.type == 1 ? image_background : image_object );

};
function image_background()
{
    var img = $(this);
    var init_img_height = img.height();

    bk_offset+=bk_offset_prev;        
   // var l = img.data();
 //   console.log(l);
    //console.log(img,img.length,"asdfsdf",bk_offset_prev,bk_offset,(bk_offset + v.position.x*w/100), v.position.y*lh/100 );

    img.css({ 
      height:lh, 
      left: (bk_offset),
      top:0 
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
  //console.log('image_object',l,wtmp);
  img.parent('.part').css({ 
    left:bk_offset + l.position.x*wtmp/100-img.width()/2,
    top: Math.abs((100-l.position.y)*lh/100 - img.height()) });

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