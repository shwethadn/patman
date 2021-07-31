class CreateJoinTableDoctorsPatients < ActiveRecord::Migration[6.0]
  def change
    create_table :doctors_patients do |t|
      t.references :doctor, index: true, foreign_key: { to_table: :users }
      t.references :patient, index: true, foreign_key: { to_table: :users }
      t.boolean :approved, default: false
    end
  end
end
