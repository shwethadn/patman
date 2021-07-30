class AddMobileConstraints < ActiveRecord::Migration[6.0]
  def up
    execute "ALTER TABLE users ADD CONSTRAINT check_mobile_length CHECK (mobile >= 6000000000 AND mobile <= 9999999999 )"
  end

  def down
    execute "ALTER TABLE users DROP CONSTRAINT check_mobile_length"
  end
end
