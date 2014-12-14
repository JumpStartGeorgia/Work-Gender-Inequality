/********************************************************
                  Poll Part Start
***************************************************************/
var poll = {
  p : null,
  knobCX : 144,
  knobCY : 144,
  knobR : 144,
  degrees : [1,125,321],// first and last point in degrees for human when choosing age
  degree_steps : [],
  degree_step : 0,
  next_function : null,
  npicker_function : null,
  npicker_sal_size:5,
  npicker_binded:false,
  show:function show(resume,resume_by_interest)
  {
    if(typeof resume === 'undefined') resume = false;
    if(typeof resume_by_interest === 'undefined') resume_by_interest = false;

    scr_clean();
    s.append("<div class='poll'></div>");
    if(resume)
    {
      if(resume_by_interest)
      {
        poll.draw_character();
        poll.interest(); 
      }
      else 
      {
        if(!hist) history.pushState({},'',window.location.pathname);
        this.gender();
      }
    }
    else
    {
      if(steptogo == 0)
        this.gender();
      else 
      {
        poll.draw_character();
        fn(hash_map[steptogo-1].nf); 
      }
    }
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
       $('.poll > .prompt > .title > .larrow, .poll > .prompt > .title > .rarrow').fadeOut(1000,"linear", function(){ $(this).remove(); });
       $('.info').fadeOut(1000,"linear");
        $('.poll > .prompt > .title > .text').fadeOut(1000,"linear");
       f();
       poll.place_human_based_on_gender();
       poll.character_picked();
       
    });
    right.click(function()
    { 
      $(this).parent().removeClass('selectable').find('> div').off('click hover').removeClass('zoomout right left');       
      $(this).addClass('selected');
      $('.poll > .prompt > .title > .larrow, .poll > .prompt > .title > .rarrow').fadeOut(1000,"linear", function(){ $(this).remove(); });
      $('.info').fadeOut(1000,"linear");
      $('.poll > .prompt > .title > .text').fadeOut(1000,"linear");
      m();
      poll.place_human_based_on_gender();
      poll.character_picked();

    });
    if(!init)
    {
      isf() ? right.addClass('zoomout') : left.addClass('zoomout');
    }
  },
  age:function age()
  {    
    onscrollafter = null;      
    poll.label(locale.poll.your_age); 
    resizeCallback = function() {
      poll.age_picker_redraw();
    };
    params_set(1);  
    s.find('.poll').addClass(g());  
    poll.next_function = function()
    {
      onscrolldown = null;
      onscrollup = null;
      $(document).off('click');
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
    //user.category = user.category == null ? cat_ids[0] : user.category;
    poll.npicker_function = null;
    poll.next_function = function(){
      user.salary = poll.category_salary();
      if(user.category != null && user.salary > 0)
      {
        poll.choose_category();
        onscrolldown = null;
        onscrollup = null;
        
        $('.poll .selector .category-picker').remove();
        $('.poll .selector .salary-picker').remove();

        poll.interest();
      }
      else
      {
        if(user.category == null)
        {
          $('.poll .selector .category-picker .category-item').each(function(i,d){
            d = $(d);
            setTimeout(function(){ d.addClass('zoom'); setTimeout(function(){ d.removeClass('zoom'); }, 100); },60*(i+1));
          });
        }
        else
        {   
          var d = $('.poll .selector .salary-picker');
          d.addClass('zoom');
          setTimeout(function(){ d.removeClass('zoom'); }, 300);            
        }
      }
    };
    poll.category_picker_show();
  },
  interest:function interest()
  {
    poll.label(locale.poll.your_interest); 

    params_set(4); 

    //user.interest = user.interest == null ? int_ids[0] : user.interest;
    poll.next_function = function(){
      if(user.interest != null && user.salary_percent > 0)
      {   
        poll.choose_interest();
        onscrolldown = null;
        onscrollup = null;
        poll.npicker_function = null;
        $('.poll .selector .interest-picker').remove();
        $('.poll .selector .percent-picker').remove();
        params_set(6); 
        resizeCallback = null;
        game_init();
      }
      else
      {
        if(user.interest == null)
        {
          $('.poll .selector .interest-picker .interest-item').each(function(i,d){
            d = $(d);
            setTimeout(function(){ d.addClass('zoom'); setTimeout(function(){ d.removeClass('zoom'); }, 100); },60*(i+1));
          });
        }
        else
        {   
          var d = $('.poll .selector .percent-picker');
          d.addClass('zoom');
          setTimeout(function(){ d.removeClass('zoom'); }, 300);
        }
      }
    };
    poll.interest_picker_show();
  }, 
  category_picker_show:function category_picker_show()
  {
    var outer_radius = 200;

    var picker = $("<div class='category-picker'></div>").appendTo('.poll .selector');
    poll.npicker_create('.poll .selector','.salary-picker',99999,poll.npicker_sal_size,user.salary,locale.poll.your_salary);
    resizeCallback = function() {
      poll.category_redraw();
    };
    categories.forEach(function(d,i){
      var item = $("<div id='c"+d.id+"' class='category-item'>"+
                      "<img src='/assets/gap/svg/field/icons/"+d.fg+".svg' />" + 
                      "<div class='hint'>"+d.name+"</div>" +
                    "</div>")
                    .on('click',function(){ poll.by_category(d.id); }).appendTo(picker);

    });
    poll.category_redraw();
    if(!init && user.category != null)
    {
      poll.by_category(user.category);
    }
  },  
  category_redraw:function category_redraw()
  {
    var outer_radius = 200;
    var cat_radius = 26;
    var cat_step = 360/categories.length;
    var xC = w2;
    var yC = h2;
    var lTmp = tTmp = 99999;
    var rTmp = bTmp = 0;
    var lTmpE,rTmpE,tTmpE,bTmpE;

    categories.forEach(function(d,i){
      var item = $(".poll .selector .category-item#c" +d.id)
                    .css({
                      'top': (h2 + (outer_radius) * Math.sin(Math.radians(i*cat_step)) - cat_radius) ,
                      'left': (w2 - (outer_radius) * Math.cos(Math.radians(i*cat_step)) - cat_radius)
                    });

      var hint = item.find('div.hint');
      var ol = hint.offset().left;
      var ot = hint.offset().top;

      if(lTmp > ol) { lTmp = ol; lTmpE = hint; }
      if(rTmp < ol) { rTmp = ol; rTmpE = hint; }
      if(tTmp > ot) { tTmp = ot; tTmpE = hint; }
      if(bTmp < ot) { bTmp = ot; bTmpE = hint; }
      hint.css({  
                left: (ol < xC ? -1*(hint.outerWidth()-cat_radius) : cat_radius) ,
                top:  (ot < yC ? -1*(hint.outerHeight()+cat_radius*2+8) : 0) });
    });

    lTmpE.css({left:-1*(lTmpE.outerWidth() + 3),top:-1*( 4 + lTmpE.outerHeight()/2+cat_radius)});
    rTmpE.css({left:(cat_radius*2 + 3),top:-1*( 4 + rTmpE.outerHeight()/2+cat_radius)});
    tTmpE.css({left:-1*(tTmpE.outerWidth()/2-cat_radius),top:-1*( 4 + 4 + tTmpE.outerHeight()+2*cat_radius)});
    bTmpE.css({left:-1*(bTmpE.outerWidth()/2-cat_radius),top: 0});

    poll.npicker_redraw(h2,w2+outer_radius*1.5);
    
  },
  category_select:function category_select()
  {
    if(!poll.npicker_binded) poll.npicker_bind();
    $('.poll .selector .category-picker .category-item').removeClass('selected');
    $('.poll .selector .category-picker .category-item#c' + user.category).addClass('selected');
  },
  category_up:function category_up()
  {
    var ind = cat_ids.indexOf(user.category);
    if(ind != -1)
    {
      user.category = ind < categories.length-1 ? cat_ids[ind+1] : cat_ids[0];
    }
    this.category_select();   
  }, 
  category_down:function category_down()
  {
    var ind = cat_ids.indexOf(user.category);
    if(ind != -1)
    {
      user.category =  ind > 0 ? cat_ids[ind-1] : cat_ids[categories.length-1];
    }
    this.category_select();
  },
  by_category:function by_category(v)
  {        
      user.category = v; 
      this.category_select();
  },
  category_salary:function category_salary(v)
  {
    if(exist(v)) poll.npicker_set(v,poll.npicker_sal_size);
    else return poll.npicker_get('.salary-picker.npicker',poll.npicker_sal_size);
  },
  age_picker_show:function age_picker_show()
  {
    s.find('.poll .selector').append(
                            "<svg class='age-picker' width='288' height='288'>"+
                              "<path fill='none' stroke='#EED361' stroke-miterlimit='10' d='M256.383,233.715c19.512-24.406,31.176-55.357,31.176-89.034c0-78.81-63.888-142.696-142.697-142.696c-30.838,0-59.391,9.781-82.726,26.411'/>" + 
                              "<polyline fill='none' stroke='#EED361' stroke-miterlimit='10' points='257.653,221.191 256.403,233.715 267.653,231.197 '/>" + 
                              "<g class='age-mover' draggable='true' ondrag='poll.drag_age(event)'>" + 
                                "<circle fill='none' stroke='#DC5D39' stroke-width='0.7552' stroke-miterlimit='10' cx='9.995', cy='9.817', r='9.38'></circle>" + 
                                "<circle fill='#DC5D39' cx='9.995' cy='9.817' r='5' ></circle>" + 
                              "</g>" + 
                            "</svg>");
  
   
    var diff = max_age-min_age;
    var degree_sum = poll.degrees[1] + 360 - poll.degrees[2];
  
    poll.degree_step = degree_sum / (diff+1);
    poll.degree_steps = [];
    for(var i = 0; i <= diff; ++i)
    {
      poll.degree_steps.push(poll.degrees[1] - (diff-i)*poll.degree_step);       
    }           
    poll.age_picker_redraw();

    $('.age-mover').draggable();

    $(document).on('click',function (e) {
        poll.agemousedown(e);
    });

    onscrollup = function(){ poll.age_up(); };
    onscrolldown = function(){ poll.age_down(); };
    poll.by_age(user.age);


  },
  age_picker_redraw:function age_picker_redraw()
  {
    s.find('.poll .selector .age-picker').css({top: h2-288/2, left: w2-288/2 });
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
    user.age = v;        
    this.age_check();
    this.agepicker_draw();
  },
  agepicker_draw:function agepicker_draw()
  {
      var rad = this.get_radian_by_age(user.age);
      var c = Math.cos(rad);
      var s = Math.sin(rad);

      var cx = this.knobR * c + this.knobCX;
      var cy = this.knobCY - this.knobR * s;      
      $(".age-mover circle").attr("cx",cx).attr("cy",cy);       
      poll.sublabel(user.age + "<div class='b'><span>"+(max_age-user.age)+"</span>&nbsp;"+locale.general.retirement+"</div>");
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
    var index = max_age-min_age-(v-min_age);
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
    var picker = $("<div class='interest-picker'></div>").appendTo('.poll .selector');
    var savingTmp = 0;
    if(!init) savingTmp = user.salary * user.salary_percent / 100;
    poll.npicker_create('.poll .selector','.percent-picker',user.salary,poll.npicker_sal_size,savingTmp,locale.poll.your_percent,'left');

    resizeCallback = function() {
      poll.interest_redraw();
    };
    interests.forEach(function(d,i){
      var item = $("<div id='i"+d.id+"' class='interest-item'>"+
                      "<img src='/assets/gap/svg/interest/icons/"+d.icon+".svg' />" + 
                      "<div class='hint'>"+d.name+"</div>" +
                    "</div>")                  
                    .on('click',function(){ poll.by_interest(d.id); }).appendTo(picker);
    });

   poll.npicker_function = function(v){ 
      v=+v; 
      if(user.salary >= v) {
         user.salary_percent = (v*100)/user.salary;     
      }  
    }
    poll.interest_redraw();

    if(!init && user.interest != null)
    {
      poll.by_interest(user.interest);
    }
  },
  interest_redraw:function interest_redraw()
  {
    interests.forEach(function(d,i){
      var item = $(".poll .selector .interest-item#i" +d.id)
       .css({ 'top': h2 - 210,
              'left': w2 + 150 - 450 * ((4-i)/5) });
      var hint = item.find('div.hint');
      hint.css('left',-1*(hint.width()/2-28) + 'px');
    });  
    poll.npicker_redraw(h2,w2+125);
  },
  interest_select:function interest_select()
  {     
    if(!poll.npicker_binded) poll.npicker_bind();
    $('.poll .selector .interest-picker .interest-item').removeClass('selected');
    $('.poll .selector .interest-picker .interest-item#i' + user.interest).addClass('selected');
  },
  interest_up:function interest_up()
  {
    var ind = int_ids.indexOf(user.interest);
    if(ind != -1)
    {
      user.interest = ind < interests.length-1 ? int_ids[ind+1] : int_ids[0];
    }
    this.interest_select();   
  }, 
  interest_down:function interest_down()
  {
    var ind = int_ids.indexOf(user.interest);
    if(ind != -1)
    {
      user.interest =  ind > 0 ? int_ids[ind-1] : int_ids[interests.length-1];
    }
    this.interest_select();
  },  
  by_interest:function by_interest(v)
  {            
      user.interest = v;        
      this.interest_select();
  },  
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

    for(var i = 0; i < interest.length-1; ++i)
    {        
      states_mutation[i] = Math.floor10(interest[i+1].cost/interest[0].cost);
    }
    for(var i = 0, sum = 1; i < 6; ++i)
    {
      states_mutation_based[i] = sum*states_mutation[i];
      sum = sum*states_mutation[i];
    }
  },
  create_navigation_buttons:function create_next_prev_buttons()
  {
     var nav = $("<div class='navigation'><div class='next' title='"+locale.general.next+"'></div>").appendTo($('.poll'));
     nav.find('.next').click(function(e){ fn('poll.next_function');  e.stopPropagation(); });
  }, 
  npicker_create:function npicker_create(p,t,max,size,def,label,align)
  {    
    poll.npicker_binded = false;    
    var picker = $("<div class='" + t.replace(".","") + " abs npicker inactive' max='"+max+"'>"+
                  "<div class='t " + align + "'>"+label.toUpperCase()+"</div>" +
               "</div>").appendTo(p);
    poll.npicker_redraw();
    for(i = 0; i < size; ++i)
    {
     picker.append("<div class='part' data-pos='"+(size-i)+"'>0</div>");
    }
    picker.append("<input type='text' max='"+max+"' size='"+size+"' maxlength='"+size+"'/>");
    picker.append("<div class='gel'></div>");

    poll.npicker_set(def,size);
  },
  npicker_redraw:function npicker_redraw(top,left)
  {
    $('.npicker').css({'top':top-63, 'left':left});
  },
  npicker_bind:function npicker_bind()
  {
    var size = 5;
    var picker = $('.poll .selector .npicker');
 
    
    if(init)
    {
      picker.addClass('zoom');
      setTimeout(function(){ picker.removeClass('zoom'); }, 300);
    }


    picker.removeClass('inactive');
    picker.find('input').on('keypress',validateNumber).on('DOMMouseScroll mousewheel', function(e, delta) {  e.stopPropagation();  })
    .focusout(function(){ $(this).hide(); picker.find('div.part').show(); }).change(function(){  poll.npicker_set(+$(this).val(),size); });
  
    picker.find('div.part[data-pos]').on('DOMMouseScroll mousewheel', function(e, delta) {
      
      var t = $(this);  
      var p = t.parent('.npicker');
      var tval = +t.text();

      if(up(e,delta)) { if(tval < 9) ++tval; }
      else { if(tval > 0) --tval; }
    
      if(poll.npicker_check(p,+t.attr('data-pos'),tval,size))
      {        
        t.text(tval);
        poll.npicker_set(poll.npicker_get(p,size),size);        
      }
      e.stopPropagation();  
    });
    picker.on('click',function(){
      $(this).find('div.part').hide();
      $(this).find('input').show().focus();      
    });
    poll.npicker_binded = true; 
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
  npicker_set:function setnpicker(v,size)
  {        
    var t = $('.poll .selector .npicker');

    var max = t.attr('max') ? +t.attr('max') : Number.MAX_VALUE;
    if(v < 0 || v > max || !isNumber(v)) return false;

    v = v.toString().lpad('0',size);
    for(var i = 0; i < size; ++i)
    {
      t.find('div[data-pos='+(size-i)+']').text(v[i]);
    }
    t.find('input').val(+v==0?"":+v);

    if(func(poll.npicker_function)) poll.npicker_function(v);

    return true;
  },
  label:function label(v){ 
    $('.poll .prompt .title .text').text(v.toUpperCase());
  },
  sublabel:function sublabel(v)
  {
    var t = $('.poll > .selector > div > .profile  > .a').html(v);    
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
********************************************************/