class Api::V1::BaseController < ApplicationController
  before_action :doorkeeper_authorize!, except: %i[sign_up sign_in sign_out]
  skip_before_action :verify_authenticity_token

  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def current_user
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  private

  def user_not_authorized
    render json: { message: 'Not Authorized', ok: false }.to_json, status: :forbidden
  end
end
