class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  devise :doorkeeper

  has_one :qr_code, -> { where(document_type: 'qr_code') }, class_name: 'Asset',
    as: :resource, dependent: :destroy

  before_create :add_uid

  def generate_access_token
    app = Doorkeeper::Application.first || Doorkeeper::Application.create(
      name: 'Patman',
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob', scopes: %w[read write]
    )
    Doorkeeper::AccessToken.find_or_create_for(
      application: app, resource_owner: self, scopes: 'user read and write preference',
      expires_in: 24.hours, use_refresh_token: true
    )
  end

  # validates :email, uniqueness: true
  validates :mobile, uniqueness: true

  # Search user by mobile(not email)
  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    where(mobile: conditions[:mobile]).first
  end

  # Stop using email as authentication key
  def email_required?
    false
  end

  def email_changed?
    false
  end

  def will_save_change_to_email?
    false
  end

  def add_uid
    self.uid = SecureRandom.uuid
  end

  def profile_data
    hash = attributes.slice('mobile', 'name', 'type', 'uid')
    hash[:qr_code] = qr_code.asset.url
    hash
  end
end
