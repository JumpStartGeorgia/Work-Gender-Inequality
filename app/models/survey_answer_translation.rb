class SurveyAnswerTranslation < ActiveRecord::Base
  belongs_to :survey_answer

  attr_accessible :survey_answer_id, :answer, :locale

  validates :answer, :presence => true

  def required_data_provided?
    provided = false
    
    provided = self.answer.present?
    
    return provided
  end
  
  def add_required_data(obj)
    self.answer = obj.answer if self.answer.blank?
  end

end
