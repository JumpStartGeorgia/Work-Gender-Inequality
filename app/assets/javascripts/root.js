$(document).ready(function(){

  function resize_front_page(){
    // make row > divs the same heights
    var heights = [];
    var height;
    $('#get-involved-content > div').each(function(){
      heights.push($(this).height());
    });
    height = Math.max.apply(Math, heights);
    $('#get-involved-content > div').each(function(){
      $(this).height(height);
    });
    // just set height of game to be height of row
    $('#get-involved-content > div#game').height($('#get-involved-content').height());

    heights = [];
    $('#latest-content > div').each(function(){
      heights.push($(this).height());
    });
    height = Math.max.apply(Math, heights);
    $('#latest-content > div').each(function(){
      $(this).height(height);
    });

  }

  $(window).load(function(){
    resize_front_page();
  })

  $(window).bind('resize', resize_front_page);


});