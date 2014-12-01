class AddHideField < ActiveRecord::Migration
  def change
    add_column :survey_questions, :exclude, :boolean, :default => false
    add_index :survey_questions, [:has_code_answers, :exclude], :name => 'idx_can_crosstab'
  end
end
