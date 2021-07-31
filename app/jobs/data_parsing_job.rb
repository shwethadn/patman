class DataParsingJob < ApplicationJob
  @queue = :data_parsing_queue

  def perform(lab_report_id)
    sleep 3

    lab_report = LabReport.find(lab_report_id)
    lab_report.assets.each do |asset|
      read_text_from_image(lab_report_id, asset.asset_url)
    end
  end

  private

  def read_text_from_image(lab_report_id, image_path)
    # $ brew install tesseract
    # https://github.com/dannnylo/rtesseract
    image_text = RTesseract.new(image_path).to_s
    text_array = image_text.split("\n").reject(&:blank?)

    fetch_patient_name(lab_report_id, text_array)
  end

  def fetch_patient_name(lab_report_id, text_array)
    patient_name = text_array.grep(/(Client|Patient) Name/).first.split(":")
    key = patient_name[0].strip
    value = patient_name[1].chomp(" Barcode ").strip

    lab_report = LabReport.find(lab_report_id)
    Record.create(name: key, value: value, recordable: lab_report)
  end
end
