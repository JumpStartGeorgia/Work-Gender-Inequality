/**
* outrun: 0 - male, 1 - female
* dress casual street business technical construction
*/
var categories = 
[
    {   
        "id": "45bS4GyC",
        "name": "Agriculture, hunting\n and forestry",
        "outrun":0,
        "percent":22.72,
        "male":599.4,
        "female":463.2,
        "dress":"technical",
        "bg":"bg1",
        "bg2":"bg3",
        "fg":"agriculture",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 26.390668,231.02593 L 1195.4972,231.02593 L 1194.5586,227.52296 L 23.751601,227.52296 z"},
        "work_point":{ "x":20,"y":0 }    
    },
    { 
        "id": "FWrgJx0N",
        "name": "Fishing",
        "outrun":0,
        "percent":43.68,
        "male":524.9,
        "female":295.6,
        "dress":"fisher",        
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"fishing",
        "action":true,
        "action_points":[{"x":700,"y":0,"d":-1}],
        "work":{ "a":false, "loop": true, "path":"M 38.900437,182.29612 L 1033.755,182.29612 L 1033.7967,181.36887 L 38.848395,181.36887 z"},
        "work_point":{ "x":35,"y":0 }    
    },
    { 
        "id": "TxbZicXP",
        "name": "Mining and quarrying",
        "outrun":0,
        "percent":9.74,
        "male":1045.1,
        "female":943.3,
        "dress":"miner",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"mining",
        "action":true,
        "action_points":[{"x":340,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 7.9294526,292.21723 L 732.64405,292.21723 L 732.64405,291.93403 L 7.9294526,291.93403 z"},
        "work_point":{"x":0,"y":0}        
    },
    { 
        "id": "Zyb2KhON",
        "name": "Manufacturing",
        "outrun":0,
        "percent":36.99,
        "male":868.1,
        "female":547,
        "dress":"technical",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"manufacturing",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 146.60001,287.05587 L 410.3976,287.05587 L 410.3976,287.16761 L 146.12794,287.16761 z"},
        "work_point":{"x":140,"y": 0}     
    },
    { 
        "id": "8IkQeUfg",
        "name": "Production and\n distribution of electricity,\n gas and water",
        "outrun":1, 
        "percent":6.58,
        "male":979,
        "female":1047.9,
        "dress":"solid",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"production",
        "action":true,
        "action_points":[{"x":630,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 179.46408,314.63557 L 866.24899,314.63557 L 866.24899,313.56415 L 178.92836,313.56415 z"},
        "work_point":{"x":170,"y":0}     
    },
    { 
        "id": "eibtNMge",
        "name": "Construction",
        "outrun":0,
        "percent":34.69,
        "male":1155.8,
        "female":754.8,
        "dress":"construction",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"construction",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 12.825677,358.47614 L 616.2738,358.47614 L 616.27875,358.30766 L 12.810137,358.18742 z"},
        "work_point":{"x":0,"y":0}
    },
    { 
        "id": "jDYS_Z1V",
        "name": "Wholesale and retail trade;\n repair of motor vehicles\n and personal and household goods",
        "outrun":0,
        "percent":36.96,
        "male":906.4,
        "female":571.4,            
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"wholesale",
        "action":true,
        "action_points":[{"x":810,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 154.6976,316.08581 L 949.19303,316.08581 L 949.24039,315.3282 L 154.69759,315.3282 z"},
        "work_point":{"x":150,"y":0}
    },
    { 
        "id": "I52aZAVX",
        "name": "Hotels and restaurants",
        "outrun":0,
        "percent":34.66,
        "male":659.9,
        "female":431.2,           
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"hotel",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 204.6886,287.48502 L 783.18403,287.48502 L 783.23139,286.72741 L 204.68859,286.72741 z"},
        "work_point":{"x":250,"y":0}
    },
    { 
        "id": "rn4bDK0j",
        "name": "Transport and communication",
        "outrun":0,
        "percent":24.31,
        "male":1251.1,
        "female":946.9,   
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"transport",
        "action":true,
        "action_points":[{"x":570,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 203.22005,315.7171 L 900.0101,315.7171 L 900.0101,314.43862 L 203.19904,314.47367 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "EmbBcc5x",
        "name": "Financial intermediation",
        "outrun":0,
        "percent":52.38,
        "male":2626,
        "female":1250.6,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",        
        "fg":"financial",
        "action":true,
        "action_points":[{"x":790,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 203.22005,315.7171 L 900.0101,315.7171 L 900.0101,314.43862 L 203.19904,314.47367 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "oxKq-H8w",
        "name": "Real estate,\n renting and\n business activities",
        "outrun":0,
        "percent":21.68,
        "male":1044.7,
        "female":818.2,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"realestate",
        "action":true,
        "action_points":[{"x":630,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 204.55565,312.67655 L 855.34567,312.67655 L 855.34567,311.39807 L 204.53464,311.43312 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "dT-LWuT4",
        "name": "Public administration", 
        "outrun":0,
        "percent":3.5,
        "male":1282.4,
        "female":1237.5,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"administration",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 239.14737,209.76621 L 248.68849,209.76621 L 248.88265,209.04157 L 239.02346,209.04157 z"},
        "work_point":{"x":244,"y":40}
    },
    { 
        "id": "HxhM0Ejd",
        "name": "Education",
        "outrun":0,
        "percent":21.45,
        "male":545,
        "female":428.1,   
        "dress":"teacher",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"education",        
        "action":true,
        "action_points":[{"x":350,"y":0,"d":1}],  
        "work":{ "a":false, "loop": true, "path":"M 655.8153,314.85376 L 180.6514,314.85376 L 180.6514,314.56599 L 655.81649,314.56599 z"},
        "work_point":{"x":655,"y":0},
    },
    {
        "id": "dJdfgktK",
        "name": "Health and social work",
        "outrun":0,
        "percent":41.39,
        "male":1023.8,
        "female":600.1,   
        "dress":"doctor",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"health",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 203.2094,285.14853 L 801.49568,285.14853 L 801.37754,283.84893 L 203.17203,283.84893 z"},
        "work_point":{"x":200,"y":0}     
    },
    {
        "id": "DqFfYVGZ",
        "name": "Community, social and\n personal service activities",
        "outrun":0,
        "percent":32.51,
        "male":858.3,
        "female":579.3,   
        "dress":"solid" ,
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"community",
        "action":true,
        "action_points":[{"x":910,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 202.61407,313.43416 L 981.10951,313.43416 L 981.15687,312.67655 L 202.61406,312.67655 z"},
        "work_point":{"x":200,"y":0}     
    },
    {
        "id": "hyn3wmKk",
        "name": "All Jobs",
        "outrun":0,
        "percent":39.11,
        "male":1051.4,
        "female":640.2,   
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",    
        "fg":"other",
        "action":true,
        "action_points":[{"x":910,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 202.61407,313.43416 L 981.10951,313.43416 L 981.15687,312.67655 L 202.61406,312.67655 z"},
        "work_point":{"x":200,"y":0}  
    },
];
var cat_ids = categories.map(function(d,i){return d.id;});

var interests = 
[
    { 
        "id": "gfNDXD1g",
        "name": "Travel", 
        "icon":"vac",
        items:
        [
            { 
                "id": "77A79Lr_",
                "title":"3-day tour in Georgia",
                "cost":340,
                "image":"vac_1.svg",
                "class":"vac-1",
                "source":"http://taoklarjeti.com/index.php/tours/turebi-sakartveloshi/svaneti-3-days",
                "source_date":"26.09.2014",
                "descr":"Tbilisi-Zugdidi-Mestia-Ushguli-Tbilisi, transportation, 3 meals/day, hotel, guide" 
            },
            { 
                "id": "Pe23w2Lz",
                "title":"6-day tour in Spain",
                "cost":1328,
                "image":"vac_2.svg",
                "class":"vac-2",
                "source":"http://4travel.ge/package/barcelona-spain/",
                "source_date":"26.09.2014",
                "descr":"Barcelona, Spain: 6 days/5 nights, round trip flight, hotel, travel insurance" 
            },
            { 
                "id": "j7hrF24w",
                "title":"7-day tour to the mountains of Taishan in China",
                "cost":3978,
                "image":"vac_3.svg",
                "class":"vac-3",
                "source":"http://discover-georgia.ge/index.php?l=2&menu=37&obj=216#.U_bwE8WSy3o",
                "source_date":"26.09.2014",
                "descr":"Chinese Mountains of Taishan: 8 days/7 nights, round trip flight, hotel, travel insurance" 
            },    
            { 
                "id": "LE-xVn5T",
                "title":"7-day tour in Mexico",
                "cost":7873,
                "image":"vac_4.svg",
                "class":"vac-4",
                "source":"http://bonvoyage.ge/?page=tours&cat=2&id=186",
                "source_date":"26.09.2014",
                "descr":"Mexico: 7 days/6 nights, round trip flight, hotel, 3 meals/day, excursions" 
            },     
            { 
                "id": "8BHSiiS3",
                "title":"11-day tour in Australia",
                "cost":17491,
                "image":"vac_5.svg",
                "class":"vac-5",
                "source":"http://www.flightcentre.com.au/tours/australia/3122876",
                "source_date":"26.09.2014",                "descr":"Cruise of the Australian Kimberly Coast: 3 meals/day" 
            },  
            { 
                "id": "p_bINCPp",
                "title":"98-day cruise exploring the Pacific Rim",
                "cost":57987,
                "image":"vac_6.svg",
                "class":"vac-6",
                "source":"http://www.forbes.com/sites/forbestravelguide/2012/08/16/the-worlds-most-luxurious-cruises/",
                "source_date":"26.09.2014",
                "descr":"The cruise goes from New Zealand to Sydney, Bali, Hong Kong, Alaska and Los Angeles (among others)." 
            }
        ] 
    },
    { 
        "id": "Rs2Uml6w",
        "name": "Gadgets",
        "icon":"gad",
        items:
        [
            { 
                "id": "NeRMinwu",
                "title":"MP3 Player",
                "cost":150,
                "image":"gad_1.svg",
                "class":"gad-1",
                "source":"http://pcshop.ge/index.php?page=shop.product_details&flypage=flypage-gur.tpl&product_id=1662&category_id=142&option=com_virtuemart&Itemid=6&lang=ka",
                "source_date":"25.09.2014",
                "descr":"Special Edition Ipod Shuffle (Product) Red" 
            },
            { 
                "id": "Q3eeT2j9",
                "title":"Video Game System",
                "cost":600, 
                "image":"gad_2.svg",
                "class":"gad-2",
                "source":"http://www.amazon.com/Xbox-One/dp/B00KAI3KW2/",
                "source_date":"22.09.2014",
                "descr":"Xbox One" 
            },
            { 
                "id": "4JAffVD6",
                "title":"Mobile Phone",
                "cost":1400,
                "image":"gad_3.svg",
                "class":"gad-3",
                "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7605&APPLE+Iphone+5S+16GB+Gold",
                "source_date":"25.09.2014",
                "descr":"Apple Iphone 5S 16GB" 
            },
            { 
                "id": "USLng33Z",
                "title":"Laptop",
                "cost":2836,
                "image":"gad_4.svg",
                "class":"gad-4",
                "source":"http://store.apple.com/uk/buy-mac/macbook-air?product=MD761B/B&step=config#",
                "source_date":"02.10.2014",
                "descr":"Apple MacBook Pro 13-inch 256GB"
            },
            { 
                "id": "eLkVnL8n",
                "title":"Digital Camera",
                "cost":5200,
                "image":"gad_5.svg",
                "class":"gad-5",
                "source":"http://www.amazon.com/Nikon-FX-Format-Digital-24-85mm-3-5-4-5G/dp/B00FOTFA7U/ref=sr_1_2?ie=UTF8&qid=1412256676&sr=8-2&keywords=nikon+d610",
                "source_date":"25.09.2014",
                "descr":"Nikon D610"
            },
            { 
                "id": "kV1jvNlr",
                "title":"3D Home Theater System",
                "cost":9721,
                "image":"gad_6.svg",
                "class":"gad-6",
                "source":"http://www.amazon.com/Klipsch-Theater-System-Cherry-AVR-X4000/dp/B00NSEK30W/ref=sr_1_3?s=tv&ie=UTF8&qid=1411721442&sr=1-3",
                "source_date":"26.09.2014",
                "descr":"Klipsch RF-7 II 5.1 Home Theater System-\ SW-112, SW-115 Denon AVR-X4000" 
            }
        ]
    },   
    { 
        "id": "KI3EFRI3",
        "name": "Education",
        "icon":"edu",
        items:
        [
             { 
                "id": "y_eZkaEO",
                "title":"Financial management course",
                "cost":450,
                "image":"edu_1.svg",
                "class":"edu-1",
                "source":"http://www.gceducentre.com/index.php?act=programs&id=9",
                "source_date":"",
                "descr":"Georgian-Canadian Educational Centre Financial Management course: 6 weeks" 
            },
            { 
                "id": "cuabVv82",
                "title":"English language course",
                "cost":1776,
                "image":"edu_2.svg",
                "class":"edu-2",
                "source":"http://www.britishcouncil.ge/english/courses-adults/general",
                "source_date":"02.10.2014",
                "descr":"British Council general English language 10-month long course" 
            },
            { 
                "id": "mE3tEvWc",
                "title":"Public university bachelor's degree",
                "cost":9000,
                "image":"edu_3.svg",
                "class":"edu-3",
                "source":"",
                "source_date":"",
                "descr":"Georgian public university bachelor's degree" 
            },
            { 
                "id": "nGgaI1SL",
                "title":"Private university business degree",
                "cost":30600,
                "image":"edu_4.svg",
                "class":"edu-4",
                "source":"http://freeuni.edu.ge/ge/node/463",
                "source_date":"25.09.2014",
                "descr":"Free University of Tbilisi Business School (ESM)" 
            },
            { 
                "id": "egtsYjwP",
                "title":"2-year MBA",
                "cost":71040,
                "image":"edu_5.svg",
                "class":"edu-5",
                "source":"http://www.ceu.hu/admissions/tuitionandfees/14-15",
                "source_date":"26.09.2014",
                "descr":"Central European Univeirsity Executive Master of Business Administration" 
            },
            { 
                "id": "k17y863W",
                "title":"12-month MBA",
                "cost":105000,
                "image":"edu_6.svg",
                "class":"edu-6",
                "source":"http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-business-schools/mba-rankings",
                "source_date":"02.10.2014",
                "descr":"University of Cambridge Master of Business Administration, intensive 12 months" 
            }
        ] 
    },
    { 
        "id": "7fdCIojZ",
        "name": "Housing",
        "icon":"hou",
        items:
        [
            { 
                "id": "6MhsbW7j",
                "title":"1-room apartment",
                "cost":48125,
                "image":"hou_1.svg",
                "class":"hou-1",
                "source":"http://myhome.ge/product_info.php?product_id=6036887",
                "source_date":"13.10.2014",
                "descr":"1-room apartment in Dighomi Massive V" 
            },
            { 
                "id": "FRyVRVZf",
                "title":"2-room apartment",
                "cost":80500,
                "image":"hou_2.svg",
                "class":"hou-2",
                "source":"http://myhome.ge/product_info.php?product_id=5993384",
                "source_date":"13.10.2014",
                "descr":"2-room apartment in Didi Dighomi, Ist district" 
            },
            { 
                "id": "-ke7QwpJ",
                "title":"3-room apartment",
                "cost":101500,
                "image":"hou_3.svg",
                "class":"hou-3",
                "source":"http://myhome.ge/product_info.php?product_id=5993369",
                "source_date":"13.10.2014",
                "descr":"3-room apartment in Didi Dighomi, Petritsi Street" 
            },
            { 
                "id": "ODRpktbx",
                "title":"4-room apartment",
                "cost":113750,
                "image":"hou_4.svg",
                "class":"hou-4",
                "source":"http://myhome.ge/product_info.php?product_id=5993386",
                "source_date":"13.10.2014",
                "descr":"4-room apartment Didi Dighomi, III district" 
            },
            { 
                "id": "2HIuYW5a",
                "title":"5-room house",
                "cost":236250,
                "image":"hou_5.svg",
                "class":"hou-5",
                "source":"http://myhome.ge/product_info.php?product_id=6006503",
                "source_date":"13.10.2014",
                "descr":"5-room, 2-floor house in Didi Dighomi" 
            },
            { 
                "id": "5pTaH-Si",
                "title":"6-room house",
                "cost":332500,
                "image":"hou_6.svg",
                "class":"hou-6",
                "source":"http://myhome.ge/product_info.php?product_id=5941408",
                "source_date":"13.10.2014",
                "descr":"6-room, 2-floor house in Didi Dighomi" 
            }
        ] 
    },
    { 
        "id": "3QDbCRrq",
        "name": "Transportation",
        "icon":"tra",
        items:
        [
            { 
                "id": "grHOtIbx",
                "title":"Bicycle",
                "cost":936,
                "image":"tra_1.svg",
                "class":"tra-1",
                "source":"http://www.scott.ge/index.php/ka/component/virtuemart/cycling-geo/mountain-geo/227750-geo-detail?Itemid=0",
                "source_date":"25.09.2014",
                "descr":"SCOTT Aspect 660" 
            },
            { 
                "id": "fndmDZlb",
                "title":"Motorcycle",
                "cost":4723,
                "image":"tra_2.svg",
                "class":"tra-2",
                "source":"http://myauto.ge/index.php?action=moto_details&car_id=10271537",
                "source_date":"25.09.2014",
                "descr":"Suzuki, GSX-R750, 2001" 
            },
            { 
                "id": "_ejo7U7H",
                "title":"Mazda",
                "cost":12600,
                "image":"tra_3.svg",
                "class":"tra-3",
                "source":"http://autopapa.ge/en/mazda/3/359677?search_hash=5c363f19d7585ff3a92d3168e5e45d33&offset=5",
                "source_date":"25.09.2014",
                "descr":"Mazda 3, Hatchback, 2008" 
            },
            { 
                "id": "Te6f2mYy",
                "title":"BMW",
                "cost":27125,
                "image":"tra_4.svg",
                "class":"tra-4",
                "source":"http://autopapa.ge/en/bmw/528/359639?search_hash=e4165f5977a8a00120a7cde868d444e9&offset=2",
                "source_date":"25.09.2014",
                "descr":"BMW 528, Sedan, 2009" 
            },
            { 
                "id": "PcNAyqxL",
                "title":"Lexus",
                "cost":56000,
                "image":"tra_5.svg",
                "class":"tra-5",
                "source":"http://autopapa.ge/en/lexus/gx-470/359329?search_hash=2991cf9fb16ee648647d0fd6e0f9cade&offset=2",
                "source_date":"25.09.2014",
                "descr":"Lexus GX 470, SUV, 2009" 
            },
            { 
                "id": "KOpdBfBy",
                "title":"Land Rover",
                "cost":91000,
                "image":"tra_6.svg",
                "class":"tra-6",
                "source":"http://autopapa.ge/en/land-rover/range-rover-sport/356898?search_hash=af1eb936bd4cc037006c08f12654d754&offset=11",
                "source_date":"25.09.2014",
                "descr":"Land Rover Range Rover Sport, SUV, 2011" 
            }
        ] 
    }
];
var int_ids = interests.map(function(d,i){return d.id;});

// gap game localization
var locale = {
  poll:
  {
    your_gender:"Your Gender",
    your_age:"Your Age",
    your_job:"Your Job Sector",
    your_salary:"Your Salary",
    your_interest:"Your Interest",
    your_percent:"How much do\n you save up for\n your interest",
    female:"Female",
    male:"Male",
    f:"f",
    m:"m"
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
    isRTL: false,
    congrat:"Congrats!",
    share_hint:"Share this on facebook",
    about:"About",
    you_can_buy: "You can afford a ",
    you_can_buy_education: "You can afford to finance a ",    
    sorry: "So sorry,\n but saving &1 GEL a month will never\n be enough for you to afford\n something in &2.\n Do you want to start the game over?",
    wanna_jump: "Saving &1 GEL a month will take you \n&2 years before you can purchase \nsomething in &3.\nDo you want to jump ahead to get your \nfirst purchase?",
    another_interest: "Choose another interest",
    continue_anyway: "Continue anyway",
    yes: "Yes",
    no: "No",
    you: "You",
    retirement: "year until retirement",
    retirements: "years until retirement",
    details: "Details",
    cost: "Cost",
    years_back: " years back",
    years_forward: " years forward",
    female:"Female",
    male:"Male",
    gel: "GEL",
    and: "and"
  },
  game:
  {
    total_salary:"Total Salary:&nbsp;",
    total_saved:"&nbsp;|&nbsp;Total Saved:&nbsp;"
  }
};
var lg = locale.general;