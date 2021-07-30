class Api::V1::BaseController < ApplicationController
  before_action :doorkeeper_authorize!, except: %i[sign_up sign_in sign_out]
  before_action :authenticate_user!, except: %i[sign_up sign_in sign_out]

  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # Invoke from background process
  def read_text_from_image
    # $ brew install tesseract
    # https://github.com/dannnylo/rtesseract
    image = RTesseract.new("/path/to/uploaded/image")
    image.to_s
  end

  private

  def user_not_authorized
    render json: { message: 'Not Authorized', ok: false }.to_json, status: :forbidden
  end
end
