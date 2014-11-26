class CreateNews < ActiveRecord::Migration
  def up
    create_table :news_items do |t|
      t.date :published_at
      t.boolean :is_published, :default => false

      t.timestamps
    end
    add_index :news_items, :published_at
    add_index :news_items, :is_published

    NewsItem.create_translation_table! :title => :string, :content => :text
    add_index :news_item_translations, :title
  end

  def down
    drop_table :news_items
    NewsItem.drop_translation_table!
  end
end
