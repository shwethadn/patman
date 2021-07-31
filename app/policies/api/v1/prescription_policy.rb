class Api::V1::PrescriptionPolicy < Api::V1::ApplicationPolicy
  def approve?
    user.class.eql?(Doctor)
  end
end
