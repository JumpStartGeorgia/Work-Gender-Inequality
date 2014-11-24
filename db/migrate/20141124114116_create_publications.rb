class CreatePublications < ActiveRecord::Migration
  def up
    create_table :publications do |t|
      t.date :published_at

      t.timestamps
    end
    add_index :publications, :published_at

    Publication.create_translation_table! :title => :string, :description => :text, :url => :string
    add_attachment :publication_translations, :pub_file
    add_index :publication_translations, :title
  end

  def down
    drop_table :publications
    Publication.drop_translation_table!
  end
end
