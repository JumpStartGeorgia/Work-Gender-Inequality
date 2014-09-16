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
                group: 1, // 1 - category, 2 intermediate, 3 interest
                layers : 
                [
                        {
                                image : "assets/images/svg/field/education/bk.svg", // field/imagename
                                scale : true,
                                position: { x: 0, y : 0, a:0 }, // x,y in percent, a in angles     
                                bk : true   
                        },
                        {
                                image : "assets/images/svg/common/sun.svg", // field/imagename
                                scale : false,
                                position: { x: 90, y : 10, a:0 }, // x,y in percent, a in angles    
                                fullscreen : true    
                        },
                        {
                                image : "assets/images/svg/common/bird.svg", // field/imagename
                                scale : false,
                                position: { x: 32, y : 40, a:0 },
                                speed:1 // x,y in percent, a in angles        
                        }
                        // {
                        //         image : "education/environ2.svg", // field/imagename
                        //         scale : false,
                        //         position: { x: 0, y : 0, a:90 } // x,y in percent, a in angles        
                        // }
                ],               
                path : "M -0.12626907,54.232233 C 4.2931483,52.843273 28.284271,49.307739 29.925769,49.560278 c 1.641498,0.252538 8.586297,1.010152 13.510791,1.010152 4.924493,0 13.763328,-0.126269 20.455589,0.757614 6.69226,0.883884 12.626906,3.661803 18.435284,4.16688 C 88.13581,56 97.732259,54.484771 98.742411,54.358502 c 1.010153,-0.126269 2.146579,-0.378807 2.146579,-0.378807",
                character : [ {p:1,s:10}] // by step data p - percent, speed for character
        },
        {
                group: 1, // 1 - category, 2 intermediate, 3 interest
                layers : 
                [
                        {
                                image : "assets/images/svg/field/education/bk.svg", // field/imagename
                                scale : true,
                                position: { x: 0, y : 0, a:0 }, // x,y in percent, a in angles     
                                bk : true,
                                z:20
                        },    
                        {
                                image : "assets/images/svg/field/education/school.svg", // field/imagename
                                scale : true,
                                position: { x: 0, y : 100, a:0 }, // x,y in percent, a in angles        
                                z:40
                        },       
                        {
                                image : "assets/images/svg/common/bird.svg", // field/imagename
                                scale : false,
                                position: { x: 32, y : 30, a:0 } // x,y in percent, a in angles        
                        },
                        {
                                image : "assets/images/svg/common/bird.svg", // field/imagename
                                scale : false,
                                position: { x: 52, y : 25, a:0 } // x,y in percent, a in angles        
                        },
                    
                        // {
                        //         image : "education/environ2.svg", // field/imagename
                        //         scale : false,
                        //         position: { x: 0, y : 0, a:90 } // x,y in percent, a in angles        
                        // }
                ],               
                path : "M 0,54.035714 21.964286,54.214286 21.785714,31.357143 7.3214286,31.357143 3.9285714,33.678571 6.25,29.214286 25.535714,29.035714 25.892857,54.214286 40.892857,53.857143 48.75,55.464286 72.857143,55.285714 81.607143,52.25 96.25,52.071429 100.17857,55.107143",
                character : [ {p:1,s:10}] // by step data p - percent, speed for character
        }
];