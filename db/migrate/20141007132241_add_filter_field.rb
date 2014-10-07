class AddFilterField < ActiveRecord::Migration
  def change
    add_column :survey_answers, :can_exclude, :boolean, :default => false
    add_index :survey_answers, :can_exclude 
  end
end
