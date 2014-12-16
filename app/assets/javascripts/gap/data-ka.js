/**
* outrun: 0 - male, 1 - female
* dress casual street business technical construction
*/
var categories = 
[
    {   
        "id": "45bS4GyC",
        "name": "სოფლის მეურნეობა, ნადირობა და სატყეო მეურნეობა",
        "outrun":0,
        "percent":22.72,
        "male":599.4,
        "female":463.2,
        "dress":"technical",
        "bg":"bg1",
        "bg2":"bg3",
        "fg":"agriculture",
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":false,
        "action":true,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":false,
        "action":true,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
    },
    { 
        "id": "8IkQeUfg",
        "name": "ელ. ენერგიის, აირისა და წყლის წარმოება და განაწილება",
        "outrun":1, 
        "percent":6.58,
        "male":979,
        "female":1047.9,
        "dress":"solid",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"production",
        "sits":true,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
    },
    { 
        "id": "jDYS_Z1V",
        "name": "საბითუმო და საცალო ვაჭრობა; ავტომობილების, საყოფაცხოვრებო და პირადი მოხმარების საგნების რემონტი",
        "outrun":0,
        "percent":36.96,
        "male":906.4,
        "female":571.4,            
        "dress":"casual",
        "bg":"bg1",
        "bg2":"bg1",
        "fg":"wholesale",
        "sits":true,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 340.34823,114.32031 L 8.1219464,114.32031 L 8.1219464,106.97189 L 338.80119,107.7454"}       
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
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":true,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":true,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
    },
    { 
        "id": "oxKq-H8w",
        "name": "ოპერაციები უძრავი ქონებით, იჯარა და მომხმარებლისთვის მომსახურების გაწევა",
        "outrun":0,
        "percent":21.68,
        "male":1044.7,
        "female":818.2,   
        "dress":"business",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"realestate",
        "sits":true,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":false,
        "action":true,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
    },
    {
        "id": "dJdfgktK",
        "name": "ჯანმრთელობა და სოციალური დახმარება",
        "outrun":0,
        "percent":41.39,
        "male":1023.8,
        "female":600.1,   
        "dress":"doctor",
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"health",
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
    },
    {
        "id": "DqFfYVGZ",
        "name": "სხვა კომუნალური, სოციალური და პერსონალური მომსახურების გაწევა",
        "outrun":0,
        "percent":32.51,
        "male":858.3,
        "female":579.3,   
        "dress":"solid" ,
        "bg":"bg1",
        "bg2":"bg1",       
        "fg":"community",
        "sits":false,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
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
        "sits":true,
        "action":false,
        "work":{ "a":false, "loop": true, "path":"M 223.30862,314.1047 L 652.88994,314.1047 L 663.51835,314.18371 L 663.51835,313.20699 L 223.30862,313.20699 z"}
    },
];
var cat_ids = categories.map(function(d,i){return d.id;});

var interests = 
[
    { 
        "id": "gfNDXD1g",
        "name": "შვებულება", 
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
                "descr":"თბილისი-ზუგდიდი-მესტია-უშგული-თბილისი, ტრანსპორტირება, სამჯერადი კვება, სასტუმრო, გიდი" 
            },
            { 
                "id": "Pe23w2Lz",
                "title":"6 დღიანი ტური ესპანეთში",
                "cost":1328,
                "image":"vac_2.svg",
                "class":"vac-2",
                "source":"http://4travel.ge/package/barcelona-spain/",
                "source_date":"26.09.2014",
                "descr":"ბარსელონა, ესპანეთი: 6 დღე/5 ღამე, ავიაბილეთები, სასტუმრო, სამოგზაურო დაზღვევა" 
            },
            { 
                "id": "j7hrF24w",
                "title":"7 დღიანი ტური მთა ტაიშანზე ჩინეთში",
                "cost":3978,
                "image":"vac_3.svg",
                "class":"vac-3",
                "source":"http://discover-georgia.ge/index.php?l=2&menu=37&obj=216#.U_bwE8WSy3o",
                "source_date":"26.09.2014",
                "descr":"ტაიშანის მთები: 7 დღე/8 ღამე, ავიაბილეთები, სასტუმრო, სამოგზაურო დაზღვევა" 
            },    
            { 
                "id": "LE-xVn5T",
                "title":"7 დღიანი ტური მექსიკაში",
                "cost":7873,
                "image":"vac_4.svg",
                "class":"vac-4",
                "source":"http://bonvoyage.ge/?page=tours&cat=2&id=186",
                "source_date":"26.09.2014",
                "descr":"მექსიკა: 7 დღე/6 ღამე, ავიაბილეთები, სასტუმრო, სამჯერადი კვება, ექსკურსიები" 
            },     
            { 
                "id": "8BHSiiS3",
                "title":"11 დღიანი ტური ავსტრალიაში",
                "cost":17491,
                "image":"vac_5.svg",
                "class":"vac-5",
                "source":"http://www.flightcentre.com.au/tours/australia/3122876",
                "source_date":"26.09.2014",
                "descr":"კრუიზი ავსტრალიის კიმბერლის სანაპიროზე: სამჯერადი კვება" 
            },  
            { 
                "id": "p_bINCPp",
                "title":"98 დღიანი კრუიზი წყნარ ოკეანეზე",
                "cost":57987,
                "image":"vac_6.svg",
                "class":"vac-6",
                "source":"http://www.forbes.com/sites/forbestravelguide/2012/08/16/the-worlds-most-luxurious-cruises/",
                "source_date":"26.09.2014",
                "descr":"კრუიზი სათავეს იღებს ახალ ზელანდიაში, დანიშნულების ადგილებია: სიდნეი, ბალი, ჰონკონგი და ალიასკლა (სხვა ადგილებთან ერთად). კრუიზი სრულდება ლოს ანჯელესში." 
            }
        ] 
    },
    { 
        "id": "Rs2Uml6w",
        "name": "ელექტრო მოწყობილობები",
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
                "descr":"სპეციალური გამოშვება Ipod Shuffle (Product) Red" 
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
                "descr":"Klipsch RF-7 II 5.1 სახლის კინოთეატრი SW-112, SW-115 Denon AVR-X4000" 
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
                "descr":"ქართულ-კანადური საგანმანათლებლო ცენტრი, 6 კვირიანი ფინანსური მენეჯმენტის კურსი" 
            },
            { 
                "id": "cuabVv82",
                "title":"ინგლისური ენის კურსი",
                "cost":1776,
                "image":"edu_2.svg",
                "class":"edu-2",
                "source":"http://www.britishcouncil.ge/english/courses-adults/general",
                "source_date":"02.10.2014",
                "descr":"ბრიტანული საბჭო, 10 თვიანი ინგლისური ენის ზოგადი კურსი" 
            },
            { 
                "id": "mE3tEvWc",
                "title":"ბაკალავრიატის პროგრამა სახელმწიფო უნივერსიტეტში",
                "cost":9000,
                "image":"edu_3.svg",
                "class":"edu-3",
                "source":"",
                "source_date":"",
                "descr":"საქართველოს სახელმწიფო უნივერსიტეტი, ბაკალავრიატი" 
            },
            { 
                "id": "nGgaI1SL",
                "title":"ბიზნეს პროგრამა კერძო უნივერსიტეტში",
                "cost":30600,
                "image":"edu_4.svg",
                "class":"edu-4",
                "source":"http://freeuni.edu.ge/ge/node/463",
                "source_date":"25.09.2014",
                "descr":"თბილისის თავისუფალი უნივერსიტეტი ბიზნეს სკოლა (ESM)" 
            },
            { 
                "id": "egtsYjwP",
                "title":"2-წლიანი ც",
                "cost":71040,
                "image":"edu_5.svg",
                "class":"edu-5",
                "source":"http://www.ceu.hu/admissions/tuitionandfees/14-15",
                "source_date":"26.09.2014",
                "descr":"ცენტრალური ევროპის უნივერსიტეტი, ბიზნეს ადმინისტრირების სამაგისტრო პროგრამა" 
            },
            { 
                "id": "k17y863W",
                "title":"12-თვიანი ბიზნეს ადმინისტრირების სამაგისტრო პროგრამა",
                "cost":105000,
                "image":"edu_6.svg",
                "class":"edu-6",
                "source":"http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-business-schools/mba-rankings",
                "source_date":"02.10.2014",
                "descr":" კემბრიჯის უნივერსიტეტი, ბიზნეს ადმინისტრირების სამაგისტრო პროგრამა, 12 თვიანი ინტენსიური პროგრამა" 
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
                "descr":"1-ოთახიანი ბინა დიღმის მასივში, V კვარტალი." 
            },
            { 
                "id": "FRyVRVZf",
                "title":"2-ოთახიანი ბინა",
                "cost":80500,
                "image":"hou_2.svg",
                "class":"hou-2",
                "source":"http://myhome.ge/product_info.php?product_id=5993384",
                "source_date":"13.10.2014",
                "descr":"2-ოთახიანი ბინა დიდ-დიღომში, I მკრ." 
            },
            { 
                "id": "-ke7QwpJ",
                "title":"3-ოთახიანი ბინა",
                "cost":101500,
                "image":"hou_3.svg",
                "class":"hou-3",
                "source":"http://myhome.ge/product_info.php?product_id=5993369",
                "source_date":"13.10.2014",
                "descr":"3-ოთახიანი ბინა დიდ-დიღომში, პეტრიწის ქ." 
            },
            { 
                "id": "ODRpktbx",
                "title":"4-ოთახიანი ბინა",
                "cost":113750,
                "image":"hou_4.svg",
                "class":"hou-4",
                "source":"http://myhome.ge/product_info.php?product_id=5993386",
                "source_date":"13.10.2014",
                "descr":"4-ოთახიანი ბინა დიდ-დიღომში, III მკრ." 
            },
            { 
                "id": "2HIuYW5a",
                "title":"5-ოთახიანი სახლი",
                "cost":236250,
                "image":"hou_5.svg",
                "class":"hou-5",
                "source":"http://myhome.ge/product_info.php?product_id=6006503",
                "source_date":"13.10.2014",
                "descr":"5-ოთახიანი, 2-სართულიანი სახლი დიდ-დიღომში" 
            },
            { 
                "id": "5pTaH-Si",
                "title":"6-ოთახიანი სახლი",
                "cost":332500,
                "image":"hou_6.svg",
                "class":"hou-6",
                "source":"http://myhome.ge/product_info.php?product_id=5941408",
                "source_date":"13.10.2014",
                "descr":"6-ოთახიანი, 2-ორსართუოლიანი სახლი დიდ-დიღომში" 
            }
        ] 
    },
    { 
        "id": "3QDbCRrq",
        "name": "ტრანსპორტირება",
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
    //{ "id": "Cc8WWUmB","name": "Health & Beauty", items:[] }
];
var int_ids = interests.map(function(d,i){return d.id;});

// gap game localization
var locale = {
  poll:
  {
    your_gender:"თქვენი სქესი",
    your_age:"თქვენი ასაკი",
    your_job:"სამუშაო სექტორი",
    your_salary:"თქვენი ხელფასი",
    your_interest:"თქვენი გატაცება",
    your_percent:"რამდენის დაზოგვას ახერხებთ თქვენი გატაცებისთვის",
    lorem: "Lorem ipsum dolor sit amet ka That is\n like each person in the watching a\n broadcast for Or one single\n person watching a\n broadcast\n continuously\nfor",
    female:"ქალი",
    male:"კაცი"    
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
    summary: "ჩვენი მიზანია, გავზარდოთ სქესთა შორის თანასწორობა, ხელი შევუწყოთ ქალთა ეკონომიკურ გაძლიერებას საქართველოში, და ქვეყნის ეკომიკის ინკლუზიურ განვითარებას ქალების თანაბარი მონაწილეობის გზით შრომით საქმიანობაში მამაკაცებთან ერთად.\
გამოწვევები ამ მიზნის მისაღწევად ძალიან ბევრია, მიუხედავად ამისა ვაცნობიერებთ, რომ ჩვენ ყველანი მოგებულები დავრჩებით, თუკი საქართველო ამ მიმართულებით გადადგავს ნაბიჯებს.\
ამ პროექტის განხორციელება შესაძლებელი გახდა USAID-ის და “კონსტიტუციის 42-ე მუხლის” დახმარებით, ასევე 4 პარტნიორი ორგანიზაციის ძალისხმევით: საქართველოს პროფესიული კავშირების გაერთიანება (სპკგ), თბილისის სახელმწიფო უნივერსიტეტის სოციალურ მეცნიერებათა ცენტრი, New Media Advocacy Project (N-Map) და Jumpstart Georgia.\
თამაშის შემქმნელები:\
კონცეფცია და განხორციელება: ჯამპსტარტ ჯორჯია\
მუსიკა:: ბრაიან გილიკინ\
გრაფიკა: მარიამ ქობულაძე, რუსლან ბერიძე\
დიზაინი: მარიამ ქობულაძე\
ანიმაცია და დეველოპმენტი: ანტონ კამარიან\
წყარო: საქართველოს სტატისტიკის ეროვნული სამსახური",
    you: "შენ",
    retirement: "პენსიაში გასვლამდე დარჩენილი წლები",
    details: "დაწვრილებით",
    cost: "ღირებულება",
    years_back: " წლით უკან",
    years_forward: " წლით წინ"

  },
  game:
  {
    total_salary:"ჯამური ხელფასი&nbsp;",
    total_saved:"&nbsp;|&nbsp;მთლიანი დანაზოგი:&nbsp;"
  }
};