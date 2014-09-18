result = system 'Rscript', '--default-packages=foreign', 'spss_to_csv.r', 'database_FINAL.sav', 'spss_rscript_out.csv', 'spss_rscript_code.txt'
if result.nil?
  puts "Error was #{$?}"
elsif result
  puts "You made it!"
end