class Api::V1::PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :hospital, :doctor_id, :issued_on, :patient_id, :created_at,
             :updated_at, :assets
end
