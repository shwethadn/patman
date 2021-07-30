class AssetUploader < CarrierWave::Uploader::Base
  CLOUDINARY_PUBLIC_ID_REGEXP = %r{[^a-zA-Z0-9\.\-/%_]}.freeze

  include Cloudinary::CarrierWave

  process :save_content_type_and_size_in_model

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def public_id
    file_name = original_filename.presence || 'unnamed'
    default_dir = "#{Rails.env}/#{model.resource_type}/#{model.resource_id}/#{model.document_type}/#{file_name}"
    cloudinary_public_id(default_dir)
  end

  def cloudinary_public_id(value)
    value.gsub(CLOUDINARY_PUBLIC_ID_REGEXP, '')
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Add an allowlist of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_allowlist
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
