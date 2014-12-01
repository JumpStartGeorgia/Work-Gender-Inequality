class SurveyQuestion < ActiveRecord::Base
  translates :question

  has_many :survey_question_translations, :dependent => :destroy
  accepts_nested_attributes_for :survey_question_translations
  attr_accessible :code, :has_code_answers, :is_mappable, :is_weight,
    :sort, :survey_question_translations_attributes, :exclude

  has_many :answers, 
    primary_key: :code,
    foreign_key: :code,
    class_name: "SurveyAnswer"


  # need way to be able to use locale 'text' variable or question text in translations table
  # in one variable
  def text
    self[:text].present? ? self[:text] : self.question
  end

  def self.sorted
    order('survey_questions.sort, survey_questions.id')
  end

  # get all of the questions that can be run with crosstabs
  # (must have values in the answers table - defined list of possible answers)
  def self.can_crosstab
    select('survey_questions.code, survey_question_translations.question as text, survey_questions.is_mappable')
    .joins(:survey_question_translations)
    .where(:has_code_answers => true, :exclude => false, :survey_question_translations => {:locale => I18n.locale})
  end

  def self.weighted
    where(:is_weight => true).first
  end

  # get a question and all of its answers
  def self.with_answers(code)
    includes(:answers)
    .where('survey_answers.exclude = 0')
    .with_translations(I18n.locale)
    .find_by_code(code)
  end
end
