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

    if(ingame)
    {
      prev_pos = pos;      
      if(delta < 0 && pos < pos_max) ++pos;
      else if(delta >= 0 && pos > pos_min) --pos;
      if(pos != prev_pos) tick();
    }

    if(func(onscrollafter)) onscrollafter()
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
var h2 = 0; // half of height viewport 
var w2 = 0; // half of width viewport 
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
var human = 
{
 age : 0,
 height : 100,
 width: 46,
 x:30,
 y:0
}; // human object with basic properties
var user =
{
  gender : 'n',
  age : 0,
  category : 1,
  interest : 1,
  salary : 100,
  salary_percent : 0
}

var male = human; // male human object
var female = human; // female human object
//flags
var ingame = false; // if you are in game true, else false (intro, epilogue, etc.)

  function init()
  {
    fstart(arguments.callee.name);
    s = $('#screen');    
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
     w2 = w/2;
     h2 = h/2;
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
  i = $('<div id="info"></div>').appendTo('#content');
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

/***************************************************************
                  Utility Functions
***************************************************************/
function fstart(v) { console.log("< " + v); }
function fend(v) { console.log(v + " >"); }
function log(v) { console.log("\t" + v); }
function exist(v){ return typeof v !== 'undefined' && v !== null && v !== '';}
function empty(){log('empty');};
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
function t(v,o){ v.css(o); t = null; }
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
/***************************************************************
                  General Functions End
***************************************************************/


var poll = {
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
  poll_size:400,
  poll_size_half: 0,  
  stage_w: 400,
  stage_h: 400,
  npicker_sal_size:5,
  show:function show()
  {
    fstart(arguments.callee.name);
    poll.poll_size_half = poll.poll_size/2;
    this.gender();
    this.create_next_button();

    fend(arguments.callee.name);
  },
  gender:function gender()
  {
    fstart(arguments.callee.name);
    this.next_function = function(){ 
      if(!is)
      {
        if(user.gender != "n") 
        { 
          if(user.gender == 'f') $('.fchar').trigger('click') ;
          else $('.mchar').trigger('click') ;       
        } 
        else 
        {
           $('.mchar').switchClass("", "selected", 1000, "easeInSine" ).switchClass("selected", "", 500, "easeOutSine" );        
           $('.fchar').switchClass("", "selected", 1000, "easeInSine" ).switchClass("selected", "", 500, "easeOutSine" );  
        }
      }
    };
    scr_clean();

    var p = $('<div class="poll"></div>').appendTo(s);
    var label = $('<div class="poll-label"></div>').appendTo(p);    
    poll.label("Choose Gender"); 
    poll.stage = $('<div class="stage"></div>').appendTo(p);
    poll.stage_d3 = d3.select('.stage');
    var ftmp = this.ftmp = $('<div class="fchar character fb" title="Female"></div>').appendTo(poll.stage);
    var mtmp = this.mtmp = $('<div class="mchar character mb" title="Male"></div>').appendTo(poll.stage);

    ftmp.on('click',function(){ 
      is = true;
      mtmp.removeClass('selected').off('click').fadeOut(1000,"linear",function(){this.remove();});
      
      max_age = female_max_age;      
      $(this).addClass('selected').removeClass('fb').off('click').animate({ width: poll.stage_w, height: poll.stage_h, top: h/2-poll.stage_h/2, left: w/2-poll.stage_w/2},{duration:1000, progress:function(a,b,c)
      {
          tmp_width = ftmp.width();
          tmp_height = ftmp.height();
          $(this).css("background-size", b*46*4 + "px " + b*100*4+ "px");
          $(this).css("background-position", (tmp_width*b - b*46*4) + "px " + (tmp_height - tmp_height/1.5*b)+ "px");
      },complete:function(){
        $(this).css('background-color','transparent');
        poll.stage_d3.insert('svg').classed({'stage-bk':true,'abs':true}).style({width: poll.stage_w+2, height: poll.stage_h+2, top: h/2-poll.stage_h/2+1, left: w/2-poll.stage_w/2+1}).append("circle").classed('bk',true).attr({"cx":poll.stage_w/2+1,"cy":poll.stage_h/2+1,"r":poll.stage_w/2});
        poll.stage.prepend($('<div class="poll-sub-label abs"></div>'));
        poll.age_picker_show('f');
        is = false;
      }});

    });
    mtmp.on('click',function(){ 
       is = true;
      ftmp.removeClass('selected').off('click').fadeOut(1000,"linear",function(){this.remove();});
      max_age = male_max_age;
      
      $(this).addClass('selected').removeClass('mb').off('click').animate({ width: poll.stage_w, height: poll.stage_h, top: h/2-poll.stage_h/2, left: w/2-poll.stage_w/2},{duration:1000, progress:function(a,b,c)
      {
          tmp_width = mtmp.width();
          tmp_height = mtmp.height();
          $(this).css("background-size", b*46*4 + "px " + b*100*4+ "px");
          $(this).css("background-position", (tmp_width - tmp_width*b) + "px " + (tmp_height - tmp_height/1.5*b)+ "px");
      },complete:function(){
        $(this).css('background-color','transparent');
        poll.stage_d3.insert('svg').classed({'stage-bk':true,'abs':true}).style({width: poll.stage_w+2, height: poll.stage_h+2, top: h/2-poll.stage_h/2+1, left: w/2-poll.stage_w/2+1}).append("circle").classed('bk',true).attr({"cx":poll.stage_w/2+1,"cy":poll.stage_h/2+1,"r":poll.stage_w/2});
        poll.stage.prepend('<div class="poll-sub-label abs"></div>');
        poll.age_picker_show('m');
        is = false;
      }});   
      
    });
    onscrollafter=function(){ 
      if(ftmp.hasClass('selected'))
      {
        ftmp.toggleClass('selected'); 
        mtmp.toggleClass('selected');
        user.gender = 'm';

      } 
      else if(mtmp.hasClass('selected')) 
      {
        ftmp.toggleClass('selected'); 
        mtmp.toggleClass('selected');
        user.gender = 'f';

      }
      else 
      {
          ftmp.toggleClass('selected');
          user.gender = 'f';
      }
    };

    var margin_between = 100;
    ftmp.css({top:h/2-ftmp.height()/2,left:w/2-margin_between/2-ftmp.width()});
    mtmp.css({top:h/2-mtmp.height()/2,left:w/2+margin_between/2});

    fend(arguments.callee.name);
  },
  age:function age(v)
  {
    fstart(arguments.callee.name);
    user.gender = v;
    poll.label("Choose the Age"); 
    $('.poll').addClass(user.gender);
    this.next_function = function()
    {
      $('#age_picker').remove();
      $(document).off('mousedown');
      poll.category_show(); };
      //ingame = true; tick(); game(); }
    fend(arguments.callee.name);
  },
  category_show:function category_show()
  {
    fstart(arguments.callee.name);
    poll.label("Choose Category"); 
    this.next_function = function(){
      user.salary = poll.category_salary();
      poll.stage.find('.category-picker').remove();
      poll.stage.find('.salary-picker').remove();
      poll.interest();
    };
    poll.category_picker_show();
    // function(){    };

    fend(arguments.callee.name);
  },
  interest:function interest()
  {
    fstart(arguments.callee.name);

    poll.label("Choose Interest");
    this.next_function = function(){
       ingame = true;
       tick();
       game();
       console.log(user);
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
    .attr("class",function(d){return "category_item " + user.gender; }) 
    .attr("id",function(d){return d.id;})   
    .attr({"width":size, "height":size})
    .style("top",function(d,i){ return h2 + (outer_radius) * Math.sin(Math.radians(i*cat_step)) - cat_radius })
    .style("left",function(d,i){ return w2 - (outer_radius) * Math.cos(Math.radians(i*cat_step)) - cat_radius;})
    .on('click',function(d){ poll.by_category(+(d.id.substr(3)));});

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
    poll.sublabel(d3.selectAll('.category-picker .category_item#cat'+user.category).classed('selected',true).text()); 

    fend(arguments.callee.name);   
  },
  category_check:function category_check()
  {      
    fstart(arguments.callee.name);    
    if(user.category<1) user.category = category.length;
    else if(user.category>category.length) user.category = 1;
    fend(arguments.callee.name);
  },
  category_up:function category_up()
  {
    fstart(arguments.callee.name); 
    ++user.category;
    this.category_check();    
    this.category_draw();   
    fend(arguments.callee.name); 
  }, 
  category_down:function category_down()
  {
    fstart(arguments.callee.name);     
    --user.category;
    this.category_check();
    this.category_draw();
    fend(arguments.callee.name);
  },
  by_category:function by_category(v)
  {        
    fstart(arguments.callee.name);   
    if(user.category != v)
    {
      user.category = v;        
      this.category_check();
      this.category_draw();
    }
    fend(arguments.callee.name);
  },
  category_salary:function category_salary(v)
  {
    if(exist(v)) poll.npicker_set('.salary-picker',v,poll.npicker_sal_size);
    else return poll.npicker_get('.salary-picker.npicker',poll.npicker_sal_size);
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
  age_picker_show:function age_picker_show(v)
  {
    fstart(arguments.callee.name);
    onscrollafter=null;  
    //console.log('adding');
    //poll.stage.find('.character').addClass('selected');
//console.log('adding end');
    poll.age(v);


    var ap = $('<svg version="1.1" id="age_picker" class="'+v+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="420px" width="420px" viewBox="0 0 420 420" enable-background="new 0 0 420 420" xml:space="preserve">').css({top: h/2-420/2, left: w/2-420/2}).appendTo(poll.stage);
    var ap_path = '<path fill="none" stroke="#231F20" stroke-miterlimit="10" d="M66.726,363.473c-40.734-38.326-66.17-92.732-66.17-153.076c0-60.347,25.435-114.751,66.169-153.078""/>';
    if(v == 'm') ap_path = '<path fill="none" stroke="#231F20" stroke-miterlimit="10" d="M353.304,57.544c40.734,38.328,66.17,92.732,66.17,153.078c0,60.346-25.435,114.75-66.169,153.077"/>';

    //var ap_text = '<text id="age_counter" x="'+ (ism() ? 250 : 70) +'" y="150"></text>';
    var ap_knob = '<circle id="age_mover" cx="0" cy="0" r="'+poll.indicatorRadius+'" draggable="true" ondrag="poll.drag_age(event)" class="age_mover"/>';
    ap.html(ap_path + /*ap_text +*/ ap_knob);        
    var diff = max_age-min_age;
    if(v=='m')poll.degrees = poll.degrees_male;
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

    $('#age_mover').draggable();

      $(document).on('mousedown',function (e) {
          poll.agemousedown(e);
      });

    onscrollup = function(){
      poll.age_up();
    };
    onscrolldown = function(){
      poll.age_down();
    };

    poll.by_age(def_age);
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
    if(user.age != v) //draw only if age changed
    {
      user.age = v;        
      this.age_check();
      this.agepicker_draw();
      
    }
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
      $(".age_mover").attr("cx",cx).attr("cy",cy);
      //$('#age_counter').text(user.age + "(" +agegroup_by_age(user.age)+")");
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
                log('here');
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
    //console.log(e);
    fstart(arguments.callee.name);
    var x = parseInt(e.clientX-w2);
    var y = parseInt(h2-e.clientY);
    this.agepicker_age_by_coord(x, y);

    //this.agepicker_age_by_coord(parseInt(e.clientX - this.offsetX), parseInt(e.clientY - this.offsetY));

    fend(arguments.callee.name);
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
    .attr("class",function(d){return "interest_item " + user.gender; }) 
    .attr("id",function(d){return d.id;})   
    .attr({"width":size, "height":size})
    .style("top",function(d,i){ return h2 + (outer_radius) * Math.sin(Math.radians(i*item_step)) - item_radius })
    .style("left",function(d,i){ return w2 - (outer_radius) * Math.cos(Math.radians(i*item_step)) - item_radius;})
    .on('click',function(d){ poll.by_interest(+(d.id.substr(3)));});


 


    poll.stage_d3.select('.stage-bk').append('defs').append('clipPath').attr('id','clip-mask').append('rect').attr({'width':poll.stage_w+20,'height':poll.stage_h+20,'x':0,'y':poll.stage_h+2});
    poll.stage_d3.select('.stage-bk').append("circle").classed('mask',true).attr({"cx":poll.stage_w/2+1,"cy":poll.stage_h/2+1,"r":poll.stage_h/2 , "clip-path":'url(#clip-mask)'});    

    pick_items.append("circle").attr({"cx":item_radius,"cy":item_radius,"r":item_radius});
    pick_items.append("text").text(function(d){return d.name.substr(0,4);}).attr({x:12,y:35});

    poll.sublabel(picker.select('.interest_item').classed('selected',true).select('text').text());


   poll.npicker_function = function(v){ v=+v; 
      if(user.salary >= v) {
        user.salary_percent = Math.round10((v*100)/user.salary);
        poll.stage_d3.select('.character').attr('data-percent',user.salary_percent);
        poll.sublabel(poll.stage_d3.select('.interest_picker .interest_item#int'+user.interest+'.selected text').text() + " (" + user.salary_percent + "%)");         
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
    poll.sublabel(d3.selectAll('.interest_picker .interest_item#int'+user.interest).classed('selected',true).text() + " (" +user.salary_percent + "%)"); 

    fend(arguments.callee.name);   
  },
  interest_check:function interest_check()
  {      
    fstart(arguments.callee.name);    
    if(user.interest<1) user.interest = interest.length;
    else if(user.interest>interest.length) user.interest = 1;
    fend(arguments.callee.name);
  },
  interest_up:function interest_up()
  {
    fstart(arguments.callee.name); 
    ++user.interest;
    this.interest_check();    
    this.interest_draw();   
    fend(arguments.callee.name); 
  }, 
  interest_down:function interest_down()
  {
    fstart(arguments.callee.name);     
    --user.interest;
    this.interest_check();
    this.interest_draw();
    fend(arguments.callee.name);
  },
  by_interest:function by_interest(v)
  {        
    fstart(arguments.callee.name);   
    if(user.interest != v)
    {
      user.interest = v;        
      this.interest_check();
      this.interest_draw();
    }
    fend(arguments.callee.name);
  },  
  interest_percent_draw:function interest_percent_draw(k)
  {  
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

            poll.next_function();
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
    slider.find('.on').on('click',function(){   poll.next_function(); });

    fend(arguments.callee.name);

  },
  label:function label(v){ $('.poll-label').text(v); },
  sublabel:function sublabel(v)
  {
    var t = $('.poll-sub-label').text(v);    
    t.css({top:h2-t.height()/2 - poll.poll_size_half*0.38,left:w2-t.width()/2 - (isf() ? 1 : -1)*poll.poll_size_half*0.45});    
  }
};