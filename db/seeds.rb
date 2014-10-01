# encoding: UTF-8
require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#####################
## Pages
#####################
puts "Loading Pages"
Page.delete_all
PageTranslation.delete_all
p = Page.create(:id => 1, :name => 'about')
p.page_translations.create(:locale => 'en', :title => 'About Bootstrap Starter Project', :content => 'You have run rake db:seed and this is an example of translated content. Click the Language Switcher link in the top-right corner to view the text in another language.')
p.page_translations.create(:locale => 'ka', :title => "'Bootstrap Starter' პროექტის შესახებ", :content => "თქვენ ჩაუშვით 'rake db:seed' და ეს არის კონტენტის თარგმანის მაგალით. ტექსტის სხვა ენაზე სანახავად დააჭირეთ ენის გადამრთველის ბმულს მარჯვენა ზედა კუთხეში.")

#####################
## Survey Questions
#####################
puts "Loading survey questions"
SurveyQuestion.delete_all
questions = CSV.read("#{Rails.root}/db/spreadsheets/survey_questions.csv")
sql = "insert into survey_questions (code, text) values "
sql << questions.map{|x| "(\"#{x[0].strip}\", \"#{x[1].strip}\")"}.join(', ')
ActiveRecord::Base.connection.execute(sql)

#####################
## Survey Answers
#####################
puts "Loading survey answers"
SurveyAnswer.delete_all
answers = CSV.read("#{Rails.root}/db/spreadsheets/survey_answers.csv")
sql = "insert into survey_answers (code, value, text) values "
sql << answers.map{|x| "(\"#{x[0].strip}\", \"#{x[1].strip}\", \"#{x[2].strip}\")"}.join(', ')
ActiveRecord::Base.connection.execute(sql)

#####################
## Record which questions have answers
#####################
puts "Flagging which questions have answers"
codes = answers.map{|x| x[0]}.uniq
SurveyQuestion.where(:code => codes).update_all(:has_code_answers => true)

#####################
## Survey Results
#####################
puts "Loading survey results"
SurveyResult.delete_all
CSV.foreach("#{Rails.root}/db/spreadsheets/survey_results.csv") do |row|
  sql = "insert into survey_results (`id`, `Interv_code`, `Reg`, `start_time`, `fin_time`, `date`, `A1`, `A2`, `A3`, `A3.1_1`, `A3.1_2`, `A3.1_3`, `A3.2`, `A3.3`, `A4`, `A4.1`, `A4.2`, `A5`, `A5.1`, `A6`, `A7`, `A8`, `A9`, `A10`, `A11`, `A12`, `A13`, `B1`, `B1.1`, `B1.2_1`, `B1.2_2`, `B1.2_3`, `B1.2_4`, `B1.2_5`, `B1.2_6`, `B2`, `B3`, `B3.1`, `B3.2_1`, `B3.2_2`, `B3.2_3`, `B3.2_4`, `B3.2_5`, `B3.2_6`, `B3.2_7`, `B3.2_8`, `B3.2_9`, `B3.2_10`, `B3.2_11`, `B3.2_12`, `B3.2_13`, `B3.2_14`, `B3.3_1`, `B3.3_2`, `B3.3_3`, `B3.3_4`, `B3.3_5`, `B3.3_6`, `B3.3_7`, `B3.3_8`, `B3.3_9`, `B3.3_10`, `B3.3_11`, `B3.3_12`, `B3.3_13`, `B3.3_14`, `B4`, `B4.1_1`, `B4.1_2`, `B4.1_3`, `B4.1_4`, `B5_1`, `B5_2`, `B5_3`, `B5_4`, `B5_5`, `B6_1`, `B6_2`, `B6_3`, `B6_4`, `B6_5`, `B6_6`, `C1`, `C1.1`, `C1.2`, `C1.3`, `C1.3.1_1`, `C1.3.1_2`, `C1.3.1_3`, `C1.3.1_4`, `C1.3.1_5`, `C1.3.1_6`, `C1.3.1_7`, `C1.3.1_8`, `C1.3.1_9`, `C1.3.1_10`, `C1.3.1_11`, `C1.3.2_1`, `C1.3.2_2`, `C1.3.2_3`, `C1.3.2_4`, `C1.3.2_5`, `C2`, `C3`, `C3.1`, `C3.2`, `C4`, `C4.1`, `C4.1.1`, `C4.2`, `D1`, `D1.1`, `D1.2`, `D1.3`, `D1.3.1_1`, `D1.3.1_2`, `D1.3.1_3`, `D1.3.1_4`, `D1.3.1_5`, `D1.3.1_6`, `D1.3.1_7`, `D1.3.1_8`, `D1.3.1_9`, `D1.3.1_10`, `D1.3.1_11`, `D1.3.1_12`, `D1.3.2`, `D1.3.3_1`, `D1.3.3_2`, `D1.3.3_3`, `D1.3.3_4`, `D1.3.3_5`, `D1.3.3_6`, `D1.3.3_7`, `D1.3.3_8`, `D1.3.3_9`, `D1.3.3_10`, `D1.3.3_11`, `D1.3.3_12`, `D1.4`, `D2`, `E1`, `E1.1_1`, `E1.1_2`, `E1.1_3`, `E1.1_4`, `E1.1_5`, `E1.1_6`, `E1.1_7`, `E1.1_8`, `E1.1_9`, `E1.1_10`, `E1.1_11`, `E1.1_12`, `E2_1`, `E2_2`, `E3_1`, `E3_2`, `E3_3`, `E3_4`, `E3_5`, `E3_6`, `E3_7`, `F1_1`, `F1_2`, `F2_1`, `F2_2`, `F2_3`, `F2_4`, `F2_5`, `F2_6`, `F2_7`, `F2_8`, `F3`, `F3.1`, `F4`, `G1_1`, `G1_2`, `G1_3`, `G1_4`, `G1_5`, `G2`, `G3`, `G4_1`, `G4_2`, `G4_3`, `G4_4`, `G4_5`, `G4_6`, `G4_7`, `G4_8`, `G4_9`, `G4_10`, `G4_11`, `G4_12`, `G4_13`, `G4_14`, `G4_15`, `G4_16`, `G5_1`, `G5_2`, `G5_3`, `G5_4`, `G5_5`, `G5_6`, `G5_7`, `G5_8`, `G5_9`, `G6`, `G7_1`, `G7_2`, `G7_3`, `G7_4`, `G7_5`, `G7_6`, `G7_7`, `G7_8`, `G7_9`, `G7_10`, `G7_11`, `G7_12`, `G7_13`, `G7_14`, `G7_15`, `G7_16`, `G8`, `G8.1`, `G8.2`, `G8.3`, `G8.3.1_1`, `G8.3.1_2`, `G8.3.1_3`, `G8.3.1_4`, `G8.3.1_5`, `G8.3.1_6`, `G8.3.1_7`, `G8.3.1_8`, `G8.3.2_1`, `G8.3.2_2`, `G8.3.2_3`, `G8.3.2_4`, `G8.3.2_5`, `G8.4_1`, `G8.4_2`, `G8.4_3`, `G8.4_4`, `G8.4_5`, `G8.4_6`, `G8.4_7`, `G8.4_8`, `G8.4_9`, `G8.4_10`, `G8.4_11`, `H1`, `H2`, `H3`, `H4_1`, `H4_2`, `H4.1`, `H5`, `H6`, `H7`, `H8`, `H9`, `H10_1`, `H10_2`, `H10_3`, `H10_4`, `Envelope`) values "
  sql << "("
  row.each_with_index do |item, item_index|
    if item.present?
      sql << "\""
      sql << item.to_s.strip
      sql << "\""
    else
      sql << "null"
    end
    if item_index < row.length-1
      sql << ", "
    end
  end
  sql << ")"

  ActiveRecord::Base.connection.execute(sql)
end
