Rails.application.routes.draw do
  # route to test config
  get '/hello', to: 'application#hello_world'
end
