class User < ApplicationRecord
    has_secure_password

    has_many :discussions
    has_many :comments
    has_many :interests
end
