class Publication < ActiveRecord::Base
  translates :title, :description, :url#, :pub_file

  has_many :publication_translations, :dependent => :destroy
  accepts_nested_attributes_for :publication_translations
  attr_accessible :id, :publication_translations_attributes, :published_at

  validates :published_at, :presence => true

  def self.sorted
    with_translations(I18n.locale).order('publications.published_at desc, publication_translations.title')
  end

  def self.has_items?
    count > 0
  end

  # work-around for getting paperclip file in translation
  def translation_pub_file
    x = self.publication_translations.select{|x| x.locale == I18n.locale.to_s}.first
    if x.present?
      x.pub_file
    end
  end

end
