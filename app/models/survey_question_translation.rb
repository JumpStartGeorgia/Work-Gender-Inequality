class SurveyQuestionTranslation < ActiveRecord::Base
  belongs_to :survey_question

  attr_accessible :survey_question_id, :question, :locale

  validates :question, :presence => true

  def required_data_provided?
    provided = false
    
    provided = self.question.present?
    
    return provided
  end
  
  def add_required_data(obj)
    self.question = obj.question if self.question.blank?
  end

end
