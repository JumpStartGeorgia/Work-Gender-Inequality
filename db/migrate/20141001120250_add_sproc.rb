class AddSproc < ActiveRecord::Migration
  def up
    puts ''
    puts ''
    puts "##############################################"
    puts "##############################################"
    puts "IMPORTANT:"
    puts "This app uses a stored procedure."
    puts "In order to install this stored procedure,"
    puts "please run the following:"
    puts "mysql -u #{Rails.configuration.database_configuration[Rails.env]["username"]} -p #{Rails.configuration.database_configuration[Rails.env]["database"]} < ./db/crosstab_count_sproc.sql"
    puts "##############################################"
    puts "##############################################"
    puts ''
    puts ''
  end

  def down
    ActiveRecord::Base.connection.execute('drop function if exists SQL_ESC;')
    ActiveRecord::Base.connection.execute('drop procedure if exists survey_crosstab_count;')
  end
end
