class AddGeoField < ActiveRecord::Migration
  def change
    add_column :survey_questions, :is_mappable, :boolean, :default => false
    add_index :survey_questions, :is_mappable
  end
end
