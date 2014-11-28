class AddOrigContent < ActiveRecord::Migration
  def change
    add_column :stories, :original_content, :text
  end
end
