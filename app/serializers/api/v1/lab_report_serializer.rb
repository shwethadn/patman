class Api::V1::LabReportSerializer < ActiveModel::Serializer
  attributes :id, :laboratory, :test, :doctor_id, :tested_on, :patient_id, :approved, :created_at,
             :updated_at, :assets, :records
end
