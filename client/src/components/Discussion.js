import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import CommentBoard from './CommentBoard';
import { addInterest } from './Home';


function Discussion({user, board, getUser, getDiscussions}) {
    const { id } = useParams();
    let history = useHistory();

    // add useEffect to grab discussions

    let commentAvailable;
    let commentAlert = "Login or signup to participate";
    let discussion;
    let interestCount;
    let welcome;
    let tableHeader;
    let commentBoard;
    let interestStar;
    let commentorIcon;

    if(board){  
        discussion = board.find(discussion => discussion.id === parseInt(id));
        if (discussion){
            interestCount = discussion.interests.length;
            commentAvailable = `${discussion.comments.length} comments below. Join the discussion!`;
            if(user){
                if(discussion.user.icon){
                    commentorIcon = <Link to={`/ViewUser/${discussion.user.id}`}><img src={discussion.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    commentorIcon = <Link to={`/ViewUser/${discussion.user.id}`} className='small-icon'>{discussion.user.first_name.charAt(0) + discussion.user.last_name.charAt(0)}</Link>
                }
            } else {
                if(discussion.user.icon){
                    commentorIcon = <Link to={`/Login`}><img src={discussion.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    commentorIcon = <Link to={`/Login`} className='small-icon'>{discussion.user.first_name.charAt(0) + discussion.user.last_name.charAt(0)}</Link>
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
        welcome = null;
        tableHeader = commentAlert
    }

    function handleInterest(e) {
        e.preventDefault();
        if(user) {
            let notAlreadyInterested = user.userPage.interests.find(interest => interest.discussion_id === parseInt(id)) ? false : true;
            if (notAlreadyInterested){
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
                    <br /><br />
                    <h1 className='discus-title'>
                        {discussion.topic}
                    </h1><br />              
                    <div><br />
                        <p>{discussion.discussion}</p>
                        <p>{commentorIcon}<span>{discussion.user.username}</span></p>  
                        &nbsp;  
                        <div>
                            <button className="btn bttn2" onClick={handleInterest}>{ interestStar ? " ★ " : " ☆ " }<span>{interestCount}</span> Interests</button>
                            &nbsp; &nbsp;
                            <Link to={user ? `/CommentForm/${id}` : `/Login`} className="btn bttn2"><span>{discussion.comments.length}</span> Comments</Link>
                        </div>
                        &nbsp;
                    </div>
                    <div> 
                        &nbsp;
                        <h4 className="board">Comments</h4>
                        &nbsp;
                        &nbsp;
                        <div><br/>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>{tableHeader}</th>
                                        <td>
                                            {user ?
                                            <Link to={`/CommentForm/${id}`} className="btn bttn2">Comment</Link>
                                            :
                                            <>
                                                <Link to={`/Login`} className="btn bttn2">Login</Link>
                                                <Link to={`/Signup`} className="btn bttn2">Signup</Link> 
                                            </>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table><br /><br />                 
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