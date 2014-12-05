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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
    },
    { 
        "id": "FWrgJx0N",
        "name": "Fishing",
        "outrun":0,
        "percent":43.68,
        "male":524.9,
        "female":295.6,
        "dress":"technical",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"fishing",
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 340.34823,114.32031 L 8.1219464,114.32031 L 8.1219464,106.97189 L 338.80119,107.7454"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
    },
    { 
        "id": "TxbZicXP",
        "name": "Mining and quarrying",
        "outrun":0,
        "percent":9.74,
        "male":1045.1,
        "female":943.3,
        "dress":"construction",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"mining",
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        }  
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        }  
    },
    { 
        "id": "HxhM0Ejd",
        "name": "Education",
        "outrun":0,
        "percent":21.45,
        "male":545,
        "female":428.1,   
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"education",
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
    },
    {
        "id": "dJdfgktK",
        "name": "Health and social work",
        "outrun":0,
        "percent":41.39,
        "male":1023.8,
        "female":600.1,   
        "dress":"solid",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"health",
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
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
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
    },
    {
        "id": "hyn3wmKk",
        "name": "Everywoman/man",
        "outrun":0,
        "percent":0,
        "male":0,
        "female":0,   
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",    
        "fg":"other",
        "stage":
        {
            "frame":
            {
                "load":{ "a":true, "duration":1, "path":"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                "work":{ "a":false, "loop": true, "path":"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                "reward":{ "a":true, "loop":false, "path":"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
            }
        } 
    },
];
var cat_ids = categories.map(function(d,i){return d.id;});

var interests = 
[
    { 
        "id": "gfNDXD1g",
        "name": "Vacation", 
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
                "descr":"Tbilisi-Zugdidi-Mestia-Ushguli-Tbilisi,Transportation,3times meal,Accomodation,Guide" 
            },
            { 
                "id": "Pe23w2Lz",
                "title":"6-day tour in Spain",
                "cost":1328,
                "image":"vac_2.svg",
                "class":"vac-2",
                "source":"http://4travel.ge/package/barcelona-spain/",
                "source_date":"26.09.2014",
                "descr":"Barcelona, Spain; 6days/5nights, Round trip flight,Hotel,Travel insurance" 
            },
            { 
                "id": "j7hrF24w",
                "title":"7-day tour Travel to the mountains of Taishan",
                "cost":3978,
                "image":"vac_3.svg",
                "class":"vac-3",
                "source":"http://discover-georgia.ge/index.php?l=2&menu=37&obj=216#.U_bwE8WSy3o",
                "source_date":"26.09.2014",
                "descr":"Travel to the mountains of Taishan,7days/8nights, Round trip air tickets,Hotel, Travel insurance" 
            },    
            { 
                "id": "LE-xVn5T",
                "title":"7-day tour in Mexico",
                "cost":7873,
                "image":"vac_4.svg",
                "class":"vac-4",
                "source":"http://bonvoyage.ge/?page=tours&cat=2&id=186",
                "source_date":"26.09.2014",
                "descr":"Mexico,7days/6nights includes:Air Tickets,Accomodate at hotel and villa,3times meal,Excursions" 
            },     
            { 
                "id": "8BHSiiS3",
                "title":"11-day tour in Australia",
                "cost":17491,
                "image":"vac_5.svg",
                "class":"vac-5",
                "source":"http://www.flightcentre.com.au/tours/australia/3122876",
                "source_date":"26.09.2014",
                "descr":"Kimberly coast cruise,Australia; Meals:Breakfast,Lunch,Dinner" 
            },  
            { 
                "id": "p_bINCPp",
                "title":"98-day cruise exploring the Pacific Rim",
                "cost":57987,
                "image":"vac_6.svg",
                "class":"vac-6",
                "source":"http://www.forbes.com/sites/forbestravelguide/2012/08/16/the-worlds-most-luxurious-cruises/",
                "source_date":"26.09.2014",
                "descr":"The cruise starts in Auckland, New Zealand and hits Sydney, Bali, Hong Kong and Alaska (among others) before anchoring in Los Angeles." 
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
                "type": "mobile",
                "title":"Nokia 1280 Black/G",
                "cost":41.99,
                "image":"gad_1.svg",
                "class":"gad-1",
                "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7708&NOKIA+1280+BLACK%2FG",
                "source_date":"22.09.2014",
                "descr":"Tab" 
            },
            { 
                "id": "Q3eeT2j9",
                "type": "mobile",
                "title":"SAMSUNG I9300 Galaxy S3 White",
                "cost":700, 
                "image":"gad_2.svg",
                "class":"gad-2",
                "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7608&SAMSUNG+I9300+Galaxy+S3+White",
                "source_date":"22.09.2014",
                "descr":"Mobile Phone" 
            },
            { 
                "id": "4JAffVD6",
                "type": "mobile", 
                "title":"C",
                "cost":1100,
                "image":"gad_3.svg",
                "class":"gad-3",
                "source":"", "source_date":"",
                "descr":"Super Buper Thing" 
            },
            { 
                "id": "USLng33Z",
                "type": "mobile",
                "title":"E",
                "cost":2000,
                "image":"gad_4.svg",
                "class":"gad-4",
                "source":"",
                "source_date":"",
                "descr":"Theatre"
            },
            { 
                "id": "eLkVnL8n",
                "type": "mobile", 
                "title":"Apple Iphone 5S 64GB Gold",
                "cost":1765,
                "image":"gad_5.svg",
                "class":"gad-5",
                "source":"http://applecity.ge/shop/iphone/iphone-5s-64gb/",
                "source_date":"22.09.2014",
                "descr":"XBox"
            },
            { 
                "id": "kV1jvNlr",
                "type": "mobile",
                "title":"Vertu Signature Diamond",
                "cost":154000,
                "image":"gad_6.svg",
                "class":"gad-6",
                "source":"http://www.onlinenewspoint.com/top-10-most-expensive-mobile-phones-in-the-world-2014/",
                "source_date":"22.09.2014",
                "descr":"Notebook" 
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
                "title":"Georgian-Canadian educational centre",
                "cost":450,
                "image":"edu_1.svg",
                "class":"edu-1",
                "source":"http://www.gceducentre.com/index.php?act=programs&id=9",
                "source_date":"",
                "descr":"Financial Management, 6 weeks course, Individual" 
            },
            { 
                "id": "cuabVv82",
                "title":"English language ",
                "cost":1776,
                "image":"edu_2.svg",
                "class":"edu-2",
                "source":"http://www.britishcouncil.ge/english/courses-adults/general",
                "source_date":"02.10.2014",
                "descr":"10-months long General English language course at British Council" 
            },
            { 
                "id": "mE3tEvWc",
                "title":"Georgian Public University BA tuition fee ",
                "cost":9000,
                "image":"edu_3.svg",
                "class":"edu-3",
                "source":"",
                "source_date":"",
                "descr":"" 
            },
            { 
                "id": "nGgaI1SL",
                "title":"Free University of Tbilisi",
                "cost":30600,
                "image":"edu_4.svg",
                "class":"edu-4",
                "source":"http://www.rgsl.edu.lv/en/apply-to-rgsl/admissions/tuition-fees/",
                "source_date":"25.09.2014",
                "descr":"Business School(ESM), 4years" 
            },
            { 
                "id": "egtsYjwP",
                "title":"Central European Univeirsity",
                "cost":71040,
                "image":"edu_5.svg",
                "class":"edu-5",
                "source":"http://www.geducation.co.uk/chester-BABA.php",
                "source_date":"26.09.2014",
                "descr":"CEU Executive Master of Business Administration, 2 years" 
            },
            { 
                "id": "k17y863W",
                "title":"University of Cambridge",
                "cost":105000,
                "image":"edu_6.svg",
                "class":"edu-6",
                "source":"http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-business-schools/mba-rankings",
                "source_date":"02.10.2014",
                "descr":"Master of Business administration, intensive 12 months, including maintanance" 
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
                "descr":"Dighomi Massive V" 
            },
            { 
                "id": "FRyVRVZf",
                "title":"2-rooms apartement",
                "cost":80500,
                "image":"hou_2.svg",
                "class":"hou-2",
                "source":"http://myhome.ge/product_info.php?product_id=5993384",
                "source_date":"13.10.2014",
                "descr":"Didi Dighomi, Ist district" 
            },
            { 
                "id": "-ke7QwpJ",
                "title":"3-rooms apartement",
                "cost":101500,
                "image":"hou_3.svg",
                "class":"hou-3",
                "source":"http://myhome.ge/product_info.php?product_id=5993369",
                "source_date":"13.10.2014",
                "descr":"Didi Dighomi, Petritsi Street" 
            },
            { 
                "id": "ODRpktbx",
                "title":"4-rooms apartement",
                "cost":113750,
                "image":"hou_4.svg",
                "class":"hou-4",
                "source":"http://myhome.ge/product_info.php?product_id=5993386",
                "source_date":"13.10.2014",
                "descr":"Didi Dighomi, III district" 
            },
            { 
                "id": "2HIuYW5a",
                "title":"5-rooms apartement",
                "cost":236250,
                "image":"hou_5.svg",
                "class":"hou-5",
                "source":"http://myhome.ge/product_info.php?product_id=6006503",
                "source_date":"13.10.2014",
                "descr":"2 flour house (Didi Dighomi)" 
            },
            { 
                "id": "5pTaH-Si",
                "title":"6-rooms apartement",
                "cost":332500,
                "image":"hou_6.svg",
                "class":"hou-6",
                "source":"http://myhome.ge/product_info.php?product_id=5941408",
                "source_date":"13.10.2014",
                "descr":"2 flour house (Didi Dighomi)" 
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
                "descr":"Lexus GX 470, Suv, 2009" 
            },
            { 
                "id": "KOpdBfBy",
                "title":"Land Rover",
                "cost":91000,
                "image":"tra_6.svg",
                "class":"tra-6",
                "source":"http://autopapa.ge/en/land-rover/range-rover-sport/356898?search_hash=af1eb936bd4cc037006c08f12654d754&offset=11",
                "source_date":"25.09.2014",
                "descr":"Land Rover Range Rover Sport, Suv, 2011" 
            }
        ] 
    }
    //{ "id": "Cc8WWUmB","name": "Health & Beauty", items:[] }
];
var int_ids = interests.map(function(d,i){return d.id;});
var sintro = { "class":"intro", "title":"Gap Game"};
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
    your_gender:"Your Gender",
    your_age:"Your Age",
    your_job:"Your Job Sector",
    your_salary:"Your Salary",
    your_interest:"Your Interest",
    your_percent:"How much do\n you save up for\n your interest",
    lorem:"Lorem ipsum dolor sit amet ka That is\n like each person in the watching a\n broadcast for Or one single\n person watching a\n broadcast\n continuously\nfor",
    about_game:"Lorem ipsum dolor sit amet ka That is\n like each person in the watching a\n broadcast for Or one single\n person watching a\n broadcast\n continuously\nfor",
    female:"Female",
    male:"Male"
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
    share_hint:"Share this point on facebook"
  },
  game:
  {
    total_salary:"Total Salary:&nbsp;",
    total_saved:"&nbsp;|&nbsp;Total Saved:&nbsp;"
  }
};
var sounds = 
[
    //{ "name":"done",        loop:false, path:"/assets/gap/sounds/done.mp3" },
    //{ "name":"applause",    loop:true,  path:"/assets/gap/sounds/happy.mp3" },    
    //{ "name":"select",      loop:false, path:"/assets/gap/sounds/select.mp3" }//,
    //{ "name":"background",  loop:true, path:"/assets/gap/sound/background.mp3" },
];
// var background_sounds = 
// {
//     sounds = 
//     [
//         { name:"done", type:"interest", loop:false, path:"/assets/gap/sound/gad_1.mp3" },
//         { name:"done", type:"interest", loop:false, path:"/assets/gap/sound/gad_2.mp3" }
//     ]
// };