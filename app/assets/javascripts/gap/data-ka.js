/**
* outrun: 0 - male, 1 - female
* dress casual street business technical construction
*/
var categories = 
[
    {   
        "id": "45bS4GyC",
        "name": "სოფლის მეურნეობა, \nნადირობა და სატყეო მეურნეობა",
        "outrun":0,
        "percent":22.72,
        "male":599.4,
        "female":463.2,
        "dress":"technical",
        "bg":"bg1",
        "bg2":"bg3",
        "fg":"agriculture",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 59.818847,205.81734 L 1177.9035,206.39464 L 1177.9035,205.27178 L 59.818846,206.90233 z"},
        "work_point":{ "x":60,"y":27 }   
    },
    { 
        "id": "FWrgJx0N",
        "name": "თევზჭერა",
        "outrun":0,
        "percent":43.68,
        "male":524.9,
        "female":295.6,
        "dress":"fisher",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"fishing",
        "action":true,
        "action_points":[{"x":200,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 15.655567,182.40349 L 1056.151,182.40349 L 1056.1984,181.64588 L 15.655557,181.64588 z"},
        "work_point":{ "x":10,"y":0 }      
    },
    { 
        "id": "TxbZicXP",
        "name": "სამთომოპოვებითი მრეწველობა",
        "outrun":0,
        "percent":9.74,
        "male":1045.1,
        "female":943.3,
        "dress":"miner",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"mining",
        "action":true,
        "action_points":[{"x":396,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 33.107821,289.61203 L 33.107821,291.27324 L 709.11961,291.27324 L 709.11961,289.95167 z"},
        "work_point":{"x":70,"y":0}  
    },
    { 
        "id": "Zyb2KhON",
        "name": "დამამუშავებელი მრეწველობა",
        "outrun":0,
        "percent":36.99,
        "male":868.1,
        "female":547,
        "dress":"technical",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"manufacturing",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 114.69192,284.55042 L 388.65288,284.55042 L 388.65288,282.33241 L 114.69192,282.73297 z"},
        "work_point":{"x":150,"y":4}     
    },
    { 
        "id": "8IkQeUfg",
        "name": "ელ. ენერგიის, აირისა და \nწყლის წარმოება და განაწილება",
        "outrun":1, 
        "percent":6.58,
        "male":979,
        "female":1047.9,
        "dress":"solid",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"production",
        "action":true,
        "action_points":[{"x":720,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 230.35687,313.02843 L 791.89208,313.02843 L 792.73154,309.89554 L 229.28545,309.89554 z"},
        "work_point":{"x":229,"y":4}     
    },
    { 
        "id": "eibtNMge",
        "name": "მშენებლობა",
        "outrun":0,
        "percent":34.69,
        "male":1155.8,
        "female":754.8,
        "dress":"construction",
        "bg":"bg1",
        "bg2":"bg2",
        "fg":"construction",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 101.61337,360.77881 L 566.10882,360.77881 L 566.15618,360.0212 L 101.61336,360.0212 z"},
        "work_point":{"x":100,"y":0}
    },
    { 
        "id": "jDYS_Z1V",
        "name": "საბითუმო და საცალო ვაჭრობა; \nავტომობილების, საყოფაცხოვრებო და \nპირადი მოხმარების საგნების რემონტი",
        "outrun":0,
        "percent":36.96,
        "male":906.4,
        "female":571.4,            
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"wholesale",
        "action":true,
        "action_points":[{"x":870,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 204.6976,316.08581 L 949.19303,316.08581 L 949.24039,315.3282 L 204.69759,315.3282 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "I52aZAVX",
        "name": "სასტუმროები და რესტორნები",
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
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "rn4bDK0j",
        "name": "ტრანსპორტი და კავშირგაბმულობა",
        "outrun":0,
        "percent":24.31,
        "male":1251.1,
        "female":946.9,   
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"transport",
        "action":true,
        "action_points":[{"x":630,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 203.22005,315.7171 L 900.0101,315.7171 L 900.0101,314.43862 L 203.19904,314.47367 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "EmbBcc5x",
        "name": "საფინანსო საქმიანობა",
        "outrun":0,
        "percent":52.38,
        "male":2626,
        "female":1250.6,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",        
        "fg":"financial",
        "action":true,
        "action_points":[{"x":870,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 203.22005,315.7171 L 900.0101,315.7171 L 900.0101,314.43862 L 203.19904,314.47367 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "oxKq-H8w",
        "name": "ოპერაციები უძრავი ქონებით,\n იჯარა და მომხმარებლისთვის \nმომსახურების გაწევა",
        "outrun":0,
        "percent":21.68,
        "male":1044.7,
        "female":818.2,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"realestate",
        "action":true,
        "action_points":[{"x":690,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 204.55565,312.67655 L 855.34567,312.67655 L 855.34567,311.39807 L 204.53464,311.43312 z"},
        "work_point":{"x":200,"y":0}
    },
    { 
        "id": "dT-LWuT4",
        "name": "სახელმწიფო მმართველობა", 
        "outrun":0,
        "percent":3.5,
        "male":1282.4,
        "female":1237.5,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"administration",
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 244.01475,205.42934 L 246.79497,205.42934 L 246.79497,205.97373 L 244.02758,205.97373 z"},
        "work_point":{"x":244,"y":40}
    },
    { 
        "id": "HxhM0Ejd",
        "name": "განათლება",
        "outrun":0,
        "percent":21.45,
        "male":545,
        "female":428.1,   
        "dress":"teacher",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"education",
        "action":true,
        "action_points":[{"x":526,"y":0,"d":-1}],  
        "work":{ "a":false, "loop": true, "path":"M 655.8153,314.85376 L 180.6514,314.85376 L 180.6514,314.56599 L 655.81649,314.56599 z"},
        "work_point":{"x":655,"y":0},
    },
    {
        "id": "dJdfgktK",
        "name": "ჯანმრთელობა და \nსოციალური დახმარება",
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
        "name": "სხვა კომუნალური, სოციალური და \nპერსონალური მომსახურების გაწევა",
        "outrun":0,
        "percent":32.51,
        "male":858.3,
        "female":579.3,   
        "dress":"solid" ,
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"community",
        "action":true,
        "action_points":[{"x":970,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 202.61407,313.43416 L 981.10951,313.43416 L 981.15687,312.67655 L 202.61406,312.67655 z"},
        "work_point":{"x":200,"y":4}   
    },
    {
        "id": "hyn3wmKk",
        "name": "ყველა სამუშაო",
        "outrun":0,
        "percent":0,
        "male":0,
        "female":0,   
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",    
        "fg":"other",
        "action":true,
        "action_points":[{"x":970,"y":0,"d":1}],
        "work":{ "a":false, "loop": true, "path":"M 202.61407,313.43416 L 981.10951,313.43416 L 981.15687,312.67655 L 202.61406,312.67655 z"},
        "work_point":{"x":200,"y":4} 
    },
];
var cat_ids = categories.map(function(d,i){return d.id;});

var interests = 
[
    { 
        "id": "gfNDXD1g",
        "name": "მოგზაურობა", 
        "icon":"vac",
        items:
        [
            { 
                "id": "77A79Lr_",
                "title":"3 დღიანი ტური საქართველოში",
                "cost":340,
                "image":"vac_1.svg",
                "class":"vac-1",
                "source":"http://taoklarjeti.com/index.php/tours/turebi-sakartveloshi/svaneti-3-days",
                "source_date":"26.09.2014",
                "descr":"თბილისი-ზუგდიდი-მესტია-უშგული-თბილისი, \nტრანსპორტირება, სამჯერადი კვება, სასტუმრო, გიდი" 
            },
            { 
                "id": "Pe23w2Lz",
                "title":"6 დღიანი ტური ესპანეთში",
                "cost":1328,
                "image":"vac_2.svg",
                "class":"vac-2",
                "source":"http://4travel.ge/package/barcelona-spain/",
                "source_date":"26.09.2014",
                "descr":"ბარსელონა, ესპანეთი: 6 დღე/5 ღამე, \nავიაბილეთები, სასტუმრო, სამოგზაურო დაზღვევა" 
            },
            { 
                "id": "j7hrF24w",
                "title":"7 დღიანი ტური მთა ტაიშანზე ჩინეთში",
                "cost":3978,
                "image":"vac_3.svg",
                "class":"vac-3",
                "source":"http://discover-georgia.ge/index.php?l=2&menu=37&obj=216#.U_bwE8WSy3o",
                "source_date":"26.09.2014",
                "descr":"ტაიშანის მთები: 7 დღე/8 ღამე, \nავიაბილეთები, სასტუმრო, სამოგზაურო დაზღვევა" 
            },    
            { 
                "id": "LE-xVn5T",
                "title":"7 დღიანი ტური მექსიკაში",
                "cost":7873,
                "image":"vac_4.svg",
                "class":"vac-4",
                "source":"http://bonvoyage.ge/?page=tours&cat=2&id=186",
                "source_date":"26.09.2014",
                "descr":"მექსიკა: 7 დღე/6 ღამე, \nავიაბილეთები, სასტუმრო, \nსამჯერადი კვება, ექსკურსიები" 
            },     
            { 
                "id": "8BHSiiS3",
                "title":"11 დღიანი ტური ავსტრალიაში",
                "cost":17491,
                "image":"vac_5.svg",
                "class":"vac-5",
                "source":"http://www.flightcentre.com.au/tours/australia/3122876",
                "source_date":"26.09.2014",
                "descr":"კრუიზი ავსტრალიის კიმბერლის სანაპიროზე: \nსამჯერადი კვება" 
            },  
            { 
                "id": "p_bINCPp",
                "title":"98 დღიანი კრუიზი წყნარ ოკეანეზე",
                "cost":57987,
                "image":"vac_6.svg",
                "class":"vac-6",
                "source":"http://www.forbes.com/sites/forbestravelguide/2012/08/16/the-worlds-most-luxurious-cruises/",
                "source_date":"26.09.2014",
                "descr":"კრუიზი სათავეს იღებს ახალ ზელანდიაში, \nდანიშნულების ადგილებია: \nსიდნეი, ბალი, ჰონკონგი და ალიასკლა (სხვა ადგილებთან ერთად). \nკრუიზი სრულდება ლოს ანჯელესში." 
            }
        ] 
    },
    { 
        "id": "Rs2Uml6w",
        "name": "ელექტრო \nმოწყობილობები",
        "icon":"gad",
        items:
        [
            { 
                "id": "NeRMinwu",
                "title":"MP3 ფლეერი",
                "cost":150,
                "image":"gad_1.svg",
                "class":"gad-1",
                "source":"http://pcshop.ge/index.php?page=shop.product_details&flypage=flypage-gur.tpl&product_id=1662&category_id=142&option=com_virtuemart&Itemid=6&lang=ka",
                "source_date":"25.09.2014",
                "descr":"სპეციალური გამოშვება \nIpod Shuffle (Product) Red" 
            },
            { 
                "id": "Q3eeT2j9",
                "title":"ვიდეო თამაშების სისტემა",
                "cost":600, 
                "image":"gad_2.svg",
                "class":"gad-2",
                "source":"http://www.amazon.com/Xbox-One/dp/B00KAI3KW2/",
                "source_date":"22.09.2014",
                "descr":"Xbox One" 
            },
            { 
                "id": "4JAffVD6",
                "title":"მობილური ტელეფონი",
                "cost":1400,
                "image":"gad_3.svg",
                "class":"gad-3",
                "source":"http://www.ee.ge/?m=268&cat_id=1211&pid=7605&APPLE+Iphone+5S+16GB+Gold",
                "source_date":"25.09.2014",
                "descr":"Apple Iphone 5S 16GB" 
            },
            { 
                "id": "USLng33Z",
                "title":"ლეპტოპი",
                "cost":2836,
                "image":"gad_4.svg",
                "class":"gad-4",
                "source":"http://store.apple.com/uk/buy-mac/macbook-air?product=MD761B/B&step=config#",
                "source_date":"02.10.2014",
                "descr":"Apple MacBook Pro 13-inch 256GB"
            },
            { 
                "id": "eLkVnL8n",
                "title":"ციფრული კამერა",
                "cost":5200,
                "image":"gad_5.svg",
                "class":"gad-5",
                "source":"http://www.amazon.com/Nikon-FX-Format-Digital-24-85mm-3-5-4-5G/dp/B00FOTFA7U/ref=sr_1_2?ie=UTF8&qid=1412256676&sr=8-2&keywords=nikon+d610",
                "source_date":"25.09.2014",
                "descr":"Nikon D610"
            },
            { 
                "id": "kV1jvNlr",
                "title":"3D სახლის კინოთეატრი",
                "cost":9721,
                "image":"gad_6.svg",
                "class":"gad-6",
                "source":"http://www.amazon.com/Klipsch-Theater-System-Cherry-AVR-X4000/dp/B00NSEK30W/ref=sr_1_3?s=tv&ie=UTF8&qid=1411721442&sr=1-3",
                "source_date":"26.09.2014",
                "descr":"Klipsch RF-7 II 5.1 სახლის კინოთეატრი \nSW-112, SW-115 Denon AVR-X4000" 
            }
        ]
    },   
    { 
        "id": "KI3EFRI3",
        "name": "განათლება",
        "icon":"edu",
        items:
        [
             { 
                "id": "y_eZkaEO",
                "title":"ფინანსური მენეჯმენტის კურსი",
                "cost":450,
                "image":"edu_1.svg",
                "class":"edu-1",
                "source":"http://www.gceducentre.com/index.php?act=programs&id=9",
                "source_date":"",
                "descr":"ქართულ-კანადური საგანმანათლებლო ცენტრი, \n6 კვირიანი ფინანსური მენეჯმენტის კურსი" 
            },
            { 
                "id": "cuabVv82",
                "title":"ინგლისური ენის კურსი",
                "cost":1776,
                "image":"edu_2.svg",
                "class":"edu-2",
                "source":"http://www.britishcouncil.ge/english/courses-adults/general",
                "source_date":"02.10.2014",
                "descr":"ბრიტანული საბჭო, \n10 თვიანი ინგლისური ენის ზოგადი კურსი" 
            },
            { 
                "id": "mE3tEvWc",
                "title":"ბაკალავრიატის პროგრამა \nსახელმწიფო უნივერსიტეტში",
                "cost":9000,
                "image":"edu_3.svg",
                "class":"edu-3",
                "source":"",
                "source_date":"",
                "descr":"საქართველოს სახელმწიფო \nუნივერსიტეტი, ბაკალავრიატი" 
            },
            { 
                "id": "nGgaI1SL",
                "title":"ბიზნეს პროგრამა კერძო უნივერსიტეტში",
                "cost":30600,
                "image":"edu_4.svg",
                "class":"edu-4",
                "source":"http://freeuni.edu.ge/ge/node/463",
                "source_date":"25.09.2014",
                "descr":"თბილისის თავისუფალი \nუნივერსიტეტი ბიზნეს სკოლა (ESM)" 
            },
            { 
                "id": "egtsYjwP",
                "title":"2-წლიანი ც",
                "cost":71040,
                "image":"edu_5.svg",
                "class":"edu-5",
                "source":"http://www.ceu.hu/admissions/tuitionandfees/14-15",
                "source_date":"26.09.2014",
                "descr":"ცენტრალური ევროპის უნივერსიტეტი, \nბიზნეს ადმინისტრირების სამაგისტრო პროგრამა" 
            },
            { 
                "id": "k17y863W",
                "title":"12-თვიანი ბიზნეს ადმინისტრირების \nსამაგისტრო პროგრამა",
                "cost":105000,
                "image":"edu_6.svg",
                "class":"edu-6",
                "source":"http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-business-schools/mba-rankings",
                "source_date":"02.10.2014",
                "descr":" კემბრიჯის უნივერსიტეტი, \nბიზნეს ადმინისტრირების სამაგისტრო პროგრამა, \n12 თვიანი ინტენსიური პროგრამა" 
            }
        ] 
    },
    { 
        "id": "7fdCIojZ",
        "name": "საცხოვრებელი",
        "icon":"hou",
        items:
        [
            { 
                "id": "6MhsbW7j",
                "title":"1-ოთახიანი ბინა",
                "cost":48125,
                "image":"hou_1.svg",
                "class":"hou-1",
                "source":"http://myhome.ge/product_info.php?product_id=6036887",
                "source_date":"13.10.2014",
                "descr":"1-ოთახიანი ბინა \nდიღმის მასივში, V კვარტალი." 
            },
            { 
                "id": "FRyVRVZf",
                "title":"2-ოთახიანი ბინა",
                "cost":80500,
                "image":"hou_2.svg",
                "class":"hou-2",
                "source":"http://myhome.ge/product_info.php?product_id=5993384",
                "source_date":"13.10.2014",
                "descr":"2-ოთახიანი ბინა \nდიდ-დიღომში, I მკრ." 
            },
            { 
                "id": "-ke7QwpJ",
                "title":"3-ოთახიანი ბინა",
                "cost":101500,
                "image":"hou_3.svg",
                "class":"hou-3",
                "source":"http://myhome.ge/product_info.php?product_id=5993369",
                "source_date":"13.10.2014",
                "descr":"3-ოთახიანი ბინა \nდიდ-დიღომში, პეტრიწის ქ." 
            },
            { 
                "id": "ODRpktbx",
                "title":"4-ოთახიანი ბინა",
                "cost":113750,
                "image":"hou_4.svg",
                "class":"hou-4",
                "source":"http://myhome.ge/product_info.php?product_id=5993386",
                "source_date":"13.10.2014",
                "descr":"4-ოთახიანი ბინა \nდიდ-დიღომში, III მკრ." 
            },
            { 
                "id": "2HIuYW5a",
                "title":"5-ოთახიანი სახლი",
                "cost":236250,
                "image":"hou_5.svg",
                "class":"hou-5",
                "source":"http://myhome.ge/product_info.php?product_id=6006503",
                "source_date":"13.10.2014",
                "descr":"5-ოთახიანი,\n 2-სართულიანი სახლი დიდ-დიღომში" 
            },
            { 
                "id": "5pTaH-Si",
                "title":"6-ოთახიანი სახლი",
                "cost":332500,
                "image":"hou_6.svg",
                "class":"hou-6",
                "source":"http://myhome.ge/product_info.php?product_id=5941408",
                "source_date":"13.10.2014",
                "descr":"6-ოთახიანი,\n 2-ორსართუოლიანი სახლი დიდ-დიღომში" 
            }
        ] 
    },
    { 
        "id": "3QDbCRrq",
        "name": "ტრანსპორტი",
        "icon":"tra",
        items:
        [
            { 
                "id": "grHOtIbx",
                "title":"ველოსიპედი",
                "cost":936,
                "image":"tra_1.svg",
                "class":"tra-1",
                "source":"http://www.scott.ge/index.php/ka/component/virtuemart/cycling-geo/mountain-geo/227750-geo-detail?Itemid=0",
                "source_date":"25.09.2014",
                "descr":"SCOTT Aspect 660" 
            },
            { 
                "id": "fndmDZlb",
                "title":"მოტოციკლი",
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
                "descr":"Mazda 3, ჰეჩბეკი, 2008" 
            },
            { 
                "id": "Te6f2mYy",
                "title":"BMW",
                "cost":27125,
                "image":"tra_4.svg",
                "class":"tra-4",
                "source":"http://autopapa.ge/en/bmw/528/359639?search_hash=e4165f5977a8a00120a7cde868d444e9&offset=2",
                "source_date":"25.09.2014",
                "descr":"BMW 528, სედანი, 2009" 
            },
            { 
                "id": "PcNAyqxL",
                "title":"Lexus",
                "cost":56000,
                "image":"tra_5.svg",
                "class":"tra-5",
                "source":"http://autopapa.ge/en/lexus/gx-470/359329?search_hash=2991cf9fb16ee648647d0fd6e0f9cade&offset=2",
                "source_date":"25.09.2014",
                "descr":"Lexus GX 470, ჯიპი, 2009" 
            },
            { 
                "id": "KOpdBfBy",
                "title":"Land Rover",
                "cost":91000,
                "image":"tra_6.svg",
                "class":"tra-6",
                "source":"http://autopapa.ge/en/land-rover/range-rover-sport/356898?search_hash=af1eb936bd4cc037006c08f12654d754&offset=11",
                "source_date":"25.09.2014",
                "descr":"Land Rover Range Rover Sport, ჯიპი, 2011" 
            }
        ] 
    }
];
var int_ids = interests.map(function(d,i){return d.id;});

// gap game localization
var locale = {
  poll:
  {
    your_gender:"აირჩიეთ სქესი",
    your_age:"აირჩიეთ ასაკი",
    your_job:"აირჩიეთ სამუშაო სფერო",
    your_salary:"თქვენი ხელფასი",
    your_interest:"აირჩიეთ ინტერესი",
    your_percent:"რა თანხას \nზოგავთ თქვენი \nინტერესისთვის?",    
    female:"ქალი",
    male:"კაცი",
    f:"f",
    m:"m"
  },
  general:
  {
    next:"წინ",
    prev:"უკან",
    monthNames: ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი',
    'ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'],
    monthNamesShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაისი', 'ივნ',
    'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
    dayNames: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
    dayNamesShort: ['კვ', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
    dayNamesMin: ['კვ','ორ','სმ','ოთ', 'ხშ', 'პრ','შბ'],
    dateFormat: 'dd/mm/yyyy', firstDay: 1,
    prevText: '<უკან', prevStatus: 'წინა თვე',
    prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'წინა წელი',
    nextText: 'წინ>', nextStatus: 'შემდეგი თვე',
    nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'შემდეგი წელი',
    currentText: 'მიმდინარე', currentStatus: 'მიმდინარე თვე',
    todayText: 'დღეს', todayStatus: 'მიმდინარე დღე',
    clearText: 'გასუფთავება', clearStatus: 'მიმდინარე თარიღის წაშლა',
    closeText: 'არის', closeStatus: 'დახურვა უცვლილებოდ',
    yearStatus: 'სხვა წელი', monthStatus: 'სხვა თვე',
    weekText: 'კვ', weekStatus: 'წლის კვირა',
    dayStatus: 'აირჩიეთ DD, M d', defaultStatus: 'აიღჩიეთ თარიღი',
    isRTL: false,
    congrat:"გილოცავთ!",
    share_hint:"გააზიარეთ facebook-ზე",
    about:"შესახებ",
    you_can_buy: "თქვენ შეგიძლიათ იყიდოთ ",
    you_can_buy_education: "თქვენ შეგიძლიათ დააფინანსოთ თქვენი ",
    sorry: "So sorry,\n but saving &1 a month will never\n be enough for you to afford\n something in &2.\n Do you want to start the game over?",
    wanna_jump: "Saving &1 a month will take you \n&2 years before you can purchase \nsomething.\nDo you want to jump ahead to get your \nfirst purchase?",
    another_interest: "Choose another interest",
    continue_anyway: "Continue anyway",
    yes: "კი",
    no: "არა",
    you: "შენ",
    retirement: "წელი პენსიამდე",
    details: "დაწვრილებით",
    cost: "ღირებულება",
    years_back: " წლით უკან",
    years_forward: " წლით წინ",
    female:"ქალი",
    male:"კაცი",
    gel: "GEL",
    and: "და"
  },
  game:
  {
    total_salary:"ჯამური ხელფასი&nbsp;",
    total_saved:"&nbsp;|&nbsp;მთლიანი დანაზოგი:&nbsp;"
  }
};
var lg = locale.general;