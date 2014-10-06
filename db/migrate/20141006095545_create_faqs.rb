class CreateFaqs < ActiveRecord::Migration
  def up
    create_table :faqs do |t|
      t.integer :faq_category_id
      t.integer :sort, :limit => 1

      t.timestamps
    end
    add_index :faqs, :faq_category_id
    add_index :faqs, :sort

    Faq.create_translation_table! :question => :string, :answer => :text
    add_index :faq_translations, :question
  end

  def down
    drop_table :faqs
    Faq.drop_translation_table!
  end

end
