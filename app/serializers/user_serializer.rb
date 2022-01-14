class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :icon, :userPage, :profilePage

  def userPage 
    userInterests = object.interests.map do |interest| 
      {
        id: interest.id, 
        discussion_id: interest.discussion_id, 
        topic: interest.discussion.topic, 
        discussion: interest.discussion.discussion, 
        interested_date: interest.discussion.created_at.strftime('%m-%d-%Y')
      }
    end

    userDiscussions = object.discussions.map do |discussion| 
      {
        id: discussion.id, 
        topic: discussion.topic, 
        discussion: discussion.discussion, 
        discussion_date: discussion.created_at.strftime('%m-%d-%Y')
      }
    end
    
    userComments = object.comments.map do |comment| 
      {
        id: comment.id, 
        discussion_id: comment.discussion_id, 
        discussion_topic: comment.discussion.topic, 
        discussion: comment.discussion.discussion, 
        comment: comment.comment, 
        comment_date: comment.created_at.strftime('%m-%d-%Y')
      }
    end
    
    userpage = {
      interests: userInterests, 
      discussions: userDiscussions, 
      userComments: userComments
    }
    
    return userpage
  end

  def profilePage
    discussions = object.discussions.count

    comments = object.comments.count

    interests = 0
    
    object.interests.map do |interest| 
      begin
      selfDiscussion = object.discussions.find(interest.discussion_id)
      rescue ActiveRecord::RecordNotFound => e
        selfDiscussion = nil
      end
      if selfDiscussion == nil
        interests = interests + 1
      end  
    end
    
    profile = {interest: interests, discussion: discussions, comment: comments}
    return profile
  end

end
