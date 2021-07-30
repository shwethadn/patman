class Doctor < User
  has_many :lab_reports
  has_many :prescriptions
end
