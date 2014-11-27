class Story < ActiveRecord::Base
  attr_accessible :content, :discrimination_type, :contact_a42, :is_public, :moderator_status,
                  :age, :email, :gender, :name, :region

  validates :content, :discrimination_type, :presence => true
  validates :gender, inclusion: { in: %w(M F)}

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


  def gender_formatted
    if self.gender.present?
      I18n.t("gender.#{self.gender}")
    end
  end
end
