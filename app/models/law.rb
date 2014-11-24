class Law < ActiveRecord::Base
  translates :title, :content, :url

  has_many :law_translations, :dependent => :destroy
  accepts_nested_attributes_for :law_translations
  attr_accessible :id, :law_translations_attributes, :enacted_at

  validates :enacted_at, :presence => true

  def self.sorted
    with_translations(I18n.locale).order('law_translations.title, laws.enacted_at')
  end

end
