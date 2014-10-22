class AddSurveyTranslations < ActiveRecord::Migration
  def up
    SurveyQuestion.create_translation_table! :question => {:type=> :string, :limit => 1024}
    add_index :survey_question_translations, :question
    remove_index :survey_questions, :text
    remove_column :survey_questions, :text

    SurveyAnswer.create_translation_table! :answer => {:type=> :string, :limit => 1024}
    add_index :survey_answer_translations, :answer
    remove_column :survey_answers, :text

  end

  def down
    SurveyQuestion.drop_translation_table!
    SurveyAnswer.drop_translation_table!

    add_column :survey_questions, :text, :string, :limit => 1024
    add_index :survey_questions, :text
    add_column :survey_answers, :text, :string, :limit => 1024
  end
end
