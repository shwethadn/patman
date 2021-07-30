class LabReport < ApplicationRecord
  belongs_to :patient
  has_many :records, as: :recordable
  has_many :assets, as: :resource
  accepts_nested_attributes_for :assets
end
