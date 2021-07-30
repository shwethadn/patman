class AddAssetsToAsset < ActiveRecord::Migration[6.0]
  def change
    add_column :assets, :assets, :json
  end
end
