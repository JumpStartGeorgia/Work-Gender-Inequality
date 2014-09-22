
var category = 
[
        { "id": "45bS4GyC", "name": "Agriculture, hunting and forestry" },
        { "id": "FWrgJx0N","name": "Fishing" },
        { "id": "TxbZicXP","name": "Mining and quarrying" },
        { "id": "Zyb2KhON","name": "Manufacturing" },
        { "id": "8IkQeUfg","name": "Production and distribution of electricity, gas and water" },
        { "id": "eibtNMge","name": "Construction" },
        { "id": "jDYS_Z1V","name": "Wholesale and retail trade; repair of motor vehicles and personal and household goods" },
        { "id": "I52aZAVX","name": "Hotels and restaurants" },
        { "id": "rn4bDK0j","name": "Transport and communication" },
        { "id": "EmbBcc5x","name": "Financial intermediation" },
        { "id": "oxKq-H8w","name": "Real estate, renting and business activities" },
        { "id": "dT-LWuT4","name": "Public administration" },
        { "id": "HxhM0Ejd","name": "Education" },
        { "id": "dJdfgktK","name": "Health and social work" },
        { "id": "DqFfYVGZ","name": "Other community, social and personal service activities" }
];
var cat_ids = category.map(function(d,i){return d.id;});
var interest = 
[
        { "id": "gfNDXD1g", "name": "Vacation" },
        { "id": "Rs2Uml6w","name": "Gadgets" },
        { "id": "KI3EFRI3","name": "Education" },
        { "id": "7fdCIojZ","name": "Owning Home" },
        { "id": "3QDbCRrq","name": "Owning Car" },
        { "id": "Cc8WWUmB","name": "Sports" },
        { "id": "31bZn8Du","name": "Fashion" },
        { "id": "V1IOw5N5","name": "Agriculture" }
];
var int_ids = interest.map(function(d,i){return d.id;});

var sintro = { "class":"intro", "title":"Gap Game (Just scroll)"};
var poll = {
        gender:{},
        age:{},
        category:{},
        interest:{}
};
var sframe = 
[
        {}
];
var sepilogue = { "class":"epilogue", "title":"Game Over"};
var age_groups = 
[
        { "name":"adolescence", "min":18, "max":29},
        { "name":"young_adulthood", "min":30, "max":39},
        { "name":"middle_adulthood", "min":40, "max":49},
        { "name":"advanced_adulthood", "min":50, "max":65}      
]; 


var stages = 
[
        {
                type: 1, // 1 - category, 2 intermediate, 3 interest
                layers : 
                [
                        // type 1 - background, 2 - object
                        {
                                type:1,
                                image : "assets/images/svg/field/education/bk.svg", // field/imagename
                                path : "M -0.12626907,54.232233 C 4.2931483,52.843273 28.284271,49.307739 29.925769,49.560278 c 1.641498,0.252538 8.586297,1.010152 13.510791,1.010152 4.924493,0 13.763328,-0.126269 20.455589,0.757614 6.69226,0.883884 12.626906,3.661803 18.435284,4.16688 C 88.13581,56 97.732259,54.484771 98.742411,54.358502 c 1.010153,-0.126269 2.146579,-0.378807 2.146579,-0.378807"
                        },  
                        {
                                type:2,
                                image : "assets/images/svg/field/education/school.svg",
                                position: { x:50, y:0, a:0 },
                                path : "M -0.12626907,54.232233 C 4.2931483,52.843273 28.284271,49.307739 29.925769,49.560278 c 1.641498,0.252538 8.586297,1.010152 13.510791,1.010152 4.924493,0 13.763328,-0.126269 20.455589,0.757614 6.69226,0.883884 12.626906,3.661803 18.435284,4.16688 C 88.13581,56 97.732259,54.484771 98.742411,54.358502 c 1.010153,-0.126269 2.146579,-0.378807 2.146579,-0.378807"
                        }
                ],               
                
        }
                 //character : [ {p:1,s:10}] // by step data p - percent, speed for character        
];
//                                 fullscreen : true    


var interest_items = 
{
        vacation:[

        ],
        gadgets: [
                { "id": "Q3eeT2j9", "type": "mobile", "title":"SAMSUNG I9300 Galaxy S3 White", "cost":700, "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7608&SAMSUNG+I9300+Galaxy+S3+White", "source_date":"22.09.2014" },
                { "id": "NeRMinwu", "type": "mobile", "title":"Nokia 1280 Black/G", "cost":41.99, "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7708&NOKIA+1280+BLACK%2FG", "source_date":"22.09.2014" },
                { "id": "eLkVnL8n", "type": "mobile", "title":"Apple Iphone 5S 64GB Gold", "cost":1765, "source":"http://applecity.ge/shop/iphone/iphone-5s-64gb/", "source_date":"22.09.2014" },
                { "id": "kV1jvNlr", "type": "mobile", "title":"Vertu Signature Diamond", "cost":154000, "source":"http://www.onlinenewspoint.com/top-10-most-expensive-mobile-phones-in-the-world-2014/", "source_date":"22.09.2014" },
                { "id": "USLng33Z", "type": "mobile", "title":"", "cost":1, "source":"", "source_date":"" },
                { "id": "4JAffVD6", "type": "mobile", "title":"", "cost":2, "source":"", "source_date":"" }
        ],
        education: [],
        housing: [],
        transportation: [],
        health_beauty: []
};
var current_interest = interest_items.gadgets.sort(function(a,b){ return b.cost - a.cost; });
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