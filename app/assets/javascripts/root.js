$(document).ready(function(){

  function resize_front_page(){
    // make row > divs the same heights
    var heights = [];
    var height;

    // if window width is too small, just use default height
    // else make them the same
    if ($(window).width() < 769){
      $('#get-involved-content > div').each(function(){
        $(this).height('auto');
      });

      $('#latest-content > div').each(function(){
        $(this).height('auto');
      });
    }else{
      // get height of stories and explore and then use the max
      heights.push($('#get-involved-content #stories').height());
      heights.push($('#get-involved-content #explore').height());
      height = Math.max.apply(Math, heights);
      $('#get-involved-content > div').each(function(){
        $(this).height(height);
      });

      // just set height of game to be height of row
      $('#get-involved-content > #game').height($('#get-involved-content').height());

      // latest items row
      heights = [];
      $('#latest-content > div').each(function(){
        heights.push($(this).height());
      });
      height = Math.max.apply(Math, heights);
      $('#latest-content > div').each(function(){
        $(this).height(height);
      });
    }
  }

  // video width is set to 100%
  // - when window changes size, fix height
  //   to match 16x9 video
  function resize_videos(){
    var w = $('#video-content iframe:first').width();
    $('#video-content iframe').height(w*9/16);
  }

  // have to wait until image loads to resize get involved blocks
  $(window).load(function(){
    resize_front_page();
  })
  resize_videos();

  $(window).bind('resize', resize_front_page);
  $(window).bind('resize', resize_videos);


  // when hover over explore box, show popup
  $('#explore').hover(function(){
    $('#explore #explore-popup').css('visibility', 'visible');
  }, function(){
    $('#explore #explore-popup').css('visibility', 'hidden');
  });

});