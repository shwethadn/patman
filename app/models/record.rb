class Record < ApplicationRecord
  self.table_name = 'record'
  belongs_to :recordable, polymorphic: true
end
