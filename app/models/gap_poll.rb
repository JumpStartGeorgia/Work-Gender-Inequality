class GapPoll < ActiveRecord::Base
  attr_accessible :age, :agent, :browser, :category, :city, :country, :gender, :interest, :ip, :lat, :lon, :mobile, :platform, :salary, :saving_percent, :finished
end
