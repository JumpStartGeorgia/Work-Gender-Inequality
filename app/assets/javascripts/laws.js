$(function() {

  // load date picker for law enacted_at field
  $("input#law_enacted_at").datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    yearRange: "1980:+nn"
  });

  if (gon.enacted_at !== undefined && gon.enacted_at.length > 0){
    $("input#law_enacted_at").datepicker("setDate", new Date(gon.enacted_at));
  }

});