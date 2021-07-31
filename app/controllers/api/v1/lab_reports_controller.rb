class Api::V1::LabReportsController < Api::V1::BaseController
  def index
    scoped_lab_reports = policy_scope(OpenStruct.new(klas: LabReport, patient_id: params[:patient_id]),
                                      policy_scope_class: Api::V1::LabReportPolicy::Scope)
    data = serialized_data(scoped_lab_reports, Api::V1::LabReportSerializer)
    render json: { success: true, message: 'Lab Reports', response: data }
  end

  def create
    lab_report = LabReport.new(lab_report_params)
    if lab_report.save
      render json: { success: true, message: 'Report was uploaded successfully' }
    else
      render json: { success: false, message: "Error: #{lab_report.errors.full_messages.first}" }
    end
  end

  # Doctor approves the uploaded reports
  def approve
    lab_report = LabReport.find(params[:id])
    authorize([:api, :v1, lab_report])
    if lab_report.present? && !lab_report.approved?
      lab_report.update(approved: true)
      render json: { success: true, message: 'Report was approved' }
    else
      render json: { success: false, message: 'Invalid operation' }, status: :bad_request
    end
  end

  private

  def lab_report_params
    params.permit(:laboratory, :test, :doctor_id, :tested_on, :patient_id,
                  assets_attributes: [:id, :asset, :_delete])
  end
end
