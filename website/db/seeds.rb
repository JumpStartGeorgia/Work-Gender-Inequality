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
sql << questions.map{|x| "(\"#{x[0]}\", \"#{x[1]}\")"}.join(', ')
ActiveRecord::Base.connection.execute(sql)

#####################
## Survey Answers
#####################
puts "Loading survey answers"
SurveyAnswer.delete_all
answers = CSV.read("#{Rails.root}/db/spreadsheets/survey_answers.csv")
sql = "insert into survey_answers (code, value, text) values "
sql << answers.map{|x| "(\"#{x[0]}\", \"#{x[1]}\", \"#{x[2]}\")"}.join(', ')
ActiveRecord::Base.connection.execute(sql)


#####################
## Record which questions have answers
#####################
puts "Flagging which questions have answers"
codes = answers.map{|x| x[0]}.uniq
SurveyQuestion.where(:code => codes).update_all(:has_code_answers => true)
