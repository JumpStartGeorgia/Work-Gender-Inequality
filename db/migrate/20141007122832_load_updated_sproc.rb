class LoadUpdatedSproc < ActiveRecord::Migration
  def up
    puts ''
    puts ''
    puts "##############################################"
    puts "##############################################"
    puts "IMPORTANT:"
    puts "This app uses a stored procedure, which has been changed."
    puts "In order to install this updated stored procedure,"
    puts "please run the following:"
    puts "mysql -u #{Rails.configuration.database_configuration[Rails.env]["username"]} -p #{Rails.configuration.database_configuration[Rails.env]["database"]} < ./db/crosstab_count_with_filter_sproc.sql"
    puts "##############################################"
    puts "##############################################"
    puts ''
    puts ''
  end

  def down
    puts ''
    puts ''
    puts "##############################################"
    puts "##############################################"
    puts "IMPORTANT:"
    puts "This app uses a stored procedure, and the old version must be re-created."
    puts "In order to install this stored procedure,"
    puts "please run the following:"
    puts "mysql -u #{Rails.configuration.database_configuration[Rails.env]["username"]} -p #{Rails.configuration.database_configuration[Rails.env]["database"]} < ./db/crosstab_count_sproc.sql"
    puts "##############################################"
    puts "##############################################"
    puts ''
    puts ''
  end
end
