class AddAttachmentThumbnailToNewsItems < ActiveRecord::Migration
  def self.up
    change_table :news_items do |t|
      t.attachment :thumbnail
    end
  end

  def self.down
    drop_attached_file :news_items, :thumbnail
  end
end
