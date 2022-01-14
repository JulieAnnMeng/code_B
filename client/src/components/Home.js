import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import DiscussionCard from './DiscussionCard';


function Home({user, board, getUser, getDiscussions}) {
    let discussionBoard;
    let interestStar;
    let interests;

    if(board){
        discussionBoard = board.map(entry => {
            let commentorIcon;
            let entryUserID = entry.user.id;

            if (user) {
                interestStar = user.userPage.interests.find(interest => interest.discussion_id === entry.id) ? true : false;
                interests = user.userPage.interests;
                
                if(entry.user.icon){
                    commentorIcon = <Link to={`/ViewUser/${entryUserID}`}><img src={entry.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    commentorIcon = <Link to={`/ViewUser/${entryUserID}`} className='small-icon'>{entry.user.first_name.charAt(0) + entry.user.last_name.charAt(0)}</Link>;
                }
            } else {
                interestStar = null;
                interests = null;
                if(entry.user.icon){
                    commentorIcon = <Link to={`/Login`}><img src={entry.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    commentorIcon = <Link to={`/Login`} className='small-icon'>{entry.user.first_name.charAt(0) + entry.user.last_name.charAt(0)}</Link>;
                }
            }
            return (
                <DiscussionCard 
                    key={entry.id}
                    id={entry.id}
                    topic={entry.topic}
                    discussion={entry.discussion}
                    user={user}
                    interests={interests}
                    interestStar={interestStar}
                    icon={commentorIcon}
                    username={entry.user.username}
                    commentCount={entry.comments.length}
                    interestCount={entry.interests.length}
                    entryUserID={entry.user.id}
                    getUser={getUser}
                    getDiscussions={getDiscussions}
                />
            )
        })
    } 

    return (
        <div>
            <div className='container'>
                <h2 className='board'>
                    Discussion Board
                </h2>
                {discussionBoard}
                <br />
            </div>
        </div>
    )
}

export default Home;