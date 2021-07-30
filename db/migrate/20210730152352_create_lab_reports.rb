class CreateLabReports < ActiveRecord::Migration[6.0]
  def change
    create_table :lab_reports do |t|
      t.string :laboratory
      t.string :test
      t.references :doctor, references: :users,
                   foreign_key: { to_table: :users }, null: false
      t.date :tested_on
      t.references :patient, references: :users,
                   foreign_key: { to_table: :users }, null: false
      t.boolean :approved, null: false, default: false

      t.timestamps
    end
  end
end
