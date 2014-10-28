var categories=[{id:"45bS4GyC",name:"Agriculture, hunting and forestry",outrun:0,percent:11,stage:{background:"/assets/gap/svg/field/education/bg.svg",foreground:{interior:"/assets/gap/svg/field/education/school_int.svg",exterior:"/assets/gap/svg/field/education/school_ext.svg"},frame:{load:{a:!0,duration:1,path:"M 22.142857,16.192333 C 15.714286,312.62091 29.551496,320.73391 35,329.76376 c 22.435114,37.1819 82.85714,41.42858 95.71429,42.14286 12.85714,0.71428 255.71428,-1.42857 255.71428,-1.42857 0,0 177.9121,17.31504 232.45105,-3.27557 32.51579,-12.27599 5.76504,-218.86518 5.76504,-218.86518"},work:{a:!1,loop:!0,path:"M 645.48748,148.3373 L 625.28443,199.85508 L 479.82246,199.85508 L 453.55849,255.41347 L 422.24377,251.37286 L 483.86307,148.3373 z"},reward:{a:!0,loop:!1,path:"M 650.53824,148.3373 C 630.33519,370.57087 611.14229,374.61148 630.33519,370.57087 C 649.52809,366.53025 817.21341,369.56071 817.21341,369.56071"}}}},{id:"FWrgJx0N",name:"Fishing",outrun:0,percent:11},{id:"TxbZicXP",name:"Mining and quarrying",outrun:0,percent:11},{id:"Zyb2KhON",name:"Manufacturing",outrun:0,percent:11},{id:"8IkQeUfg",name:"Production and distribution of electricity, gas and water",outrun:0,percent:11},{id:"eibtNMge",name:"Construction",outrun:0,percent:11},{id:"jDYS_Z1V",name:"Wholesale and retail trade; repair of motor vehicles and personal and household goods",outrun:0,percent:11},{id:"I52aZAVX",name:"Hotels and restaurants",outrun:0,percent:11},{id:"rn4bDK0j",name:"Transport and communication",outrun:0,percent:11},{id:"EmbBcc5x",name:"Financial intermediation",outrun:0,percent:11},{id:"oxKq-H8w",name:"Real estate, renting and business activities",outrun:0,percent:11},{id:"dT-LWuT4",name:"Public administration",outrun:0,percent:11},{id:"HxhM0Ejd",name:"Education",outrun:0,percent:11},{id:"dJdfgktK",name:"Health and social work",outrun:0,percent:11},{id:"DqFfYVGZ",name:"Other community, social and personal service activities",outrun:0,percent:11}],frame_sequence=["load","work","reward"],frame_sequence_length=frame_sequence.length,cat_ids=categories.map(function(t){return t.id}),interests=[{id:"gfNDXD1g",name:"Vacation",items:[]},{id:"Rs2Uml6w",name:"Gadgets",items:[{id:"Q3eeT2j9",type:"mobile",title:"SAMSUNG I9300 Galaxy S3 White",cost:700,image:"bag.svg","class":"bag",source:"http://www.ee.ge/?m=268&cat_id=1211&pid=7608&SAMSUNG+I9300+Galaxy+S3+White",source_date:"22.09.2014",descr:"Mobile Phone"},{id:"NeRMinwu",type:"mobile",title:"Nokia 1280 Black/G",cost:41.99,image:"boat.svg","class":"boat",source:"http://www.ee.ge/?m=268&cat_id=1211&pid=7708&NOKIA+1280+BLACK%2FG",source_date:"22.09.2014",descr:"Tab"},{id:"eLkVnL8n",type:"mobile",title:"Apple Iphone 5S 64GB Gold",cost:1765,image:"coconut.svg","class":"coconut",source:"http://applecity.ge/shop/iphone/iphone-5s-64gb/",source_date:"22.09.2014",descr:"XBox"},{id:"kV1jvNlr",type:"mobile",title:"Vertu Signature Diamond",cost:154e3,image:"compass.svg","class":"compass",source:"http://www.onlinenewspoint.com/top-10-most-expensive-mobile-phones-in-the-world-2014/",source_date:"22.09.2014",descr:"Notebook"},{id:"USLng33Z",type:"mobile",title:"E",cost:2e3,image:"credit.svg","class":"credit",source:"",source_date:"",descr:"Theatre"},{id:"4JAffVD6",type:"mobile",title:"C",cost:1100,image:"directions.svg","class":"directions",source:"",source_date:"",descr:"Super Buper Thing"}]},{id:"KI3EFRI3",name:"Education",items:[]},{id:"7fdCIojZ",name:"Housing",items:[]},{id:"3QDbCRrq",name:"Transportation",items:[]},{id:"Cc8WWUmB",name:"Health & Beauty",items:[]}],int_ids=interests.map(function(t){return t.id}),age_groups=[{name:"adolescence",min:18,max:29},{name:"young_adulthood",min:30,max:39},{name:"middle_adulthood",min:40,max:49},{name:"advanced_adulthood",min:50,max:65}],sintro={"class":"intro",title:"Gap Game (Just scroll)"},sepilogue={"class":"epilogue",title:"Game Over"},color={female:"rgb(255,148,248)",male:"rgb(173,210,255)",white:"rgb(255,255,255)",black:"rgb(0,0,0)"},locale={poll:{choose_gender:"Choose Gender",choose_age:"Choose Age",choose_category:"Choose Category",choose_interest:"Choose Interest"},general:{next:"\u10ec\u10d8\u10dc",prev:"\u10e3\u10d9\u10d0\u10dc",monthNames:["\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8","\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8","\u10db\u10d0\u10e0\u10e2\u10d8","\u10d0\u10de\u10e0\u10d8\u10da\u10d8","\u10db\u10d0\u10d8\u10e1\u10d8","\u10d8\u10d5\u10dc\u10d8\u10e1\u10d8","\u10d8\u10d5\u10da\u10d8\u10e1\u10d8","\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd","\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8","\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8","\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8","\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8"],monthNamesShort:["\u10d8\u10d0\u10dc","\u10d7\u10d4\u10d1","\u10db\u10d0\u10e0","\u10d0\u10de\u10e0","\u10db\u10d0\u10d8\u10e1\u10d8","\u10d8\u10d5\u10dc","\u10d8\u10d5\u10da","\u10d0\u10d2\u10d5","\u10e1\u10d4\u10e5","\u10dd\u10e5\u10e2","\u10dc\u10dd\u10d4","\u10d3\u10d4\u10d9"],dayNames:["\u10d9\u10d5\u10d8\u10e0\u10d0","\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8","\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8"],dayNamesShort:["\u10d9\u10d5","\u10dd\u10e0\u10e8","\u10e1\u10d0\u10db","\u10dd\u10d7\u10ee","\u10ee\u10e3\u10d7","\u10de\u10d0\u10e0","\u10e8\u10d0\u10d1"],dayNamesMin:["\u10d9\u10d5","\u10dd\u10e0","\u10e1\u10db","\u10dd\u10d7","\u10ee\u10e8","\u10de\u10e0","\u10e8\u10d1"],dateFormat:"dd/mm/yyyy",firstDay:1,prevText:"<\u10e3\u10d9\u10d0\u10dc",prevStatus:"\u10ec\u10d8\u10dc\u10d0 \u10d7\u10d5\u10d4",prevJumpText:"&#x3c;&#x3c;",prevJumpStatus:"\u10ec\u10d8\u10dc\u10d0 \u10ec\u10d4\u10da\u10d8",nextText:"\u10ec\u10d8\u10dc>",nextStatus:"\u10e8\u10d4\u10db\u10d3\u10d4\u10d2\u10d8 \u10d7\u10d5\u10d4",nextJumpText:"&#x3e;&#x3e;",nextJumpStatus:"\u10e8\u10d4\u10db\u10d3\u10d4\u10d2\u10d8 \u10ec\u10d4\u10da\u10d8",currentText:"\u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4",currentStatus:"\u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4 \u10d7\u10d5\u10d4",todayText:"\u10d3\u10e6\u10d4\u10e1",todayStatus:"\u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4 \u10d3\u10e6\u10d4",clearText:"\u10d2\u10d0\u10e1\u10e3\u10e4\u10d7\u10d0\u10d5\u10d4\u10d1\u10d0",clearStatus:"\u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4 \u10d7\u10d0\u10e0\u10d8\u10e6\u10d8\u10e1 \u10ec\u10d0\u10e8\u10da\u10d0",closeText:"\u10d0\u10e0\u10d8\u10e1",closeStatus:"\u10d3\u10d0\u10ee\u10e3\u10e0\u10d5\u10d0 \u10e3\u10ea\u10d5\u10da\u10d8\u10da\u10d4\u10d1\u10dd\u10d3",yearStatus:"\u10e1\u10ee\u10d5\u10d0 \u10ec\u10d4\u10da\u10d8",monthStatus:"\u10e1\u10ee\u10d5\u10d0 \u10d7\u10d5\u10d4",weekText:"\u10d9\u10d5",weekStatus:"\u10ec\u10da\u10d8\u10e1 \u10d9\u10d5\u10d8\u10e0\u10d0",dayStatus:"\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4\u10d7 DD, M d",defaultStatus:"\u10d0\u10d8\u10e6\u10e9\u10d8\u10d4\u10d7 \u10d7\u10d0\u10e0\u10d8\u10e6\u10d8",isRTL:!1},game:{total_salary:"Total Salary:&nbsp;",total_saved:"&nbsp;|&nbsp;Total Saved:&nbsp;"}},sounds=[{name:"done",loop:!1,path:"/assets/gap/sound/done.mp3"},{name:"applause",loop:!0,path:"/assets/gap/sound/happy.mp3"},{name:"long",loop:!0,path:"/assets/gap/sound/long.mp3"},{name:"select",loop:!1,path:"/assets/gap/sound/select.mp3"}];