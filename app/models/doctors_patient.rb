class DoctorsPatient < ApplicationRecord
  belongs_to :doctor
  belongs_to :patient

  validates_uniqueness_of :doctor_id, scope: [:patient_id]
end
