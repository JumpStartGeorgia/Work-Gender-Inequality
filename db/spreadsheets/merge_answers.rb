require 'csv'

############################
## take all of the answers that are in 'survey_answers_all_not_clean.csv' 
## and merge with 'survey_answers_clean.csv'
## use answers in the not_clean file by default; if different answer text exists in clean, use that instead
## output the merge into a new file of 'survey_answers_merged.csv'

file_all_not_clean = 'survey_answers_all_not_clean.csv'
file_all_clean = 'survey_answers_clean.csv'
file_merged = 'survey_answers_merged.csv'

all_not_clean = CSV.read(file_all_not_clean)
not_all_clean = CSV.read(file_all_clean)

puts "there are currently #{not_all_clean.length} clean answers"
puts "there are currently #{all_not_clean.length} not clean answers"


merge = []
count_clean = 0
count_not_clean = 0
all_not_clean.each do |answer|
  # look for the answer in the clean array
  # - if find, use it, else use this text
  index = not_all_clean.index{|x| x[0] == answer[0] && x[1] == answer[1]}
  if index.nil?
    merge << answer
    count_not_clean += 1
  else
    merge << answer.push(not_all_clean[index][2])
    count_clean += 1
  end
end

puts "#{count_clean} answers were taken from the cleaned file"
puts "#{count_not_clean} answers were taken from the not cleaned file"
puts "#{merge.length} answers will be saved to csv"

# write out the result
CSV.open(file_merged, 'w') do |csv|
  merge.each do |answer|
    csv << answer
  end
end