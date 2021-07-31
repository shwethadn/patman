class Api::V1::DoctorPolicy < Api::V1::ApplicationPolicy
  def patient_request?
    user.class.eql?(Doctor) 
  end
end
