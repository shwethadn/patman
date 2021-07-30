class CreatePrescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :prescriptions do |t|
      t.string :hospital
      t.references :doctor, references: :users,
                   foreign_key: { to_table: :users }, null: false
      t.date :issued_on
      t.references :patient, references: :users,
                   foreign_key: { to_table: :users }, null: false
      t.boolean :approved, null: false, default: false

      t.timestamps
    end
  end
end
