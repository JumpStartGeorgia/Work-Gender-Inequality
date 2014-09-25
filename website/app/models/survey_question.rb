class SurveyQuestion < ActiveRecord::Base
  attr_accessible :code, :text, :has_code_answers
end
