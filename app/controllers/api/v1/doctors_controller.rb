class Api::V1::DoctorsController < Api::V1::BaseController
  before_action :set_patient, only: :patient_request

  def patient_request
    authorize([:api, :v1, Doctor])
    doctor_patient = DoctorsPatient.find_or_create_by(patient: @patient, doctor_id: current_user)
    render json: { success: true, patient_data: @patient.profile_data, approved: doctor_patient.approved }
  end

  private

  def set_patient
    @patient = Patient.find_by(uid: params[:uid])
  end
end
