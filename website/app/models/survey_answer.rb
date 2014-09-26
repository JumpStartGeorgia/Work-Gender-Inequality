class SurveyAnswer < ActiveRecord::Base
  attr_accessible :code, :text, :value

  belongs_to :question, 
    primary_key: :code,
    foreign_key: :code, 
    class_name: "SurveyQuestion"

end
