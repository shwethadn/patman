class Api::V1::BaseController < ApplicationController
  before_action :doorkeeper_authorize!, except: %i[sign_up sign_in sign_out]
  before_action :authenticate_user!, except: %i[sign_up sign_in sign_out]

  # Invoke from background process
  def read_text_from_image
    # $ brew install tesseract
    # https://github.com/dannnylo/rtesseract
    image = RTesseract.new("/path/to/uploaded/image")
    image.to_s
  end
end
