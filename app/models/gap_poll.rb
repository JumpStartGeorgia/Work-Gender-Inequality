class GapPoll < ActiveRecord::Base
  	attr_accessible :age, :agent, :browser, :category, :city, :country, :gender, :interest, :ip, :lat, :lon, :mobile, :platform, :salary, :saving_percent, :finished
	def self.to_csv
	 CSV.generate do |csv|
	   csv << column_names
	   all.each do |row|
	   	row.gender = I18n.t("gap.gamedata.gender.#{row.gender}") if row.gender.present?
	   	row.category = I18n.t("gap.gamedata.category.#{row.category}") if row.category.present?
	   	row.interest = I18n.t("gap.gamedata.interest.#{row.interest}") if row.interest.present?
	     	csv << row.attributes.values_at(*column_names)
	   end
	 end
	end
end
