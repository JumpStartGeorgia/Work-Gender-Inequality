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

var total_scrolls = 0;
var timeline = null; // timeline jq pointer
var th = 30; // timeline height in px
var timeline_point = new Date(curr_date.getFullYear(),curr_date.getMonth(),1,0,0,0,0);
var timeline_end_point = new Date();
timeline_end_point.setTime(timeline_point.getTime());
timeline_end_point.setYear(timeline_end_point.getFullYear()+65);

var timeline_points = [timeline_point];
//var time_step = "1m"; // increment for on each scroll is 3 months, available formats m:month, y:year

//var timeline_format = 'm';
//var time_step_number = 3;
var timeline_scale = 0.5; // each time interval will occupy timeline_scale*viewport_width

// time line scaler calculated on redraw = width * timeline_scale
var timeline_period_w = 0;
var timeline_month_w = 0;
var scroll_per_month = 3; // scroll number for month to change
var reward_period = 3;// month that show how often rewarding process will be shown, ex: 3 means every third month rewarding process occures
var scrolls_for_reward = scroll_per_month * reward_period;
var life_scroll_count = 0;

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


var prevPositionLeft = 0; // used in timeline draw function
var prevPosition = 0; // used in timeline draw function

var user =
{
  gender : 'n',
  age : def_age,
  category : null,
  salary : 100,
  interest : null,
  salary_percent : 0
};

var male = null;
var female = null;
var humans = null; 

var hash_map = [ // for hash build from user object(simplifies creating with loop)
  {"name":"gender","alias":"g","nf":"poll.age"},
  {"name":"age","alias":"a","nf":"poll.category"},
  {"name":"category","alias":"c","nf":"poll.category"},
  {"name":"salary","alias":"s","nf":"poll.interest"},
  {"name":"interest","alias":"i","nf":"poll.interest"},
  {"name":"salary_percent","alias":"p","nf":"play"}
];

// timerInterval values for noscrolling event
  var noscrollEventTime = 60000;
  var noscrollTimerId = null;

  var _pos = -1;
  var prev_pos = -1;
  var pos_changed = false;
  __defineGetter__("pos", function(){
     return _pos;
  });
  __defineSetter__("pos", function(val){
    prev_pos = _pos;
     _pos = val;
     pos_changed = true;
  });

// treasure bar with card 
    var interest_offset = 10;
  var interest_animation_duration = 100;
  var interest_w = 32;
  var interest_w2 = interest_w/2;
  var interest_start_offset = 0;
  //var current_interests = [6,3,1,0,0,0]; // todo when more then one mutation needed
  var states_mutation = [4,4,2,3,3,0];
  var index = 1;
  var current_interests_count = 0;
  var mutation_restriction = [0,0,0,0,0,0];