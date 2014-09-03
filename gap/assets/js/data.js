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