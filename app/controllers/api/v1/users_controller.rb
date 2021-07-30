class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: %i[sign_up sign_in sign_out]
  skip_before_action :verify_authenticity_token

  def me
    render json: { success: true, message: 'User Data', response: current_user.profile_data }
  end

  def sign_up
    user = User.where('mobile = ?', user_params[:mobile]).first
    if user.nil?
      msg = 'You were registered successfully'
      user = User.create(user_params)
      render json: { success: true, message: msg, response: user.generate_access_token.token }
    else
      render json: { success: false, message: 'User Already exists. Please login', response: nil }, status: :bad_request
    end
  end

  def sign_in
    user = User.where('mobile = ?', user_params[:mobile]).first
    if !user.nil? && user.valid_password?(user_params[:password])
      token = user.generate_access_token.token
      render json: { success: true, access_token: token, message: 'Authentication successful', response: nil }
    else
      render json: { success: false, message: 'mobile or password is wrong', response: nil }, status: :unauthorized
    end
  end

  def sign_out
    doorkeeper_token.try(:revoke)
    render json: { success: true, message: 'You have successfully logged out', response: nil }
  end

  private

  def user_params
    params.permit(:mobile, :password)
  end
end
