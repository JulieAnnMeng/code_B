import React from 'react'
import { Link, useHistory } from 'react-router-dom'


function UserCard({user, id, interest_id, discussion_id, type, topic, discussion, comment, date, deleteTypeSwitch, setUpdate}) {
    
    const history = useHistory();

    function handleEdit(e) {
        e.preventDefault();
        if(type === "discussion"){
            setUpdate(true)
            history.push(`/DiscussionForm/${id}`)
        } else {
            setUpdate(true)            
            history.push(`/Discussion/${discussion_id}/CommentForm/${id}`)
        }
    }

    function handleDelete(e) {
        e.preventDefault();
        if(type === "interest"){
            id = interest_id;
        }
        deleteTypeSwitch(type, id);
    }
    
        return (
            <div className="container">
                { type === "discussion" || type === "interest" ?
                <div className="card">
                    {/* <h1 className="title">{topic}</h1> */}
                    <Link to={`/Discussion/${id}`} className="title" > {topic} </Link> <br />
                    <p className="txt">{discussion}</p>
                    <p><span>Date created/updated: </span>{date}</p>
                    {user === 'user' ? (
                        <div>
                            &nbsp;{type === "interest" ? null : <button className="btn bttn2" onClick={handleEdit} > Edit </button>}&nbsp; &nbsp;
                            <button className="btn bttn2" onClick={handleDelete} > Delete</button>
                        </div>
                    ): (null)}<br />
                    &nbsp;
                </div>
            :
                <div className="card">
                    {/* <h1 className="title">{topic}</h1> */}
                    <Link to={`/Discussion/${discussion_id}`} className="title" > {topic} </Link><br />
                    <p className="txt">{discussion}</p>
                    <div className="card card2 container">
                        <p className="txt">{comment}</p>
                        <p><span>Date created/updated: </span>{date}</p>
                        {user === 'user' ? (
                            <div className="d-grid gap-2 d-md-block">
                                &nbsp;<button className="btn btn-primary bttn2" onClick={handleEdit} > Edit </button>&nbsp; &nbsp;
                                <button className="btn btn-primary bttn2" onClick={handleDelete} > Delete</button>
                            </div>
                        ) : (null)}<br />
                    </div>
                    &nbsp;
                </div>
            }
            &nbsp;
            <br/></div>       
    )
}

export default UserCard