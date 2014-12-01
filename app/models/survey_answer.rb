class SurveyAnswer < ActiveRecord::Base
  translates :answer

  has_many :survey_answer_translations, :dependent => :destroy
  accepts_nested_attributes_for :survey_answer_translations
  attr_accessible :code, :value, :can_exclude, :survey_answer_translations_attributes, :exclude

  belongs_to :question, 
    primary_key: :code,
    foreign_key: :code, 
    class_name: "SurveyQuestion"


  # need way to be able to use locale 'text' variable or answer text in translations table
  # in one variable
  def text
    self[:text].present? ? self[:text] : self.answer
  end

  # get all of the answers
  def self.all
    select('survey_answers.code, survey_answer_translations.answer as text, survey_answers.value')
    .joins(:survey_answer_translations)
    .where(:survey_answer_translations => {:locale => I18n.locale})
#    .with_translations(I18n.locale)
  end

end
