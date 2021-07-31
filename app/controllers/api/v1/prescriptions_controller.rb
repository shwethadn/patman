class Api::V1::PrescriptionsController < Api::V1::BaseController
  def index
    render json: { success: true, message: 'Lab Reports', response: current_user.prescriptions }
  end

  def create
    prescription = Prescription.new(prescription_params)
    if prescription.save
      render json: { success: true, message: 'Prescription was uploaded successfully' }
    else
      render json: { success: false, message: "Error: #{prescription.errors.full_messages.first}" }
    end
  end

  # Doctor approves the uploaded prescriptions
  def approve
    prescription = Prescription.find(params[:id])
    authorize([:api, :v1, prescription])
    if prescription.present? && !prescription.approved?
      prescription.update(approved: true)
      render json: { success: true, message: 'Prescription was approved' }
    else
      render json: { success: false, message: 'Invalid operation' }, status: :bad_request
    end
  end

  private

  def prescription_params
    params.permit(:hospital, :doctor_id, :issued_on, :patient_id,
                  assets_attributes: [:id, :asset, :_delete])
  end
end
