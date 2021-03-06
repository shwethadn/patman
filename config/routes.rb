require 'resque/server'

Rails.application.routes.draw do
  mount Resque::Server.new, at: "/resque"

  use_doorkeeper
  devise_for :users
  root 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :users do
        collection do
          post :sign_up
          post :sign_in
          post :sign_out
          get :me
        end
      end

      resources :lab_reports do
        collection do
          post :approve
        end
      end

      resources :prescriptions do
        collection do
          post :approve
        end
      end

      resources :doctors do
        collection do
          post :patient_request
        end
      end

      resources :patients do
        collection do
        end
      end
    end
  end
end
