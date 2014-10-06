class FaqCategory < ActiveRecord::Base
  translates :name

  has_many :faq_category_translations, :dependent => :destroy
  has_many :faqs, :dependent => :destroy
  accepts_nested_attributes_for :faq_category_translations
  attr_accessible :id, :sort, :faq_category_translations_attributes


  def self.sorted
    with_translations(I18n.locale).order('faq_categories.sort, faq_category_translations.name')
  end

end
