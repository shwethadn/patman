class Patient < User
  has_many :lab_reports
  has_many :prescriptions

  after_create :generate_qr_code

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
