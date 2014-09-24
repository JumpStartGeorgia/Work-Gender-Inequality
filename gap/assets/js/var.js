// ******************** Variable Declaration *************************** 
// *************************** Flags ***********************************

var ingame = false; // if you are in game true, else false (intro, epilogue, etc.)
var animated = false; // if animation in process, don't scroll 
var hist = false;

// *************************** Flags End *******************************
var params = {};
var steptogo = 0;
var test = null; // variable for testing
/** description browser viewport width
 * @type double */
var w = 0;
/** description browser viewport height
 * @type double */ 
var h = 0;
/** browser viewport height half
 * @type double */
var h2 = 0;                 
/** browser viewport width half 
  * @type double */
var w2 = 0;                 
/** screen jquery object 
  * @type jQuery */
var s = null;
/** screen jquery object 
  * @type d3*/
var s3 = null;
/** height of land for human, based on viewport height and timeline height 
* @type double */
var lh = 0; 
var curr_date = new Date(); // current date

var timeline = null; // timeline jq pointer
var th = 30; // timeline height in px
var timeline_point = new Date(curr_date.getFullYear(),curr_date.getMonth(),1,0,0,0,0);
var timeline_end_point = new Date();
timeline_end_point.setTime(timeline_point.getTime());
timeline_end_point.setYear(timeline_end_point.getFullYear()+65);

var timeline_points = [timeline_point];

var time_step = "3m"; // increment for on each scroll is 3 months, available formats m:month, y:year
var time_step_number = 3;
var timeline_scale = 0.5; // each time interval will occupy timeline_scale*viewport_width
var timeline_scroll_to_tick_value = 0;
var timeline_scroll_to_tick = 10;
var timeline_scroll_curr_size = 0;

//var curr_screen = 1; // current screen intro is 1
//var cnt_screen = 2; // screens count calculated from sframe array plus 2(intro,epilogue)
var def_age = 21;
var min_age = 18;
var max_age = 60;
var male_max_age = 65;
var female_max_age = 60;
var onscrollbefore = null;
var onscrollup = null;
var onscrolldown = null;
var onscrollafter = null;
var fade_time = 0; // fade time
var land = 0; // y position for land in each screen part(top, bottom)
var tick_count = 4; // year ticks to show in info bar
var is = false;
var max_salary = 99999;
var current_path_width = 0;
var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
var pathl = 0;
var stage_offset = 0;

  var prev_stage_id = -1;
  var stage_id = -1;

var interest = null;
var interest_level_map = [];
var category = null;

var user =
{
  gender : 'n',
  age : def_age,
  category : null,
  salary : 100,
  interest : null,
  salary_percent : 0
};

var hash_map = [ // for hash build from user object(simplifies creating with loop)
  {"name":"gender","alias":"g","nf":"poll.age"},
  {"name":"age","alias":"a","nf":"poll.category"},
  {"name":"category","alias":"c","nf":"poll.category"},
  {"name":"salary","alias":"s","nf":"poll.interest"},
  {"name":"interest","alias":"i","nf":"poll.interest"},
  {"name":"salary_percent","alias":"p","nf":"play"}
];