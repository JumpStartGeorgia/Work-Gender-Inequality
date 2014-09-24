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

      other.removeClass('selected').fadeOut(1000,"linear",function(){ console.log('removing class',this); $(this).remove();});
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

console.log('asd');
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

      poll.choose_category();
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
      
      poll.choose_interest();
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
    var cat_step = 360/categories.length;

    var picker = poll.stage_d3.append('div').classed("category-picker",true);

    poll.npicker_create('.stage','.salary-picker',99999,poll.npicker_sal_size,h2,(w2+(isf()?-180:0)),user.salary);

    var pick_items = picker
    .selectAll("svg")
    .data(categories)
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
      user.category = ind < categories.length-1 ? cat_ids[ind+1] : cat_ids[0];
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
      user.category =  ind > 0 ? cat_ids[ind-1] : cat_ids[categories.length-1];
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
    var item_step = 360/interests.length;
    poll.stage_d3.select('.character').attr('data-percent',user.salary_percent);
    var picker = poll.stage_d3.append('div').classed('interest_picker',true);
    

    var pick_items = picker
    .selectAll("svg")
    .data(interests)
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
      user.interest = ind < interests.length-1 ? int_ids[ind+1] : int_ids[0];
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
      user.interest =  ind > 0 ? int_ids[ind-1] : int_ids[interests.length-1];
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
    interest = interests.filter(function(a){ return a.id == user.interest; })[0].items.sort(function(a,b){ return a.cost - b.cost; });

    interest_level_map = [];
    for(var i = 1; i < interest.length; ++i)
    {        
            interest_level_map.push(Math.ceil10(interest[i].cost/interest[0].cost));
    }
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