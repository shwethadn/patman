class CreateRecord < ActiveRecord::Migration[6.0]
  def change
    create_table :record do |t|
      t.string :name
      t.string :value
      t.integer :recordable_id
      t.string :recordable_type

      t.timestamps
    end
  end
end
