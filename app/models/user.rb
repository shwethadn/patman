class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # devise :doorkeeper

  def generate_access_token
    app = Doorkeeper::Application.first || Doorkeeper::Application.create(
      name: 'Meesevaa',
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob', scopes: %w[read write]
    )
    Doorkeeper::AccessToken.find_or_create_for(
      application: app, resource_owner: self, scopes: 'user read and write preference',
      expires_in: 24.hours, use_refresh_token: true
    )
  end
end
