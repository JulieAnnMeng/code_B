class DiscussionSerializer < ActiveModel::Serializer
  attributes :id, :topic, :discussion
  has_one :user
  has_many :comments
  has_many :interests

end
