// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require i18n
//= require i18n/translations
//= require jquery
//= require jquery_ujs
//= require jquery.ui.core
//= require jquery.ui.effect
//= require twitter/bootstrap
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require dataTables/extras/dataTables.tableTools
//= require vendor
//= require search

$(document).ready(function(){
	// set focus to first text box on page
/*	if (gon.highlight_first_form_field){
	  $(":input:visible:enabled:first").focus();
	}
*/
	// workaround to get logout link in navbar to work
	$('body')
		.off('click.dropdown touchstart.dropdown.data-api', '.dropdown')
		.on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() });


  // hack to get toggle header menu to push down the existing content
  $('.navbar-toggle').on('click', function() {
    console.log('click!');
    if ($('.navbar-collapse').hasClass('in')){
      console.log('is closed');
      $('body').css('padding-top','100px');
    }else{
      console.log('is open');
      $('body').css('padding-top','230px');
    }
  });


  // when hover over explore box, show popup
  $('#sidebar-explore').hover(function(){
    $('#sidebar-explore #sidebar-explore-popup').css('visibility', 'visible');
  }, function(){
    $('#sidebar-explore #sidebar-explore-popup').css('visibility', 'hidden');
  });

});
