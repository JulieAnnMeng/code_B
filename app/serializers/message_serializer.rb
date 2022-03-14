class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :received
  has_one :user
end
