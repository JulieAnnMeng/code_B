class DiscussionsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        render json: Discussion.all, status: :ok
    end

    def show
        discussion = Discussion.find(params[:id])
        render json: discussion, status: :ok
    end

    def create
        discussion = Discussion.new(discussion_params)
        if discussion.save
            render json: discussion, status: :created
        else
            render json: {errors: discussion.errors}, status: :unauthorized
        end
    end

    def update
        discussion = Discussion.find(params[:id])
        if discussion.update(discussion_params)
            render json: discussion, status: :created
        else
            render json: {errors: discussion.errors}, status: :unauthorized
        end
    end

    def destroy
        discussion = Discussion.find(params[:id])
        discussion.destroy
        head :no_content
    end

    private
    def discussion_params
        params.permit(:user_id, :topic, :discussion)
    end
end