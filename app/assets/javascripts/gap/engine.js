/*
* @description application initialization step, called after DOM elements and resources are loaded
*/
function init()
{
  redraw(); // recalculate all dimensions 
  params_init();

  s = $('#screen');    
  s3 = d3.select('#screen');    

  if(!isAssetsLoaded) Game.Loader.load();
}
function afterinit()
{
  scr_clean();
  sound_button();
  share_button();
   if(steptogo < 6) 
      poll.show();
    else 
    {      
      game_init(); game_on_load();
    }
    // test
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
    redraw_game();
    redraw_timeline();
    stage_init(0);
  }
}
function redraw_game()
{            
  var t = $("#screen .top").height(lh).css('top',0);
  t.find('.score').css({ left: w-t.find('.score').width()-30}); 
  t.find('.treasure').css({ top : lh - 50 - 10 });

  $("#screen .timeline").height(th).css('top',h2-th/2);
  if(gap.pos >= 0)
  {      
    $('.canvas, .treasure .red-carpet').css({left:-total_scrolls*(timeline_month_w/scroll_per_month)}); 
  }

  var b = $("#screen .bottom").height(lh).css('top',lh+th);
  b.find('.score').css({ left: w-b.find('.score').width()-30, top: lh + th + 20});
  b.find('.treasure').css({ top: lh + th + 10 });

  redraw_human();
}
function redraw_human(v)
{
  if(typeof v === undefined) v = null;
  male.position(v);
  female.position(v);
}
function redraw_timeline()
{
  if(pos_max != null) 
  {
    timeline_point_draw();
  }
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
    if(gap.pos+1>pos_max) { epilogue(); return; }
    if(total_scrolls % scrolls_for_reward == 0)
    {
      ++gap.pos;
      calculate_process(v);
      if(!reward) 
      { 
        if(any_reward())
        {
          reward_process(v); needWalk = false;
        }
      }  
    }  
  }
  else
  {
    if(gap.pos >= 0 && total_scrolls % scrolls_for_reward != 0 && (total_scrolls - Math.floor10(total_scrolls/scrolls_for_reward)*scrolls_for_reward) % (scrolls_for_reward-1) == 0)
    {      
      --gap.pos;      
      calculate_process(v);
      gopast();
    }
  }
  if(needWalk) walk_process(v);
  else walk_process(0);
}
function can_scroll(v)
{  
  return v >= 0 && v < life_scroll_count;
}
function sound_button()
{
  // sound button init with binding click event for muting
  if(s.parent().find('.volume').length == 0)
  {
    var volume = $('<div class="volume on"></div>').appendTo(s.parent());
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
}
function share_button()
{
  if(s.parent().find('.share').length == 0)
  {
    $(document).ready(function() {
      var share = $('<div class="share">Share</div>').appendTo(s.parent());
      $.ajaxSetup({ cache: true });
      // js.src = "//connect.facebook.net/en_US/sdk/debug.js";    
       $.getScript('//connect.facebook.net/en_UK/sdk.js', function()
       {
         FB.init({
           appId: '737141426318491',
           xfbml      : true,
           version    : 'v2.1'
         });     
        $('.share').click(function()
        {
          FB.ui({
            method: 'share',
            href: "http://dev-tanastsoroba.jumpstart.ge/en/gap/share?b=" + window.location.hash.substr(1)
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
}
var epilogueUp = true;
function epilogue()
{
  gameoff();
  //scr_clean();
  //s.toggleClass(sepilogue.class);
  sendUserData(true); // on finish update poll data
  if($('epilogue').length) return;

  var t = $("<div class='epilogue'><div class='slider'><div class='summary'><div class='content'></div></div><div class='whatnext'><div class='whatnext-trigger'><div class='arrow arrow-up'></div></div><div class='content'></div></div></div></div>").appendTo(s.parent());
  var whatnext = t.find('.whatnext');
  whatnext.css({ width: w-20, height:h-20, display:'inline-block' }).find('.content').text("General Data");

  $.getJSON( "gap/summary?" + window.location.hash.substr(1), function( data ) {
    t.find('.summary').css({ width: w-20, height:h-120 }).find('.content').html(data.s);
    whatnext.find('.whatnext-trigger').on('mouseenter',function(){ epilogue_trigger(t)});
    t.css({width: w-20, height:h-20 }).fadeIn(fade_time, "linear");
  });
  
}
function epilogue_trigger(t)
{
  var whatnext_trigger = $(".whatnext-trigger");
  var summary = t.find(".summary");
  var slider = t.find(".slider");
  var whatnext_trigger_arrow = whatnext_trigger.find('.arrow');
  slider.animate({top: epilogueUp ? -1*(h-20)+100 : 0 },
  {
    duration:1000,
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
        whatnext_trigger_arrow.toggleClass('arrow-down arrow-up');
      }
      whatnext_trigger_arrow.css('opacity', b<0.5 ? 1-b*2 : b);
    },
    complete:function()
    {
      whatnext_trigger.on('mouseenter',function(){ epilogue_trigger(t)});
      epilogueUp=!epilogueUp;
    }
  });
}
function gameon() { ingame = true; }
function gameoff() { ingame = false; clearInterval(noscrollTimerId); }
function game_on_load()
{
  setTimeout(function(){
  animated = true;
  var tools = category.stage.frame.load;
  male.animate(tools);
  female.animate(tools);
  },1000);
  // animate humans to starting position (inside object where they work)
}
function game_init() {
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
 
  scr_clean();
  
  var tstr =  '<div class="score"><div class="tsalary"><div class="label">'+locale.game.total_salary+'</div><div class="value">0</div></div>'+
                '<div class="tsaved"><div class="label">'+locale.game.total_saved+'</div><div class="value">0</div></div></div>' + 
              '<div class="treasure"><div class="pedestal"></div><div class="red-carpet"></div></div>' + 
              '<div class="stage"><div class="bg"></div><div class="fg"></div></div>';

  var t = $('<div class="top"></div>').appendTo(s)
    .append(tstr)
    .append('<div class="'+(male.place == "top" ? 'm' : 'f')+' character"></div>');
  timeline = $('<div class="timeline"><div class="canvas"></div></div>').appendTo(s).find('.canvas');
  var b = $('<div class="bottom"></div>').appendTo(s)
    .append(tstr)
    .append('<div class="'+(male.place == "top" ? 'f' : 'm')+' character"></div>');

  male.init();
  female.init();
  
  male.oppenent = female;
  female.oppenent = male;

  male.prepare_for_game();
  female.prepare_for_game();

  male.pedestal.resume_by_position();
  female.pedestal.resume_by_position();

  timeline_point_draw();

  draw_stage(0);


  redraw_game();

  player.background_play();  
}
var img_scaler =  1;
var bg_width = 0;
var stage_offset = 0;
var bg_initial_height = 0;
var fgw = 0;
var fgh = 0;
function draw_stage(v)
{
  var bg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .bg');
  var fg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .fg');

  var bgOriginal = assets.filter(function(a){ return a.name == category.bg; })[0].element;  
  var bgFirst = bgOriginal.clone();

  bg.append(bgFirst);
  bg_initial_height = bgFirst.height();
  img_scaler = lh / bg_initial_height;
  bgFirst.css({ height:lh });

  bg_width = bgFirst.width();
  stage_offset = (w - bg_width)/2;

  var bg_to_viewport = bg_width;
  while(bg_to_viewport < w+w2)
  {
    bgOriginal.clone().css({ top:0,left:bg_to_viewport, height:lh }).appendTo(bg);
    bg_to_viewport+=bg_width;
  }
  var fgOriginalI = assets.filter(function(a){ return a.name == category.fg+'_i'; })[0].element;
  var fgOriginalO = assets.filter(function(a){ return a.name == category.fg+'_o'; })[0].element;

  var fg_i = fgOriginalI.clone().appendTo(fg);

  fgw = fg_i.width();
  fgh = fg_i.height();

  fg_i.addClass('i').css({ "height":fgh*img_scaler });
  fg_i.css({left: w2 - fg_i.width()/2 ,top:lh - fg_i.height()});

  var fg_o = fgOriginalO.clone().appendTo(fg);
  fg_o.addClass('o').css({ "height":fgh*img_scaler });
  fg_o.css({left: w2 - fg_i.width()/2 ,top:lh - fg_i.height()});

  if(v===0) draw_stage(1);

}
function stage_init(v)
{
  var bg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .bg');
  var fg = $('.'+((v === 0) ? 'top' : 'bottom')+' .stage .fg');

  var bgOriginal = assets.filter(function(a){ return a.name == category.bg; })[0].element;
  var bgs = bg.find('img');
  var bgFirst = $(bgs[0]);
  
  img_scaler = lh / bg_initial_height;
  bgFirst.css({ height:lh });
  bg_width = bgFirst.width();
  stage_offset = (w - bg_width)/2;
  var bg_to_viewport = bg_width;

  var i = 2;
  while(bg_to_viewport < w+w2)
  {
    var tmp = bg.find('img:nth-child('+i+')');
    if(tmp.length)
    {
      tmp.css({ top:0,left:bg_to_viewport, height:lh })
    }
    else 
    {
      bgOriginal.clone().css({ top:0,left:bg_to_viewport, height:lh }).appendTo(bg);
    }
    bg_to_viewport+=bg_width;
    ++i;
  }
  while(i <= bgs.length+1)
  {
    $(bgs[i-1]).remove();
    ++i;
  }
  

  var fg_i = fg.find('img.i');
  fg_i.addClass('i').css({ "height":fgh*img_scaler });
  fg_i.css({left: w2 - fg_i.width()/2 ,top:lh - fg_i.height()});

  var fg_o = fg.find('img.o');
  fg_o.addClass('o').css({ "height":fgh*img_scaler });
  fg_o.css({left: w2 - fg_i.width()/2 ,top:lh - fg_i.height()});

  if(v==0) stage_init(1);
}
function timeline_point_draw()
{
  
  var scaler = timeline_period_w/reward_period;
  for(var i = 0; i <= pos_max; ++i) 
  {

    var now = new Date(today.getFullYear(),today.getMonth()+i*reward_period,1,0,0,0,0); // only for declaration 
    if(!timeline.find('.point-in-time[data-time=' + now.getTime() + ']').length)
    {
      var point = $('<div class="point-in-time" data-time="'+ now.getTime()+'"><div class="point">'+getMonthS(now)+ " " + now.getFullYear() + '</div><div class="mask"></div></div>').appendTo(timeline);
      point.css({heigth:th,line_height:th});
      
      if(i == 0) 
      { 
        prevPosition = w2;
        prevPositionLeft = w2 - Math.floor10(point.width()/2);
      }
      else 
      {       
        prevPosition += timeline_period_w;
        prevPositionLeft = prevPosition - Math.floor10(point.width()/2);
      }
      //console.log(prevPosition,prevPositionLeft);
      point.css({left: prevPositionLeft });

      if(i!=0)
      { 
        var mCountTmp = 0;
        var fCountTmp = 0;
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
          rew.css({left: prevPosition - interest_w2});
          if(i<=gap.pos) { rew.hide();}
          for(var j = 0; j < mCountTmp; ++j)
          { 
             $('<div class="item ' + interest[0].class  + '"></div>').appendTo(rew);
          }
        }
        if(fCountTmp > 0)
        {
           var rew = $('<div class="reward" data-id="'+i+'"></div>').appendTo($('.'+female.place+' .treasure .red-carpet'));
            rew.css({heigth:th,line_height:th});
            rew.css({left: prevPosition - interest_w2}); //+ indm*rew.width()+(indm>0?10:0)});
            if(i<=gap.pos) { rew.hide();}
          for(var j = 0; j < fCountTmp; ++j)
          { 
             $('<div class="item ' + interest[0].class  + '"></div>').appendTo(rew);
          }
        }
      }
      
      if(i != pos_max)
      {
        for(var j = 0; j < reward_period-1; ++j)
        {
           $('<div class="serif"></div>').css({ left: prevPosition+(j+1)*scaler,heigth:th,line_height:th }).appendTo(timeline);
           //console.log(prevPosition,prevPosition+(j+1)*scaler);
        }
      }

      point.find('.point').text(getMonthS(now) + " " + now.getFullYear());    
      point.attr('data-time',now.getTime());
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
  if(v==1)
    h_go_right();
  else if(v == -1)
    h_go_left();          
 
  $('.canvas, .treasure .red-carpet').css({left:-total_scrolls*(timeline_month_w/scroll_per_month)});
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
  //player.play('applause');  
  humans.forEach(function(d){
    if(d.has_future_reward()) 
    { 
      d.queue.push(function() { card_prepare(d);  });
      d.queue.push(function() { prepare_for_reward(d); });      
      d.queue.push(function() { d.mutate(1); });
      d.queue.push(function() { start_reward_animation(d); });
      d.queue.push(function() { hide_card(d); });
      d.queue.push(function() { prepare_for_work(d); });
      d.queue.start();
    }
  });
}
function gopast()
{
  humans.forEach(function(d){
    if(d.event_by_period[gap.pos]>0) 
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
  if(c)
  {
    rew.hide();    
    v.card.next();
  }
  else
  {
    rew.show();         
  }
  v.queue.resume();  
}
var move_size = -300;
function prepare_for_reward(v)
{
  var bg = $('.' + v.place + ' .stage .bg');
  var fg = $('.' + v.place + ' .stage .fg');

  bg.animate({  "color": 'white'},{duration:400,
    progress:function(a,b,c){
      bg.css({'left':move_size*b});
      fg.css({'left':move_size*b});
      v.prepare_reward(b,true);
    },
    complete:function()
    {
      v.queue.resume();     
    }
  });
}
function prepare_for_work(v)
{  
  var bg = $('.' + v.place + ' .stage .bg');
  var fg = $('.' + v.place + ' .stage .fg');
  bg.animate({  "color": 'white'},{duration:400,
    progress:function(a,b,c){
      bg.css({'left':move_size - move_size*b});
      fg.css({'left':move_size - move_size*b});
      v.prepare_reward(b,false);
    },
    complete:function()
    {
      v.queue.resume();     
    }
  });
}

function hide_card(v)
{
  v.card.hide();
  v.queue.resume();  
}

function start_reward_animation(v)
{
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
        start_by_time();
      }
    }
    // else
    // {
    //   if(params.t > pos_max)
    //   {
    //     pos = pos_max;
    //     total_scrolls = (pos)*scrolls_for_reward;
    //     epilogue();
    //   }
    // }

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
    hash = Base64.encode(hash);
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
  hash = Base64.encode(hash);
  if(!hist) history.pushState({'hash':hash},'',window.location.pathname + "#" + hash);
}
function params_back()
{
  if(params_read())
  {
    var indexTmp = 0;
    var order = ['g','a','c','s','i','p'];
    for(var i = 0; i < 6; ++i)
    {       
      if(typeof params[order[i]] !== "undefined") indexTmp = i;
      else break;
    }
    var loc = "#";
    for(var i = 0; i < indexTmp; ++i)
    {
      loc+= order[i] + "=" + params[order[i]] + "&";
    }
    loc = loc.slice(0,-1);

    window.location.hash = Base64.encode(loc);
    window.location.reload();
  } 
}
// when all data is collected, send data to server
function sendUserData(fin)
{
  fin = typeof fin === "undefined" ? false : fin;

  var data = {};
  data.user = user;
  data.flag = fin;
  $.ajax({
    type: "POST",
    url: "gap/poll",
    data: data,
    success:function(d)
    {
      user.sended = d.finished;
      //console.log("Saved current user id will bi");
      //player.play('done');  
    },
    error:function(d)
    {
      //console.log("User information wasn't saved, server error");
    }
  })
}
function restart()
{
  $.removeCookie("_game_id");
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
                  Progress Bar
***************************************************************/
// function progress(val)
// {
//   if(val==100) 
//   {
//     intro_fade();
//   }
//   var $circle = $('#svg #bar');
  
//   if (isNaN(val)) {
//    val = 0; 
//   }
//   else{
//     var r = $circle.attr('r');
//     var c = Math.PI*(r*2);
   
//     if (val < 0) { val = 0;}
//     if (val > 100) { val = 100;}
    
//     var pct = ((100-val)/100)*c;
    
//     $circle.css({ strokeDashoffset: pct});
    
//     $('#cont').attr('data-pct',val);
//   }
// }
/***************************************************************
                  Progress Bar End
***************************************************************/
/***************************************************************
                  Key Hooks
***************************************************************/
jwerty.key('space', function(){ 
    console.log("jump");
    //s.find(".m.character").animate({ top: male.y - 100 }).animate({ top: male.y });  
    //s.find(".f.character").animate({ top: female.y - 100 }).animate({ top:female.y });  
});
jwerty.key('arrow-right', function(){
  walk(1); 
});
// jwerty.key('W', function(){
//   walk(1); 
// });
jwerty.key('arrow-left', function(){
  walk(-1); 
});
// jwerty.key('S', function(){
//   walk(-1); 
// });
/***************************************************************
                  Key Hooks End
***************************************************************/;