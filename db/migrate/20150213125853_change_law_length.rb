class ChangeLawLength < ActiveRecord::Migration
  def up
    change_column :law_translations, :content, :text, :limit => 200000
  end

  def down
    change_column :law_translations, :content, :text, :limit => 65535
  end
end
