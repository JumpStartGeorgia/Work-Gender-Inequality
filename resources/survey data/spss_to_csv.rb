require 'csv'

file_r = 'spss_to_csv.r'
file_sav = 'database_FINAL_20.09.2014.sav'
file_data = 'spss_rscript_out.csv'
file_sps = 'spss_rscript_code.sps'
file_questions = 'spss_rscript_questions.csv'
file_answers_complete = 'spss_rscript_answers_complete.csv'
file_answers_bad = 'spss_rscript_answers_bad_list.csv'

result = system 'Rscript', '--default-packages=foreign,MASS', file_r, file_sav, file_data, file_sps, file_questions, file_answers_complete
if result.nil?
  puts "Error was #{$?}"
elsif result
  puts "You made it!"

  puts "=============================="
  puts "reading in answers from #{file_answers_complete} and converting to csv"
  # format of each line of file is: [1] "Question Code || Answer Code || Answer Text"
  answers_complete = []
  line_number = 0
  File.open(file_answers_complete, "r") do |f|
    f.each_line do |line|
      line_number += 1
      # take out the [1] " at the beginning and the closing "
      answer = line.strip.gsub('[1] "', '').gsub(/\"$/, '')
      values = answer.split(' || ')
      if values.length == 3
        answers_complete << [values[0].strip, values[1].strip, values[2].strip]
      else
        puts "******************************"
        puts "ERROR"
        puts "An error occurred on line #{line_number} of #{file_answers_complete} while parsing the answers."
        puts "This line was not in the correct format of: [1] \"Question Code || Answer Code || Answer Text\""
        puts "******************************"
        break
      end
    end
  end   

  # if answers exists, write to csv file
  if answers_complete.length > 0
    puts "saving complete answers to csv"
    puts "++ - there were #{answers_complete.length} total answers recorded for #{answers_complete.map{|x| x[0]}.uniq.length} questions"
    CSV.open(file_answers_complete, 'w') do |csv|
      answers_complete.each do |answer|
        csv << answer
      end
    end
  end



  puts "=============================="
  puts "reading in incomplete answers from sps file #{file_sps}"
  # open the sps file and convert the list of answers into a csv file 
  # row format: question_code, answer code, answer text
  answers_bad = []
  found_labels = false
  next_line_question = false
  question_code = nil
  line_number = 0
  File.open(file_sps, "r") do |f|
    f.each_line do |line|
      line_number += 1
#      puts "++ line #{line_number}"
      if found_labels
        if line.strip == '.'
#          puts "++ - found '.', stopping parsing of answers"
          # this is the end of the list of answers so stop
          break
        elsif line.strip == '/'
#          puts "++ - found /"
          # this is the end of a set of answers for a question
          question_code = nil
          next_line_question = true
        else
          # if this line is a question, start a new row array and save the question
          # else this is an answer
          if next_line_question
#            puts "++ - found question: #{line}"
            next_line_question = false
            question_code = line.strip
          else
            # this is an answer, record row in format: [question_code, value, text]
            # line is in format of: value "text"

            # strip space at beginning and end of line
            answer = line.strip
            # get index of space between value and text
            # index will be used to pull out the answer code and answer text
#            puts "++ -- found answer: #{line}"

            index = answer.index(' "')
            if index.nil? 
              puts "******************************"
              puts "ERROR"
              puts "An error occurred on line #{line_number} of #{file_sps} while parsing the answers."
              puts "This line was not in the correct format of: value 'answer text'"
              puts "******************************"
              break
            else
              answers_bad << [question_code, answer[0..index-1], answer[index+2..-2]]
            end

          end
        end
      elsif line.strip == 'VALUE LABELS'
        # found beginning of list of answers
#        puts "++++++++++++++ found value labels on line #{line_number}"
        found_labels = true
      end
    end
  end  

  puts "=============================="

  # if answers exists, write to csv file
  if answers_bad.length > 0
    puts "saving incomplete answers to csv"
    puts "++ - there were #{answers_bad.length} total answers recorded for #{answers_bad.map{|x| x[0]}.uniq.length} questions"
    CSV.open(file_answers_bad, 'w') do |csv|
      answers_bad.each do |answer|
        csv << answer
      end
    end
  end

  puts "=============================="
  # if complete answers length != bad answers length, show error message
  # this will happen if the data contains values that are not in the defined list of answers
  if answers_complete.length != answers_bad.length
    complete_questions = answers_complete.map{|x| x[0]}.uniq    
    bad_questions = answers_bad.map{|x| x[0]}.uniq
    puts "******************************"
    puts "WARNING"
    puts "When parsing your file, we found that there are #{complete_questions.length - bad_questions.length} questions "
    puts "that contain values that are not listed as one of the possible answers."
    puts "We suggest you review the values for these questions and fix accordingly."
    puts "Here are the questions that had this issue:"
    puts (complete_questions - bad_questions).map{|x| "#{x}\n"}
    puts "******************************"
  end
end
