class GameData
	# def initialize()
	# end
	#outrun: 0 - male, 1 - female
	@@categories = 
	[
		{ id: "45bS4GyC", outrun:0, percent: 11 },
		{ id: "FWrgJx0N", outrun:0, percent:11 },
	  	{ id: "TxbZicXP", outrun:0, percent:11 },
	  	{ id: "Zyb2KhON", outrun:0, percent:11},
	  	{ id: "8IkQeUfg", outrun:0, percent:11 },
	  	{ id: "eibtNMge", outrun:0, percent:11 },
	  	{ id: "jDYS_Z1V", outrun:0, percent:11 },
	  	{ id: "I52aZAVX", outrun:0, percent:11 },
	  	{ id: "rn4bDK0j", outrun:0, percent:11 },
	  	{ id: "EmbBcc5x", outrun:0, percent:11 },
	  	{ id: "oxKq-H8w", outrun:0, percent:11 },
	  	{ id: "dT-LWuT4", outrun:0, percent:11 },
	  	{ id: "HxhM0Ejd", outrun:0, percent:11 },
	  	{ id: "dJdfgktK", outrun:0, percent:11 },
	  	{ id: "DqFfYVGZ", outrun:0, percent:11 }
  	]
	@@interests = 
	[
     { id: "gfNDXD1g", name: "Vacation", items:[] },
     { id: "Rs2Uml6w",name: "Gadgets", 
             items:
             [
               { id: "Q3eeT2j9", type: "mobile", title:"SAMSUNG I9300 Galaxy S3 White", cost:700, 
                 image:"bag.svg", klass:"bag",
                 source:"http://www.ee.ge/?m=268&cat_id=1211&pid=7608&SAMSUNG+I9300+Galaxy+S3+White", source_date:"22.09.2014",
                 descr:"Mobile Phone" },
               { id: "NeRMinwu", type: "mobile", title:"Nokia 1280 Black/G", cost:41.99,
                 image:"boat.svg", klass:"boat",
                 source:"http://www.ee.ge/?m=268&cat_id=1211&pid=7708&NOKIA+1280+BLACK%2FG", source_date:"22.09.2014",
                 descr:"Tab" },
               { id: "eLkVnL8n", type: "mobile", title:"Apple Iphone 5S 64GB Gold", cost:1765,
                 image:"coconut.svg", klass:"coconut",
                 source:"http://applecity.ge/shop/iphone/iphone-5s-64gb/", source_date:"22.09.2014",
                 descr:"XBox" },
               { id: "kV1jvNlr", type: "mobile", title:"Vertu Signature Diamond", cost:154000,
                 image:"compass.svg", klass:"compass",
                 source:"http://www.onlinenewspoint.com/top-10-most-expensive-mobile-phones-in-the-world-2014/", source_date:"22.09.2014",
                 descr:"Notebook" },
               { id: "USLng33Z", type: "mobile", title:"E", cost:2000,
                 image:"credit.svg", klass:"credit",
                 source:"", source_date:"",
                 descr:"Theatre" },
               { id: "4JAffVD6", type: "mobile", title:"C", cost:1100,
                 image:"directions.svg", klass:"directions",
                 source:"", source_date:"",
                 descr:"Super Buper Thing" }
             ]
     },   
     { id: "KI3EFRI3", name: "Education", items:[] },
     { id: "7fdCIojZ", name: "Housing", items:[] },
     { id: "3QDbCRrq", name: "Transportation", items:[] },
     { id: "Cc8WWUmB", name: "Health & Beauty", items:[] }
	]
 	def self.categories
 		@@categories
  	end  
  	def self.interests
 		@@interests
  	end
  	def self.category(id)
  		@@categories.find {|v| v[:id] == id }
  	end
  	def self.interest(id)
  		@@interests.find {|v| v[:id] == id }
  	end
end	