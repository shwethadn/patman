class Api::V1::PrescriptionPolicy < Api::V1::ApplicationPolicy
  def approve?
    byebug
    user.class.eql?(Doctor)
  end
end
