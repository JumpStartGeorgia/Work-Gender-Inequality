class AddOnevarSproc < ActiveRecord::Migration
  def up
    puts ''
    puts ''
    puts "##############################################"
    puts "##############################################"
    puts "IMPORTANT:"
    puts "This app uses a stored procedure to get the counts for a variable."
    puts "In order to install this stored procedure,"
    puts "please run the following:"
    puts "mysql -u #{Rails.configuration.database_configuration[Rails.env]["username"]} -p #{Rails.configuration.database_configuration[Rails.env]["database"]} < ./db/survey_onevar_count_sproc.sql"
    puts "##############################################"
    puts "##############################################"
    puts ''
    puts ''
  end

  def down
    ActiveRecord::Base.connection.execute('drop procedure if exists survey_onevar_count;')
  end
end
