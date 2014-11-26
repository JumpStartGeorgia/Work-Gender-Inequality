class PublicationTranslation < ActiveRecord::Base
  belongs_to :publication

  has_attached_file :pub_file, :url => "/system/publications/:id/:filename", :use_timestamp => false

  attr_accessible :publication_id, :title, :description, :url, :locale, :pub_file

  validates :title, :description, :presence => true
  validates :url, :format => {:with => URI::regexp(['http','https'])}, allow_blank: true
  validates_attachment :pub_file, :presence => true,
      :content_type => { :content_type => ["application/pdf"] }

  def required_data_provided?
    provided = false
    
    provided = self.title.present? && self.description.present? && self.pub_file_file_name.present?
    
    return provided
  end
  
  def add_required_data(obj)
    self.title = obj.title if self.title.blank?
    self.description = obj.description if self.description.blank?
    self.url = obj.url if self.url.blank?

    if self.pub_file_file_name.blank?
      # check if file has been saved yet
      # if file has not be saved to proper place yet, have to get queued file path
      file_to_copy = "#{Rails.root}/public#{obj.pub_file.url}"
      file = nil
      if File.exists?(file_to_copy)
        file = File.open(file_to_copy)
      elsif obj.pub_file.queued_for_write[:original].present?
        file = File.open(obj.pub_file.queued_for_write[:original].path)
      end
      self.pub_file = file if file.present?
    end

  end

end
