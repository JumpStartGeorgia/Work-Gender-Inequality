class AddWeightedSprocs < ActiveRecord::Migration
  def up
    puts ''
    puts ''
    puts "##############################################"
    puts "##############################################"
    puts "IMPORTANT:"
    puts "This app has two new stored procedure to get the weighted counts for a variable."
    puts "In order to install this stored procedure,"
    puts "please run the following two statements:"
    puts "mysql -u #{Rails.configuration.database_configuration[Rails.env]["username"]} -p #{Rails.configuration.database_configuration[Rails.env]["database"]} < ./db/survey_weighted_onevar_count_sproc.sql"
    puts "mysql -u #{Rails.configuration.database_configuration[Rails.env]["username"]} -p #{Rails.configuration.database_configuration[Rails.env]["database"]} < ./db/survey_weighted_crosstab_count_sproc.sql"
    puts "##############################################"
    puts "##############################################"
    puts ''
    puts ''
  end

  def down
    ActiveRecord::Base.connection.execute('drop procedure if exists survey_weighted_onevar_count;')
    ActiveRecord::Base.connection.execute('drop procedure if exists survey_weighted_crosstab_count;')
  end
end
