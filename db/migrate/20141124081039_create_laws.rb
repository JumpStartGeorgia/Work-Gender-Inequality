class CreateLaws < ActiveRecord::Migration
  def up
    create_table :laws do |t|
      t.date :enacted_at

      t.timestamps
    end
    add_index :laws, :enacted_at

    Law.create_translation_table! :title => :string, :content => :text, :url => :string
    add_index :law_translations, :title
  end

  def down
    drop_table :laws
    Law.drop_translation_table!
  end
end
