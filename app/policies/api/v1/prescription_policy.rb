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
      scope.all
    end
  end
end
