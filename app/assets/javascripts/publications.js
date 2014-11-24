$(function() {

  // load date picker for law published_at field
  $("input#publication_published_at").datepicker({
    dateFormat: 'yy-mm-dd'
  });

  if (gon.published_at !== undefined && gon.published_at.length > 0){
    $("input#publication_published_at").datepicker("setDate", new Date(gon.published_at));
  }

});