result = system 'Rscript', '--default-packages=foreign,MASS', 'spss_to_csv.r', 'database_FINAL_20.09.2014.sav', 'spss_rscript_out.csv', 'spss_rscript_code.sps', 'spss_rscript_questions.csv'
if result.nil?
  puts "Error was #{$?}"
elsif result
  puts "You made it!"
end
