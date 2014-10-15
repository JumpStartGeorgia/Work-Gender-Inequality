/*
* @description application initialization step, called after DOM elements and resources are loaded
*/
function init()
{
  redraw(); // recalculate all dimensions 
  params_init();

  s = $('#screen');    
  s3 = d3.select('#screen');    

  intro();  // play game intro and choose where to go based on params poll part or game itself     

  // start preloading data while playing, by stage loading 
  // for each stage collect data, switch flag for stage if not show progress bar 
  // manipulate layers in stage, with positions and points to start and end, transition delay, duration
}
/**
* @description recalculate all critical dimensions on resize or if redraw is needed
*/
function redraw()
{    
  w = $(window).width();   
  h = $(window).height();
  w2 = w/2;
  h2 = h/2;
  lh = (h - th)/2;

  timeline_period_w = w*timeline_scale;
  timeline_month_w = timeline_period_w/reward_period;
  if(ingame) redraw_game();
}
function redraw_game()
{            
  $("#screen .top").height(lh).css('top',0);
  $("#screen .timeline").height(th).css('top',h2-th/2);
  $("#screen .bottom").height(lh).css('top',lh+th);
  redraw_human();
}
function redraw_human(v)
{
  if(typeof v === undefined) v = null;
  male.position(v);
  female.position(v);
}
function scr_clean(klass)
{
  s.empty();
  if(exist(klass)) s.removeClass(klass);
}  
function walk(v)
{
  if(!ingame) return;
  if(!can_scroll(total_scrolls+v)) return;

  total_scrolls+=v;
  var needWalk = true;
  if(v==1)
  {        
    //console.log(total_scrolls,reward_period*scroll_per_month-1,total_scrolls % (reward_period*scroll_per_month-1) == 0);
    //if(total_scrolls % (scrolls_for_reward-1) == 0) 
    if(total_scrolls % scrolls_for_reward == 0)
    {
      ++pos;
      calculate_process(v);
      if(!reward) 
      { 
        if(any_reward())
        {
          reward_process(v); needWalk = false;
        }
      }  
    }
    // checking if width of timeline should be resized
    var t1 = timeline_month_w/scroll_per_month * (total_scrolls+1) + w;
    var len = timeline_points.length;
    if(t1 > len*timeline_month_w) 
    {
      var toadd = Math.round10(t1/(timeline_month_w)) + 1 - len;
      timeline_tick(toadd);
    }          
  }
  else
  {
    //console.log("backward",pos,total_scrolls,scrolls_for_reward-1);
    if(pos >= 0 && total_scrolls % (scrolls_for_reward-1) == 0)
    {
      --pos;  
      calculate_process(v);
    }  
  }
  if(needWalk) walk_process(v);
  else walk_process(0);
}
function can_scroll(v)
{  
  return v >= 0 && v < life_scroll_count;
}
function intro(){  
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
}
function intro_fade(){
  var t = $('.title');
  t.css({top: h/2-t.height()/2, left: w/2-t.width()/2 }).fadeOut(fade_time, "linear", function(){
  scr_clean(s.toggleClass(sintro.class)); 

    if(steptogo < 6) 
      poll.show();
    else 
    {
      play(); game_on_load();
    }
  });
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
function gameon() { ingame = true; }
function gameoff() { ingame = false; clearInterval(noscrollTimerId); }
function game_on_load()
{
  animated = true;
  var tools = category.stage.frame.on_load;
  male.animate(tools);
  female.animate(tools);
  // animate humans to starting position (inside object where they work)
}
function play() { gameon(); game(); prepare_humans(); }
function prepare_humans()
{
  male.prepare_for_game();
  female.prepare_for_game();
}
function game() {

  if(isf())
  {
     if(female.outrun)
     {
        female.salary = user.salary;
        male.salary = user.salary - (user.salary * female.gap_percent / 100);
     }
     else 
     {
        female.salary = user.salary;
        male.salary = user.salary + (user.salary * male.gap_percent / 100);
     }
  }
  else 
  {
    if(female.outrun)
    {
      male.salary = user.salary;
      female.salary = user.salary + (user.salary * female.gap_percent / 100);
    }
    else 
    {
      male.salary = user.salary;
      female.salary = user.salary - (user.salary * male.gap_percent / 100);
    }
  }
  //console.log(user.salary_percent, male.salary);
  male.saving_for_tick = user.salary_percent * male.salary / 100;
  female.saving_for_tick = user.salary_percent * female.salary / 100;
 


  scr_clean();

  var t = $('<div class="top"></div>').appendTo(s);

  var ts = $('<div class="score"><div class="tsalary"><div class="label">Total Salary:&nbsp;</div><div class="value">0</div></div>'+
    '<div class="tsaved"><div class="label">&nbsp;|&nbsp;Total Saved:&nbsp;</div><div class="value">0</div></div></div>').appendTo(t);  
  ts.css({ left: w-ts.width()-30});  

  var treasure = $('<div class="treasure"><div class="pedestal"></div><div class="red-carpet"></div></div>').css({ top : lh - 32 - 10 }).appendTo(t);

  
  t.append('<div class="stage"><div class="layer bg"></div><div class="layer fg"></div></div>');

  timeline = $('<div class="timeline"><div class="canvas"></div></div>').appendTo(s);
  timeline = timeline.find('.canvas');
  

  var b = $('<div class="bottom"></div>').appendTo(s);
  var bs = $('<div class="score"><div class="tsalary"><div class="label">Total Salary:&nbsp;</div><div class="value">0</div></div>'+
    '<div class="tsaved"><div class="label">&nbsp;|&nbsp;Total Saved:&nbsp;</div><div class="value">0</div></div></div>').appendTo(b);
  bs.css({ left: w-bs.width()-30, top: lh + th + 20});

  treasure = $('<div class="treasure"><div class="pedestal"></div><div class="red-carpet"></div></div>').css({ top: lh + th + 10 }).appendTo(b);  

  b.append('<div class="stage"><div class="layer bg"></div><div class="layer fg"></div></div>');

  male.init();
  female.init();
  male.oppenent = female;
  female.oppenent = male;
  //male.pedestal.resume([5,1,0,0,0,0]);
  //female.pedestal.resume([3,1,0,0,0,0]);
  timeline_tick();
  draw_stage(0);


  var m = $('<div class="m character"></div>').appendTo(male.place == "top" ? t : b);
  var f = $('<div class="f character"></div>').appendTo(female.place == "top" ? t : b);
  
  redraw_game();

}
var img_scaler =  1;
var bg_width = 0;
var stage_offset = 0;
function draw_stage(v)
{
  var bg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .layer.bg');
  var fg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .layer.fg');

  var stage = category.stage;
  

  $('<img/>').appendTo(bg).load(function(){

    var bg_image = $(this);
    img_scaler = lh / bg_image.height();

    bg_image.css({ top:0,left:0,height:lh,'z-index':33 });

    bg_width = bg_image.width();
    stage_offset = (w - bg_width)/2;

    var bg_to_viewport = bg_width;
    while(bg_to_viewport < w)
    {
      $('<img src="'+stage.background+'"/>').css({ top:0,left:bg_to_viewport,height:lh,'z-index':33 }).appendTo(bg)
      bg_to_viewport+=bg_width;
    }

    $('<img/>').appendTo(fg).css({ top:0,left:0 }).load(function(){
      var fg_interior = $(this);
      fg_interior.css({ "height":fg_interior.height()*img_scaler,'z-index':34 });
      fg_interior.css({left: w2 - fg_interior.width()/2 ,top:lh - fg_interior.height()});

    }).attr('src',stage.foreground.interior);

   $('<img/>').appendTo(fg).css({ top:0,left:0 }).load(function(){
      var fg_exterior = $(this);
      fg_exterior.css({ "height":fg_exterior.height()*img_scaler,'z-index':36 });
      fg_exterior.css({left:w2 - fg_exterior.width()/2 ,top:lh - fg_exterior.height()});
    }).attr('src',stage.foreground.exterior);

  }).attr('src',stage.background);

  if(v==0) draw_stage(1);
};
function timeline_tick(n)
{
  for(var i = 0; i < n; ++i)
  {
    var curTime = new Date();
    size = timeline_points.length;
    curTime.setTime(timeline_points[size-1].getTime());

    curTime.setMonth(curTime.getMonth() + reward_period);

    if(curTime > timeline_end_point) epilogue();

    timeline_point = curTime;
    timeline_points.push(curTime);  
  }      
  timeline_point_draw();   
}
function timeline_point_draw()
{
  timeline_points.forEach(function(d,i){
    if(!timeline.find('.point-in-time[data-time=' + d.getTime() + ']').length)
    {
      var point = $('<div class="point-in-time" data-time="'+ d.getTime()+'"><div class="point">'+getMonthS(d)+ " " + d.getFullYear() + '</div><div class="mask"></div></div>').appendTo(timeline);

      //console.log(rew);
      point.css({heigth:th,line_height:th});
      
      if(i == 0) 
      { 
        prevPosition = w2;
        prevPositionLeft = w2 - point.width()/2;
      }
      else 
      {       
        prevPosition += timeline_period_w;
        prevPositionLeft = prevPosition - point.width()/2;
      }
      point.css({left: prevPositionLeft });

      if(i!=0)
      { 
        
        var mCountTmp = 0;
        var fCountTmp = 0;
       // var indm = 0;
        //var indf = 0;
        var from = i * reward_period - 1;
        var to = i*reward_period-reward_period;
        for(var j = from; j >= to; --j)
        {
          mCountTmp += male.event_by_month[j];
          fCountTmp += female.event_by_month[j];
        }
        if(mCountTmp > 0)
        {
           var rew = $('<div class="reward" data-id="'+i+'"  data-count="'+mCountTmp+'"></div>').appendTo($('.'+male.place+' .treasure .red-carpet'));
            rew.css({heigth:th,line_height:th});
            rew.css({left: prevPosition - interest_w2}); //+ indm*rew.width()+(indm>0?10:0)});
          
          for(var j = 0; j < mCountTmp; ++j)
          { 
             $('<div class="item i' + interest[0].class  + '"></div>').appendTo(rew);
          }
        }
        if(fCountTmp > 0)
        {
           var rew = $('<div class="reward" data-id="'+i+'"></div>').appendTo($('.'+female.place+' .treasure .red-carpet'));
            rew.css({heigth:th,line_height:th});
            rew.css({left: prevPosition - interest_w2}); //+ indm*rew.width()+(indm>0?10:0)});
          
          for(var j = 0; j < fCountTmp; ++j)
          { 
             $('<div class="item i' + interest[0].class  + '"></div>').appendTo(rew);
          }
        }
      }
      var scaler = timeline_period_w/reward_period;
      for(var j = 0; j < reward_period-1; ++j)
      {
         $('<div class="serif"></div>').css({ left: prevPosition+(j+1)*scaler,heigth:th,line_height:th }).appendTo(timeline);
      }

      point.find('.point').text(getMonthS(d) + " " + d.getFullYear());    
      point.attr('data-time',d.getTime());
    }
  });
 
  $('.treasure .red-carpet').css({width:timeline_points.length*w}); 
  timeline.css({width:timeline_points.length*w}); 

}
/***************************************************************
                        TODO
***************************************************************/
function calculate_process(v)
{
  if(pos >= -1)
  {
    var tmp = v*reward_period;
    humans.forEach(function(d)
    {
      d.tsalary += tmp*d.salary;
      d.tsaved += tmp*d.saving_for_tick;
    });     
  }  
}
function walk_process(v)
{
  //if(pos >= -1) //>= 0 && pos != prev_pos)
  //{
  if(v==1)
    h_go_right();
  else if(v == -1)
    h_go_left();          
 
  $('.canvas, .treasure .red-carpet').css({left:-total_scrolls*(timeline_month_w/scroll_per_month)});
  //}  
}
var reward = false;
function any_reward()
{
  humans.forEach(function(d){    
    if(d.has_future_reward()) { ++queueAmount; reward = true; }
  });
  return queueAmount == 0 ? false : true;
}
function reward_process()
{
  console.log("reward_process");
  humans.forEach(function(d){
    if(d.has_future_reward()) 
    { 
      console.log(d.treasure);
      d.queue.push(function() { card_prepare(d);  });
      d.queue.push(function() { prepare_bk_for_reward(d); });
      d.queue.push(function() { d.mutate(1); });
      d.queue.push(function() { d.after_mutate(); });
      d.queue.push(function() { start_reward_animation(d); });
      d.queue.push(function() { hide_card(d); });
      d.queue.push(function() { prepare_bk_for_work(d); });

      d.queue.start();

      /*d.next_frame();*/
      // at same time move character to reward place
      // mutate if needed
      // give reward, fadeout with moving coins to pedestal
      // bk back, 
      // character to work
      // to see if next savings are enough for new item
      // after see if items can be mutated to higher level item based on females items, object will be mutated only if male have extra items of same level
      // do it for both humans if male have extra items that can be converted to new more valuable item, than convert when nessecary
      // stop sign for both humans independetly, slow down timeline, put present on timeline on specific date
      // move human to award place wait till present will have collision after that move person and present to its home place
      // present will go via human hands moved to some treasure bar, with options to mutate to next level item(collapse effect)
    }
  });
}


var move_size = -300;
function prepare_bk_for_reward(v)
{
  //console.log("called from inside",v);
  var bg = $('.' + v.place + ' .stage .layer.bg');
  var fg = $('.' + v.place + ' .stage .layer.fg');
  bg.animate({  "color": 'white'},{duration:400,
    progress:function(a,b,c){
      bg.css({'left':move_size*b});
      fg.css({'left':move_size*b});
    },
    complete:function()
    {
      v.queue.resume();     
    }
  });
}
function prepare_bk_for_work(v)
{
   var bg = $('.' + v.place + ' .stage .layer.bg');
  var fg = $('.' + v.place + ' .stage .layer.fg');
  bg.animate({  "color": 'white'},{duration:400,
    progress:function(a,b,c){
      bg.css({'left':move_size - move_size*b});
      fg.css({'left':move_size - move_size*b});
    },
    complete:function()
    {
      v.queue.resume();     
    }
  });
}
function card_prepare(v)
{
  var c = pos > prev_pos;
  var rew = $('.'+v.place + ' .treasure .red-carpet .reward[data-id='+(pos+1)+']');
  if(c)
  {
    rew.hide();
    v.card.next();
  }
  else
  {
    rew.show();         
    v.card.prev();
  }
  v.queue.resume();  
}
function hide_card(v)
{
  //console.log("hideCard",v);
  v.card.hide();
  v.queue.resume();  
}

function start_reward_animation(v)
{
  //console.log("start_reward_animation");
  v.queue.resume();  
}



/***************************************************************
                      TODO END
***************************************************************/
/***************************************************************
                  Utility Functions
***************************************************************/
function m(){ user.gender = 'm'; max_age = male_max_age; life_scroll_count = (max_age - min_age)*12*scroll_per_month; }
function f(){ user.gender = 'f'; max_age = female_max_age; life_scroll_count = (max_age - min_age)*12*scroll_per_month;  }
function g(v) { return user.gender; }
function gender(v) { v=='m' ? m() : f(); }
function ism(){ return user.gender=='m' }
function isf(){ return user.gender=='f' }
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
  var hash = window.location.hash._trimLeft('#'); 
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
    poll.place_human_based_on_gender();
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
    poll.choose_category();
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
    poll.choose_interest();
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
/***************************************************************
                  General Functions End
***************************************************************/
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
                  Progress Bar End
***************************************************************/
/***************************************************************
                  Key Hooks
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
  walk(-1); 
});
jwerty.key('S', function(){
  walk(-1); 
});
/***************************************************************
                  Key Hooks End
***************************************************************/;