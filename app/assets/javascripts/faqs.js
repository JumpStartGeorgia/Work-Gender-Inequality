$(function() {
    // taken from: http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('#faqs #faq-links a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000);
        return false;
      }
    }
  });
  $('#faqs #faq-list .link-to-top a').click(function() {
    $('html,body').animate({
      scrollTop: ($('body').offset().top)
    }, 1000);
    return false;
  });
});
