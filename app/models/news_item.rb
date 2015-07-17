class NewsItem < ActiveRecord::Base
  translates :title, :content

  has_attached_file :thumbnail, 
    :url => "/system/news_item/:id/:style/:filename", :use_timestamp => false,
    :styles => {
      :thumb => {:geometry => "348x198>"},
      :small => {:geometry => "179x99>"}
    },
    :convert_options => { 
      :thumb => '-quality 85',
      :small => '-quality 85'
    },
    :default_url => "/assets/default_news_thumbnail.png"

  has_many :news_item_translations, :dependent => :destroy
  accepts_nested_attributes_for :news_item_translations
  attr_accessible :id, :news_item_translations_attributes, :published_at, :is_published, :random, :thumbnail

  validates_presence_of :published_at, :if => :is_published?

  scope :published, where("is_published = '1'")

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

  def self.has_published_items?
    published.count > 0
  end

end
