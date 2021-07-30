Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users
  root 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :users do
        collection do
          post :sign_in
          post :sign_out
          get :me
        end
      end
    end
  end
end
