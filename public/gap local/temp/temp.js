

// function allowDrop(ev) {
//     ev.preventDefault();
// }


// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("Text");
//     ev.target.appendChild(document.getElementById(data));
// }

// wheel move
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




        //   $("#age_picker").mouseup(function (e) {
        //     ingame = true; tick(); game();
                // });


// function draw_age_mover_by_radian(rad) {

//   $('#age_counter').text(min_age);
//   if(rad>=-rad_max && rad <= rad_max)
//   {
//     var c = Math.cos(rad);
//     var s = Math.sin(rad);

//     var cx = knobR * c + knobCX;
//     var cy = knobR * s + knobCY;
//     $(".age_mover").attr("cx",cx).attr("cy",cy);
//   }
// }




        // ap.html(ap_path + ap_text + ap_knob);        

        // poll.offsetX = ap.offset().left;
        // poll.offsetY = ap.offset().top;
        // var diff = max_age-min_age;
        // poll.rad_max = poll.rad_male;
        // poll.age_radian_step = 2*poll.rad_max/(diff);

        // poll.age_radian.push(-999);
        // for(var i = 0; i < diff; ++i)
        // {
        //   poll.age_radian.push(Math.round10(-poll.rad_max + i*poll.age_radian_step,-5));
        // }
        // poll.age_radian.push(poll.rad_max);
        // poll.age_radian.push(999);

       

        // $('#age_mover').draggable();

        // // $("#age_picker").mousedown(function (e) {
        // //     poll.agemousedown(e);
        // // });

        // onscrollup = function(){
        //   poll.age_up();
        // };
        // onscrolldown = function(){
        //   poll.age_down();
        // };

        // poll.by_age(def_age);







        
//     var sal_picker = poll.stage_d3.append('div').classed("salary-label abs npicker",true).attr({"max":user.salary}).style({'top':h2+'px', 'left':(w2+(isf()?-180:0))+'px'});

//     sal_picker.classed('npicker',true).selectAll('div').data([5,4,3,2,1]).enter().append('div').attr('data-pos',function(d){ return d;});
//     sal_picker.append('input').attr({'type':'text','value': 0, 'max':user.salary, 'size':5, 'maxlength':5}).style('display','none');


//     poll.npicker_set('.salary-label',0,poll.npicker_sal_size);

// //    poll.category_set_salary(user.salary);

//     poll.stage.find(".salary-label input").on('keypress',validateNumber).on('DOMMouseScroll mousewheel', function(e, delta) {  e.stopPropagation();  })
//     .focusout(function(){ $(this).hide(); $('.salary-label div').show(); }).change(function(){  poll.npicker_set('.salary-label',+$(this).val(),poll.npicker_sal_size); });
  
//     $('.salary-label div[data-pos]').on('DOMMouseScroll mousewheel', function(e, delta) {
      
//       var t = $(this);  
//       var p = t.parent('.npicker');
//       var tval = +t.text();
//       if(up(e,delta)) // forward up next
//       {      
//         if(tval < 9) ++tval;    
//       }
//       else  // backward down previous
//       {    
//         if(tval > 0) --tval;    
//       }

//       if(poll.npicker_check(p,+t.attr('data-pos'),tval,poll.npicker_sal_size))
//       {
//         t.text(tval);
//         poll.stage.find('.salary-label input').val(poll.npicker_get('.salary-label.npicker'),poll.npicker_sal_size);
//       }

//       e.stopPropagation();  
//     }).on('click',function(){poll.stage.find('.salary-label input').show().focus();
//   poll.stage.find('.salary-label div').hide();});

