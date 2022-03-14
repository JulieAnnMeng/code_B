class MessagesController < ApplicationController
    skip_before_action :authorize, only: [:show]

    def show
        messages = Message.select{|message| message.user_id == params[:id].to_i}
        if messages != nil
            render json: messages, status: :ok
        else
            render json: {error: "no messages"}, status: :not_found
        end
    end

    def update
        message = Message.find(params[:id])
        if message.update(message_params)
            render json: message, status: :created
        else
            render json: {errors: message.errors}, status: :unauthorized
        end
    end

    private
    def message_params
        params.permit(:id, :user_id, :message, :received)
    end
end
