/**
* outrun: 0 - male, 1 - female
* dress casual business technical construction
*/


var categories = 
[
        { "id": "45bS4GyC","name": "Agriculture, hunting and forestry", "outrun":0, "percent":11, "dress":"casual",
            "stage":
            {
                "background":"/assets/gap/svg/field/education/bg.svg",
                "foreground":{ "interior":"/assets/gap/svg/field/education/school_int.svg", "exterior":"/assets/gap/svg/field/education/school_ext.svg"}, // should be of same size
                "frame":
                {
                    "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                    "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                    "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
                }
            } 
        },
        { "id": "FWrgJx0N","name": "Fishing", "outrun":0, "percent":11, "dress":"business" },
        { "id": "TxbZicXP","name": "Mining and quarrying", "outrun":0, "percent":11, "dress":"technical" },
        { "id": "Zyb2KhON","name": "Manufacturing", "outrun":0, "percent":11, "dress":"construction" },
        { "id": "8IkQeUfg","name": "Production and distribution of electricity, gas and water", "outrun":0, "percent":11, "dress":"casual" },
        { "id": "eibtNMge","name": "Construction", "outrun":0, "percent":11, "dress":"business" },
        { "id": "jDYS_Z1V","name": "Wholesale and retail trade; repair of motor vehicles and personal and household goods", "outrun":0, "percent":11, "dress":"technical" },
        { "id": "I52aZAVX","name": "Hotels and restaurants", "outrun":0, "percent":11, "dress":"construction" },
        { "id": "rn4bDK0j","name": "Transport and communication", "outrun":0, "percent":11, "dress":"casual" },
        { "id": "EmbBcc5x","name": "Financial intermediation", "outrun":0, "percent":11, "dress":"business" },
        { "id": "oxKq-H8w","name": "Real estate, renting and business activities", "outrun":0, "percent":11, "dress":"technical" },
        { "id": "dT-LWuT4","name": "Public administration", "outrun":0, "percent":11, "dress":"construction" },
        { "id": "HxhM0Ejd","name": "Education", "outrun":0, "percent":11, "dress":"casual" },
        { "id": "dJdfgktK","name": "Health and social work", "outrun":0, "percent":11, "dress":"business" },
        { "id": "DqFfYVGZ","name": "Other community, social and personal service activities", "outrun":0, "percent":11, "dress":"technical" }
];
//var frame_sequence = [ 'load','work','reward' ];
//var frame_sequence_length = frame_sequence.length;
var cat_ids = categories.map(function(d,i){return d.id;});

var interests = 
[
        { "id": "gfNDXD1g", "name": "Vacation", items:[] },
        { "id": "Rs2Uml6w","name": "Gadgets", 
                items:
                [
                  { "id": "Q3eeT2j9", "type": "mobile", "title":"SAMSUNG I9300 Galaxy S3 White", "cost":700, 
                    "image":"bag.svg", "class":"bag",
                    "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7608&SAMSUNG+I9300+Galaxy+S3+White", "source_date":"22.09.2014",
                    "descr":"Mobile Phone" },
                  { "id": "NeRMinwu", "type": "mobile", "title":"Nokia 1280 Black/G", "cost":41.99,
                    "image":"boat.svg", "class":"boat",
                    "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7708&NOKIA+1280+BLACK%2FG", "source_date":"22.09.2014",
                    "descr":"Tab" },
                  { "id": "eLkVnL8n", "type": "mobile", "title":"Apple Iphone 5S 64GB Gold", "cost":1765,
                    "image":"coconut.svg", "class":"coconut",
                    "source":"http://applecity.ge/shop/iphone/iphone-5s-64gb/", "source_date":"22.09.2014",
                    "descr":"XBox" },
                  { "id": "kV1jvNlr", "type": "mobile", "title":"Vertu Signature Diamond", "cost":154000,
                    "image":"compass.svg", "class":"compass",
                    "source":"http://www.onlinenewspoint.com/top-10-most-expensive-mobile-phones-in-the-world-2014/", "source_date":"22.09.2014",
                    "descr":"Notebook" },
                  { "id": "USLng33Z", "type": "mobile", "title":"E", "cost":2000,
                    "image":"credit.svg", "class":"credit",
                    "source":"", "source_date":"",
                    "descr":"Theatre" },
                  { "id": "4JAffVD6", "type": "mobile", "title":"C", "cost":1100,
                    "image":"directions.svg", "class":"directions",
                    "source":"", "source_date":"",
                    "descr":"Super Buper Thing" }
                ]
        },   
        { "id": "KI3EFRI3","name": "Education", items:[] },
        { "id": "7fdCIojZ","name": "Housing", items:[] },
        { "id": "3QDbCRrq","name": "Transportation", items:[] },
        { "id": "Cc8WWUmB","name": "Health & Beauty", items:[] }
];
var int_ids = interests.map(function(d,i){return d.id;});
/*
77A79Lr_
Pe23w2Lz
j7hrF24w
LE-xVn5T
8BHSiiS3
p_bINCPp
y_eZkaEO
cuabVv82
mE3tEvWc
nGgaI1SL
egtsYjwP
k17y863W
6MhsbW7j
FRyVRVZf
-ke7QwpJ
ODRpktbx
2HIuYW5a
5pTaH-Si
grHOtIbx
fndmDZlb
_ejo7U7H
Te6f2mYy
PcNAyqxL
KOpdBfBy
*/
 
var age_groups = 
[
        { "name":"adolescence", "min":18, "max":29},
        { "name":"young_adulthood", "min":30, "max":39},
        { "name":"middle_adulthood", "min":40, "max":49},
        { "name":"advanced_adulthood", "min":50, "max":65}      
]; 

var sintro = { "class":"intro", "title":"Gap Game (Just scroll)"};
var sepilogue = { "class":"epilogue", "title":"Game Over"};

var color = {
  'female':'rgb(255,148,248)',
  'male':'rgb(173,210,255)',
  'white':'rgb(255,255,255)',
  'black':'rgb(0,0,0)'
};
// gap game localization
var locale = {
  poll:
  {
    choose_gender:"Choose Gender",
    choose_age:"Choose Age",
    choose_category:"Choose Category",
    choose_interest:"Choose Interest"
  },
  general:
  {
    next:"Next",
    prev:"Prev",
    monthNames: ['January','February','March','April','May','June',
    'July','August','September','October','November','December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    dateFormat: 'dd/mm/yyyy', firstDay: 1,
    prevText: 'Prev', prevStatus: 'Show the previous month',
    prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Show the previous year',
    nextText: 'Next', nextStatus: 'Show the next month',
    nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Show the next year',
    currentText: 'Current', currentStatus: 'Show the current month',
    todayText: 'Today', todayStatus: 'Show today\'s month',
    clearText: 'Clear', clearStatus: 'Erase the current date',
    closeText: 'Done', closeStatus: 'Close without change',
    yearStatus: 'Show a different year', monthStatus: 'Show a different month',
    weekText: 'Wk', weekStatus: 'Week of the year',
    dayStatus: 'Select DD, M d', defaultStatus: 'Select a date',
    isRTL: false
  },
  game:
  {
    total_salary:"Total Salary:&nbsp;",
    total_saved:"&nbsp;|&nbsp;Total Saved:&nbsp;"
  }
};
var sounds = 
[
    { "name":"done",        loop:false, path:"/assets/gap/sound/done.mp3" },
    { "name":"applause",    loop:true,  path:"/assets/gap/sound/happy.mp3" },
    { "name":"long",        loop:true,  path:"/assets/gap/sound/long.mp3" },
    { "name":"select",      loop:false, path:"/assets/gap/sound/select.mp3" },
];