class CreateFaqCategories < ActiveRecord::Migration
  def up
    create_table :faq_categories do |t|
      t.string :name
      t.integer :sort, :limit => 1

      t.timestamps
    end
    add_index :faq_categories, :sort

    FaqCategory.create_translation_table! :name => :string
    add_index :faq_category_translations, :name
  end

  def down
    drop_table :faq_categories
    FaqCategory.drop_translation_table!
  end
end
