import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import CommentBoard from './CommentBoard';

function Discussion({user, board, getUser, getDiscussions, addInterest}) {
    const { id } = useParams();
    let history = useHistory();

    let commentAvailable;
    let commentAlert = "Login or signup to participate";
    let discussion;
    let interestCount;
    let tableHeader;
    let commentBoard;
    let interestStar;
    let icon;

    if(board){  
        discussion = board.find(discussion => discussion.id === parseInt(id));
        if (discussion){
            interestCount = discussion.interests.length;
            commentAvailable = `${discussion.comments.length} comments below. Join the discussion!`;
            if(user){
                if(discussion.user.icon){
                    icon = <Link to={`/ViewUser/${discussion.user.id}`}><img src={discussion.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    icon = <Link to={`/ViewUser/${discussion.user.id}`} className='small-icon'>{discussion.user.first_name.charAt(0) + discussion.user.last_name.charAt(0)}</Link>
                }
            } else {
                if(discussion.user.icon){
                    icon = <Link to={`/Login`}><img src={discussion.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    icon = <Link to={`/Login`} className='small-icon'>{discussion.user.first_name.charAt(0) + discussion.user.last_name.charAt(0)}</Link>
                }
            }
            let comments; 

            if(discussion.comments){
                comments = discussion.comments;
                commentBoard = comments.map(entry => {
                return (
                    <CommentBoard 
                        key={entry.id}
                        id={entry.id}
                        user={user}
                        comment={entry.comment}
                        commentor={entry.commentor}
                    />
                )})
            } else {
                commentAvailable = 'No comments available';
                commentBoard = null;
            }
        } else {
            <div>
                <span>
                    Loading...
                </span>
            </div>
        }
    }

    if (user) {
        interestStar = user.userPage.interests.find(interest => interest.discussion_id === parseInt(id)) ? true : false;
        tableHeader = commentAvailable
    } else {
        tableHeader = commentAlert
    }

    function handleInterest(e) {
        e.preventDefault();
        if(user) {
            let notAlreadyInterested = user.userPage.interests.find(interest => interest.discussion_id === parseInt(id)) ? false : true;
            if (notAlreadyInterested){
                debugger;
                interestStar = true;
                let user_id = user.id;
                let discussion_id = id;
                addInterest(user_id, discussion_id, getUser, getDiscussions);
            } else {
                console.log("Already interested")
            }
        } else {
            history.push('/Login')
        }
    }

    return (
            <div>
            {discussion ?  
                <>
                    <h1 className='discus-title'>
                        {discussion.topic}
                    </h1>
                    <div className="inside">                 
                        <p>{discussion.discussion}</p>
                        <p>{icon}<span>{discussion.user.username}</span></p>  
                        &nbsp;  
                        <div>
                            <button className="bttn2" onClick={handleInterest}>{ interestStar ? " ★ " : " ☆ " }&nbsp;<span>{interestCount}</span> Interests&nbsp;</button>
                            &nbsp; &nbsp;
                            <Link to={user ? `/CommentForm/${id}` : `/Login`}><button className="bttn2">&nbsp;<span>{discussion.comments.length}</span> Comments&nbsp;</button></Link>
                        </div>
                    </div>    
                    <h4 className="board">Comments</h4>
                    <div className="inside">    
                        <div className="info-alert"><br/>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>&nbsp; &nbsp;{tableHeader}&nbsp; &nbsp;</th>
                                        <td>
                                            {user ?
                                            <Link to={`/CommentForm/${id}`} className="bttn2">&nbsp;Comment&nbsp;</Link>
                                            :
                                            <>
                                                <Link to={`/Login`} className="bttn2">&nbsp;Login&nbsp;</Link>
                                                &nbsp; &nbsp;
                                                <Link to={`/Signup`} className="bttn2">&nbsp;Signup&nbsp;</Link> 
                                            </>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>                 
                        </div><br /> 
                        {commentBoard}   
                    </div> 
                </>
            : 
                <div>
                    <span>Loading...</span>
                </div> }
                &nbsp; 
        </div>       
    )
}

export default Discussion