class GameData
	# def initialize()
	# end
	#outrun: 0 - male, 1 - female
	@@categories = 
	[
		{ id: "45bS4GyC", outrun:0, percent: 22.72, dress:"technical" },
		{ id: "FWrgJx0N", outrun:0, percent: 43.68, dress:"fisher" },
  	{ id: "TxbZicXP", outrun:0, percent: 9.74, dress:"miner" },
  	{ id: "Zyb2KhON", outrun:0, percent: 36.99, dress:"technical" },
  	{ id: "8IkQeUfg", outrun:1, percent: 6.58, dress:"solid" },
  	{ id: "eibtNMge", outrun:0, percent: 34.69, dress:"construction" },
  	{ id: "jDYS_Z1V", outrun:0, percent: 36.96, dress:"casual" },
  	{ id: "I52aZAVX", outrun:0, percent: 34.66, dress:"business" },
  	{ id: "rn4bDK0j", outrun:0, percent: 24.31, dress:"casual" },
  	{ id: "EmbBcc5x", outrun:0, percent: 52.38, dress:"business" },
  	{ id: "oxKq-H8w", outrun:0, percent: 21.68, dress:"business" },
  	{ id: "dT-LWuT4", outrun:0, percent: 3.5, dress:"business" },
  	{ id: "HxhM0Ejd", outrun:0, percent: 21.45, dress:"teacher" },
  	{ id: "dJdfgktK", outrun:0, percent: 41.39, dress:"doctor" },
  	{ id: "DqFfYVGZ", outrun:0, percent: 32.51, dress:"solid" },
    { id: "hyn3wmKk", outrun:0, percent: 39.11, dress:"casual" }
  ]

	@@interests = 
	[
    { id: "gfNDXD1g", name: "Travel",
      items:
      [
        { id: "77A79Lr_", title: "3-day tour in Georgia", cost: 340, descr: "Tbilisi-Zugdidi-Mestia-Ushguli-Tbilisi, transportation, 3 meals/day, hotel, guide", klass: "vac-1" },
        { id: "Pe23w2Lz", title: "6-day tour in Spain", cost: 1328, descr: "Barcelona, Spain: 6 days/5 nights, round trip flight, hotel, travel insurance", klass: "vac-2" },
        { id: "j7hrF24w", title: "7-day tour to the mountains of Taishan in China", cost: 3978, descr: "Chinese Mountains of Taishan: 7 days/8 nights, round trip flight, hotel, travel insurance", klass: "vac-3" },
        { id: "LE-xVn5T", title: "7-day tour in Mexico", cost: 7873, descr: "Mexico: 7 days/6 nights, round trip flight, hotel, 3 meals/day, excursions", klass: "vac-4" },
        { id: "8BHSiiS3", title: "11-day tour in Australia", cost: 17491, descr: "Cruise of the Australian Kimberly Coast: 3 meals/day", klass: "vac-5" },
        { id: "p_bINCPp", title: "98-day cruise exploring the Pacific Rim", cost: 57987, descr: "The cruise goes from New Zealand to Sydney, Bali, Hong Kong and Alaska (among others) and stops in Los Angeles.", klass: "vac-6" }
      ] 
    },
    { id: "Rs2Uml6w",name: "Gadgets", 
     items:
     [
       { id: "NeRMinwu", title: "MP3 Player", cost: 150, descr: "Special Edition Ipod Shuffle (Product) Red", klass: "gad-1" },
       { id: "Q3eeT2j9", title: "Video Game System", cost: 600, descr: "Xbox One", klass: "gad-2" },
       { id: "4JAffVD6", title: "Mobile Phone", cost: 1400, descr: "Apple Iphone 5S 16GB", klass: "gad-3" },
       { id: "USLng33Z", title: "Laptop", cost: 2836, descr: "Apple MacBook Pro 13-inch 256GB", klass: "gad-4" },
       { id: "eLkVnL8n", title: "Digital Camera", cost: 5200, descr: "Nikon D610", klass: "gad-5" },
       { id: "kV1jvNlr", title: "3D Home Theater System", cost: 9721, descr: "Klipsch RF-7 II 5.1 Home Theater System-\ SW-112, SW-115 Denon AVR-X4000", klass: "gad-6" }
     ]
    },   
    {  id: "KI3EFRI3", name: "Education",
        items:
        [
          { id: "y_eZkaEO", title: "Financial management course", cost: 450, descr: "Georgian-Canadian Educational Centre Financial Management course: 6 weeks", klass: "edu-1" },
          { id: "cuabVv82", title: "English language course", cost: 1776, descr: "British Council general English language 10-month long course", klass: "edu-2" },
          { id: "mE3tEvWc", title: "Public university bachelor's degree", cost: 9000, descr: "Georgian public university bachelor's degree", klass: "edu-3" },
          { id: "nGgaI1SL", title: "Private university business degree", cost: 30600, descr: "Free University of Tbilisi Business School (ESM)", klass: "edu-4" },
          { id: "egtsYjwP", title: "2-year MBA", cost: 71040, descr: "Central European Univeirsity Executive Master of Business Administration", klass: "edu-5" },
          { id: "k17y863W", title: "12-month MBA", cost: 105000, descr: "University of Cambridge Master of Business Administration, intensive 12 months", klass: "edu-6" }
        ]  
    },
    {  id: "7fdCIojZ", name: "Housing",
        items:
        [
          { id: "6MhsbW7j", title: "1-room apartment", cost: 48125, descr: "1-room apartment in Dighomi Massive V", klass: "hou-1" },
          { id: "FRyVRVZf", title: "2-room apartment", cost: 80500, descr: "2-room apartment in Didi Dighomi, Ist district", klass: "hou-2" },
          { id: "ke7QwpJ", title: "3-room apartment", cost: 101500, descr: "3-room apartment in Didi Dighomi, Petritsi Street", klass: "hou-3" },
          { id: "ODRpktbx", title: "4-room apartment", cost: 113750, descr: "4-room apartment Didi Dighomi, III district", klass: "hou-4" },
          { id: "2HIuYW5a", title: "5-room house", cost: 236250, descr: "5-room, 2-floor house in Didi Dighomi", klass: "hou-5" },
          { id: "5pTaH-Si", title: "6-room house", cost: 332500, descr: "6-room, 2-floor house in Didi Dighomi", klass: "hou-6" }
        ]  
    },
    {  id: "3QDbCRrq", name: "Transportation",
        items:
        [
          { id: "grHOtIbx", title: "Bicycle", cost: 936, descr: "SCOTT Aspect 660", klass: "tra-1" },
          { id: "fndmDZlb", title: "Motorcycle", cost: 4723, descr: "Suzuki, GSX-R750, 2001", klass: "tra-2" },
          { id: "_ejo7U7H", title: "Mazda", cost: 12600, descr: "Mazda 3, Hatchback, 2008", klass: "tra-3" },
          { id: "Te6f2mYy", title: "BMW", cost: 27125, descr: "BMW 528, Sedan, 2009", klass: "tra-4" },
          { id: "PcNAyqxL", title: "Lexus", cost: 56000, descr: "Lexus GX 470, SUV, 2009", klass: "tra-5" },
          { id: "KOpdBfBy", title: "Land Rover", cost: 91000, descr: "Land Rover Range Rover Sport, SUV, 2011", klass: "tra-6" }
        ]  
    }
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
  		cat = @@interests.find {|v| v[:id] == id }
  		cat[:items].sort!{|x,y| x[:cost] <=> y[:cost]}
      return cat
  	end
end	