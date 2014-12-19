//= require jquery

$(document).ready(function(){
	redraw();	
	$( window ).resize(function() { redraw(); });
}); 
var epilogueUp = true;
var w = h = 0;
function redraw()
{

  w = $(window).width();
  h = $(window).height();
  var t = $('.wrapper .epilogue');
  t.find('.summary').css('height',h-62);
  t.find('.whatnext').css('height',h-42);
  t.find('.slider').css('top', epilogueUp ? 0 : -h+104);
  $('.whatnext .whatnext-trigger').on('click',function(){ epilogue_trigger()});
}
function epilogue_trigger()
{
  var slider = $('.wrapper .epilogue .slider');  
  var whatnext_trigger = slider.find(".whatnext .whatnext-trigger");  

  slider.animate({top: epilogueUp ? -1*($(window).height())+104 : 0 },
  {
    duration:1500,
    start:function()
    {
      whatnext_trigger.off("click");
      epilogueTmp = true;
    },
    progress:function(a,b,c)
    {
      if(epilogueTmp && b > 0.5)
      {
        epilogueTmp = false;
        whatnext_trigger.toggleClass('down up');
      }
    },
    complete:function()
    {
      
      whatnext_trigger.on('click',function(){ epilogue_trigger()});
      epilogueUp=!epilogueUp;
    }
  });
}
/***************************************************************
                  Tiptip module
***************************************************************/
var tiptip_padding = 5;
var tiptip = {
  tip:null,
  p:null,
  zindex:0,
  padding:5
};
$(document).on('mouseenter','.tip',function(){
  var t = $(this);
  var type = t.attr('data-tip-type');
  if(type === undefined) type = 'coin';

  tiptip.p = t;
  tiptip.tip = $("<div class='tiptip tip-" + type + "'></div>").insertAfter(t);

  var wTmp = t.width();
  var wTmp2 = wTmp/2;
  var custCss = {};
  custCss['height'] = t.height() - tiptip.padding * 2;
  custCss['zIndex'] = 700;

  if(type == 'coin')
  {
    custCss['top'] = t.offset().top;
    custCss['left'] = t.offset().left +  wTmp2;
    custCss['padding-left'] = wTmp2+10;
  }  
  tiptip.tip.html(t.attr('data-tip')).css(custCss).show();
  tiptip.zindex = t.css('zIndex');
  t.css('zIndex',701);
});
$(document).on('mouseleave','.tip',function()
{
  tiptip.p.css('zIndex',tiptip.zindex);
  tiptip.tip.remove();
});
function tiptip_destroy()
{
  tiptip.p.css('zIndex',tiptip.zindex);
  tiptip.tip.remove();
}
/***************************************************************
                  Tiptip module end
***************************************************************/