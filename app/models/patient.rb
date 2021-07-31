class Patient < User
  has_many :lab_reports
  has_many :prescriptions
  has_many :doctors_patients
  has_many :doctors, through: :doctors_patients

  after_create :generate_qr_code

  has_one :qr_code, -> { where(document_type: 'qr_code') }, class_name: 'Asset',
    as: :resource, dependent: :destroy

  def profile_data
    hash = attributes.slice('id', 'mobile', 'name', 'type', 'uid')
    hash[:qr_code] = qr_code.asset_url
    hash
  end

  private

  def generate_qr_code
    qrcode = RQRCode::QRCode.new(uid)
    png = qrcode.as_png(
      bit_depth: 1,
      border_modules: 4,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: "black",
      file: nil,
      fill: "white",
      module_px_size: 6,
      resize_exactly_to: false,
      resize_gte_to: false,
      size: 120
    )
    path_to_file = "/tmp/#{uid}.png"
    IO.binwrite(path_to_file, png.to_s)
    Asset.create!(resource: self, document_type: 'qr_code', asset: File.open(path_to_file))
    File.delete(path_to_file) if File.exist?(path_to_file)
  end
end
