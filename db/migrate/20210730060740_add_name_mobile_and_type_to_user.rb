class AddNameMobileAndTypeToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string, null: false
    add_column :users, :mobile, :string, null: false
    add_column :users, :type, :string, null: false, default: 'Patient'

    add_index :users, :mobile,               unique: true
  end
end