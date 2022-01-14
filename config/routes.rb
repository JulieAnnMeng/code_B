Rails.application.routes.draw do
  # route to test config
  get "/me" , to: "sessions#show"
  delete "/me", to: "sessions#destroy"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"

  get "/users/:id", to: "users#show"
  patch "/userEdit/:id", to: "users#update"

  post "/addInterest", to: "interests#create"
  delete "/interests/:id", to: "interests#destroy"

  get "/discussions", to: "discussions#index"
  get "/discussions/:id", to: "discussions#show"
  post "/discussions", to: "discussions#create"
  patch "/discussions/:id", to: "discussions#update"
  delete "/discussions/:id", to: "discussions#destroy"

  delete "/comments/:id", to: "comments#destroy"
  patch "/comments/:id", to: "comments#update"
  post "/comments", to: "comments#create"
  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
