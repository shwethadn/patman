class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :document_type
      t.references :resource, polymorphic: true, index: true
      t.text :note
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
