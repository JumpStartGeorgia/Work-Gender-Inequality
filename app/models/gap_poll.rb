class GapPoll < ActiveRecord::Base
  attr_accessible :age, :agent, :browser, :category, :city, :country, :gender, :interest, :ip, :lat, :lon, :mobile, :platform, :salary, :saving_percent, :finished

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names

   	if(I18n.locale.to_s == "ka")
   		gender = {'m'=>'კაცი','f'=>'ქალი'}
	      category = {
	      	"45bS4GyC"=>"Agriculture, hunting and forestry",
	      	"FWrgJx0N"=>"Fishing",
	      	"TxbZicXP"=>"Mining and quarrying",
	      	"Zyb2KhON"=>"Manufacturing",
	      	"8IkQeUfg"=>"Production and distribution of electricity, gas and water",
	      	"eibtNMge"=>"Construction",
	      	"jDYS_Z1V"=>"Wholesale and retail trade; repair of motor vehicles and personal and household goods",
	      	"I52aZAVX"=>"Hotels and restaurants",
	      	"rn4bDK0j"=>"Transport and communication",
	      	"EmbBcc5x"=>"Financial intermediation",
	      	"oxKq-H8w"=>"Real estate, renting and business activities",
	      	"dT-LWuT4"=>"Public administration",
	      	"HxhM0Ejd"=>"Education",
	      	"dJdfgktK"=>"Health and social work",
	      	"DqFfYVGZ"=>"Other community, social and personal service activities"
	      }
	      interest = {
	      	"gfNDXD1g"=>"Vacation",
	      	"Rs2Uml6w"=>"Gadgets",
	      	"KI3EFRI3"=>"Education",
	      	"7fdCIojZ"=>"Housing",
	      	"3QDbCRrq"=>"Transportation",
	      	"Cc8WWUmB"=>"Health & Beauty"  	
	      }
   	else
	      gender = {'m'=>'Male','f'=>'Female'}
	      category = {
	      	"45bS4GyC"=>"Agriculture, hunting and forestry",
	      	"FWrgJx0N"=>"Fishing",
	      	"TxbZicXP"=>"Mining and quarrying",
	      	"Zyb2KhON"=>"Manufacturing",
	      	"8IkQeUfg"=>"Production and distribution of electricity, gas and water",
	      	"eibtNMge"=>"Construction",
	      	"jDYS_Z1V"=>"Wholesale and retail trade; repair of motor vehicles and personal and household goods",
	      	"I52aZAVX"=>"Hotels and restaurants",
	      	"rn4bDK0j"=>"Transport and communication",
	      	"EmbBcc5x"=>"Financial intermediation",
	      	"oxKq-H8w"=>"Real estate, renting and business activities",
	      	"dT-LWuT4"=>"Public administration",
	      	"HxhM0Ejd"=>"Education",
	      	"dJdfgktK"=>"Health and social work",
	      	"DqFfYVGZ"=>"Other community, social and personal service activities"
	      }
	      interest = {
	      	"gfNDXD1g"=>"Vacation",
	      	"Rs2Uml6w"=>"Gadgets",
	      	"KI3EFRI3"=>"Education",
	      	"7fdCIojZ"=>"Housing",
	      	"3QDbCRrq"=>"Transportation",
	      	"Cc8WWUmB"=>"Health & Beauty"  	
	      }
      end

      #category interest
      all.each do |row|
      	row.gender = gender[row.gender] if row.gender.present?
      	row.category = category[row.category] if row.category.present?
      	row.interest = interest[row.interest] if row.interest.present?
        	csv << row.attributes.values_at(*column_names)
      end
    end
  end

end
