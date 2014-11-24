class LawTranslation < ActiveRecord::Base
  belongs_to :law

  attr_accessible :law_id, :title, :content, :url, :locale

  validates :title, :content, :presence => true
  validates :url, :format => {:with => URI::regexp(['http','https'])}, allow_blank: true

  def required_data_provided?
    provided = false
    
    provided = self.title.present? && self.content.present?
    
    return provided
  end
  
  def add_required_data(obj)
    self.title = obj.title if self.title.blank?
    self.content = obj.content if self.content.blank?
    self.url = obj.url if self.url.blank?
  end

end
