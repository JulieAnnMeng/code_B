import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

function UserPage({user, getDiscussions, getUser}) {
    const [update, setUpdate] = useState(false);
    
    let userInterests;
    let userDiscussions;
    let userComments;
    let interested
    let discussion;
    let comment;
    let icon;
    let blankPage = true;
    
    useEffect(() => {
        getDiscussions();
        getUser();
        setUpdate(false);
    }, [update]);

    if (user) {
        userInterests = user.userPage.interests;
        userDiscussions = user.userPage.discussions;
        userComments = user.userPage.userComments;
        let userType = 'user';

        if(user.icon){
            icon = <Link to='/UserPage' className='icon'><img src={user.icon} alt="usericon" className='icon-img'/></Link>;
        } else {
            icon = <Link to={`/ViewUser/${user.id}`} className='icon'>{user.first_name.charAt(0) + user.last_name.charAt(0)}</Link>;
        }

        if (userInterests === null && userDiscussions === null && userComments === null){
            blankPage = true;
        } else if (userInterests.length === 0 && userDiscussions.length === 0 && userComments.length === 0){
            blankPage = true;
        } else {blankPage = false}

        interested = userInterests.map(interest => {
            let type = "interest";
            if (interest !== null) {
                return (
                    <UserCard
                        key={interest.id}
                        id={interest.discussion_id}
                        interest_id={interest.id}
                        type={type}
                        topic={interest.topic}
                        discussion={interest.discussion}
                        user={userType}
                        date={interest.interested_date}
                        deleteTypeSwitch={deleteTypeSwitch}
                        setUpdate={setUpdate}
                    />
                )
            }      
    })
        discussion = userDiscussions.map(discussion => {
            let type = "discussion";
            if (discussion !== null) {
                return (
                    <UserCard
                        key={discussion.id}
                        id={discussion.id}
                        type={type}
                        topic={discussion.topic}
                        discussion={discussion.discussion}
                        user={userType}
                        date={discussion.discussion_date}
                        deleteTypeSwitch={deleteTypeSwitch}
                        setUpdate={setUpdate}
                    />
                )
            }
        })
        comment = userComments.map(comment => {
            let type = "comment";
            if (comment !== null) {
                return (
                    <UserCard 
                        key={comment.id}
                        id={comment.id}
                        discussion_id={comment.discussion_id}
                        type={type}
                        topic={comment.discussion_topic}
                        discussion={comment.discussion}
                        user={userType}
                        comment={comment.comment}
                        date={comment.comment_date}
                        deleteTypeSwitch={deleteTypeSwitch}
                        setUpdate={setUpdate}
                    />
                )
            }
        })  
    } else {getUser()}

    function deleteTypeSwitch(type, id) {
        switch(type) {
            case 'interest':
                fetch(`/interests/${id}`, {
                    method: 'DELETE'
                })
                .then(setUpdate(true))
                .catch(err => console.log(err))
                break;
            case 'discussion':
                fetch(`/discussions/${id}`, {
                    method: 'DELETE',
                })
                .then(setUpdate(true))
                .catch(err => console.log(err))
                break;
            case 'comment':
                 fetch(`/comments/${id}`, {
                    method: 'DELETE',
                })
                .then(setUpdate(true))
                .catch(err => console.log(err))
                break;
            default:
                console.log(type)
                console.log(id)
                debugger;
        }
    }

    return (
        <div>
            {user ?  
            <>
                {blankPage ?
                    <div className="container card" ><br /><br />
                        <h2>There is nothing here. Start participating to add to this page</h2><br /><br />
                    </div>
                :
                    <>
                        <div className="container" style={{display: interested[0] ? "block" : "none"}}>
                            <h2 className='board'>Interested Discussions</h2>
                            {interested}
                        </div>
                        &nbsp;
                        <div className="container" style={{display: discussion[0] ? "block" : "none"}}>
                            <h2 className='board'>Started Discussions</h2>
                            {discussion}
                        </div>
                        &nbsp;
                        <div className="container" style={{display: comment[0] ? "block" : "none"}}>
                            <h2 className='board'>Comments</h2>
                            {comment}
                        </div>
                    </>
                }
            </>
            :
            <div className="spinner-border text-info center container" role="status"><span className="visually-hidden">Loading...</span></div>
            }
            
        </div>
    )
}

export default UserPage