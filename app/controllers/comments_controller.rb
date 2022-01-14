class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    
    def index
        render json: Comment.all, status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: {errors: comment.errors}, status: :unauthorized
        end
    end

    def update
        comment = Comment.find(params[:id])
        if comment.update(comment_params)
            render json: comment, status: :created
        else
            render json: {errors: comment.errors}, status: :unauthorized
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        head :no_content
    end

    private
    def comment_params
        params.permit(:user_id, :discussion_id, :comment)
    end
end