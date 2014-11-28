class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.text :content
      t.integer :moderator_status, :default => 1
      t.boolean :is_public, :default => false
      t.boolean :contact_a42, :default => false
      t.integer :discrimination_type
      t.string :name
      t.string :email
      t.string :gender
      t.integer :age
      t.string :region

      t.timestamps
    end
    add_index :stories, :moderator_status
    add_index :stories, :is_public
    add_index :stories, :contact_a42
    add_index :stories, :discrimination_type
  end
end
