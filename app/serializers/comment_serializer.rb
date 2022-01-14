class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :commentor
  has_one :user
  has_one :discussion

  def commentor
    # byebug
    return {id: object.user.id, user: object.user.username, first_name: object.user.first_name, last_name: object.user.last_name, icon: object.user.icon}
  end
end
