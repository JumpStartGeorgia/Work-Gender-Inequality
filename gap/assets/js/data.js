/**
* outrun: 0 - male, 1 - female
*/

var categories = 
[
        { "id": "45bS4GyC","name": "Agriculture, hunting and forestry", "outrun":0, "percent":11,
            stage:
            {
                background:"assets/images/svg/field/education/bk.svg",
                foreground:{ interior:"assets/images/svg/field/education/school_int.svg", exterior:"assets/images/svg/field/education/school_ext.svg"}, // should be of same size
                frame:
                {
                    on_load:{ a:true, duration:1, path:"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},
                    //on_work_before:{},
                    on_work:{ a:false, loop: true, path:"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},
                    //on_work_after:{},
                    on_tap:{},
                    on_jump:{},
                    on_reward_before:{ a:false, loop:false, path:"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"},
                    on_reward:{},
                    on_reward_after:{},
                    on_after:{}

                }
            } 
        },
        { "id": "FWrgJx0N","name": "Fishing", "outrun":0, "percent":11 },
        { "id": "TxbZicXP","name": "Mining and quarrying", "outrun":0, "percent":11 },
        { "id": "Zyb2KhON","name": "Manufacturing", "outrun":0, "percent":11 },
        { "id": "8IkQeUfg","name": "Production and distribution of electricity, gas and water", "outrun":0, "percent":11 },
        { "id": "eibtNMge","name": "Construction", "outrun":0, "percent":11 },
        { "id": "jDYS_Z1V","name": "Wholesale and retail trade; repair of motor vehicles and personal and household goods", "outrun":0, "percent":11 },
        { "id": "I52aZAVX","name": "Hotels and restaurants", "outrun":0, "percent":11 },
        { "id": "rn4bDK0j","name": "Transport and communication", "outrun":0, "percent":11 },
        { "id": "EmbBcc5x","name": "Financial intermediation", "outrun":0, "percent":11 },
        { "id": "oxKq-H8w","name": "Real estate, renting and business activities", "outrun":0, "percent":11 },
        { "id": "dT-LWuT4","name": "Public administration", "outrun":0, "percent":11 },
        { "id": "HxhM0Ejd","name": "Education", "outrun":0, "percent":11 },
        { "id": "dJdfgktK","name": "Health and social work", "outrun":0, "percent":11 },
        { "id": "DqFfYVGZ","name": "Other community, social and personal service activities", "outrun":0, "percent":11 }
];
var frame_sequence = [
    'on_load','on_work','on_reward_before','on_reward','on_reward_after','on_after'
];
var frame_sequence_length = frame_sequence.length;
var cat_ids = categories.map(function(d,i){return d.id;});
var interests = 
[
        { "id": "gfNDXD1g", "name": "Vacation", items:[] },
        { "id": "Rs2Uml6w","name": "Gadgets", 
                items:
                [
                        { "id": "Q3eeT2j9", "type": "mobile", "title":"BSAMSUNG I9300 Galaxy S3 White", "cost":700, "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7608&SAMSUNG+I9300+Galaxy+S3+White", "source_date":"22.09.2014" },
                        { "id": "NeRMinwu", "type": "mobile", "title":"ANokia 1280 Black/G", "cost":41.99, "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7708&NOKIA+1280+BLACK%2FG", "source_date":"22.09.2014" },
                        { "id": "eLkVnL8n", "type": "mobile", "title":"DApple Iphone 5S 64GB Gold", "cost":1765, "source":"http://applecity.ge/shop/iphone/iphone-5s-64gb/", "source_date":"22.09.2014" },
                        { "id": "kV1jvNlr", "type": "mobile", "title":"FVertu Signature Diamond", "cost":154000, "source":"http://www.onlinenewspoint.com/top-10-most-expensive-mobile-phones-in-the-world-2014/", "source_date":"22.09.2014" },
                        { "id": "USLng33Z", "type": "mobile", "title":"E", "cost":2000, "source":"", "source_date":"" },
                        { "id": "4JAffVD6", "type": "mobile", "title":"C", "cost":1100, "source":"", "source_date":"" }
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



// var stages = 
// [
//         {
//                 type: 1, // 1 - category, 2 intermediate, 3 interest
//                 layers : 
//                 [
//                         // type 1 - background, 2 - object
//                         {
//                                 type:1,
//                                 image : "assets/images/svg/field/education/bk.svg", // field/imagename
//                                 path : "M -0.12626907,54.232233 C 4.2931483,52.843273 28.284271,49.307739 29.925769,49.560278 c 1.641498,0.252538 8.586297,1.010152 13.510791,1.010152 4.924493,0 13.763328,-0.126269 20.455589,0.757614 6.69226,0.883884 12.626906,3.661803 18.435284,4.16688 C 88.13581,56 97.732259,54.484771 98.742411,54.358502 c 1.010153,-0.126269 2.146579,-0.378807 2.146579,-0.378807"
//                         },  
//                         {
//                                 type:2,
//                                 image : "assets/images/svg/field/education/school.svg",
//                                 position: { x:50, y:0, a:0 },
//                                 path : "M -0.12626907,54.232233 C 4.2931483,52.843273 28.284271,49.307739 29.925769,49.560278 c 1.641498,0.252538 8.586297,1.010152 13.510791,1.010152 4.924493,0 13.763328,-0.126269 20.455589,0.757614 6.69226,0.883884 12.626906,3.661803 18.435284,4.16688 C 88.13581,56 97.732259,54.484771 98.742411,54.358502 c 1.010153,-0.126269 2.146579,-0.378807 2.146579,-0.378807"
//                         }
//                 ],               
                
//         }
//                  //character : [ {p:1,s:10}] // by step data p - percent, speed for character        
// ];
// //                                 fullscreen : true    

