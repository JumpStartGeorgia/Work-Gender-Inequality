class AddQuestionSort < ActiveRecord::Migration
  def change
    add_column :survey_questions, :sort, :integer, :length => 2, :default => 99
    add_index :survey_questions, :sort
  end
end
