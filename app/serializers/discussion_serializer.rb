class DiscussionSerializer < ActiveModel::Serializer
  attributes :id, :topic, :discussion, :interest_count

  has_one :user
  has_many :comments
  has_many :interests

  def interest_count
    interest_count = object.interests.length
    return interest_count
  end
end
