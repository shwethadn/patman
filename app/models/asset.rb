class Asset < ApplicationRecord
  belongs_to :resource, polymorphic: true, optional: :true

  mount_uploader :asset, AssetUploader

  delegate :url, to: :asset, prefix: true, allow_nil: true
end
