import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';


function CommentForm({user, board, getUser, getDiscussions}) {

    const { discussion_id, id } = useParams();
    let history = useHistory();

    let commentFormData;
    let discussion;
    let icon;
    let link_id;

    if(board) {
        if(discussion_id) {
            link_id = discussion_id;
            commentFormData = (board.find(dis => dis.id === parseInt(discussion_id)).comments.find(comment => comment.id === parseInt(id)));
            discussion = {topic: board.find(dis => dis.id === parseInt(discussion_id)).topic, discussion: board.find(dis => dis.id === parseInt(discussion_id)).discussion} 
        } else {
            link_id = id;
            commentFormData = {user_id: user.id, discussion_id: id, comment: ""};
            discussion = {topic: board.find(dis => dis.id === parseInt(id)).topic, discussion: board.find(dis => dis.id === parseInt(id)).discussion}
        }
    }

    const [formData, setFormData] = useState(commentFormData);   
    
    
    function handleSubmit (e) {
        e.preventDefault();
        if(discussion_id){
            editUserComment(formData, discussion_id);
            setFormData({user_id: user.id, discussion_id: id, comment: ""});
        } else {
            addComment(formData);
            setFormData({user_id: user.id, discussion_id: id, comment: ""});
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, comment: e.target.value });
    }

    function addComment(data) {
        fetch('/comments',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
        })
        .then((r) => {
          if (r.ok) {
            r.json();
            }
          else {
            r.json().then((err) => console.log(err.errors));
          }
          getDiscussions();
          getUser();
          history.push(`/Discussion/${data.discussion_id}`);
        })
        .catch(error => console.log("Log in incorrect: ", error))
      }

      function editUserComment(formData, discussion_id) {
        fetch(`/comments/${formData.id}`,{
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({comment: formData.comment})
        })
        .then((r) => {
          if (r.ok) {
            r.json();
            }
          else {
            r.json().then((err) => console.log(err.errors));
          }
          getDiscussions();
          history.push(`/Discussion/${discussion_id}`);
        })
        .catch(error => console.log("Log in incorrect: ", error))
      }

    return (
        <div>
            <div><br />
                {discussion ? 
                <>    
                    <div className="outside">
                        <h2 className="title"><Link to={`/Discussion/${link_id}`} className="title">{discussion.topic}</Link></h2>
                        <p>{discussion.discussion}</p><br />
                        <div className=""><br />
                            <form className='comment-form inside' onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                        <div>
                                            <label className="label"><span>Comment</span></label>
                                        </div>
                                        <div>
                                            <textarea 
                                                id="comment-entry" 
                                                className="input"
                                                placeholder="Discussion comment"
                                                name="comment" 
                                                value={formData.comment}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div><br />
                                <div className="submit">
                                    <button type="submit" className="bttn2">Submit</button>
                                </div>
                            </form><br />
                        </div>    
                    </div>
                </>
                :
                <div>
                    <span>Loading...</span>
                </div> }
            </div>
        </div>
    )
}

export default CommentForm