class Story < ActiveRecord::Base

  belongs_to :discrimination_type

  attr_accessible :content, :discrimination_type_id, :contact_a42, :is_public, :moderator_status,
                  :age, :email, :gender, :name, :region

  validates :content, :discrimination_type, :presence => true
  validates :gender, inclusion: { in: %w(M F)}, :allow_nil => true
  validates :name, :email, :presence => true, :if => :contact_a42?
  validates_format_of :email, with: Devise.email_regexp, :allow_blank => true

  STATUS = {'pending' => 1, 'approved' => 2, 'denied' => 3}


  def self.sorted
    order('created_at desc')
  end

  def self.is_approved
    where(:moderator_status => STATUS['approved'])
  end

  def self.public
    where(:is_public => true)
  end


  def moderator_status_name
    STATUS.keys[STATUS.values.index(self.moderator_status)].to_s
  end

  def gender_formatted
    if self.gender.present?
      I18n.t("gender.#{self.gender}")
    end
  end
end
