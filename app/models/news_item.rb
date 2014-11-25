class NewsItem < ActiveRecord::Base
  translates :title, :content

  has_many :news_item_translations, :dependent => :destroy
  accepts_nested_attributes_for :news_item_translations
  attr_accessible :id, :news_item_translations_attributes, :published_at, :is_published

  validates_presence_of :published_at, :if => :is_published?

  def self.sorted
    with_translations(I18n.locale).order('news_items.published_at, news_item_translations.title')
  end

end
