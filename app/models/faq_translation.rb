class FaqTranslation < ActiveRecord::Base
  belongs_to :faq

  attr_accessible :faq_id, :question, :answer, :locale

  validates :question, :answer, :presence => true

  def required_data_provided?
    provided = false
    
    provided = self.question.present? && self.answer.present?
    
    return provided
  end
  
  def add_required_data(obj)
    self.question = obj.question if self.question.blank?
    self.answer = obj.answer if self.answer.blank?
  end

end
