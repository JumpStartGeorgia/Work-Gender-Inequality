/*********************************************************
                  Poll Part Start
***************************************************************/

var poll = {
  p : null,
  stage :null,
  stage_d3 :null,
  ftmp : null,
  mtmp : null,
  previous_scroll_time : 0,
  knobCX : 144,
  knobCY : 144,
  knobR : 144,
  knobC : "green",
  indicatorRadius : 8,
  //degrees_male : [1,47,313], // first and last point in degrees for male , 1 means invert arc 
 // degrees_female : [0,133,227], // first and last point in degrees for male , 0 means general arc
  degrees : [1,125,321],
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
    
    poll.stage_size2 = poll.stage_size/2;

    scr_clean();
    this.init();    
    if(steptogo == 0)
      this.gender();
    else 
    {
      poll.draw_character();
      fn(hash_map[steptogo-1].nf); 
      //if(steptogo >= 1) poll.create_prev_button();
    };
    
    
  },
  init:function init()
  {    

    s3.append('div')
      .classed('poll',true)
        .selectAll('div')
        .data(['info', 'logo', 'stage'])
        .enter()
        .append('div')
        .attr('class',function(d){return d;});

    this.stage = s.find('.stage');
    this.stage_d3 = s3.select('.stage');
    
  },
  draw_character:function draw_character()
  {     
    $('.poll').addClass(g());
    s.find('.poll').append("<div class='selector'>" + 
                              "<div class='selected "+g()+" bypass'><div class='profile'><div class='face "+g()+"'></div><div class='t'>"+(isf() ? female.title.toUpperCase() : male.title.toUpperCase())+"</div><div class='a'>&nbsp;</div></div></div>" + 
                            "</div>" +
                            "<div class='prompt'>" + 
                              "<div class='title'><div class='text'></div></div>"+
                            "</div>"
                          ); 
    var picked = $('.poll > .selector > .' + g());
    picked.css('width','100%');
    picked.find('.profile').css({ position:'relative', left:0 });
    picked.find('.profile .face').css('margin','0px auto'); 
    poll.label(locale.poll.your_age);
    poll.create_navigation_buttons();
  },
  character_picked:function character_picked() // v selected gender, o oposite
  {
      is = true;   
      var bTmp = isf();
      var picked = $('.poll > .selector > .' + (bTmp ? 'f' : 'm'));
      var other =  $('.poll > .selector > .' + (bTmp ? 'm' : 'f'));

      var picked_profile = picked.find('.profile');
      var picked_w = picked_profile.width();
      var picked_left = picked_profile.position().left;
      var picker_width = picked_profile.parent().width();

      picked.animate(
          {color:'transparent'},
          { duration:1000, 
            progress:function(a,b,c)
            {             
              other.css('opacity',1-b);
              picked_profile.css('left', (!bTmp ? (picked_left - (b*(picked_w/2 + picked_left).toFixed(0))) : (picked_left + (b*(picker_width-picked_w/2-picked_left))).toFixed(0)) + 'px');             
            },
            complete:function()
            {
              other.remove();
              picked.css('width','100%');
              picked.find('.profile').css({ position:'relative', left:0 });
              picked.find('.profile .face').css('margin','0px auto'); 
               $('.poll .prompt').removeClass('gender');               
              $('.poll .prompt .title .text').text(locale.poll.your_age).fadeIn(1000);
              poll.age();
              is = false;
              poll.create_navigation_buttons();
            }
          });
  },
  gender:function gender()
  {
    s.find('.info').append("<div class='triangle'></div><div class='text'>"+locale.poll.about_game+"</div>");
    var margin_between = 100;
    s.find('.poll').append("<div class='selector selectable'>" + 
                              "<div class='left f'><div class='profile'><div class='face f'></div><div class='t'>"+female.title.toUpperCase()+"</div><div class='a'>&nbsp;</div></div></div>" + 
                            "<div class='right m'><div class='profile'><div class='face m'></div><div class='t'>"+male.title.toUpperCase()+"</div><div class='a'>&nbsp;</div></div></div>"+
                            "</div>" +
                            "<div class='prompt gender'>" + 
                              "<div class='title'><div class='larrow'></div><div class='text'>"+locale.poll.your_gender+"</div><div class='rarrow'></div></div>"+
                            "</div>"
                          );
    poll.label(locale.poll.your_gender); 

    var pollTmp = s.find('.poll');
    var left = pollTmp.find('.selector .left');
    var right = pollTmp.find('.selector .right');
    var prompt = pollTmp.find('.prompt .title');

    pollTmp.find('.selector .left, .selector .right').hover(
      function(){
        if($(this).parent().hasClass('selectable'))
        {
          if($(this).hasClass('left')) 
          {
            right.addClass('zoomout');
            prompt.find('> .larrow').addClass('hover');
          }
          else 
          {
            left.addClass('zoomout');
            prompt.find('> .rarrow').addClass('hover');
          }
        }

      },
      function(){ 
        pollTmp.find('> .selector > div').removeClass('zoomout');
        prompt.find('> div').removeClass('hover');
      });

    left.click(function(){ 
       $(this).addClass('selected');
       $(this).parent().removeClass('selectable').find('> div').off('click hover').removeClass('zoomout right left');       
       $('.poll .info, .poll > .prompt > .title > .larrow, .poll > .prompt > .title > .rarrow').fadeOut(1000,"linear", function(){ $(this).remove(); });
        $('.poll > .prompt > .title > .text').fadeOut(1000,"linear");
       f();
       poll.place_human_based_on_gender();
       poll.character_picked();
       
    });
    right.click(function(){ 
     $(this).parent().removeClass('selectable').find('> div').off('click hover').removeClass('zoomout right left');       
     $(this).addClass('selected');
     $('.poll .info, .poll > .prompt > .title > .larrow, .poll > .prompt > .title > .rarrow').fadeOut(1000,"linear", function(){ $(this).remove(); });
     $('.poll > .prompt > .title > .text').fadeOut(1000,"linear");
      m();
      poll.place_human_based_on_gender();
      poll.character_picked();

    });

  },
  age:function age()
  {    

    onscrollafter = null;      
    poll.label(locale.poll.your_age); 

    params_set(1);    
    
    s3.select('.poll').classed(g(),true);

    poll.next_function = function()
    {
      onscrolldown = null;
      onscrollup = null;
      $(document).off('mousedown');
      $('.age-mover').draggable('destroy');    
      s.find('.age-picker').remove();
      s.find('.profile .a').remove();
      
      poll.category(); 
    };

    poll.age_picker_show();


  },
  category:function category()
  {
    
    poll.label(locale.poll.your_job); 

    params_set(2); 

    user.category = user.category == null ? cat_ids[0] : user.category;
    poll.npicker_function = null;
    poll.next_function = function(){

      poll.choose_category();
      onscrolldown = null;
      onscrollup = null;
      user.salary = poll.category_salary();
      poll.stage_d3.select('.category-picker').remove();
      poll.stage_d3.select('.salary-picker').remove();

      poll.interest();
    };

    poll.category_picker_show();


  },
  interest:function interest()
  {
    poll.label(locale.poll.your_interest); 

    params_set(4); 

    user.interest = user.interest == null ? int_ids[0] : user.interest;
    poll.next_function = function(){
      
      poll.choose_interest();
      onscrolldown = null;
      onscrollup = null;
      poll.npicker_function = null;
      $('.character').off();
      poll.stage_d3.select('.interest-picker').remove();
      poll.stage_d3.select('.percent-picker').remove();
      params_set(6); 

      game_init(); //console.log(user);
      
    };
    poll.interest_picker_show();
  }, 
  category_picker_show:function category_picker_show()
  {
    var outer_radius = 200;
    var cat_radius = 26;
    var size = cat_radius*2; 
    var cat_step = 360/categories.length;

    var picker = d3.select('.poll .selector').append('div').classed("category-picker",true);

    poll.npicker_create('.poll .selector','.salary-picker',99999,poll.npicker_sal_size,h2,(w2+outer_radius*1.5),user.salary,locale.poll.your_salary);

    var pick_items = picker
    .selectAll("div")
    .data(categories)
    .enter()
    .append("div")
    .attr("class",function(d){return "category_item " + g(); }) 
    .attr("id",function(d){return "c"+d.id;})   
    .style("top", function(d,i){ return (h2 + (outer_radius) * Math.sin(Math.radians(i*cat_step)) - cat_radius) + 'px'; })
    .style("left", function(d,i){ return (w2 - (outer_radius) * Math.cos(Math.radians(i*cat_step)) - cat_radius) + 'px';})
    .on('click',function(d){ poll.by_category(d.id);});

    pick_items.append("img").attr({"width":'52px',"height":'52px'}).attr('src',function(d){ return '/assets/gap/svg/field/icons/'+d.fg+'.svg'; });
    pick_items.append("div").attr('class','hint').text(function(d){return d.name;});
    
    var xC = w2;
    var yC = h2;
    var lTmp = tTmp = 99999;
    var rTmp = bTmp = 0;
    var lTmpE,rTmpE,tTmpE,bTmpE;
     var curOffset = size/2;

    $('.poll .selector .category-picker .category_item div.hint').each(function(i,d){
      var dd = $(d);
      var ol = dd.offset().left;
      var ot = dd.offset().top;
      if(lTmp > ol) { lTmp = ol; lTmpE = dd; }
      if(rTmp < ol) { rTmp = ol; rTmpE = dd; }
      if(tTmp > ot) { tTmp = ot; tTmpE = dd; }
      if(bTmp < ot) { bTmp = ot; bTmpE = dd; }
      dd.css({  left: (ol < xC ? -1*(dd.outerWidth()-curOffset) : curOffset) ,
                top:  (ot < yC ? -1*(dd.outerHeight()+size+8) : 0) });
    });
    lTmpE.css({left:-1*(lTmpE.outerWidth() + 3),top:-1*( 4 + lTmpE.outerHeight()/2+curOffset)});
    rTmpE.css({left:(curOffset*2 + 3),top:-1*( 4 + rTmpE.outerHeight()/2+curOffset)});
    tTmpE.css({left:-1*(tTmpE.outerWidth()/2-curOffset),top:-1*( 4 + 4 + tTmpE.outerHeight()+2*curOffset)});
    bTmpE.css({left:-1*(bTmpE.outerWidth()/2-curOffset),top: 0});

    poll.category_draw();

    onscrollup=function(){ poll.category_down(); };
    onscrolldown=function(){ poll.category_up(); };


  },  
  category_draw:function category_draw()
  {    
    //d3.selectAll('.category-picker .category_item').classed('selected',false);     
    //poll.sublabel(d3.select('.category-picker .category_item#c'+user.category).classed('selected',true).select('text').text()); 
    //d3.select('.character').style('background-image','url(/assets/gap/svg/human/'+categories.filter(function(a){ return a.id == user.category; })[0].dress+'/'+user.gender+ (user.gender =='f' ? 'l':'r') + '.svg)');
  },
  category_up:function category_up()
  {
    var ind = cat_ids.indexOf(user.category);
    if(ind != -1)
    {
      user.category = ind < categories.length-1 ? cat_ids[ind+1] : cat_ids[0];
    }
    this.category_draw();   
  }, 
  category_down:function category_down()
  {
    var ind = cat_ids.indexOf(user.category);
    if(ind != -1)
    {
      user.category =  ind > 0 ? cat_ids[ind-1] : cat_ids[categories.length-1];
    }
    this.category_draw();
  },
  by_category:function by_category(v)
  {        
    if(user.category != v)
    {
      user.category = v; 
      this.category_draw();
    }
  },
  category_salary:function category_salary(v)
  {
    if(exist(v)) poll.npicker_set('.salary-picker',v,poll.npicker_sal_size);
    else return poll.npicker_get('.salary-picker.npicker',poll.npicker_sal_size);
  },
  age_picker_show:function age_picker_show()
  {
    var ap = this.stage_d3
    s.find('.poll .selector').append(
                            "<svg class='age-picker' width='288' height='288' style='top:"+(h2-288/2)+"px;left:"+(w2-288/2)+"px'>"+
                              "<path fill='none' stroke='#EED361' stroke-miterlimit='10' d='M256.383,233.715c19.512-24.406,31.176-55.357,31.176-89.034c0-78.81-63.888-142.696-142.697-142.696c-30.838,0-59.391,9.781-82.726,26.411'/>" + 
                              "<polyline fill='none' stroke='#EED361' stroke-miterlimit='10' points='257.653,221.191 256.403,233.715 267.653,231.197 '/>" + 
                              //"<path fill='none' stroke='#EAD343' stroke-miterlimit='10' d='M195.796,232.73c19.511-24.406,31.176-55.357,31.176-89.033C226.972,64.887,163.084,1,84.274,1C53.437,1,24.884,10.781,1.549,27.411'></path>"+
                              "<g class='age-mover' draggable='true' ondrag='poll.drag_age(event)'>" + 
                                "<circle fill='none' stroke='#DC5D39' stroke-width='0.7552' stroke-miterlimit='10' cx='9.995', cy='9.817', r='9.38'></circle>" + 
                                "<circle fill='#DC5D39' cx='9.995' cy='9.817' r='5' ></circle>" + 
                              "</g>" + 
                            "</svg>");
  

    var diff = max_age-min_age;

    var degree_sum = poll.degrees[1] + 360 - poll.degrees[2];
  
    poll.degree_step = degree_sum / (diff+1);
    for(var i = 0; i <= diff; ++i)
    {
      poll.degree_steps.push(poll.degrees[1] - (diff-i)*poll.degree_step);       
    }           
  console.log(degree_sum,diff,poll.degrees[1],degree_sum / diff,poll.degree_steps);

    $('.age-mover').draggable();

      $(document).on('click',function (e) {
          poll.agemousedown(e);
      });

    onscrollup = function(){ poll.age_up(); };
    onscrolldown = function(){ poll.age_down(); };
console.log('age picker show');
    poll.by_age(user.age);


  },
  age_check:function age_check()
  {     
      if(user.age<min_age) user.age = min_age;
      else if(user.age>max_age) user.age = max_age;   
  },
  age_up:function age_up()
  {
    this.age_check();
    if(user.age<max_age) ++user.age;
    this.agepicker_draw();  
  }, 
  age_down:function age_down()
  {
     
    this.age_check();
    if(user.age>min_age) --user.age;
    this.agepicker_draw();

  },
  by_age:function by_age(v)
  {      
    console.log('by age' , v);
    user.age = v;        
    this.age_check();
    this.agepicker_draw();
  },
  agepicker_draw:function agepicker_draw()
  {
      var rad = this.get_radian_by_age(user.age);
      console.log('user.age',user.age);
      var c = Math.cos(rad);
      var s = Math.sin(rad);

      var cx = this.knobR * c + this.knobCX;
      var cy = this.knobCY - this.knobR * s;      
      console.log(c,s,cx,cy);
      $(".age-mover circle").attr("cx",cx).attr("cy",cy);
      poll.sublabel(user.age);
  },
  agepicker_age_by_coord:function agepicker_age_by_coord(x, y){
     
    // given mousePosition, what is the nearest point on the knob
    // result = atan2 (y,x) * 180 / PI;
    var rad = Math.atan2(y,x);
    var degree = Math.degrees(rad);//degree_from_radian(Math.atan2(y,x)); //rad * 180 / PI;

    //console.log('before degree',degree);
    if(degree < 0 ) degree = 360 + degree;

    var inside = false;
    for(var i = 0; i < max_age-min_age; ++i)
    {
      var d1 = (360+this.degree_steps[i])%360;
      var d2 = (360+this.degree_steps[i+1])%360;
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
    if(!inside)
    {
      var d1 = (360+this.degrees[1])%360;
      var d2 = (360+this.degrees[2])%360;
      this.by_age((degree-this.degrees[1]<this.degrees[2]-degree ? min_age : max_age));
    }
  },
  get_degree_by_age:function get_degree_by_age(v)
  {
    var tmp = (v>=min_age && v<=max_age) ? this.degree_steps[v-min_age] : this.degrees[1];
    if(tmp < 0) tmp = 360 + tmp;   
    return tmp;
  },
  get_radian_by_age:function get_radian_by_age(v)
  {   
    console.log(v,min_age,max_age);
    var index = v-min_age; 
    if(poll.degrees[0] == 1)  index = max_age-min_age-(v-min_age);
    console.log(this.degree_steps[index],this.degrees[1]);

    var tmp = (v>=min_age && v<=max_age) ?  this.degree_steps[index] : this.degrees[1];
    if(tmp < 0) tmp = 360 + tmp; 

    return Math.radians(tmp);
  },
  drag_age:function drag_age(e) {
    var x = parseInt(e.x-w2);
    var y = parseInt(h2-e.y);
    this.agepicker_age_by_coord(x, y);
  },
  agemousedown:function agemousedown(e) {

    var x = parseInt(e.clientX-w2);
    var y = parseInt(h2-e.clientY);
    this.agepicker_age_by_coord(x, y);
  },
  interest_picker_show:function interest_picker_show()
  {
    var outer_radius = 280;
    var item_radius = 30;
    var size = item_radius*2; 
    var item_step = 360/interests.length;


    poll.stage_d3.select('.character').attr('data-percent',user.salary_percent);

    var picker = d3.select('.poll .selector').append('div').classed("interest_picker",true);

    var pick_items = picker
    .selectAll("div")
    .data(interests)
    .enter()
    .append("div")
    .attr("class",function(d){return "interest_item " + g(); }) 
    .attr("id",function(d){ return "i"+d.id;})   
    .style("top",function(d,i){ return h2 + (outer_radius) * Math.sin(Math.radians(i*item_step)) - item_radius })
    .style("left",function(d,i){ return w2 - (outer_radius) * Math.cos(Math.radians(i*item_step)) - item_radius;})
    .on('click',function(d){ poll.by_interest(d.id);});

    pick_items.append("img").attr({"width":'52px',"height":'52px'}).attr('src',function(d){ return '/assets/gap/svg/interest/icons/'+d.icon+'.svg'; });
    pick_items.append("div").attr('class','hint').text(function(d){return d.name;});

    poll.interest_draw();

   poll.npicker_function = function(v){ 
      v=+v; 
      if(user.salary >= v) {
        user.salary_percent = Math.round10((v*100)/user.salary);
        poll.stage_d3.select('.character').attr('data-percent',user.salary_percent);
        poll.sublabel(poll.stage_d3.select('.interest_picker .interest_item#i'+user.interest+' text').text() + " (" + user.salary_percent + "%)");         
        //poll.interest_percent_draw((v*100)/user.salary/100);
      }  
    }

    poll.npicker_create('.poll .selector','.percent_picker',user.salary,poll.npicker_sal_size,h2,(w2+(isf()?-180:0)),0,locale.poll.your_percent);

    // poll.stage.find(".character").on('DOMMouseScroll mousewheel', function(e, delta) {
    //   var tval = +$('.character').attr('data-percent');

    //   if(up(e,delta)) { if(tval < 100) ++tval; }
    //   else { if(tval > 0) --tval; }

    //   $('.character').attr('data-percent',tval);

    //   //poll.interest_percent_draw(tval/100);
    //   user.salary_percent = tval;
      
    //   poll.npicker_set('.percent_picker',Math.round10(user.salary*tval/100),poll.npicker_sal_size);      
    //   e.stopPropagation();  
    // });

    onscrollup=function(){ poll.interest_down(); };
    onscrolldown=function(){ poll.interest_up(); };
  },
  interest_draw:function interest_draw()
  {
    d3.selectAll('.interest_picker .interest_item').classed('selected',false); 
    poll.sublabel(d3.select('.interest_picker .interest_item#i'+user.interest).classed('selected',true).select('text').text() + " (" +user.salary_percent + "%)"); 
  },
  interest_up:function interest_up()
  {
    var ind = int_ids.indexOf(user.interest);
    if(ind != -1)
    {
      user.interest = ind < interests.length-1 ? int_ids[ind+1] : int_ids[0];
    }
    this.interest_draw();   
  }, 
  interest_down:function interest_down()
  {
    var ind = int_ids.indexOf(user.interest);
    if(ind != -1)
    {
      user.interest =  ind > 0 ? int_ids[ind-1] : int_ids[interests.length-1];
    }
    this.interest_draw();
  },  
  by_interest:function by_interest(v)
  {        
    if(user.interest != v)
    {
      user.interest = v;        
      this.interest_draw();
    }
  },  
  // interest_percent_draw:function interest_percent_draw(k)
  // {  
  //   var r = 200; 
  //   var h = 2 * r * k, y = 2*r - h;  
  //   d3.select("#clip-mask rect").attr("y", y).attr("height", h);
  // },
  choose_category: function choose_category()
  {
    category = categories.filter(function(a){ return a.id == user.category; })[0];
    if(category.outrun == 0)
    {
      male.outrun = true;
      male.gap_percent = category.percent;
    }
    else
    {
     female.outrun = true;
     female.gap_percent = category.percent;
    }
  },
  choose_interest: function choose_interest()
  {    
    var tmp = interests.filter(function(a){ return a.id == user.interest; })[0];

    interest = tmp.items.sort(function(a,b){ return a.cost - b.cost; });
    interestAlias = tmp.name.substring(0,3).toLowerCase();

    interest_level_map = [];
    for(var i = 1; i < interest.length; ++i)
    {        
      interest_level_map.push(Math.ceil10(interest[i].cost/interest[0].cost));
    }
  },
  create_navigation_buttons:function create_next_prev_buttons()
  {
     var nav = $("<div class='navigation'><div class='prev' title='"+locale.general.prev+"'></div><div class='sep'></div><div class='next' title='"+locale.general.next+"'></div>").appendTo($('.poll'));
     nav.find('.prev').click(function(e){ fn('poll.prev_function');  e.stopPropagation(); });
     nav.find('.next').click(function(e){ fn('poll.next_function');  e.stopPropagation(); });
      
  }, 
  prev_function:function prev_function()
  {
    params_back();
  },
  npicker_create:function npicker_create(p,t,max,size,top,left,def,label)
  {    
    //d3
    var td = d3.select(p).append('div')
                      .classed(t.replace(".","") + " abs npicker",true)
                      .attr({"max":max})
                      .style({'top':top-63+'px', 'left':left+'px'});
    //jQuery
    var tj = $(p + " " + t);
    var tmpd = [];
    tmpd.length = size;
    td.append('div').classed('t',true).text(label);
    td.selectAll('div.part').data(tmpd).enter().append('div').classed('part',true).attr('data-pos',function(d,i){ return size-i;}).text(0);
    td.append('input').attr({'type':'text','value': 0, 'max':max, 'size':size, 'maxlength':size}).style('display','none');
    td.append('div').classed('gel',true);


    tj.find('input').on('keypress',validateNumber).on('DOMMouseScroll mousewheel', function(e, delta) {  e.stopPropagation();  })
    .focusout(function(){ $(this).hide(); tj.find('div.part').show(); }).change(function(){  poll.npicker_set(t,+$(this).val(),size); });
  
    tj.find('div.part[data-pos]').on('DOMMouseScroll mousewheel', function(e, delta) {
      
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
      $(this).find('div.part').hide();
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
    t = $(t);
    var v = "";
    for(var i = 0; i < size; ++i)
    {
      v+=t.find('div[data-pos='+(size-i)+']').text();
    }
    return +v;
  },
  npicker_set:function setnpicker(t,v,size)
  {    
    t = $(t);

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
  label:function label(v){ 
    $('.poll .prompt .title .text').text(v.toUpperCase());
    //d3.select('.info').text(v);
  },
  sublabel:function sublabel(v)
  {
    var t = $('.poll > .selector > div > .profile  > .a').text(v);    
    //t.css({top:h2-t.height()/2 - poll.stage_size2*0.38,left:w2-t.width()/2 - (isf() ? 1 : -1)*poll.stage_size2*0.45});    
  },
  place_human_based_on_gender:function place_human_based_on_gender()
  {    
    if(isf()) 
    {
      female.place = 'top';
      male.place = 'bottom';
    }
    else 
    {
      female.place = 'bottom';
      male.place = 'top';
    }
  }
};
/***************************************************************
                  Poll Part End
*********************************************************/