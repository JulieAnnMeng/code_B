import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'


function DiscussionForm({user, getUser, board, getDiscussions}) {
    let history = useHistory();
    const { id } = useParams();
    let discussionFormData = user ? {user_id: user.id, topic: "", discussion: ""} : {user_id: "", topic: "", discussion: ""};

    useEffect(() => {
        getUser();
    }, [])
    
    if(board){
        id ? discussionFormData = board.find(dis => parseInt(dis.id) === parseInt(id)) 
        :   discussionFormData = {user_id: user.id, topic: "", discussion: ""}
    }

    const [formData, setFormData] = useState(discussionFormData);   
    
  
    function handleSubmit (e) {
        e.preventDefault();
        if(id){
            editUserDiscussion(formData)
            setFormData({user_id: user.id, topic: "", discussion: ""})
        } else {
            startDiscussion(formData);
            setFormData({user_id: user.id, topic: "", discussion: ""})
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function startDiscussion(formData) {
        let newId;
        console.log(formData);
        fetch('/discussions',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((r) => r.json())
        .then(discussion => {
            newId = discussion.id;
            getDiscussions();
            history.push(`/Discussion/${newId}`);
        })
        .catch(error => console.log("Log in incorrect: ", error))
    }

    function editUserDiscussion(formData){
        fetch(`/discussions/${formData.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            user_id: formData.user_id,
            topic: formData.topic,
            discussion: formData.discussion
            })
        })
        .then((r) => {
            if (r.ok) {
            r.json();
            }
            else {
            r.json().then((err) => console.log(err.errors));
            }
            getDiscussions();
            history.push(`/Discussion/${formData.id}`);
        })
        .catch(error => console.log("Log in incorrect: ", error))
    }

    return (
        <div>
            <div><br />
                <div><br />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <div>
                                    <label><span>Topic</span></label>
                                </div>
                                <div>
                                    <input 
                                        id="topic-discussion" 
                                        className="form-control input" 
                                        type="topic" 
                                        placeholder="discussion topic"
                                        name="topic" 
                                        value={formData.topic}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>   
                                <div>
                                    <label><span>Discussion</span></label>
                                </div>
                                <div>
                                    <textarea 
                                        id="discussion-entry" 
                                        className="form-control input"
                                        aria-describedby="discussionentryHelpInline" 
                                        placeholder="Discussion"
                                        name="discussion" 
                                        value={formData.discussion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn bttn bttn2" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form><br />
                </div>
            </div>
        </div>
    )
}

export default DiscussionForm