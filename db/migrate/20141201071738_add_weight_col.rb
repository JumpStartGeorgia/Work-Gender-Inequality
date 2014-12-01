class AddWeightCol < ActiveRecord::Migration
  def change
    add_column :survey_questions, :is_weight, :boolean, :default => false
    add_index :survey_questions, :is_weight
  end
end
