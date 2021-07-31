class Doctor < User
  has_many :lab_reports
  has_many :prescriptions
  has_many :doctors_patients
  has_many :patients, through: :doctors_patients
end
