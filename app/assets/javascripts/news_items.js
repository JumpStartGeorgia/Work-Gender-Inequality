$(function() {

  // load date picker for law published_at field
  $("input#news_item_published_at").datepicker({
    dateFormat: 'yy-mm-dd'
  });

  if (gon.published_at !== undefined && gon.published_at.length > 0){
    $("input#news_item_published_at").datepicker("setDate", new Date(gon.published_at));
  }

  // if record is published, show pub date field by default
  if ($('input:radio[name="news_item[is_published]"]:checked').val() === 'true') {
    $('#news_item_published_at_input').show();
  } else {
    $('#news_item_published_at_input').hide();
  }

  // if record is marked as published, show pub date field
  $('input:radio[name="news_item[is_published]"]').click(function(){
    if ($(this).val() === 'true'){
      // show url textbox
      $('#news_item_published_at_input').show(300);
    } else {
      // clear and hide pub date textbox
      $('#news_item_published_at').attr('value', '');
      $('#news_item_published_at_input').hide(300);
    }
  });

});