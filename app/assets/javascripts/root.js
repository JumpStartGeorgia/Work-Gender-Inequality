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
    heights = [];
    $('#latest-content > div').each(function(){
      heights.push($(this).height());
    });
    height = Math.max.apply(Math, heights);
    $('#latest-content > div').each(function(){
      $(this).height(height);
    });

  }

  resize_front_page();
  $(window).bind('resize', resize_front_page);


});