require 'csv'

file_r = 'spss_to_csv.r'
file_sav = 'database_FINAL_20.09.2014.sav'
file_data = 'spss_rscript_out.csv'
file_sps = 'spss_rscript_code.sps'
file_questions = 'spss_rscript_questions.csv'
file_answers = 'spss_rscript_answers.csv'


result = system 'Rscript', '--default-packages=foreign,MASS', file_r, file_sav, file_data, file_sps, file_questions
if result.nil?
  puts "Error was #{$?}"
elsif result
  puts "You made it!"

  puts "=============================="

  # open the sps file and convert the list of answers into a csv file 
  # row format: question_code, answer code, answer text
  answers = []
  found_labels = false
  next_line_question = false
  question_code = nil
  line_number = 0
  File.open(file_sps, "r") do |f|
    f.each_line do |line|
      line_number += 1
      puts "++ line #{line_number}"
      if found_labels
        if line.strip == '.'
          puts "++ - found '.', stopping parsing of answers"
          # this is the end of the list of answers so stop
          break
        elsif line.strip == '/'
          puts "++ - found /"
          # this is the end of a set of answers for a question
          question_code = nil
          next_line_question = true
        else
          # if this line is a question, start a new row array and save the question
          # else this is an answer
          if next_line_question
            puts "++ - found question: #{line}"
            next_line_question = false
            question_code = line.strip
          else
            # this is an answer, record row in format: [question_code, value, text]
            # line is in format of: value "text"

            # strip space at beginning and end of line
            answer = line.strip
            # get index of space between value and text
            # index will be used to pull out the answer code and answer text
            puts "++ -- found answer: #{line}"

            index = answer.index(' "')
            if index.nil? 
              puts "******************************"
              puts "ERROR"
              puts "An error occurred on line #{line_number} of #{file_sps} while parsing the answers."
              puts "This line was not in the correct format of: value 'answer text'"
              puts "******************************"
              break
            else
              answers << [question_code, answer[0..index-1], answer[index+2..-2]]
            end

          end
        end
      elsif line.strip == 'VALUE LABELS'
        # found beginning of list of answers
        puts "++++++++++++++ found value labels on line #{line_number}"
        found_labels = true
      end
    end
  end  

  puts "=============================="

  # if answers exists, write to csv file
  if answers.length > 0
    puts "saving answrs to csv"
    CSV.open(file_answers, 'w') do |csv|
      answers.each do |answer|
        csv << answer
      end
    end
  end

end
