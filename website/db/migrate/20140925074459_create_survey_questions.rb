class CreateSurveyQuestions < ActiveRecord::Migration
  def change
    create_table :survey_questions do |t|
      t.string :code, :limit => 50
      t.string :text, :limit => 1024
      t.boolean :has_code_answers, :default => false

      t.timestamps
    end

    add_index :survey_questions, [:code, :has_code_answers]
    add_index :survey_questions, :text
  end
end
