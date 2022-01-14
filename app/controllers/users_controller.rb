class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :update]

    def create
        user = User.create(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def index
        render json: User.all, status: :ok
    end

    def show
        user = User.find(params[:id])
        render json: user, status: :ok
    end

    def update
        user = User.find(params[:id])
        if user&.authenticate(params[:password])
            if params[:new_password]
                if params[:new_password] == params[:new_password_confirmation]
                    if user.update(password: params[:new_password])
                        render json: user, status: :created
                    else
                        render json: {errors: user.errors}, status: :unauthorized
                    end
                end
            else
                if user.update(user_params)
                    render json: user, status: :created
                else
                    render json: {errors: user.errors}, status: :unauthorized
                end
            end
        end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private
    def user_params
        params.permit(:id, :user, :first_name, :last_name, :username, :password, :password_confirmation, :new_password, :new_password_confirmation, :icon)
    end
end