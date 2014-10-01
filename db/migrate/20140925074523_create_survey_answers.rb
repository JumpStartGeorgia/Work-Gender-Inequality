class CreateSurveyAnswers < ActiveRecord::Migration
  def change
    create_table :survey_answers do |t|
      t.string :code, :limit => 50
      t.integer :value, :limit => 2
      t.string :text, :limit => 1024

      t.timestamps
    end

    add_index :survey_answers, :code
    add_index :survey_answers, [:code, :value]
  end
end
