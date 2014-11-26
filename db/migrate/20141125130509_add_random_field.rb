class AddRandomField < ActiveRecord::Migration
  def change
    add_column :news_items, :random, :string
  end
end
