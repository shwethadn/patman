class Api::V1::PrescriptionPolicy < Api::V1::ApplicationPolicy
  def approve?
    user.class.eql?(Doctor)
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.instance_of?(Doctor)
        scope.klas.where(id: scope.patient_id).all
      elsif user.instance_of?(Patient)
        user.prescriptions
      else
        scope.klas.all
      end
    end
  end
end
