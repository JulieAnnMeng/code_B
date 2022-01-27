import React from 'react'
import { Link } from 'react-router-dom'

function CommentBoard({id, user, comment, commentor}) {
    let icon;

    if(commentor) {
        if(user) {
            if(commentor.icon){
                icon = <Link to={`/ViewUser/${commentor.id}`}><img src={commentor.icon} alt="usericon" className='icon-img-small'/></Link>
            } else {
                icon = <Link to={`/ViewUser/${commentor.id}`} className='small-icon'>{commentor.first_name.charAt(0) + commentor.last_name.charAt(0)}</Link>;
            }
        } else {
            if(commentor.icon){
                icon = <Link to={`/Login`}><img src={commentor.icon} alt="usericon" className='icon-img-small'/></Link>
            } else {
                icon = <Link to={`/Login`} className='small-icon'>{commentor.first_name.charAt(0) + commentor.last_name.charAt(0)}</Link>;
            }
        }
    }

    return (
        <div className="outside">
            <p>{icon} <span>{commentor.user}</span></p>
            <p className="txt">{comment}</p>
        </div>
    )
}

export default CommentBoard