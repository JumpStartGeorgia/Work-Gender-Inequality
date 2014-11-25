class Law < ActiveRecord::Base
  translates :title, :content, :url

  has_many :law_translations, :dependent => :destroy
  accepts_nested_attributes_for :law_translations
  attr_accessible :id, :law_translations_attributes, :enacted_at

  validates :enacted_at, :presence => true

  def self.sorted
    with_translations(I18n.locale).order('law_translations.title')
  end

  # basic info is id, title and date only
  def self.basic_info
    select('laws.id, laws.enacted_at, law_translations.title')
    .includes(:law_translations)
    .where('law_translations.locale = ?', I18n.locale)
    .order('law_translations.title')
  end

end
