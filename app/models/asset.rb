class Asset < ApplicationRecord
  belongs_to :resource, polymorphic: true, optional: :true

  mount_uploader :asset, AssetUploader
end
