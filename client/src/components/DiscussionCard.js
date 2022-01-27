import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function DiscussionCard({user, interestStar, id, topic, discussion, icon, username, commentCount, interestCount, interests, addInterest}) {
    let history = useHistory();

    function handleInterest(e) {
        e.preventDefault();
        interestStar = true;
        if(user) {
            let notAlreadyInterested = interests.find(interest => interest.discussion_id === id) ? false : true;
            if (notAlreadyInterested){
                let user_id = user.id;
                let discussion_id = id;
                interestCount += 1;
                addInterest(user_id, discussion_id);
            } else {
                console.log("Already interested")
            }            
        } else {
            history.push('/Login')
        }
    }

    return (
        <>
            <div className="card inside"><br/>
            <Link to={`/Discussion/${id}`} className="title"> {topic} </Link><br/>
            <p className="txt">{discussion}</p>
            <p> {icon} <span>{username}</span>                
            </p>
            <div>
                <button className="bttn2" onClick={handleInterest} >{interestStar ? " ★ " : " ☆ " } <span>{interestCount}</span> Interests</button>
                &nbsp; &nbsp;
                <Link to={user ? `/CommentForm/${id}` : `/Discussion/${id}`} className="bttn2"><span>{commentCount}</span> Comments</Link>
            </div><br/>
        </div> 
        <br/> 
        </>
     
    )
}

export default DiscussionCard