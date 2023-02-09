class Student < ApplicationRecord
  default_scope { order(rollnumber: :asc) }
  validates :name, :email, :rollnumber, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :rollnumber, numericality: { only_integer: true }
  validates_inclusion_of :rollnumber, :in => 18001..18099
end
