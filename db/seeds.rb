# encoding: UTF-8
require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
=begin
#####################
## Pages
#####################
puts "Loading Pages"
Page.delete_all
PageTranslation.delete_all
p = Page.create(:id => 1, :name => 'about')
p.page_translations.create(:locale => 'en', :title => 'About', :content => '<p dir="ltr"><span>Our goal is to increase gender equality and women&rsquo;s economic empowerment in Georgia and ensure inclusive economic growth in which women participate in the workforce on an equal basis with men.</span></p>
<p>The challenges to this goal are many, yet we recognize that we all benefit the closer Georgia moves towards it.</p>
<p>This project is possible by the generous support of USAID and implemented by <a href="http://article42.ge/">&ldquo;Article 42 of the Constitution&rdquo;</a> and with the collaborative efforts of four partner organizations: <a href="http://www.eng.gtuc.ge/">Georgian Trade Union Confederation (GTUC)</a>, <a href="http://css.ge/">Center for Social Sciences at Tbilisi State University (CSS)</a>, <a href="http://www.newmediaadvocacy.org/">New Media Advocacy Project (N-Map)</a> and <a href="http://jumpstart.ge/en">Jumpstart Georgia</a>.</p>
<p><span><span>&nbsp;</span></span></p>
<p dir="ltr"><span>Partners:</span></p>
<ul>
<li dir="ltr">
<p dir="ltr"><span>Article 42 of the Constitution</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>Article 42 of the Constitution is a non-governmental, non-political, human rights advocacy organization. The organization aims at promoting the establishment of the rule of law in Georgia through introduction of international standards for the protection of human rights and freedoms, and increase of legal awareness of the public.</span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>Center for Social Sciences at Tbilisi State University (CSS)</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>CSS&rsquo;s main objective is to develop academic and applied research in Social Sciences in Georgia, to ensure the integration of Georgian scientists into the international academic networks, to establish professional and ethical standards in Social Sciences and support evidence-based research and teaching. </span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>Georgian Trade Union Confederation (GTUC)</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>The Georgian Trade Unions Confederation represents a voluntary association of Trade Unions (Associations), Territorial Associations (Autonomous Republics) of trade unions based on the principles of common interests, goals, tasks and activities.</span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>JumpStart Georgia</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>JumpStart Georgia seeks to translate complex issues into a language a wider audience can understand and use to participate in fact-based discussions and ultimately make more informed decisions. JumpStart advocates for open data in government, businesses, and civil society. In addition, JumpStart builds data-driven tools to inform and engage Georgians about issues of social importance. Finally, JumpStart collaborates with organizations to strengthen their capacities to use data to inform and engage the public.</span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>New Media Advocacy Project (N-Map)</span></p>
</li>
</ul>')
p.page_translations.create(:locale => 'ka', :title => "შესახებ", :content => '<p dir="ltr"><span>Our goal is to increase gender equality and women&rsquo;s economic empowerment in Georgia and ensure inclusive economic growth in which women participate in the workforce on an equal basis with men.</span></p>
<p>The challenges to this goal are many, yet we recognize that we all benefit the closer Georgia moves towards it.</p>
<p>This project is possible by the generous support of USAID and implemented by <a href="http://article42.ge/">&ldquo;Article 42 of the Constitution&rdquo;</a> and with the collaborative efforts of four partner organizations: <a href="http://www.eng.gtuc.ge/">Georgian Trade Union Confederation (GTUC)</a>, <a href="http://css.ge/">Center for Social Sciences at Tbilisi State University (CSS)</a>, <a href="http://www.newmediaadvocacy.org/">New Media Advocacy Project (N-Map)</a> and <a href="http://jumpstart.ge/en">Jumpstart Georgia</a>.</p>
<p><span><span>&nbsp;</span></span></p>
<p dir="ltr"><span>Partners:</span></p>
<ul>
<li dir="ltr">
<p dir="ltr"><span>Article 42 of the Constitution</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>Article 42 of the Constitution is a non-governmental, non-political, human rights advocacy organization. The organization aims at promoting the establishment of the rule of law in Georgia through introduction of international standards for the protection of human rights and freedoms, and increase of legal awareness of the public.</span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>Center for Social Sciences at Tbilisi State University (CSS)</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>CSS&rsquo;s main objective is to develop academic and applied research in Social Sciences in Georgia, to ensure the integration of Georgian scientists into the international academic networks, to establish professional and ethical standards in Social Sciences and support evidence-based research and teaching. </span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>Georgian Trade Union Confederation (GTUC)</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>The Georgian Trade Unions Confederation represents a voluntary association of Trade Unions (Associations), Territorial Associations (Autonomous Republics) of trade unions based on the principles of common interests, goals, tasks and activities.</span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>JumpStart Georgia</span></p>
</li>
<ul>
<li dir="ltr">
<p dir="ltr"><span>JumpStart Georgia seeks to translate complex issues into a language a wider audience can understand and use to participate in fact-based discussions and ultimately make more informed decisions. JumpStart advocates for open data in government, businesses, and civil society. In addition, JumpStart builds data-driven tools to inform and engage Georgians about issues of social importance. Finally, JumpStart collaborates with organizations to strengthen their capacities to use data to inform and engage the public.</span></p>
</li>
</ul>
<li dir="ltr">
<p dir="ltr"><span>New Media Advocacy Project (N-Map)</span></p>
</li>
</ul>')
p = Page.create(:id => 2, :name => 'about_short')
p.page_translations.create(:locale => 'en', :title => 'About Short Version', :content => '<p dir="ltr"><span>Our goal is increase gender equality and women&rsquo;s economic empowerment in Georgia and ensure inclusive economic growth in which women participate in the workforce on an equal basis with men.</span></p>
<p dir="ltr">The challenges to this goal are many, yet we recognize that we all benefit the closer Georgia moves towards it.</p>
<p dir="ltr"><span id="docs-internal-guid-aeb21e71-3af4-b4ab-2647-63f855b3a4ea">This project is possible by the generous support of USAID and implemented by <a href="http://article42.ge/">&ldquo;Article 42 of the Constitution&rdquo;</a> and with the collaborative efforts of four partner organizations: <a href="http://www.eng.gtuc.ge/">Georgian Trade Union Confederation (GTUC)</a>, <a href="http://css.ge/">Center for Social Sciences at Tbilisi State University (CSS)</a>, <a href="http://www.newmediaadvocacy.org/">New Media Advocacy Project (N-Map)</a> and <a href="http://jumpstart.ge/en">Jumpstart Georgia</a>.</span></p>')
p.page_translations.create(:locale => 'ka', :title => "About Short Version", :content => '<p dir="ltr"><span>Our goal is increase gender equality and women&rsquo;s economic empowerment in Georgia and ensure inclusive economic growth in which women participate in the workforce on an equal basis with men.</span></p>
<p dir="ltr">The challenges to this goal are many, yet we recognize that we all benefit the closer Georgia moves towards it.</p>
<p dir="ltr"><span id="docs-internal-guid-aeb21e71-3af4-b4ab-2647-63f855b3a4ea">This project is possible by the generous support of USAID and implemented by <a href="http://article42.ge/">&ldquo;Article 42 of the Constitution&rdquo;</a> and with the collaborative efforts of four partner organizations: <a href="http://www.eng.gtuc.ge/">Georgian Trade Union Confederation (GTUC)</a>, <a href="http://css.ge/">Center for Social Sciences at Tbilisi State University (CSS)</a>, <a href="http://www.newmediaadvocacy.org/">New Media Advocacy Project (N-Map)</a> and <a href="http://jumpstart.ge/en">Jumpstart Georgia</a>.</span></p>')
p = Page.create(:id => 3, :name => 'discrimination')
p.page_translations.create(:locale => 'en', :title => 'Discrimination Explanation', :content => nil)
p.page_translations.create(:locale => 'ka', :title => "Discrimination Explanation", :content => nil)
p = Page.create(:id => 4, :name => 'explore')
p.page_translations.create(:locale => 'en', :title => 'Explore Data Explanation', :content => nil)
p.page_translations.create(:locale => 'ka', :title => "Explore Data Explanation", :content => nil)
p = Page.create(:id => 5, :name => 'about_a42')
p.page_translations.create(:locale => 'en', :title => 'Article 42 of the Constitution', :content => 'Article 42 of the Constitution is a non-governmental, non-political, human rights advocacy organization. The organization aims at promoting the establishment of the rule of law in Georgia through introduction of international standards for the protection of human rights and freedoms, and increase of legal awareness of the public.')
p.page_translations.create(:locale => 'ka', :title => "კონსტიტუციის 42-ე მუხლი", :content => 'კონსტიტუციის 42-ე მუხლი არის არასამთავრობო, აპოლიტიკური, ადამიანის უფლებათა დამცველი ორგანიზაცია. ორგანიზაციის მთავარი მიზანია ხელი შეუწყოს კანონის უზენაესობის დამკვიდრებას საქართველოში, ადამიანის უფლებების და თავისუფლებების საერთაშორისო სტანდარტების დამკვიდრების ადვოკატირებით. ასევე, ორგანიზაცია ესწრაფვის ხელი შეუწყოს ადამიანის უფლებების დაცვის კანონით გათვალისწინებული ეროვნული მექანიზმების შესახებ საზოგადოების ცნობიერების ამაღლებას.')
p = Page.create(:id => 6, :name => 'about_css')
p.page_translations.create(:locale => 'en', :title => 'Center for Social Sciences at Tbilisi State University (CSS)', :content => 'CSS’s main objective is to develop academic and applied research in Social Sciences in Georgia, to ensure the integration of Georgian scientists into the international academic networks, to establish professional and ethical standards in Social Sciences and support evidence-based research and teaching.')
p.page_translations.create(:locale => 'ka', :title => "თბილისის სახელმწიფო უნივერსიტეტის სოციალურ მეცნიერებათა ცენტრი  (CSS)", :content => 'სოციალურ მეცნიერებათა ცენტრის საქმიანობა მიზნად ისახავს საქართველოში აკადემიური და გამოყენებითი სოციალური მეცნიერებების განვითარებას, საერთაშორისო აკადემიურ ქსელში ქართველ მკვლევართა ინტეგრირებას, სოციალურ მეცნიერებებში პროფესიული და ეთიკური სტანდარტების დანერგვას და მონაცემებზე დაფუძნებული კვლევისა და სწავლების ხელშეწყობას.')
p = Page.create(:id => 7, :name => 'about_gtuc')
p.page_translations.create(:locale => 'en', :title => 'Georgian Trade Union Confederation (GTUC)', :content => 'The Georgian Trade Unions Confederation represents a voluntary association of Trade Unions (Associations), Territorial Associations (Autonomous Republics) of trade unions based on the principles of common interests, goals, tasks and activities.')
p.page_translations.create(:locale => 'ka', :title => "საქართველოს პროფესიული კავშირების გაერთიანება (GTUC)", :content => 'საქართველოს პროფესიული კავშირების გაერთიანება წარმოადგენს პროფესიული კავშირების (ასოციაციების), პროფესიული კავშირების ტერიტორიული გაერთიანებების, (ავტონომიური რესპუბლიკების), ნებაყოფლობით გაერთიანებას, მათი საერთო ინტერესების, მიზნების, ამოცანებისა და საქმიანობის პრინციპების საფუძველზე.')
p = Page.create(:id => 8, :name => 'about_nmap')
p.page_translations.create(:locale => 'en', :title => 'New Media Advocacy (N-Map)', :content => nil)
p.page_translations.create(:locale => 'ka', :title => "New Media Advocacy (N-Map)", :content => nil)
p = Page.create(:id => 9, :name => 'about_js')
p.page_translations.create(:locale => 'en', :title => 'JumpStart Georgia', :content => 'JumpStart Georgia seeks to translate complex issues into a language a wider audience can understand and use to participate in fact-based discussions and ultimately make more informed decisions. JumpStart advocates for open data in government, businesses, and civil society. In addition, JumpStart builds data-driven tools to inform and engage Georgians about issues of social importance. Finally, JumpStart collaborates with organizations to strengthen their capacities to use data to inform and engage the public.')
p.page_translations.create(:locale => 'ka', :title => "ჯამპსტარტ ჯორჯია", :content => 'JumpStart Georgia seeks to translate complex issues into a language a wider audience can understand and use to participate in fact-based discussions and ultimately make more informed decisions. JumpStart advocates for open data in government, businesses, and civil society. In addition, JumpStart builds data-driven tools to inform and engage Georgians about issues of social importance. Finally, JumpStart collaborates with organizations to strengthen their capacities to use data to inform and engage the public.')
p = Page.create(:id => 10, :name => 'game')
p.page_translations.create(:locale => 'en', :title => 'Game Explanation', :content => 'Explore your wage gap! In Georgia, men earn on average 39% more than women. Are you earning or are you losing? Play and find out!')
p.page_translations.create(:locale => 'ka', :title => "Game Explanation", :content => 'დაადგინეთ თქვენი სახელფასო სხვაობა! საქარველოში მამაკაცების შემოსავალი 38%-ით მეტია ქალებისაზე. გამოიმუშავებთ თუ კარგავთ თანხას? ითამაშეთ და გაიგეთ!')
=end

=begin
#####################
## Discrimination Types
#####################
puts "Loading discrimination types"
DiscriminationType.delete_all
DiscriminationTypeTranslation.delete_all
dt = DiscriminationType.create(:id => 1, :sort => 1)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Job Announcement')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Job Announcement")
dt = DiscriminationType.create(:id => 2, :sort => 2)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Job Application')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Job Application")
dt = DiscriminationType.create(:id => 3, :sort => 3)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Job Interview')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Job Interview")
dt = DiscriminationType.create(:id => 4, :sort => 4)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Pregnancy-related')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Pregnancy-related")
dt = DiscriminationType.create(:id => 5, :sort => 5)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Promotion')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Promotion")
dt = DiscriminationType.create(:id => 6, :sort => 6)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Wages')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Wages")
dt = DiscriminationType.create(:id => 7, :sort => 7)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Bonuses')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Bonuses")
dt = DiscriminationType.create(:id => 8, :sort => 8)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Other financial incentives')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Other financial incentives")
dt = DiscriminationType.create(:id => 9, :sort => 9)
dt.discrimination_type_translations.create(:locale => 'en', :name => 'Harassment')
dt.discrimination_type_translations.create(:locale => 'ka', :name => "Harassment")
=end

#####################
## Survey Questions
#####################
puts "Loading survey questions"
SurveyQuestion.delete_all
questions = CSV.read("#{Rails.root}/db/spreadsheets/survey_questions.csv")
questions.each do |question|
  q = SurveyQuestion.new(:code => question[0].strip)
  #en
  q.survey_question_translations.new(:locale => 'en', :question => question[1].strip)
  #ka
  # - if ka text not provided, use en text
  q.survey_question_translations.new(:locale => 'ka', :question => question[2].present? && question[2].strip.present? ? question[2].strip : question[1].strip)
  q.save
end 
#sql = "insert into survey_questions (code, text) values "
#sql << questions.map{|x| "(\"#{x[0].strip}\", \"#{x[1].strip}\")"}.join(', ')
#ActiveRecord::Base.connection.execute(sql)

#####################
## record that region question is mappable
#####################
#puts "Flagging that 'Reg' question is mappable"
#SurveyQuestion.where(:code => 'Reg').update_all(:is_mappable => true)

#####################
## record that question to exclude
#####################
puts "Flagging questions to exclude"
exclude = ['N', 'Interv_code', 'Reg', 'start_time', 'fin_time', 'date', 'Envelope', 'reg_weit', 'gender_wei', 'age_wei', 'weight', 'filter_$', 'PrimaryLast', 'A3.1_1', 'A3.1_2', 'H4_2']
SurveyQuestion.where(:code => exclude).update_all(:exclude => true)

#####################
## record column that is the weight
#####################
puts "Flagging that 'weight' question is the weight"
SurveyQuestion.where(:code => 'weight').update_all(:is_weight => true)

#####################
## add sort to questions
## order is: reg, Hx, all rest
#####################
puts "Adding sort to questions"
SurveyQuestion.where(:code => 'Reg').update_all(:sort => 1)
SurveyQuestion.where('code like "H%"').update_all(:sort => 2)


#####################
## Survey Answers
#####################
puts "Loading survey answers"
SurveyAnswer.delete_all
answers = CSV.read("#{Rails.root}/db/spreadsheets/survey_answers.csv")
answers.each do |answer|
  a = SurveyAnswer.new(:code => answer[0].strip, :value => answer[1].strip)
  #en
  a.survey_answer_translations.new(:locale => 'en', :answer => answer[2].strip)
  #ka
  # - if ka text not provided, use en text
  a.survey_answer_translations.new(:locale => 'ka', :answer => answer[3].present? && answer[3].strip.present? ? answer[3].strip : answer[2].strip)
  a.save
end 
#sql = "insert into survey_answers (code, value, text) values "
#sql << answers.map{|x| "(\"#{x[0].strip}\", \"#{x[1].strip}\", \"#{x[2].strip}\")"}.join(', ')
#ActiveRecord::Base.connection.execute(sql)

#####################
## Record which questions have answers
#####################
puts "Flagging which questions have answers"
codes = answers.map{|x| x[0]}.uniq
SurveyQuestion.where(:code => codes).update_all(:has_code_answers => true)

#####################
## Record which answers must be excluded from analysis
## (filter)
#####################
puts "Flagging which answers must be excluded"
answer_ids = SurveyAnswerTranslation.select('survey_answer_id').where(:answer => ['filter']).map{|x| x.survey_answer_id}.uniq
SurveyAnswer.where(:id => answer_ids).update_all(:exclude => true)


#####################
## Record which answers can be excluded from analysis
## (don't know, refuse)
#####################
puts "Flagging which answers can be excluded"
answer_ids = SurveyAnswerTranslation.select('survey_answer_id').where(:answer => ['refuse to answer', "i don't know"]).map{|x| x.survey_answer_id}.uniq
SurveyAnswer.where(:id => answer_ids).update_all(:can_exclude => true)

#####################
## Survey Results
#####################
puts "Loading survey results"
SurveyResult.delete_all
row_index = 0
CSV.foreach("#{Rails.root}/db/spreadsheets/survey_results.csv") do |row|
  row_index += 1
# original version  sql = "insert into survey_results (`id`, `Interv_code`, `Reg`, `start_time`, `fin_time`, `date`, `A1`, `A2`, `A3`, `A3.1_1`, `A3.1_2`, `A3.1_3`, `A3.2`, `A3.3`, `A4`, `A4.1`, `A4.2`, `A5`, `A5.1`, `A6`, `A7`, `A8`, `A9`, `A10`, `A11`, `A12`, `A13`, `B1`, `B1.1`, `B1.2_1`, `B1.2_2`, `B1.2_3`, `B1.2_4`, `B1.2_5`, `B1.2_6`, `B2`, `B3`, `B3.1`, `B3.2_1`, `B3.2_2`, `B3.2_3`, `B3.2_4`, `B3.2_5`, `B3.2_6`, `B3.2_7`, `B3.2_8`, `B3.2_9`, `B3.2_10`, `B3.2_11`, `B3.2_12`, `B3.2_13`, `B3.2_14`, `B3.3_1`, `B3.3_2`, `B3.3_3`, `B3.3_4`, `B3.3_5`, `B3.3_6`, `B3.3_7`, `B3.3_8`, `B3.3_9`, `B3.3_10`, `B3.3_11`, `B3.3_12`, `B3.3_13`, `B3.3_14`, `B4`, `B4.1_1`, `B4.1_2`, `B4.1_3`, `B4.1_4`, `B5_1`, `B5_2`, `B5_3`, `B5_4`, `B5_5`, `B6_1`, `B6_2`, `B6_3`, `B6_4`, `B6_5`, `B6_6`, `C1`, `C1.1`, `C1.2`, `C1.3`, `C1.3.1_1`, `C1.3.1_2`, `C1.3.1_3`, `C1.3.1_4`, `C1.3.1_5`, `C1.3.1_6`, `C1.3.1_7`, `C1.3.1_8`, `C1.3.1_9`, `C1.3.1_10`, `C1.3.1_11`, `C1.3.2_1`, `C1.3.2_2`, `C1.3.2_3`, `C1.3.2_4`, `C1.3.2_5`, `C2`, `C3`, `C3.1`, `C3.2`, `C4`, `C4.1`, `C4.1.1`, `C4.2`, `D1`, `D1.1`, `D1.2`, `D1.3`, `D1.3.1_1`, `D1.3.1_2`, `D1.3.1_3`, `D1.3.1_4`, `D1.3.1_5`, `D1.3.1_6`, `D1.3.1_7`, `D1.3.1_8`, `D1.3.1_9`, `D1.3.1_10`, `D1.3.1_11`, `D1.3.1_12`, `D1.3.2`, `D1.3.3_1`, `D1.3.3_2`, `D1.3.3_3`, `D1.3.3_4`, `D1.3.3_5`, `D1.3.3_6`, `D1.3.3_7`, `D1.3.3_8`, `D1.3.3_9`, `D1.3.3_10`, `D1.3.3_11`, `D1.3.3_12`, `D1.4`, `D2`, `E1`, `E1.1_1`, `E1.1_2`, `E1.1_3`, `E1.1_4`, `E1.1_5`, `E1.1_6`, `E1.1_7`, `E1.1_8`, `E1.1_9`, `E1.1_10`, `E1.1_11`, `E1.1_12`, `E2_1`, `E2_2`, `E3_1`, `E3_2`, `E3_3`, `E3_4`, `E3_5`, `E3_6`, `E3_7`, `F1_1`, `F1_2`, `F2_1`, `F2_2`, `F2_3`, `F2_4`, `F2_5`, `F2_6`, `F2_7`, `F2_8`, `F3`, `F3.1`, `F4`, `G1_1`, `G1_2`, `G1_3`, `G1_4`, `G1_5`, `G2`, `G3`, `G4_1`, `G4_2`, `G4_3`, `G4_4`, `G4_5`, `G4_6`, `G4_7`, `G4_8`, `G4_9`, `G4_10`, `G4_11`, `G4_12`, `G4_13`, `G4_14`, `G4_15`, `G4_16`, `G5_1`, `G5_2`, `G5_3`, `G5_4`, `G5_5`, `G5_6`, `G5_7`, `G5_8`, `G5_9`, `G6`, `G7_1`, `G7_2`, `G7_3`, `G7_4`, `G7_5`, `G7_6`, `G7_7`, `G7_8`, `G7_9`, `G7_10`, `G7_11`, `G7_12`, `G7_13`, `G7_14`, `G7_15`, `G7_16`, `G8`, `G8.1`, `G8.2`, `G8.3`, `G8.3.1_1`, `G8.3.1_2`, `G8.3.1_3`, `G8.3.1_4`, `G8.3.1_5`, `G8.3.1_6`, `G8.3.1_7`, `G8.3.1_8`, `G8.3.2_1`, `G8.3.2_2`, `G8.3.2_3`, `G8.3.2_4`, `G8.3.2_5`, `G8.4_1`, `G8.4_2`, `G8.4_3`, `G8.4_4`, `G8.4_5`, `G8.4_6`, `G8.4_7`, `G8.4_8`, `G8.4_9`, `G8.4_10`, `G8.4_11`, `H1`, `H2`, `H3`, `H4_1`, `H4_2`, `H4.1`, `H5`, `H6`, `H7`, `H8`, `H9`, `H10_1`, `H10_2`, `H10_3`, `H10_4`, `Envelope`) values "
  sql = "insert into survey_results (`id`, `Interv_code`, `Reg`, `start_time`, `fin_time`, `date`, `A1`, `A2`, `A3`, `A3.1_1`, `A3.1_2`, `A3.1_dro_weli`, `A3.1_3`, `A3.2`, `A3.3`, `A4`, `A4.1`, `A4.2`, `A5`, `A5.1`, `A6`, `A7_zveli`, `A8_zveli`, `A7`, `A8`, `A9`, `A10`, `A11`, `A12`, `A13`, `B1`, `B1.1`, `B1.2_1`, `B1.2_2`, `B1.2_3`, `B1.2_4`, `B1.2_5`, `B1.2_6`, `B2`, `B3`, `B3.1`, `B3.2_1`, `B3.2_2`, `B3.2_3`, `B3.2_4`, `B3.2_5`, `B3.2_6`, `B3.2_7`, `B3.2_8`, `B3.2_9`, `B3.2_10`, `B3.2_11`, `B3.2_12`, `B3.2_13`, `B3.2_14`, `B3.3_1`, `B3.3_2`, `B3.3_3`, `B3.3_4`, `B3.3_5`, `B3.3_6`, `B3.3_7`, `B3.3_8`, `B3.3_9`, `B3.3_10`, `B3.3_11`, `B3.3_12`, `B3.3_13`, `B3.3_14`, `B4`, `B4.1_1`, `B4.1_2`, `B4.1_3`, `B4.1_4`, `B5_1`, `B5_2`, `B5_3`, `B5_4`, `B5_5`, `B6_1`, `B6_2`, `B6_3`, `B6_4`, `B6_5`, `B6_6`, `C1`, `C1.1`, `C1.2`, `C1.3`, `C1.3.1_1`, `C1.3.1_2`, `C1.3.1_3`, `C1.3.1_4`, `C1.3.1_5`, `C1.3.1_6`, `C1.3.1_7`, `C1.3.1_8`, `C1.3.1_9`, `C1.3.1_10`, `C1.3.1_11`, `C1.3.2_1`, `C1.3.2_2`, `C1.3.2_3`, `C1.3.2_4`, `C1.3.2_5`, `C2`, `C3`, `C3.1`, `C3.2`, `C4`, `C4.1`, `C4.1.1`, `C4.2`, `D1`, `D1.1`, `D1.2`, `D1.3`, `D1.3.1_1`, `D1.3.1_2`, `D1.3.1_3`, `D1.3.1_4`, `D1.3.1_5`, `D1.3.1_6`, `D1.3.1_7`, `D1.3.1_8`, `D1.3.1_9`, `D1.3.1_10`, `D1.3.1_11`, `D1.3.1_12`, `D1.3.2`, `D1.3.3_1`, `D1.3.3_2`, `D1.3.3_3`, `D1.3.3_4`, `D1.3.3_5`, `D1.3.3_6`, `D1.3.3_7`, `D1.3.3_8`, `D1.3.3_9`, `D1.3.3_10`, `D1.3.3_11`, `D1.3.3_12`, `D1.4`, `D2`, `E1`, `E1.1_1`, `E1.1_2`, `E1.1_3`, `E1.1_4`, `E1.1_5`, `E1.1_6`, `E1.1_7`, `E1.1_8`, `E1.1_9`, `E1.1_10`, `E1.1_11`, `E1.1_12`, `E2_1`, `E2_2`, `E3_1`, `E3_2`, `E3_3`, `E3_4`, `E3_5`, `E3_6`, `E3_7`, `F1_1`, `F1_2`, `F2_1`, `F2_2`, `F2_3`, `F2_4`, `F2_5`, `F2_6`, `F2_7`, `F2_8`, `F3`, `F3.1`, `F4`, `G1_1`, `G1_2`, `G1_3`, `G1_4`, `G1_5`, `G2`, `G3`, `G4_1`, `G4_2`, `G4_3`, `G4_4`, `G4_5`, `G4_6`, `G4_7`, `G4_8`, `G4_9`, `G4_10`, `G4_11`, `G4_12`, `G4_13`, `G4_14`, `G4_15`, `G4_16`, `G5_1`, `G5_2`, `G5_3`, `G5_4`, `G5_5`, `G5_6`, `G5_7`, `G5_8`, `G5_9`, `G6`, `G7_1`, `G7_2`, `G7_3`, `G7_4`, `G7_5`, `G7_6`, `G7_7`, `G7_8`, `G7_9`, `G7_10`, `G7_11`, `G7_12`, `G7_13`, `G7_14`, `G7_15`, `G7_16`, `G8`, `G8.1`, `G8.2`, `G8.3`, `G8.3.1_1`, `G8.3.1_2`, `G8.3.1_3`, `G8.3.1_4`, `G8.3.1_5`, `G8.3.1_6`, `G8.3.1_7`, `G8.3.1_8`, `G8.3.2_1`, `G8.3.2_2`, `G8.3.2_3`, `G8.3.2_4`, `G8.3.2_5`, `G8.4_1`, `G8.4_2`, `G8.4_3`, `G8.4_4`, `G8.4_5`, `G8.4_6`, `G8.4_7`, `G8.4_8`, `G8.4_9`, `G8.4_10`, `G8.4_11`, `H1`, `H2`, `H3`, `H4_1`, `H4_2`, `H4.1`, `H5`, `H6`, `H7`, `H8`, `H9`, `H10_1`, `H10_2`, `H10_3`, `H10_4`, `I1_1`, `I1_2`, `I1_3`, `I2_1`, `I2_2`, `I2_3`, `I2_4`, `I2_5`, `I2_6`, `I2_7`, `I2_8`, `Envelope`, `reg_weit`, `gender_wei`, `age_wei`, `weight`, `filter_$`, `PrimaryLast`) values "
  sql << "("
  row.each_with_index do |item, item_index|
    if item_index == 0
      # do not use the # inside the csv, just use the row index
      # this is mostly because this column does not have unique values
      # also, the value is not important
      sql << row_index.to_s
    elsif item.present?
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

=begin
#####################
## FAQ Categories
#####################
puts "Loading faq categories"
FaqCategory.delete_all
FaqCategoryTranslation.delete_all
f = FaqCategory.create(:id => 1, :sort => 1)
f.faq_category_translations.create(:locale => 'en', :name => 'Equality and Discrimination')
f.faq_category_translations.create(:locale => 'ka', :name => "თანასწორობა და დისკრიმინაცია")
f = FaqCategory.create(:id => 2, :sort => 2)
f.faq_category_translations.create(:locale => 'en', :name => 'Discrimination in the Work Place')
f.faq_category_translations.create(:locale => 'ka', :name => "დისკრიმინაცია სამუშაო ადგილას")
f = FaqCategory.create(:id => 3, :sort => 3)
f.faq_category_translations.create(:locale => 'en', :name => 'The Rights of the Labor Process')
f.faq_category_translations.create(:locale => 'ka', :name => "უფლებები შრომის პროცესში")


#####################
## FAQs
#####################
puts "Loading FAQs"
Faq.delete_all
FaqTranslation.delete_all
f = Faq.create(:id => 1, :sort => 1, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის გენდერი?", :answer => 'სქესს გააჩნია ორი კატეგორია ბილოგიური (sex) და სოციალური (gender). სქესი დაკავშირებულია ქალსა და მამაკაცს შორის ფიზიკურ, ანატომიურ განსხვავებებთან, ცნება „გენდერი” კი მიუთითებს მათ ფსიქოლოგიურ, სოციალურ და კულტურულ როლებზე. სქესი ბიოლოგიურად არის განსაზღვრული, გენდერი კი სოციალური და კულტურული ფაქტორებით არის განპირობებული და აღნიშნავს ქალისა და მამაკაცის სოციალურად ნასწავლი ქცევების, თვისებებისა და დამოკიდებულებების ნაკრებს.')
f.faq_translations.create(:locale => 'en', :question => "რა არის გენდერი?", :answer => 'სქესს გააჩნია ორი კატეგორია ბილოგიური (sex) და სოციალური (gender). სქესი დაკავშირებულია ქალსა და მამაკაცს შორის ფიზიკურ, ანატომიურ განსხვავებებთან, ცნება „გენდერი” კი მიუთითებს მათ ფსიქოლოგიურ, სოციალურ და კულტურულ როლებზე. სქესი ბიოლოგიურად არის განსაზღვრული, გენდერი კი სოციალური და კულტურული ფაქტორებით არის განპირობებული და აღნიშნავს ქალისა და მამაკაცის სოციალურად ნასწავლი ქცევების, თვისებებისა და დამოკიდებულებების ნაკრებს.')
f = Faq.create(:id => 2, :sort => 2, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის გენდერული სტერეოტიპები?", :answer => 'გენდრული სტერეოტიპები გენდერულ როლებზე დაყრდნობით ყალიბდება. ეს არის იმ წარმოდგენების, შეხედულებების, ცრურწმენების ნაკრები რომლებიც ამა თუ იმ საზოგადოებაში მოცემულ ისტორიულ პერიოდში ითვლება ქალისათვის ან მამაკაცისათვის მეტად დამახასიათებლად. მაგალითად, „კაცები უფრო აგრესიულები არიან“, „კაცები მეტად ჭკვიანები არიან“, „ქალები უფრო ემოციურები არიან“, „ქალები კარგად ვერ მართავენ მანქანას“. როლების ამგვარი სტერეოტიპიზაცია მამაკაცს საშუალებას აძლევს მიაღწიოს დომინირებულ მდგომარეობას საზოგადოებაში, სამაგიეროდ, იგი ნაკლებად მონაწილეობს საკუთარი შვილის აღზრდაში. გენდერული უთანასწორობა და გენდერული სტერეოტიპები უშუალოდაა ერთმანეთთან დაკავშირებული. გენდერული სტერეოტიპები სექსიზმის ერთგვარი მეთოდოლოგიაა და საფუძვლად უდევს შრომის არათანაბარ დაყოფას.')
f.faq_translations.create(:locale => 'en', :question => "რა არის გენდერული სტერეოტიპები?", :answer => 'გენდრული სტერეოტიპები გენდერულ როლებზე დაყრდნობით ყალიბდება. ეს არის იმ წარმოდგენების, შეხედულებების, ცრურწმენების ნაკრები რომლებიც ამა თუ იმ საზოგადოებაში მოცემულ ისტორიულ პერიოდში ითვლება ქალისათვის ან მამაკაცისათვის მეტად დამახასიათებლად. მაგალითად, „კაცები უფრო აგრესიულები არიან“, „კაცები მეტად ჭკვიანები არიან“, „ქალები უფრო ემოციურები არიან“, „ქალები კარგად ვერ მართავენ მანქანას“. როლების ამგვარი სტერეოტიპიზაცია მამაკაცს საშუალებას აძლევს მიაღწიოს დომინირებულ მდგომარეობას საზოგადოებაში, სამაგიეროდ, იგი ნაკლებად მონაწილეობს საკუთარი შვილის აღზრდაში. გენდერული უთანასწორობა და გენდერული სტერეოტიპები უშუალოდაა ერთმანეთთან დაკავშირებული. გენდერული სტერეოტიპები სექსიზმის ერთგვარი მეთოდოლოგიაა და საფუძვლად უდევს შრომის არათანაბარ დაყოფას.')
f = Faq.create(:id => 3, :sort => 3, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის სექსიზმი?", :answer => '<p>სექსიზმი არის ადამიანის ან ადამიანთა ჯგუფის დისკრიმინაცის სქესობრივი ან გენდეურლი ნიშნით. იგიმოიცავსიმსოციალურსტერეოტიპებს, რწმენებსადაწარმოდგენებს, რომელიცერთისქესისმეორეზედომინირებასაწესებსდაგენდერულიუთანასწორობისსაფუძველსქმნის. თავისიიდეოლოგიურიფუნქციითსექსიზმირასიზმისანალოგიურია.</p>
<p>სექსიზმისწყაროგახლავთკონკრეტულისოციალურიპირობებისადაკულტურულინორმებისნიადაგზეშექმნილისქესობრივიგანსხვავებებისაბსოლუტიზაციადაბიოლოგიზაცია. სექსიზმიმამაკაცურდომინირებასჩვეულებრივმოვლენადმიიჩნევს. ესიდეოლოგია, რომელიცადამიანისუფლებებისდარღვევაშივლინდება, ამცირებს, არახელსაყრელპირობებშიაყენებსქალებს.</p>
<p>სექსიზმის დეფინიციიდან გამომდინარე, გენდერული დისკრიმინაცია მამაკაცებსაც ისევე ეხებათ, როგორც ქალებს. თუმცა იმის გამო, რომ მსოფლიოში კულტურათა უმრავლესობა პატრიარქალურია, სექსიზმის მხსვერპლნი უფრო ხშირად ქალები ხდებიან.</p>')
f.faq_translations.create(:locale => 'en', :question => "რა არის სექსიზმი?", :answer => '<p>სექსიზმი არის ადამიანის ან ადამიანთა ჯგუფის დისკრიმინაცის სქესობრივი ან გენდეურლი ნიშნით. იგიმოიცავსიმსოციალურსტერეოტიპებს, რწმენებსადაწარმოდგენებს, რომელიცერთისქესისმეორეზედომინირებასაწესებსდაგენდერულიუთანასწორობისსაფუძველსქმნის. თავისიიდეოლოგიურიფუნქციითსექსიზმირასიზმისანალოგიურია.</p>
<p>სექსიზმისწყაროგახლავთკონკრეტულისოციალურიპირობებისადაკულტურულინორმებისნიადაგზეშექმნილისქესობრივიგანსხვავებებისაბსოლუტიზაციადაბიოლოგიზაცია. სექსიზმიმამაკაცურდომინირებასჩვეულებრივმოვლენადმიიჩნევს. ესიდეოლოგია, რომელიცადამიანისუფლებებისდარღვევაშივლინდება, ამცირებს, არახელსაყრელპირობებშიაყენებსქალებს.</p>
<p>სექსიზმის დეფინიციიდან გამომდინარე, გენდერული დისკრიმინაცია მამაკაცებსაც ისევე ეხებათ, როგორც ქალებს. თუმცა იმის გამო, რომ მსოფლიოში კულტურათა უმრავლესობა პატრიარქალურია, სექსიზმის მხსვერპლნი უფრო ხშირად ქალები ხდებიან.</p>')
f = Faq.create(:id => 4, :sort => 4, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის გენდერული თანასწორობა?", :answer => '<p>გენდერული თანასწორობა სოციალური სამართლიანობის პრინციპებზე დაფუძნებული საზოგადოების ერთ-ერთი არსებითი მახასიათებელი და ადამიანის უფლებათა ნაწილია. გენდერული თანასწორობა ნიშნავს, რომ ქალსა და მამაკაცს აქვთ თანაბარი პირობები და ცხოვრებისეული შანსები თავიანთი პოტენციალის სრული რეალიზაციისათვის, თანაბრად მონაწილეობდნენ პოლიტიკური, ეკონომიკური, სოციალური, კულტურული განვითარების პროცესებში და თანაბრად სარგებლობდნენ საზოგადოებრივი სიკეთეებით, შესაძლებლობებითა და რესურსებით. გენდერული თანასწორობა არ ნიშნავს ქალისა და მამაკაცის იგივეობას, პირიქით - საზოგადოებაში აღიარებულია, რომ ადამიანებს აქვთ სხვადასხვა ღირებულება და მიზანი, სხვადასხვა საჭიროება და ცხოვრების წესი, მიუხედავად ამისა, მათი ინტერესები თანაბრად უნდა იყოს გათვალისწინებული ყველა დონეზე, ისინი უნდა სარგებლობდნენ თანაბარი უფლებებითა და შესაძლებლობებით და ჰქონდეთ ერთნაირი პასუხისმგებლობები და ვალდებულებები საზოგადოების ყველა სფეროში.</p>
<p>ქალსა და მამაკაცს შორის განსხვავებებზე ხაზგასმა სხვადასხვა კულტურაში განსხვავებულად ხდება, თუმცა იმ სახელმწიფოებში სადაც მაღალია ეკონომიკის დონე და სახელმწიფოს მმართველობა დამყარებულია დემოკრატიულ, ლიბერალურ მიდგომაზე აღნიშნული სხვაობა ფაქტობრივად არ შეინიშნება, თანამედროვე საზოგადეობის მიდგომა ეფუძნება სწორედ სქესთა შორის განსხვავების შემცირებაზე, ერთი სქესის მეორეზე დომინირების აღმოფხვრაზე. მეცნიერულად დამტკიცებულია, რომ ორივე სქესს ერთნაირად შეუძლიათ შეითავსონ ერთმანეთის საქმიანობების, უნარების, ქცევების ფარტო სპექტრი.</p>')
f.faq_translations.create(:locale => 'en', :question => "რა არის გენდერული თანასწორობა?", :answer => '<p>გენდერული თანასწორობა სოციალური სამართლიანობის პრინციპებზე დაფუძნებული საზოგადოების ერთ-ერთი არსებითი მახასიათებელი და ადამიანის უფლებათა ნაწილია. გენდერული თანასწორობა ნიშნავს, რომ ქალსა და მამაკაცს აქვთ თანაბარი პირობები და ცხოვრებისეული შანსები თავიანთი პოტენციალის სრული რეალიზაციისათვის, თანაბრად მონაწილეობდნენ პოლიტიკური, ეკონომიკური, სოციალური, კულტურული განვითარების პროცესებში და თანაბრად სარგებლობდნენ საზოგადოებრივი სიკეთეებით, შესაძლებლობებითა და რესურსებით. გენდერული თანასწორობა არ ნიშნავს ქალისა და მამაკაცის იგივეობას, პირიქით - საზოგადოებაში აღიარებულია, რომ ადამიანებს აქვთ სხვადასხვა ღირებულება და მიზანი, სხვადასხვა საჭიროება და ცხოვრების წესი, მიუხედავად ამისა, მათი ინტერესები თანაბრად უნდა იყოს გათვალისწინებული ყველა დონეზე, ისინი უნდა სარგებლობდნენ თანაბარი უფლებებითა და შესაძლებლობებით და ჰქონდეთ ერთნაირი პასუხისმგებლობები და ვალდებულებები საზოგადოების ყველა სფეროში.</p>
<p>ქალსა და მამაკაცს შორის განსხვავებებზე ხაზგასმა სხვადასხვა კულტურაში განსხვავებულად ხდება, თუმცა იმ სახელმწიფოებში სადაც მაღალია ეკონომიკის დონე და სახელმწიფოს მმართველობა დამყარებულია დემოკრატიულ, ლიბერალურ მიდგომაზე აღნიშნული სხვაობა ფაქტობრივად არ შეინიშნება, თანამედროვე საზოგადეობის მიდგომა ეფუძნება სწორედ სქესთა შორის განსხვავების შემცირებაზე, ერთი სქესის მეორეზე დომინირების აღმოფხვრაზე. მეცნიერულად დამტკიცებულია, რომ ორივე სქესს ერთნაირად შეუძლიათ შეითავსონ ერთმანეთის საქმიანობების, უნარების, ქცევების ფარტო სპექტრი.</p>')
f = Faq.create(:id => 5, :sort => 5, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის დროებითი სპეციალური ღონისძიებები?", :answer => 'დროებითი სპეციალური ზომები იგივე პოზიტიური დისკრიმინაცია არის დროებით ღონისძიებათა ერთობლიობა, აუცილებელი სტრუქტურული, სოციალური და კულტურული ცვლილებები, რომელიც მიმართულია გენდერული თანასწორობის მიღწევის დაჩქარებისკენ, სქესის ნიშნით დისკრიმინაციის ყველა ფორმისა და ზეგავლენის აღმოფხვრისაკენ.')
f.faq_translations.create(:locale => 'en', :question => "რა არის დროებითი სპეციალური ღონისძიებები?", :answer => 'დროებითი სპეციალური ზომები იგივე პოზიტიური დისკრიმინაცია არის დროებით ღონისძიებათა ერთობლიობა, აუცილებელი სტრუქტურული, სოციალური და კულტურული ცვლილებები, რომელიც მიმართულია გენდერული თანასწორობის მიღწევის დაჩქარებისკენ, სქესის ნიშნით დისკრიმინაციის ყველა ფორმისა და ზეგავლენის აღმოფხვრისაკენ.')
f = Faq.create(:id => 6, :sort => 6, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის გენდერული მეინსტრიმინგი?", :answer => 'გენდერული მეინსტრიმინგი წარმოადგენს კონცეფციას, რომლიც გულისხმობს გენდერული პრობლემატიკის ჩართვას პოლიტიკის ყველა დონისა და საფეხურის მიმართულებებში. ევროკომისია მას განმარტავს, როგორც ,,სტრატეგიული გრძელვადიანი მიდგომას, რომელიც ნერგავს გენდერულ თანასწორობას სისტემებში, სტრუქტურებში, ინსტიტუტებში, პროგრამებში, პოლიტიკასა და პრაქტიკაში”.')
f.faq_translations.create(:locale => 'en', :question => "რა არის გენდერული მეინსტრიმინგი?", :answer => 'გენდერული მეინსტრიმინგი წარმოადგენს კონცეფციას, რომლიც გულისხმობს გენდერული პრობლემატიკის ჩართვას პოლიტიკის ყველა დონისა და საფეხურის მიმართულებებში. ევროკომისია მას განმარტავს, როგორც ,,სტრატეგიული გრძელვადიანი მიდგომას, რომელიც ნერგავს გენდერულ თანასწორობას სისტემებში, სტრუქტურებში, ინსტიტუტებში, პროგრამებში, პოლიტიკასა და პრაქტიკაში”.')
f = Faq.create(:id => 7, :sort => 7, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის დისკრიმინაცია?", :answer => '<p><strong>დისკრიმინაცია</strong> (ლათ. Discriminatio, განსხვავება) ნიშნავს ადამიანების უთანაწორო, უსამართლო მოპყრობას ან უპირატესობის მინიჭებას რასის, ეთნიკური წარმოშობის, კანის, ფერის, სქესის, რელიგიის, სექსუალური ორიენტაციის, გენდერული იდენტობის და სხვა ნიშნების საფუძველზე.</p>
<p>დისკრიმინაცია შეიძლება იყოს &bdquo;დე იურე&rdquo; (ანუ სამართლებრივი), რომელიც გათვალისწინებულია მოქმედი კანონმდებლობით და &bdquo;დე ფაქტო&rdquo;, როდესაც გაბატონებულ ჯგუფს უპირატესობა აქვს უმცირესობასთან შედარებით.</p>
<p>დისკრიმინაცია შეიძლება იყოს პირდაპირი და არაპირდაპირი, პირდაპირი დისკრიმინაცია გულისხმობს ისეთ პირობებს ან პირობების შექმნას, რომელიც პირს რაიმე ნიშნით არახელსაყრელ მდგომარეობაში აყენებს ამავე პირობებში მყოფ სხვა პირებთან შედარებით. არაპირდაპირი დისკრიმინაცია ორიენტირებულია იმ შედეგზე, რომელიც მოჰყვება რაიმე დებულებას, კრიტერიუმს ან პრაქტიკას, რომელიც შეიძლება ნეიტრალური ჩანდეს, მაგრამ სინამდვილეში, გარკვეული უმცირესობის ადამიანებს სხვებთან შედარებით სისტემატურად არასასურველ მდგომარეობაში აყენებს.</p>')
f.faq_translations.create(:locale => 'en', :question => "რა არის დისკრიმინაცია?", :answer => '<p><strong>დისკრიმინაცია</strong> (ლათ. Discriminatio, განსხვავება) ნიშნავს ადამიანების უთანაწორო, უსამართლო მოპყრობას ან უპირატესობის მინიჭებას რასის, ეთნიკური წარმოშობის, კანის, ფერის, სქესის, რელიგიის, სექსუალური ორიენტაციის, გენდერული იდენტობის და სხვა ნიშნების საფუძველზე.</p>
<p>დისკრიმინაცია შეიძლება იყოს &bdquo;დე იურე&rdquo; (ანუ სამართლებრივი), რომელიც გათვალისწინებულია მოქმედი კანონმდებლობით და &bdquo;დე ფაქტო&rdquo;, როდესაც გაბატონებულ ჯგუფს უპირატესობა აქვს უმცირესობასთან შედარებით.</p>
<p>დისკრიმინაცია შეიძლება იყოს პირდაპირი და არაპირდაპირი, პირდაპირი დისკრიმინაცია გულისხმობს ისეთ პირობებს ან პირობების შექმნას, რომელიც პირს რაიმე ნიშნით არახელსაყრელ მდგომარეობაში აყენებს ამავე პირობებში მყოფ სხვა პირებთან შედარებით. არაპირდაპირი დისკრიმინაცია ორიენტირებულია იმ შედეგზე, რომელიც მოჰყვება რაიმე დებულებას, კრიტერიუმს ან პრაქტიკას, რომელიც შეიძლება ნეიტრალური ჩანდეს, მაგრამ სინამდვილეში, გარკვეული უმცირესობის ადამიანებს სხვებთან შედარებით სისტემატურად არასასურველ მდგომარეობაში აყენებს.</p>')
f = Faq.create(:id => 8, :sort => 8, :faq_category_id => 1)
f.faq_translations.create(:locale => 'ka', :question => "რა არის გენდერული ნიშნით დისკრიმინაცია?", :answer => 'გენდერული ნიშნით დისკრიმინაცია გულისხმობს სქესის ნიშნით ნებისმიერი განსხვავებას, გამიჯვნას ან/და შეზღუდვას, რაც გამოხატულია უფლებებისა და ძირითადი თავისუფლებების განსხვავებული აღიარებით, შესაძლებლობების არათანაბარი წარმოჩენით, შესუსტებით ან სრული უარყოფით.')
f.faq_translations.create(:locale => 'en', :question => "რა არის გენდერული ნიშნით დისკრიმინაცია?", :answer => 'გენდერული ნიშნით დისკრიმინაცია გულისხმობს სქესის ნიშნით ნებისმიერი განსხვავებას, გამიჯვნას ან/და შეზღუდვას, რაც გამოხატულია უფლებებისა და ძირითადი თავისუფლებების განსხვავებული აღიარებით, შესაძლებლობების არათანაბარი წარმოჩენით, შესუსტებით ან სრული უარყოფით.')

f = Faq.create(:id => 9, :sort => 1, :faq_category_id => 2)
f.faq_translations.create(:locale => 'ka', :question => "რას გულისხმობს სამუშაო ადგილას გენდერული დისკრიმინაცია?", :answer => '<p>სამუშაო ადგილას <strong>გენდერული დისკრიმინაცია</strong> გულისხმობს ისეთ მოპყრობას ან პირობების შექმნას, რომელიც სამუშაო ადგილას პირს საქართველოს კანონმდებლობით დადგენილი უფლებებით სარგებლობისას გენდერული ნიშნის გამო არახელსაყრელ მდგომარეობაში აყენებს ანალოგიურ პირობებში მყოფ სხვა პირებთან შედარებით ან თანაბარ მდგომარეობაში აყენებს არსებითად უთანასწორო პირობებში მყოფ პირებს.</p>')
f.faq_translations.create(:locale => 'en', :question => "რას გულისხმობს სამუშაო ადგილას გენდერული დისკრიმინაცია?", :answer => '<p>სამუშაო ადგილას <strong>გენდერული დისკრიმინაცია</strong> გულისხმობს ისეთ მოპყრობას ან პირობების შექმნას, რომელიც სამუშაო ადგილას პირს საქართველოს კანონმდებლობით დადგენილი უფლებებით სარგებლობისას გენდერული ნიშნის გამო არახელსაყრელ მდგომარეობაში აყენებს ანალოგიურ პირობებში მყოფ სხვა პირებთან შედარებით ან თანაბარ მდგომარეობაში აყენებს არსებითად უთანასწორო პირობებში მყოფ პირებს.</p>')
f = Faq.create(:id => 10, :sort => 2, :faq_category_id => 2)
f.faq_translations.create(:locale => 'ka', :question => "რა დროს შეიძლება ადგილი ჰქონდეს სამუშაო ადგილზე დისკრიმინაციას?", :answer => '<p>სამუშაო ადგილზე დისკრიმინაციას ადგილი აქვს:</p>
<ul>
<li>სამსახურში აყვანისას</li>
<li>სამუშაო პროცესში</li>
<li>სამსახურიდან გათავისუფლებისას</li>
</ul>')
f.faq_translations.create(:locale => 'en', :question => "რა დროს შეიძლება ადგილი ჰქონდეს სამუშაო ადგილზე დისკრიმინაციას?", :answer => '<p>სამუშაო ადგილზე დისკრიმინაციას ადგილი აქვს:</p>
<ul>
<li>სამსახურში აყვანისას</li>
<li>სამუშაო პროცესში</li>
<li>სამსახურიდან გათავისუფლებისას</li>
</ul>')
f = Faq.create(:id => 11, :sort => 3, :faq_category_id => 2)
f.faq_translations.create(:locale => 'ka', :question => "ვისგან შეიძლება ხორციელდებოდეს სამუშაო ადგილას დისკრიმინაცია?", :answer => '<p>სამუშაო ადგილას დისკრიმინაცია შეძლება ხორციელდებოდეს:</p>
<ul>
<li>მმართველის, უფროსის, კოორდინატორის მიერ;</li>
<li>თანამშრომლებს შორის;</li>
<li>მესამე პირის მიერ (კლიენტი, მომხმარებელი, პატრნიორი)</li>
</ul>')
f.faq_translations.create(:locale => 'en', :question => "ვისგან შეიძლება ხორციელდებოდეს სამუშაო ადგილას დისკრიმინაცია?", :answer => '<p>სამუშაო ადგილას დისკრიმინაცია შეძლება ხორციელდებოდეს:</p>
<ul>
<li>მმართველის, უფროსის, კოორდინატორის მიერ;</li>
<li>თანამშრომლებს შორის;</li>
<li>მესამე პირის მიერ (კლიენტი, მომხმარებელი, პატრნიორი)</li>
</ul>')
f = Faq.create(:id => 12, :sort => 4, :faq_category_id => 2)
f.faq_translations.create(:locale => 'ka', :question => "რაში გამოხატება დისკრიმინაცია სამსახურში აყვანისას?", :answer => '<p><span style="text-decoration: underline;">სამსახურში აყვანისას</span> დისკრიმინაცია ძირითადად შეიძლება გამოიხატებოდეს:</p>
<ul>
<li>თუ სამსახურში აყვანის მიზნით გასაუბრებაზე დამსაქმებელი გისვამთ კითხვებს, რომელიც შეეხება:</li>
<ul>
<li>ოჯახურ მდგომარეობას;</li>
<li>თქვენს გეგმებს ქორწინებაზე;</li>
<li>შვილების რაოდენობას;</li>
<li>ორსულობის დაგეგმარებას ან ხომ არ ხართ ორსულად.</li>
</ul>
<li>თუ დამსაქმებელი გასაუბრების დროს აშკარა უპირატესობას გამოხატავს საწინააღმდეგო სქესის მქონე პირის მიმართ.</li>
</ul>')
f.faq_translations.create(:locale => 'en', :question => "რაში გამოხატება დისკრიმინაცია სამსახურში აყვანისას?", :answer => '<p><span style="text-decoration: underline;">სამსახურში აყვანისას</span> დისკრიმინაცია ძირითადად შეიძლება გამოიხატებოდეს:</p>
<ul>
<li>თუ სამსახურში აყვანის მიზნით გასაუბრებაზე დამსაქმებელი გისვამთ კითხვებს, რომელიც შეეხება:</li>
<ul>
<li>ოჯახურ მდგომარეობას;</li>
<li>თქვენს გეგმებს ქორწინებაზე;</li>
<li>შვილების რაოდენობას;</li>
<li>ორსულობის დაგეგმარებას ან ხომ არ ხართ ორსულად.</li>
</ul>
<li>თუ დამსაქმებელი გასაუბრების დროს აშკარა უპირატესობას გამოხატავს საწინააღმდეგო სქესის მქონე პირის მიმართ.</li>
</ul>')
f = Faq.create(:id => 13, :sort => 5, :faq_category_id => 2)
f.faq_translations.create(:locale => 'ka', :question => "რაში გამოიხატება დისკრიმინაცია სამუშაო პროცესში ?", :answer => '<p><span style="text-decoration: underline;">სამუშაო პროცესში</span> დისკრიმინაცია ძირითადად შეიძლება გამოხატებოდეს:</p>
<ul>
<li>თუ თქვენი ხელფასი უფრო მცირეა, ვიდრე იგივე პოზიციაზე და იგივე კვალიფიკაციის მქონე საწინააღმდეგო სქესის ადამიანის;</li>
<li>თუ დამსაქმებელი თქვენ თანამშრომელთან შედარებით არ გაძლევთ ან ნაკლებათ გაძლევთ;</li>
<ul>
<li>შვებულებას;</li>
<li>პრემიას;</li>
</ul>
<li>თუ არ გაძლევათ შესაძლებლობას მონაწილობა მიიღოთ ან ნაკლებად მიიღოთ კვალიფიკაციის ამაღლების ტრენინგებსა და სემინარებში;</li>
<li>თუ არ გაძლევთ წინსვლის და დაწინაურების შესაძლებლობას;</li>
<li>თუ თქვენი დამსაქმებელი გთხოვთ, რომ სხვა თანამშრომელთან შედარებით მეტად იმუშავოთ ზეგანაკვეთურად (დასვენების დღეები, შაბათი - კვირა, გვიანი საღამო);</li>
<li>თუ დამსაქმებელმა არ მოგცათ შვებულება ორსულობის, მშობიარობისა და ბავშვის მოვლის გამო ან/და დრო საჭირო სამედიცინო გამოკვლევებისთვის ან/და ბავშვის კვებისათვის ან /და დამატებითი შვებულება ბავშვის მოვლის გამო;</li>
<li>თუ თქვენ სამსახურში გახდით სექსუალური შევიწროების მსხვერპლი (არსებობს უადგილო კომენტარები თქვენ გარეგნობაზე, კეთდება არასასურველი კომენტარები პირად ცხოვრებაზე, ხდება თქვენთან თავისუფალი დროს გატარების შემოთავაზება; ხდება სექსუალური ხასიათის ისტორიების მოყოლა, პირადი ხასიათის წერილების, მესიჯების, მეილების გამოგზავნა, ინტიმურ ადგილებზე შეხება; შემოთავაზება ან/და იძულება მასთან გქონდეთ სექსი);</li>
<li>თუ თქვენ სისტემატიურად გიხდებათ თანამდებობრივად შეუსაბამო ვალდებულებების შესრულება, მხოლოდ იმიტომ, რომ ხართ ქალი/კაცი;</li>
<li>თუ თქვენი აზრი სისტემატიურად არის იგნორირებული, მხოლოდ იმიტომ, რომ ხართ ქალი/კაცი.</li>
</ul>')
f.faq_translations.create(:locale => 'en', :question => "რაში გამოიხატება დისკრიმინაცია სამუშაო პროცესში ?", :answer => '<p><span style="text-decoration: underline;">სამუშაო პროცესში</span> დისკრიმინაცია ძირითადად შეიძლება გამოხატებოდეს:</p>
<ul>
<li>თუ თქვენი ხელფასი უფრო მცირეა, ვიდრე იგივე პოზიციაზე და იგივე კვალიფიკაციის მქონე საწინააღმდეგო სქესის ადამიანის;</li>
<li>თუ დამსაქმებელი თქვენ თანამშრომელთან შედარებით არ გაძლევთ ან ნაკლებათ გაძლევთ;</li>
<ul>
<li>შვებულებას;</li>
<li>პრემიას;</li>
</ul>
<li>თუ არ გაძლევათ შესაძლებლობას მონაწილობა მიიღოთ ან ნაკლებად მიიღოთ კვალიფიკაციის ამაღლების ტრენინგებსა და სემინარებში;</li>
<li>თუ არ გაძლევთ წინსვლის და დაწინაურების შესაძლებლობას;</li>
<li>თუ თქვენი დამსაქმებელი გთხოვთ, რომ სხვა თანამშრომელთან შედარებით მეტად იმუშავოთ ზეგანაკვეთურად (დასვენების დღეები, შაბათი - კვირა, გვიანი საღამო);</li>
<li>თუ დამსაქმებელმა არ მოგცათ შვებულება ორსულობის, მშობიარობისა და ბავშვის მოვლის გამო ან/და დრო საჭირო სამედიცინო გამოკვლევებისთვის ან/და ბავშვის კვებისათვის ან /და დამატებითი შვებულება ბავშვის მოვლის გამო;</li>
<li>თუ თქვენ სამსახურში გახდით სექსუალური შევიწროების მსხვერპლი (არსებობს უადგილო კომენტარები თქვენ გარეგნობაზე, კეთდება არასასურველი კომენტარები პირად ცხოვრებაზე, ხდება თქვენთან თავისუფალი დროს გატარების შემოთავაზება; ხდება სექსუალური ხასიათის ისტორიების მოყოლა, პირადი ხასიათის წერილების, მესიჯების, მეილების გამოგზავნა, ინტიმურ ადგილებზე შეხება; შემოთავაზება ან/და იძულება მასთან გქონდეთ სექსი);</li>
<li>თუ თქვენ სისტემატიურად გიხდებათ თანამდებობრივად შეუსაბამო ვალდებულებების შესრულება, მხოლოდ იმიტომ, რომ ხართ ქალი/კაცი;</li>
<li>თუ თქვენი აზრი სისტემატიურად არის იგნორირებული, მხოლოდ იმიტომ, რომ ხართ ქალი/კაცი.</li>
</ul>')
f = Faq.create(:id => 14, :sort => 6, :faq_category_id => 2)
f.faq_translations.create(:locale => 'ka', :question => "რაში გამოხატება დისკრიმინაცია სამსახურიდან განთავისუფლების ან/და ხელშეკრულების გაგრძელებაზე უარის თქმის დროს ?", :answer => '<ul>
<li>თუ თქვენ გაგათავისუფლათ ან/და არ გაგიგრძელათ კონტრაქტი დამსაქმებელმა:</li>
<ul>
<li>ორსულობის დროს;</li>
<li>დეკრეტული შვებულების დროს;</li>
<li>დეკრეტული შვებულების დასრულების შემდეგ;</li>
<li>თუ თქვენ იძულებული იყავით გაგეცდინათ სამსახური ბავშვის მოვლის გამო</li>
</ul>
<li>თუ დამსაქმებელი უპირატესობას ანიჭებს საწინაარმდეგო სქესის მქონე პირს;</li>
<li>თუ თქვენ უარი უთხარით სექსუალური ხასიათის შემოთავაზებაზე ან/და თქვენს მიერ დაკავებული თანამდებობისთვის შეუსაბამო ვალდებულებების შესრულებაზე;</li>
<li>თუ დამსაქმებელმა გაგათავისუფლათ სამსახურიდან ორსულობის გამო;</li>
<li>თუ თქვენმა დამსაქმებელმა გაიგო, რომ გყავთ მცირეწლოვანი შვილები.</li>
</ul>
<p>დისკრიმინაციის დროს ასევე შესაძლებელია ადგილი ჰქონდეს სხვა შემთხვევებსაც, როცა თქვენს მიმართ სამუშაო ადგილზე განხორციელდა განსხვავებული (არათანაბარი) მოპყრობა.</p>')
f.faq_translations.create(:locale => 'en', :question => "რაში გამოხატება დისკრიმინაცია სამსახურიდან განთავისუფლების ან/და ხელშეკრულების გაგრძელებაზე უარის თქმის დროს ?", :answer => '<ul>
<li>თუ თქვენ გაგათავისუფლათ ან/და არ გაგიგრძელათ კონტრაქტი დამსაქმებელმა:</li>
<ul>
<li>ორსულობის დროს;</li>
<li>დეკრეტული შვებულების დროს;</li>
<li>დეკრეტული შვებულების დასრულების შემდეგ;</li>
<li>თუ თქვენ იძულებული იყავით გაგეცდინათ სამსახური ბავშვის მოვლის გამო</li>
</ul>
<li>თუ დამსაქმებელი უპირატესობას ანიჭებს საწინაარმდეგო სქესის მქონე პირს;</li>
<li>თუ თქვენ უარი უთხარით სექსუალური ხასიათის შემოთავაზებაზე ან/და თქვენს მიერ დაკავებული თანამდებობისთვის შეუსაბამო ვალდებულებების შესრულებაზე;</li>
<li>თუ დამსაქმებელმა გაგათავისუფლათ სამსახურიდან ორსულობის გამო;</li>
<li>თუ თქვენმა დამსაქმებელმა გაიგო, რომ გყავთ მცირეწლოვანი შვილები.</li>
</ul>
<p>დისკრიმინაციის დროს ასევე შესაძლებელია ადგილი ჰქონდეს სხვა შემთხვევებსაც, როცა თქვენს მიმართ სამუშაო ადგილზე განხორციელდა განსხვავებული (არათანაბარი) მოპყრობა.</p>')


f = Faq.create(:id => 15, :sort => 1, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "როდის გეკუთვნის შვებულება?", :answer => '<p>საქართველოს შრომის კოდექსის მიხედვით, დასაქმებულს უფლება აქვს ისარგებლოს ანაზღაურებადი შვებულებით წელიწადში სულ მცირე 24 სამუშაო დღით. ხოლო არაანაზღაურებადი შვებულებით-წელიწადში სულ მცირე 15 კალენდარული დღით. (მუხლი 21)</p>
<p>დასაქმებულს შევებულების მოთხოვნის უფლება წარმოეშობა მუშაობის თერთმეტი თვის შემდეგ, თუმცა მხარეთა შეთანხმებით დასაქმებულს შესაძლებელია მიეცეს შვებულება აღნიშნული ვადის გასვლამდეც. მხარეთა შეთანხმებით შესაძლებელია შვებულების ნაწილ-ნაწილ გამოყენება.</p>')
f.faq_translations.create(:locale => 'en', :question => "როდის გეკუთვნის შვებულება?", :answer => '<p>საქართველოს შრომის კოდექსის მიხედვით, დასაქმებულს უფლება აქვს ისარგებლოს ანაზღაურებადი შვებულებით წელიწადში სულ მცირე 24 სამუშაო დღით. ხოლო არაანაზღაურებადი შვებულებით-წელიწადში სულ მცირე 15 კალენდარული დღით. (მუხლი 21)</p>
<p>დასაქმებულს შევებულების მოთხოვნის უფლება წარმოეშობა მუშაობის თერთმეტი თვის შემდეგ, თუმცა მხარეთა შეთანხმებით დასაქმებულს შესაძლებელია მიეცეს შვებულება აღნიშნული ვადის გასვლამდეც. მხარეთა შეთანხმებით შესაძლებელია შვებულების ნაწილ-ნაწილ გამოყენება.</p>')
f = Faq.create(:id => 16, :sort => 2, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "რა არის დეკრეტული შვებულება?", :answer => 'დეკრეტული შვებულება არის შვებულება ორსულობის, ბავშვის შეძენის ან ბავშვის მოვლის გამო. საქართველოს შრომის კოდექსის მიხედვით, დასაქმებულს თავისი მოთხოვნის საფუძველზე ეძლევა ორსულობის, მშობიარობისა და ბავშვის მოვლის გამო შვებულება 730 კალენდარული დღის ოდენობით. აღნიშნული შვებულებიდან ანაზღაურებადია 183 კალენდარული დღე, ხოლო მშობიარობის გართულების ან ტყუპის შობის შემთხვევაში-200 კალენდარული დღე.')
f.faq_translations.create(:locale => 'en', :question => "რა არის დეკრეტული შვებულება?", :answer => 'დეკრეტული შვებულება არის შვებულება ორსულობის, ბავშვის შეძენის ან ბავშვის მოვლის გამო. საქართველოს შრომის კოდექსის მიხედვით, დასაქმებულს თავისი მოთხოვნის საფუძველზე ეძლევა ორსულობის, მშობიარობისა და ბავშვის მოვლის გამო შვებულება 730 კალენდარული დღის ოდენობით. აღნიშნული შვებულებიდან ანაზღაურებადია 183 კალენდარული დღე, ხოლო მშობიარობის გართულების ან ტყუპის შობის შემთხვევაში-200 კალენდარული დღე.')
f = Faq.create(:id => 17, :sort => 3, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "შეიძლება თუ არა სამსახურიდან გაგათავისუფლონ ორსულობის გამო?", :answer => '<p>დასაქმებულის ორსულობა არ წარმოადგენს სამსახურიდან გათავისუფლების მიზეზს, საქართველოს შრომის კოდექსის 37-ე მუხლის მე-3 ნაწილის გ) ქვეპუნქტის მიხედვით, დაუშვებელია შრომითი ხელშეკრულების შეწყვეტა დასაქმებული ქალის მიერ თავისი ორსულობის შესახებ დამსაქმებელისათვის შეტყობინებიდან იმ პერიოდში, როდესაც დასაქმებული არის ორსული, ან არის დეკრეტულ შვებულებაში მშობიარობისა და ბავშვის მოვლის გამო ან შვებულებაში ახალშობილის შვილად აყვანის გამო.</p>
<p>&bdquo;საჯარო სამსახურის შესახებ&ldquo; საქართველოს კანონის 111-ე მუხლის მეორე ნაწილის მიხედვით, მოხელე (ქალი) არ შეიძლება გათავისუფლდეს სამსახურიდან ორსულობის ან ბავშვის 3 წლის ასაკამდე აღზრდის პერიოდში შტატების შემცირების, ხანგრძლივი შრომისუუნარობის ან ჯანმრთელობის მდგომარეობის, აგრეთვე ატესტაციის შედეგების გამო.</p>
<p>&laquo;ევროპის სოციალური ქარტიის&raquo; მე-8 მუხლის მე-2 პუნქტის მიხედვით, ორსულობისა და ბავშვის გაჩენის შემდეგ დასაქმებულ ქალთა უფლების ეფექტურად განხორციელების მიზნით, მხარეები ვალდებულებას იღებენ უკანონოდ მიიჩნიონ დამსაქმებლის მიერ ქალისათვის სამსახურიდან დათხოვნის შესახებ გადაწყვეტილების შეტყობინება, ქალის მიერ ფეხმძიმობის შესახებ დამსაქმებლისათვის ინფორმაციის მიწოდებიდან დეკრეტული შვებულების დასრულებამდე პერიოდის განმავლობაში ან ქალისათვის სამსახურიდან დათხოვნის შესახებ შეტყობინების გადაცემა ამ პერიოდის ამოწურვისას.</p>')
f.faq_translations.create(:locale => 'en', :question => "შეიძლება თუ არა სამსახურიდან გაგათავისუფლონ ორსულობის გამო?", :answer => '<p>დასაქმებულის ორსულობა არ წარმოადგენს სამსახურიდან გათავისუფლების მიზეზს, საქართველოს შრომის კოდექსის 37-ე მუხლის მე-3 ნაწილის გ) ქვეპუნქტის მიხედვით, დაუშვებელია შრომითი ხელშეკრულების შეწყვეტა დასაქმებული ქალის მიერ თავისი ორსულობის შესახებ დამსაქმებელისათვის შეტყობინებიდან იმ პერიოდში, როდესაც დასაქმებული არის ორსული, ან არის დეკრეტულ შვებულებაში მშობიარობისა და ბავშვის მოვლის გამო ან შვებულებაში ახალშობილის შვილად აყვანის გამო.</p>
<p>&bdquo;საჯარო სამსახურის შესახებ&ldquo; საქართველოს კანონის 111-ე მუხლის მეორე ნაწილის მიხედვით, მოხელე (ქალი) არ შეიძლება გათავისუფლდეს სამსახურიდან ორსულობის ან ბავშვის 3 წლის ასაკამდე აღზრდის პერიოდში შტატების შემცირების, ხანგრძლივი შრომისუუნარობის ან ჯანმრთელობის მდგომარეობის, აგრეთვე ატესტაციის შედეგების გამო.</p>
<p>&laquo;ევროპის სოციალური ქარტიის&raquo; მე-8 მუხლის მე-2 პუნქტის მიხედვით, ორსულობისა და ბავშვის გაჩენის შემდეგ დასაქმებულ ქალთა უფლების ეფექტურად განხორციელების მიზნით, მხარეები ვალდებულებას იღებენ უკანონოდ მიიჩნიონ დამსაქმებლის მიერ ქალისათვის სამსახურიდან დათხოვნის შესახებ გადაწყვეტილების შეტყობინება, ქალის მიერ ფეხმძიმობის შესახებ დამსაქმებლისათვის ინფორმაციის მიწოდებიდან დეკრეტული შვებულების დასრულებამდე პერიოდის განმავლობაში ან ქალისათვის სამსახურიდან დათხოვნის შესახებ შეტყობინების გადაცემა ამ პერიოდის ამოწურვისას.</p>')
f = Faq.create(:id => 18, :sort => 4, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "ეკუთვნის თუ არა კაცს შვებულება ბავშვის შეძენასა და მოვლასთან დაკავშირებით?", :answer => 'დეკრეტული შვებულებით სარგებლობის უფლება ოჯახის სხვა წევრებსაც აქვთ, საქართველოს შრომის კოდექსის მიხედვით, მამას აქვს უფლება ისარგებლოს დეკრეტული შვებულებით ბავშვის შეძენასთან და მოვლასთან დაკავშირებით.')
f.faq_translations.create(:locale => 'en', :question => "ეკუთვნის თუ არა კაცს შვებულება ბავშვის შეძენასა და მოვლასთან დაკავშირებით?", :answer => 'დეკრეტული შვებულებით სარგებლობის უფლება ოჯახის სხვა წევრებსაც აქვთ, საქართველოს შრომის კოდექსის მიხედვით, მამას აქვს უფლება ისარგებლოს დეკრეტული შვებულებით ბავშვის შეძენასთან და მოვლასთან დაკავშირებით.')
f = Faq.create(:id => 19, :sort => 5, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "რა არის პროფკავშირები?", :answer => 'პროფკავშირები წარმოადგენს მოსამსახურეთა ასოციაციას (ასევე არსებობს დამსაქმებელთა ასოციაცია) და მისი მთავარი მიზანია წარმოადგინოს მოსამსახურეთა უფლებები დამსაქმებელთა წინაშე. პროფკავშირების შექმნის და მასში გაწევრიანების უფლება არის ადამიანის ძირითადი უფლება. უკეთესი სამუშაო პირობებისათვის ბრძოლაში მონაწილეობის გარდა, პროფკავშირებს აქვთ გადამწყვეტი როლი სოციალური მოძრაობების შექმნაში და ცვლილებების განხორციელებაში.')
f.faq_translations.create(:locale => 'en', :question => "რა არის პროფკავშირები?", :answer => 'პროფკავშირები წარმოადგენს მოსამსახურეთა ასოციაციას (ასევე არსებობს დამსაქმებელთა ასოციაცია) და მისი მთავარი მიზანია წარმოადგინოს მოსამსახურეთა უფლებები დამსაქმებელთა წინაშე. პროფკავშირების შექმნის და მასში გაწევრიანების უფლება არის ადამიანის ძირითადი უფლება. უკეთესი სამუშაო პირობებისათვის ბრძოლაში მონაწილეობის გარდა, პროფკავშირებს აქვთ გადამწყვეტი როლი სოციალური მოძრაობების შექმნაში და ცვლილებების განხორციელებაში.')
f = Faq.create(:id => 20, :sort => 6, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "რა არის ზეგანაკვეთური სამუშაო?", :answer => '<p>საქართველოს შრომის კოდექსის მიხედვით, ზეგანაკვეთურ სამუშაოდ მიიჩნევა მხარეთა შეთანხმებით დასაქმებულის მიერ სამუშაოს შესრულება დროის იმ მონაკვეთში, რომლის ხანგრძლივობა სრულწლოვანისთვის აღემატება კვირაში 40 საათს, 16 წლიდან 18 წლამდე ასაკის არასრულწოლოვანისთვის-კვირაში 36 საათს, ხოლო 14 წლიდან 16 წლანდე ასაკის არასრულწლოვანისთვის კვირაში 24 საათს. (მუხლი 17)</p>
<p>ზეგანაკვეთური სამუშაო ანაზღაურდება ხელფასის საათობრივი განაკვეთის გაზრდილი ოდენობით, რომლის ოდენობა განისაზღვრება მხარეთა შეთანხმებით.</p>')
f.faq_translations.create(:locale => 'en', :question => "რა არის ზეგანაკვეთური სამუშაო?", :answer => '<p>საქართველოს შრომის კოდექსის მიხედვით, ზეგანაკვეთურ სამუშაოდ მიიჩნევა მხარეთა შეთანხმებით დასაქმებულის მიერ სამუშაოს შესრულება დროის იმ მონაკვეთში, რომლის ხანგრძლივობა სრულწლოვანისთვის აღემატება კვირაში 40 საათს, 16 წლიდან 18 წლამდე ასაკის არასრულწოლოვანისთვის-კვირაში 36 საათს, ხოლო 14 წლიდან 16 წლანდე ასაკის არასრულწლოვანისთვის კვირაში 24 საათს. (მუხლი 17)</p>
<p>ზეგანაკვეთური სამუშაო ანაზღაურდება ხელფასის საათობრივი განაკვეთის გაზრდილი ოდენობით, რომლის ოდენობა განისაზღვრება მხარეთა შეთანხმებით.</p>')
f = Faq.create(:id => 21, :sort => 7, :faq_category_id => 3)
f.faq_translations.create(:locale => 'ka', :question => "სად არის დარეგულირებული გენდერული დისკრიმინაცია სამუშაო ადგილას?", :answer => '<p>ეროვნულ კანონმდებლობაში სამუშაო ადგილას გენდერულ თანასწორობას ეხება</p>
<ol>
<li>საქართველოს შრომის კოდექსი</li>
<li>საქართველოს კანონი საჯარო სამსახურის შესახებ</li>
<li>საქართველოს კანონი გენდერული თანასწორობის შესახებ</li>
<li>საქართველოს კანონი დისკრიმინაციის ყველა ფორმის აღმოფხვრის შესახებ</li>
</ol>
<p>საერთაშორისო დონეზე:</p>
<ol>
<li>ქალთა მიმართ ყველა ფორმის დისკირმინაციის აღმოფხვრის შესახებ კონვენცია</li>
<li>პაქტი სამოქალაქო და პოლიტიკური უფლებების შესახებ</li>
<li>ადამიანის უფლებათა ევროპული კონვენცია</li>
<li>შრომის საერთაშორისო ორგანიზაციის კონვენციები 111, 100</li>
<li>ევროკავშირის დირექტივები</li>
</ol>')
f.faq_translations.create(:locale => 'en', :question => "სად არის დარეგულირებული გენდერული დისკრიმინაცია სამუშაო ადგილას?", :answer => '<p>ეროვნულ კანონმდებლობაში სამუშაო ადგილას გენდერულ თანასწორობას ეხება</p>
<ol>
<li>საქართველოს შრომის კოდექსი</li>
<li>საქართველოს კანონი საჯარო სამსახურის შესახებ</li>
<li>საქართველოს კანონი გენდერული თანასწორობის შესახებ</li>
<li>საქართველოს კანონი დისკრიმინაციის ყველა ფორმის აღმოფხვრის შესახებ</li>
</ol>
<p>საერთაშორისო დონეზე:</p>
<ol>
<li>ქალთა მიმართ ყველა ფორმის დისკირმინაციის აღმოფხვრის შესახებ კონვენცია</li>
<li>პაქტი სამოქალაქო და პოლიტიკური უფლებების შესახებ</li>
<li>ადამიანის უფლებათა ევროპული კონვენცია</li>
<li>შრომის საერთაშორისო ორგანიზაციის კონვენციები 111, 100</li>
<li>ევროკავშირის დირექტივები</li>
</ol>')

=end
