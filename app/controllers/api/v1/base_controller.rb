class Api::V1::BaseController < ApplicationController
  before_action :doorkeeper_authorize!, except: %i[sign_up sign_in sign_out]
  skip_before_action :verify_authenticity_token

  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ::ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::StatementInvalid, with: :bad_request_error

  # Invoke from background process
  def read_text_from_image
    # $ brew install tesseract
    # https://github.com/dannnylo/rtesseract
    image = RTesseract.new("/path/to/uploaded/image")
    image.to_s
  end

  def current_user
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  def bad_request_error(exception)
    render json: { message: exception.message, success: false }, status: :bad_request
  end

  def record_not_found
    render json: { message: 'Record not found', ok: false }, status: :not_found
  end

  private

  def user_not_authorized
    render json: { message: 'Not Authorized', ok: false }.to_json, status: :forbidden
  end
end
