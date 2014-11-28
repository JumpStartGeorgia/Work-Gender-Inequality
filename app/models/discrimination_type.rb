class DiscriminationType < ActiveRecord::Base
  translates :name

  has_many :discrimination_type_translations, :dependent => :destroy
  has_many :stories
  accepts_nested_attributes_for :discrimination_type_translations
  attr_accessible :id, :sort, :discrimination_type_translations_attributes


  def self.sorted
    with_translations(I18n.locale).order('discrimination_types.sort, discrimination_type_translations.name')
  end


end
