class SurveyQuestion < ActiveRecord::Base
  attr_accessible :code, :text, :has_code_answers, :is_mappable

  has_many :answers, 
    primary_key: :code,
    foreign_key: :code,
    class_name: "SurveyAnswer"

  # get all of the questions that can be run with crosstabs
  # (must have values in the answers table - defined list of possible answers)
  def self.can_crosstab
    select('code, text').where(:has_code_answers => true)  
  end


  # get a question and all of its answers
  def self.with_answers(code)
    includes(:answers)
    .find_by_code(code)
  end
end
