import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'


function DiscussionForm({user, startDiscussion, editUserDiscussion, board}) {

    const { id } = useParams();
    let icon;
    
    let discussionFormData = {user_id: user.id, topic: "", discussion: ""};

    if(board){
         id ? discussionFormData = board.find(dis => parseInt(dis.id) === parseInt(id)) 
        :   discussionFormData = {user_id: user.id, topic: "", discussion: ""}
    }
    const [formData, setFormData] = useState(discussionFormData);   

    if(user) {
        if(user.icon){
            icon = <Link to='/UserPage' className='icon'><img src={user.icon} alt="usericon" className='icon-img'/></Link>;
        } else {
            icon = <Link to='/UserPage' className='icon'>{user.first_name.charAt(0) + user.last_name.charAt(0)}</Link>;
        }
    }
  
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

    return (
        <div>
            <h1 className="welcome"><br />
                {user ? icon : null} 
                <em className="welcome-2">Submit a Discussion Topic</em>
                {user ?
                <Link to={`/DiscussionForm`} className="btn btn-primary discus-bttn bttn me-2"><br/>Start a discussion<br/></Link>
                :
                null}
            </h1> 
            <div className="container"><br />
                {user ?
                <>    
                    <div className="card container outside"><br />
                            <form className='container form right inside' onSubmit={handleSubmit}>
                                <div className='fields'>
                                    <div className="row mb-3 align-items-center">
                                        <div className="col-auto">
                                            <label className="col-form-label label"><span>Topic</span></label>
                                        </div>
                                        <div className="col-auto">
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
                                    <div className="row mb-3">   
                                        <div className="col-auto">
                                            <label className="col-form-label label"><span>Discussion</span></label>
                                        </div>
                                        <div className="col-auto">
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
                                <div className="submit">
                                    <button type="submit" className="btn bttn bttn2">Submit</button>
                                </div>
                            </form><br />
                    </div>
                </>
                :
                <div className="spinner-border text-info center container" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div> }
            </div>
        </div>
    )
}

export default DiscussionForm