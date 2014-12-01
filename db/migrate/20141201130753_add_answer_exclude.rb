class AddAnswerExclude < ActiveRecord::Migration
  def change
    add_column :survey_answers, :exclude, :boolean, :default => false
    add_index :survey_answers, :exclude 
  end
end
