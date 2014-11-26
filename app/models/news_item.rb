class NewsItem < ActiveRecord::Base
  translates :title, :content

  has_many :news_item_translations, :dependent => :destroy
  accepts_nested_attributes_for :news_item_translations
  attr_accessible :id, :news_item_translations_attributes, :published_at, :is_published, :random

  validates_presence_of :published_at, :if => :is_published?

  after_destroy :delete_images

  # delete any images on file for this record
  def delete_images
    path = "#{Rails.root}/public/system/images/"
    if self.random.present? && File.exists?(path + self.random)
      FileUtils.rm_r(path + self.random)
    end

    return true
  end

  def self.sorted
    with_translations(I18n.locale).order('news_items.published_at desc, news_item_translations.title')
  end

end
