class Prescription < ApplicationRecord
  belongs_to :doctor
  belongs_to :patient
  has_many :assets, -> { where(document_type: 'prescription') }, as: :resource
  accepts_nested_attributes_for :assets
end
