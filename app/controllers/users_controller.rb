class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :update]

    def create
        validate_username()
        if @username_taken == nil
            user = User.create(user_params)
            if session[:user_id] = user.id
            render json: user, status: :created
            else
                render json: {error: user.errors}, status: :unauthorized
            end
        else
            render json: { error: "Username already taken" }, status: :unprocessable_entity
        end
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
            elsif params[:username]
                validate_username()
                if @username_taken[:id] == user.id
                    render json: user, status: 200
                else
                    render json: {error: "Username already taken"}, status: :unprocessable_entity
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

    def validate_username
        @username_taken = User.find_by username: params[:username]
    end
end