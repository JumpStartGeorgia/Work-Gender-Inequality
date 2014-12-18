
var img_scaler =  1;
var prev_img_scaler = 1;
var bg_width = 0;
var bg_initial_height = 0;
var fgw = 0;
var fgh = 0;
var screenCount = 1;
var reward = false;
var epilogueUp = true;
/*
* @description application initialization step, called after DOM elements and resources are loaded
*/
function init()
{  
  redraw(); // recalculate all dimensions 
  params_init();  
  wr = $('.wrapper');
  s = wr.find('#screen');  

  //s3 = d3.select('#screen');    
  if(!isAssetsLoaded) Game.Loader.load();
}
function afterinit()
{ 
  scr_clean();
  if(steptogo < 6) poll.show();
  else game_init(); 
  if(steptogo == 0) $('.info').show();
  //player.mute(); //dev

}
function resize()
{
   redraw(); // recalculate all dimensions    
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
  lh = Math.ceil10((h - th)/2);

  timeline_period_w = w*timeline_scale;
  timeline_month_w = timeline_period_w/reward_period;   
  if(ingame)
  { 
    stage_redraw(0);
    redraw_game();
    timeline_point_redraw();  
  }
  if(func(resizeCallback)) resizeCallback();
}
function redraw_game()
{            
  var t = $("#screen .top").height(lh);
  t.find('.treasure .pedestal').css({ top : 10 });
  t.find('.treasure .red-carpet, .treasure .card').css({ top : lh/2 - 25 });
  t.find('.treasure .card').css({right:w2+80});
  
  $("#screen .timeline").height(th).css('top',h2-th/2);
  if(gap.pos >= 0)
  {      
    $('.canvas, .treasure .red-carpet').hide().animate({color:'transparent'},{start:function(){ $(this).css({left:-total_scrolls*(timeline_month_w/scroll_per_month)}); }, complete:function(){ $(this).show(); } });
  }

  var b = $("#screen .bottom").height(lh).css('top',lh+th);
  b.find('.score').css({ top: lh + th + 20});
  b.find('.treasure .pedestal').css({ top: lh + th + 10 });
  b.find('.treasure .red-carpet, .treasure .card').css({ top : lh/2 - 25 });
  b.find('.treasure .card').css({right:w2+80});
  male.scale();
  female.scale();
  //$('.canvas, .treasure .red-carpet').show();
}
function scr_clean(klass)
{
  s.empty();
  wr.find('.info,.volume,.hint,.settings,.share,.about,.settings-bar').hide(); 
  player.background_stop();
  if(exist(klass)) s.removeClass(klass);
}  
function walk(v)
{  
  if(!canScroll) return;
  if(!scrolled) 
  { 
    $('.wrapper .hint').fadeOut(1000, function(){ $(this).remove(); });
    $('.wrapper .top .character .you').fadeOut(1000, function(){ $(this).remove(); });   
    scrolled = true; 
  }
  
  if(!can_scroll(total_scrolls+v)) return;

  total_scrolls+=v;
  var needWalk = true;
  if(v==1)
  {        
    if(gap.pos+1>pos_max) { epilogue(); return; }
    if(total_scrolls % scrolls_for_reward == 0)
    {
      if(show_jumper_prompt && total_scrolls == scrolls_for_reward) // if no reward at all then prompt to choose new interest
      { 
        wanna_jump_popup();         
      }
      ++gap.pos;
      if(!reward) 
      { 
        if(any_reward())
        {
          reward_process(v); needWalk = false;
        }
        params_time_set();
      }  
    }  
  }
  else
  {
    if(gap.pos >= 0 && total_scrolls % scrolls_for_reward != 0 && (total_scrolls - Math.floor10(total_scrolls/scrolls_for_reward)*scrolls_for_reward) % (scrolls_for_reward-1) == 0)
    {      
      --gap.pos;      
      gopast();
    }
  }
  
  if(v==1 && total_scrolls % (scrolls_for_score * scroll_per_month) == 0)
  {  
    calculate_process(v);
  }
  else if(v==-1 && total_scrolls % (scrolls_for_score * scroll_per_month-1) == 0)
    calculate_process(v);

  


  if(needWalk) walk_process(v);
  else walk_process(0);
}
function can_scroll(v)
{  
  return v >= 0 && v < life_scroll_count;
}


function gameon() { ingame = true; }
function gameoff() { ingame = false; clearInterval(noscrollTimerId); }
function game_on_load()
{
  setTimeout(function(){
    animated = true;
    male.animate();
    female.animate();
  },1000);  
}
function game_init() {

  //gap.pos = 0;
  //total_scrolls = 0;
  scr_clean();

  sound_button();
  settings_button();
  about_button();
  share_button();  

  gameon();

  if(isf())
  {
    female.salary = user.salary;
    male.salary = user.salary + (female.outrun ? -1 : 1)*(user.salary * (female.outrun ? female.gap_percent : male.gap_percent) / 100);
  }
  else 
  {
    male.salary = user.salary;
    female.salary = user.salary + (female.outrun ? 1 : -1)*(user.salary * (female.outrun ? female.gap_percent : male.gap_percent) / 100);
  }
 
  var tstr =  '<div class="score"><div class="tsalary"><div class="label">'+locale.game.total_salary+'</div><div class="value">0</div></div>'+
                '<div class="tsaved"><div class="label">'+locale.game.total_saved+'</div><div class="value">0</div></div></div>' + 
              '<div class="treasure"><div class="pedestal"></div><div class="red-carpet"></div></div>' + 
              '<div class="stage"><div class="bg"></div><div class="fg"></div></div>';

  var t = $('<div class="top"></div>').appendTo(s)
    .append(tstr)
    .append('<div class="'+(male.place == "top" ? 'm' : 'f')+' character"><div class="you"><div class="text">'+locale.general.you+'</div><div class="arrow-d"></div></div></div>');
  timeline = $('<div class="timeline"><div class="canvas"></div><div class="time-travel"><div class="travel-point-back">'+jumper + ' ' + locale.general.years_back +'</div><div class="backward"></div><div class="now"></div><div class="forward"></div><div class="travel-point-forw">'+jumper + ' ' + locale.general.years_forward +'</div></div></div>').appendTo(s).find('.canvas');
  $('.timeline .time-travel .backward').click(function(){ timetravel_back(); });
  $('.timeline .time-travel .forward').click(function(){ timetravel_forw(); });
  var b = $('<div class="bottom"></div>').appendTo(s)
    .append(tstr)
    .append('<div class="'+(male.place == "top" ? 'f' : 'm')+' character"></div>');

  male.init();
  female.init();
  
  male.oppenent = female;
  female.oppenent = male;

  male.prepare_for_game();
  female.prepare_for_game();

  card_moment.forEach(function(d,i){ card_moment[i] = male.card_moment[i] > female.card_moment[i] ? female.card_moment[i] : male.card_moment[i]; });

  start_by_time();

  male.pedestal.resume_by_position();
  female.pedestal.resume_by_position();

  timeline_point_init();

  stage_init(0);

  redraw_game();

  player.background_play();  

  $('.wrapper .hint').fadeIn(1000,'linear');

  game_on_load();

  if(show_not_enough_prompt) // if no reward at all then prompt to choose new interest
  { 
    sorry_popup(); 
  }

  if(init) init = false;
}
function game_jump(v,jumper_step) //  -1 back 1 forw
{
  if(v === undefined) v = 1;
  var jstep = typeof jumper_step !== 'undefined' && isNumber(jumper_step) ? jumper_step : jumper;

  var isfine = false;

  var toJump = jstep * 12 / reward_period * v + gap.pos;
  if(toJump >=0 && toJump <= pos_max)
  {
    if(can_scroll(toJump*scrolls_for_reward))
    {
      gap.pos = toJump;    
      total_scrolls = gap.pos*scrolls_for_reward;    

      start_by_time();

      male.pedestal.resume_by_position();
      female.pedestal.resume_by_position();

      timeline_point_redraw();

      redraw_game();

     stage_redraw(0);

    male.scale();
    female.scale();


      isfine = true;    
    }    
  }
  if(isfine) console.log('can\'t jump');
  else console.log('jumping');
}

function stage_init(v)
{
  var bg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .bg');
  var fg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .fg');

  var bgOriginal = assets.filter(function(a){ return a.name == category.bg; })[0].element;  
  var bgFirst = bgOriginal.clone();

  bg.append(bgFirst);
  bg_initial_height = bgFirst.height();
  prev_img_scaler = img_scaler;
  img_scaler = lh / bg_initial_height;

  bgFirst.css({ height:lh });

  bg_width = bgFirst.width();

  var bg_to_viewport = bg_width;

  screenCount = 1;
  while(bg_to_viewport < w)
  {
    bgOriginal.clone().css({ top:0,left:bg_to_viewport, height:lh }).appendTo(bg);
    bg_to_viewport+=bg_width;
    ++screenCount;
  }  
  var bgOriginal2 = assets.filter(function(a){ return a.name == category.bg2; })[0].element;
  bgOriginal2.clone().addClass('bgmain').css({ top:0,left:bg_to_viewport, height:lh }).appendTo(bg);
  bg_to_viewport+=bg_width;

  var extra = Math.ceil10(((w-bg_width)/2)/bg_width);
  while(extra > 0)
  {
    bgOriginal.clone().css({ top:0,left:bg_to_viewport, height:lh }).appendTo(bg);
    bg_to_viewport+=bg_width;
    --extra;
  }
  var fgOriginalI = assets.filter(function(a){ return a.name == category.fg+'_i'; })[0].element;
  var fgOriginalO = assets.filter(function(a){ return a.name == category.fg+'_o'; })[0].element;

  var fg_i = fgOriginalI.clone().appendTo(fg);

  fgw = fg_i.width();
  fgh = fg_i.height();

  fg_i.addClass('i').css({ "height":fgh*img_scaler });
  fg_i.css({left: bg_width*(screenCount) + (bg_width/2 - fg_i.width()/2),top:lh - fg_i.height()});

  var fg_o = fgOriginalO.clone().appendTo(fg);
  fg_o.addClass('o').css({ "height":fgh*img_scaler });
  fg_o.css({left: bg_width*(screenCount) + (bg_width/2 - fg_i.width()/2),top:lh - fg_i.height()});


  if(v===0) stage_init(1);
  else 
  {
    fgw = fg_i.width();
    fgh = fg_i.height();
  }

}
function stage_redraw(v)
{
 
  var bg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .bg');
  var fg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .fg');

  var bgOriginal = assets.filter(function(a){ return a.name == category.bg; })[0].element;
  var bgs = bg.find('img');
  var bgFirst =bgs.first().css({ height: lh });
  
  prev_img_scaler = img_scaler;
  img_scaler = lh / bg_initial_height;

  bg_width = bgFirst.width();

  var bg_to_viewport = bg_width;



  screenCount = 1;
  var afterEl = bgFirst;
  var bgmainIndex = 0;
  bgs.each(function(i,d){
    if(i==0) return true;
    d = $(d);
    if(!d.hasClass('bgmain'))
    {
      if(bg_to_viewport < w)
      {
        d.css({ top:0,left:bg_to_viewport, height:lh });
        bg_to_viewport+=bg_width;
        ++screenCount;
      }
      else d.remove();
    }
    else {
      bgmainIndex = i; 
      return false;
    }
  });

  while(bg_to_viewport < w)
  {
    var tmp = bgOriginal.clone().css({ top:0,left:bg_to_viewport, height:lh }).insertAfter(afterEl);
    afterEl = tmp;
    bg_to_viewport+=bg_width;
    ++screenCount;
  }  

  afterEl = $(bgs[bgmainIndex]).css({ top:0, left:bg_to_viewport, height:lh });
  bg_to_viewport+=bg_width;

  var extra = Math.ceil10(((w-bg_width)/2)/bg_width);
  for(i = bgmainIndex+1; i < bgs.length; ++i)
  {
    if(extra == 0) bgs[i].remove();
    else 
    {
      $(bgs[i]).css({ top:0,left:bg_to_viewport, height:lh });
      bg_to_viewport+=bg_width;
    }

    --extra;
  }
  while(extra > 0)
  {
    var tmp = bgOriginal.clone().css({ top:0,left:bg_to_viewport, height:lh }).insertAfter(afterEl);
    afterEl = tmp;
    bg_to_viewport+=bg_width;
    --extra;
  }

  var fg_i = fg.find('img.i').css({ "height":fgh*img_scaler });
  fg_i.css({left: bg_width*(screenCount) + (bg_width/2 - fg_i.width()/2),top:lh - fg_i.height()});

  var fg_o = fg.find('img.o').css({ "height":fgh*img_scaler });
  fg_o.css({left: bg_width*(screenCount) + (bg_width/2 - fg_i.width()/2),top:lh - fg_i.height()});

  bg.parent().css('left',-1*(bg_width*screenCount + bg_width/2 - w2 - bg_width/7));

  if(v===0) stage_redraw(1);

}
function timeline_point_init()
{
  for(var i = 0; i <= pos_max; ++i) 
  {
    var now = new Date(today.getFullYear(),today.getMonth()+i*reward_period,1,0,0,0,0); // only for declaration 
    var point = $('<div class="point-in-time" data-time="'+ now.getTime()+'"><div class="point">'+getMonthS(now)+ " " + now.getFullYear() + '</div><div class="mask"></div></div>')
                  .css({heigth:th,line_height:th})
                  .appendTo(timeline);

    var point_w2 = Math.floor10(parseFloat(css(point.get(0),'width'))/2); 
    if(i == 0) 
    { 
      prevPosition = w2;
      prevPositionLeft = w2 - point_w2;
    }
    else 
    {       
      prevPosition += timeline_period_w;
      prevPositionLeft = prevPosition - point_w2;
    }
    point.css({left: prevPositionLeft });

    if(i!=0)
    { 
      humans.forEach(function(d)
      {
        if(d.event_by_period_sum[i-1] > 0)
        {
          var rew = $('<div class="reward" data-id="'+i+'"  data-count="'+d.event_by_period_sum[i-1]+'"></div>').appendTo(d.carpet);
          for(j = 0; j < 6; ++j)
          {
            for(q = 0; q < d.event_by_period[i-1][j]; ++q)
            {
              $('<div class="item ' + interest[j].class  + '"></div>').appendTo(rew);
            }
          }
          rew.css({heigth:th,line_height:th});
          rew.css({left: prevPosition - interest_w2});
          if(i<=gap.pos) { rew.hide();}
        }
      });    
    }
    
    if(i != pos_max)
    {
      for(var j = 0; j < reward_period-1; ++j)
      {
        if(j % 3 == 2)
         $('<div class="serif"></div>').css({ left: prevPosition+(j+1)*timeline_month_w,heigth:th,line_height:th }).appendTo(timeline);
      }
    }
  }
 
  $('.treasure .red-carpet').css({width:pos_max*w}); 
  timeline.css({width:pos_max*w}); 

}
function timeline_point_redraw()
{
  for(var i = 0; i <= pos_max; ++i) 
  {
    var now = new Date(today.getFullYear(),today.getMonth()+i*reward_period,1,0,0,0,0); // only for declaration 
    var point = timeline.find('.point-in-time[data-time=' + now.getTime() + ']').css({heigth:th,line_height:th});    

    var point_w2 = Math.floor10(parseFloat(css(point.get(0)),'width')/2); 
    if(i == 0) 
    { 
      prevPosition = w2;
      prevPositionLeft = w2 - point_w2;
    }
    else 
    {       
      prevPosition += timeline_period_w;
      prevPositionLeft = prevPosition - point_w2;
    }
    point.css({left: prevPositionLeft });

    if(i!=0)
    { 
      humans.forEach(function(d)
      {
        if(d.event_by_period_sum[i-1] > 0)
        {
          var rew = d.carpet.find('.reward[data-id=' + i + ']').css({heigth:th, line_height:th, left: prevPosition - interest_w2});
          if(i<=gap.pos) { rew.hide(); }
        }
      });
    }
    
    if(i != pos_max)
    {
      for(var j = 0; j < reward_period-1; ++j)
      {
        timeline.find('.serif:nth-child('+(j+1)+')').css({ left: prevPosition+(j+1)*timeline_month_w,heigth:th,line_height:th });
      }
    }
  } 
  $('.treasure .red-carpet').css({width:pos_max*w}); 
  timeline.css({width:pos_max*w}); 

}
/***************************************************************
                        ON EACH TICK
***************************************************************/
function calculate_process(v)
{
  if(gap.pos >= 0)
  {    
    var tmp =  Math.floor10(total_scrolls/(scroll_per_month*scrolls_for_score))*scrolls_for_score;
    humans.forEach(function(d)
    {      
      d.tsalary = tmp*d.salary;
      d.tsaved = tmp*d.saving_for_tick;
    });     
  }  
}
function walk_process(v)
{
  if(v==1)
    h_go_right();
  else if(v == -1)
    h_go_left();          
 
  $('.canvas, .treasure .red-carpet').css({left:-total_scrolls*(timeline_month_w/scroll_per_month)});
}
function any_reward()
{
  humans.forEach(function(d){    
    if(d.has_future_reward()) { ++queueAmount; reward = true; }
  });
  return queueAmount == 0 ? false : true;
}
function reward_process()
{
  humans.forEach(function(d){
    if(d.has_future_reward()) 
    { 
      d.queue.push(function() { d.pedestal.fill(); });
      //d.queue.push(function() { prepare_for_reward(d); });      
      d.queue.push(function() { card_prepare(d);  });
      //d.queue.push(function() { d.mutate(1); });
      //d.queue.push(function() { hide_card(d); });
      //d.queue.push(function() { prepare_for_work(d); });
      d.queue.start();
      player.play('award'); 
    }
  });
}
function gopast()
{
  humans.forEach(function(d){
    if(d.event_by_period_sum[gap.pos]>0) 
    { 
       var rew = $('.'+d.place + ' .treasure .red-carpet .reward[data-id='+(gap.pos+1)+']');
       rew.show();         
       d.card.prev();
    }
  });
}
function card_prepare(v)
{
  var c = gap.pos > prev_pos;
  var rew = $('.'+v.place + ' .treasure .red-carpet .reward[data-id='+gap.pos+']');
  if(c) rew.hide(); 
  else res.show();  

  v.queue.resume();  
}
function prepare_for_reward(v)
{
  var cur = $('.' + v.place);
  var stage = cur.find('.stage');
  var init_left_pos = stage.offset().left;  
  v.walk_distance = cur.find('.character').offset().left - stage.find('.fg .o').offset().left;
  v.distance = w2 - stage.find('.fg .o').offset().left + 110;

  var hSteps = Math.round10(v.walk_distance/(v.width*img_scaler/2.3));

  var nextSecond = 1;

  stage.animate({ "color": 'white'}, {
    duration: hSteps * 130,
    progress:function(a,b,c){
      $(this).css({'left':init_left_pos + v.distance*b});
      if(nextSecond < (hSteps)*b)
      {
        ++nextSecond;
        v.prepare_reward(b,true);
      }
    },
    complete:function()
    {      
      v.stand_movement('l');      
      v.queue.resume();  
    }
  });
}
function prepare_for_work(v)
{  
  var cur = $('.' + v.place);
  var stage = cur.find('.stage');
  var init_left_pos = stage.offset().left;  
  var hSteps = Math.round10(v.walk_distance/(v.width*img_scaler/2.3));

  var nextSecond = 1;

  stage.delay(2000).animate({  "color": 'white'},{
    duration: hSteps * 130,
    progress:function(a,b,c){
      $(this).css({'left': init_left_pos - v.distance*b});
      if(nextSecond < (hSteps)*b)
      {
        ++nextSecond;
        v.prepare_reward(b,false);
      }
    },
    complete:function()
    {
      v.prepare_reward(1,false);
      v.stand_movement();
      v.queue.resume();     
    }
  });
}
function hide_card(v)
{
  v.card.hide();
  v.queue.resume();  
}

/***************************************************************
                     ON EACH TICK END
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
function params_init()
{
  if(params_read())
  {
    params_validate();
  }
}
function params_read()
{
  var hash = window.location.hash._trimLeft('#'); 
  hash = Base64.decode(hash);
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
    return true;
  } 
  return false;
}
function params_validate()
{
  steptogo = 0;
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
  if(steptogo == 5 && exist(params.p) && isDecimal(params.p) && params.p >= 0 && params.p <= 100)
  {       
      steptogo = 6;
      user.salary_percent = params.p;
      sendUserData();
  }  
  if(steptogo == 6 &&  exist(params.t) && isNumber(params.t))
  {
    if(params.t >=0 && params.t <= pos_max)
    {
      if(can_scroll((+params.t+1)*scrolls_for_reward))
      {
        gap.pos = +params.t;    
        total_scrolls = gap.pos*scrolls_for_reward;        
      }
    }
    else
    {
      if(params.t > pos_max)
      {
        pos = pos_max;
        total_scrolls = (pos)*scrolls_for_reward;
        epilogue();
      }
    }
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
    hash = Base64.encode(hash)
    if(!hist) history.pushState({'hash':hash},'',window.location.pathname + "#" + hash); 
  }  
}
function params_time_set()
{
  var hash = "";
  for(var i = 0; i < steptogo; ++i)
    hash+= "&" + hash_map[i].alias + "=" + user[hash_map[i].name];
  hash+= "&t=" + gap.pos;

  if(hash[0]=='&') hash=hash.substr(1); 
  hash=Base64.encode(hash);
  if(!hist) history.pushState({'hash':hash},'',window.location.pathname + "#" +  hash);
}
// function params_back()
// {

//     // var indexTmp = 0;
//     // var order = ['g','a','c','s','i','p','t'];
//     // for(var i = 0; i < 7; ++i)
//     // {       
//     //   if(typeof params[order[i]] !== "undefined") indexTmp = i;
//     //   else break;
//     // }
//     // var loc = "#";
//     // for(var i = 0; i <= indexTmp; ++i)
//     // {
//     //   loc+= order[i] + "=" + params[order[i]] + "&";
//     // }
//     // loc = loc.slice(0,-1);

//    // window.location.hash = Base64.encode(loc);
//    // window.location.reload();
// }
// when all data is collected, send data to server
function sendUserData(fin)
{
  fin = typeof fin === "undefined" ? false : fin;

  var data = {};
  data.user = user;
  data.flag = fin;
  $.ajax({
    type: "POST",
    url: "game/poll",
    data: data,
    success:function(d)
    {
      user.sended = d.finished;
    },
    error:function(d)
    {
      //console.log("User information wasn't saved, server error");
    }
  })
}
function start_by_time()
{  
  var tmp = gap.pos*reward_period;
  humans.forEach(function(d)
  {
    d.tsalary = tmp*d.salary;
    d.tsaved = tmp*d.saving_for_tick;

  });     
}
/***************************************************************
                  General Functions End
***************************************************************/
/***************************************************************
                  Key Hooks
***************************************************************/
jwerty.key('space', function(){     
    s.find(".m.character").animate({ top: male.y - male.height/3 }).animate({ top: male.y });  
    s.find(".f.character").animate({ top: female.y - female.height/3 }).animate({ top:female.y });  
});
jwerty.key('arrow-right', function(){
  walk(1); 
});
jwerty.key('arrow-left', function(){
  walk(-1); 
});
/***************************************************************
                  Key Hooks End
***************************************************************/
/***************************************************************
                  Tiptip module
***************************************************************/
var tiptip_padding = 5;
var tiptip = {
  tip:null,
  p:null,
  zindex:0,
  padding:5
};
$(document).on('mouseenter','.tip',function(){
  var t = $(this);
  var type = t.attr('data-tip-type');
  if(type === undefined) type = 'coin';

  tiptip.p = t;
  tiptip.tip = $("<div class='tiptip tip-" + type + "'></div>").insertAfter(t);

  var wTmp = t.width();
  var wTmp2 = wTmp/2;
  var custCss = {};
  custCss['height'] = t.height() - tiptip.padding * 2;
  custCss['zIndex'] = 700;

  if(type == 'coin')
  {
    custCss['top'] = t.offset().top;
    custCss['left'] = t.offset().left +  wTmp2;
    custCss['padding-left'] = wTmp2+10;
  }
  else if(type == 'logo')
  {
    custCss['top'] = t.offset().top;
    custCss['left'] = 0;
    custCss['padding-left'] = wTmp+10;  
  }
  else if (type == 'settings')
  {
    custCss['top'] = t.offset().top;
    custCss['right'] = 0;
    custCss['padding-right'] = wTmp;     
  }
  else if(type == 'about')
  {
    custCss['bottom'] = 0;
    custCss['left'] = 0;
    custCss['padding-left'] = wTmp;     
  }
  tiptip.tip.html(t.attr('data-tip')).css(custCss).show();
  tiptip.zindex = t.css('zIndex');
  t.css('zIndex',701);
});
$(document).on('mouseleave','.tip',function()
{
  tiptip.p.css('zIndex',tiptip.zindex);
  tiptip.tip.remove();
});
function tiptip_destroy()
{
  tiptip.p.css('zIndex',tiptip.zindex);
  tiptip.tip.remove();
}
/***************************************************************
                  Tiptip module end
***************************************************************/
function timetravel_back()
{
  game_jump(-1);
}
function timetravel_forw()
{
  game_jump(1);
}

/***************************************************************
                          Epilogue
***************************************************************/
function epilogue()
{
  gameoff();
  player.background_stop();
  if(isf()) category.outrun == 0 ? player.play('endbad') : player.play('endgood');
  else category.outrun == 0 ? player.play('endgood') : player.play('endbad');
  sendUserData(true); // on finish update poll data
  
  var t = $("<div class='epilogue'><div class='slider'><div class='summary'><div class='content'></div></div><div class='whatnext'><div class='whatnext-trigger up'><div class='arrow up'></div></div><div class='content'></div></div></div></div>").appendTo(s.parent());

  t.find('.whatnext .content').html($('.about-window .content').html());
  resizeCallback = function()
  {
    epilogue_redraw();
  }
  epilogue_redraw();

  $.getJSON( "game/summary?b=" + window.location.hash.substr(1), function( data ) {
    t.find('.summary .content').html(data.s);
    t.find('.whatnext .whatnext-trigger').on('mouseenter',function(){ epilogue_trigger(); });
    s.fadeOut(3000);
    t.fadeIn(3000);
  });
}
function epilogue_redraw()
{
  var t = $('.wrapper .epilogue');
  t.find('.summary').css('height',h-62);
  t.find('.whatnext').css('height',h-42);
  t.find('.slider').css('top', epilogueUp ? 0 : -h+104);
}
function epilogue_trigger()
{
  var slider = $('.wrapper .epilogue .slider');  
  var whatnext_trigger = slider.find(".whatnext .whatnext-trigger");
  var whatnext_trigger_arrow = whatnext_trigger.find('.arrow');

  slider.animate({top: epilogueUp ? -1*($(window).height())+104 : 0 },
  {
    duration:1500,
    start:function()
    {
      whatnext_trigger.off("mouseenter");
      epilogueTmp = true;
    },
    progress:function(a,b,c)
    {
      if(epilogueTmp && b > 0.5)
      {
        epilogueTmp = false;
        whatnext_trigger.toggleClass('down up');
      }
    },
    complete:function()
    {
      
      whatnext_trigger.on('mouseenter',function(){ epilogue_trigger()});
      epilogueUp=!epilogueUp;
    }
  });
}
/***************************************************************
                          Epilogue End
***************************************************************/
/***************************************************************
                          Buttons
***************************************************************/
function sound_button()
{
  // sound button init with binding click event for muting
  var volume = wr.find('> .volume');
  if(init)
  {
    volume.data('state',1);
    volume.click(function(){
      if(+volume.data('state') == 1)
      {
        volume.removeClass('on').addClass('off').data('state',0);
        player.mute();
      }
      else
      {
        volume.removeClass('off').addClass('on').data('state',1);
        player.unmute();
      }
    });
  }
  volume.show();
}
function about_button()
{ 
  var about = wr.find('> .about');
  var about_window = wr.find('> .about-window');

  if(init)
  {
    about.click(function(){
      gameoff();
      wr.find('.about-window').fadeIn(500,function(){
        $(document).click(function(){
          gameon();
          $(this).off('click');
          about_window.hide();
        });        
      });

    });    
    //about_window.click(function(){ $(this).hide(); });
  }
  about.show();
}
function settings_button()
{
  var settings = wr.find('> .settings');
  var settings_bar = wr.find('> .settings-bar');
  var sbar_w = 140;  
  if(init)
  {
    
    settings.click(function()
    {     
      settings.toggleClass('on off');

      if(settings.hasClass('on')) { gameoff(); tiptip_destroy(); settings.removeClass('tip');  }
      else { gameon(); settings.addClass('tip'); }
      
      var togo = settings.hasClass('on') ? 0 : -sbar_w;
      
      settings.animate({right:togo+sbar_w},{ duration:1000 });  
      settings_bar.animate({right:togo},{ duration:1000 });     


    });
    settings_bar.click(function(){

        gameon();
        settings.addClass('tip');
        
        var togo = settings.hasClass('on') ? -sbar_w : 0;
        settings.toggleClass('on off');
        settings.animate({right:togo+sbar_w},{ duration:1000 });  
        settings_bar.animate({right:togo},{ duration:1000 });     
    });
    settings_bar.find('.options .edit').click(function(){ wr.find('*').clearQueue().finish();  gameoff(); poll.show(true); });
  }
  settings_bar_fill();
  settings_bar.show();
  settings.show();
}
function settings_bar_fill()
{
   var opts = wr.find('.settings-bar .options');
    opts.find('.option.gender > div.value').text(isf()?locale.general.female:locale.general.male);
    opts.find('.option.age > div.value').text(user.age);
    opts.find('.option.category > div.value').text(category.name);
    opts.find('.option.salary > div.value').text(user.salary);
    opts.find('.option.interest > div.value').text(interests.filter(function(a){ return a.id == user.interest; })[0].name);
    opts.find('.option.saving > div.value').text(user.salary*user.salary_percent/100);

}
function share_button()
{
  var share = $('.wrapper > .share');
  if(init)
  {
    $(document).ready(function() {
      $.ajaxSetup({ cache: true });
      // js.src = "//connect.facebook.net/en_US/sdk/debug.js";    
       $.getScript('//connect.facebook.net/en_UK/sdk.js', function()
       {
         FB.init({
           appId: '737141426318491',
           xfbml      : true,
           version    : 'v2.1'
         });     
        $(document).on('click','.share, .fb, .sum-share',function()
        {
          FB.ui({
            method: 'share',
            href: "http://dev-tanastsoroba.jumpstart.ge/en/game/share?b=" + window.location.hash.substr(1)
          }, function(response){
             if (response && !response.error_code) {
                console.log('Posting completed.');
             } else {
                console.log('Error while posting.');
             }
          });          
        });
      });
    });
  }
  share.show()
}
/***************************************************************
                          Buttons End
***************************************************************/

function popup(text,lbtn,rbtn,lcallback,rcallback,klass)
{
  var popup = wr.find('.popup');
  if(typeof klass !== 'undefined') popup.addClass(klass);
  popup.find('.content .text').html(text.toUpperCase());
  popup.find('.buttons .left span').html(lbtn.toUpperCase());
  popup.find('.buttons .right span').html(rbtn.toUpperCase());
  popup.find('.buttons .left').click(function(){ gameon(); popup.hide(); if(typeof klass !== 'undefined') popup.removeClass(klass); lcallback(); });
  popup.find('.buttons .right').click(function(){ gameon(); popup.hide(); if(typeof klass !== 'undefined') popup.removeClass(klass);  rcallback(); });
  popup.find('.shield').click(function(e){
    gameon();
    popup.hide();    
    if(typeof klass !== 'undefined') popup.removeClass(klass);
    e.stopPropagation();
  });
  popup.fadeIn(1000);
}
function sorry_popup()
{
  show_not_enough_prompt = false;
  gameoff();
  popup(
    lg.sorry.replace('&1',user.salary*user.salary_percent/100).replace('&2',interests.filter(function(a){ return a.id == user.interest; })[0].name),
    lg.another_interest,
    lg.continue_anyway,
    function()
    {  
      poll.show(true,true);
    },function(){ },
    'sorry'
  );
}
function wanna_jump_popup()
{
  show_jumper_prompt = false;
  gameoff();        
  popup(
    lg.wanna_jump.replace('&1',user.salary*user.salary_percent/100).replace('&2',jumper_threshold+2),
    lg.yes,
    lg.no,
    function(){ game_jump(1,jumper_threshold); },
    function(){ }    
  );
}