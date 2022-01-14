class Discussion < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :interests, dependent: :destroy
end
