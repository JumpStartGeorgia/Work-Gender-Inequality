class Faq < ActiveRecord::Base
  translates :question, :answer

  has_many :faq_translations, :dependent => :destroy
  belongs_to :faq_category
  accepts_nested_attributes_for :faq_translations
  attr_accessible :id, :faq_category_id, :sort, :faq_translations_attributes


  def self.sorted
    with_translations(I18n.locale).order('faqs.faq_category_id, faqs.sort, faq_translations.question')
  end

end
