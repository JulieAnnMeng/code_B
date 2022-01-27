// import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import DiscussionCard from './DiscussionCard';

function Home({user, board, addInterest}) {
    let discussionBoard;
    let interestStar;
    let interests;

    if(board){
        let sortedBoard = board.sort((a,b) => (a.interest_count < b.interest_count ? 1 : -1))
        discussionBoard = sortedBoard.map(entry => {
            let icon;
            let entryUserID = entry.user.id;
            if (user) {
                interestStar = user.userPage.interests.find(interest => interest.discussion_id === entry.id) ? true : false;
                interests = user.userPage.interests;
                
                if(entry.user.icon){
                    icon = <Link to={`/ViewUser/${entryUserID}`}><img src={entry.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    icon = <Link to={`/ViewUser/${entryUserID}`} className='small-icon'>{entry.user.first_name.charAt(0) + entry.user.last_name.charAt(0)}</Link>;
                }
            } else {
                interestStar = null;
                interests = null;
                if(entry.user.icon){
                    icon = <Link to={`/Login`}><img src={entry.user.icon} alt="usericon" className='icon-img-small'/></Link>;
                } else {
                    icon = <Link to={`/Login`} className='small-icon'>{entry.user.first_name.charAt(0) + entry.user.last_name.charAt(0)}</Link>;
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
                    icon={icon}
                    username={entry.user.username}
                    commentCount={entry.comments.length}
                    interestCount={entry.interests.length}
                    addInterest={addInterest}
                />
            )
        })
    } 

    return (
        <div>
            <p className='info txt'>
                A forum for all coding discussions, where users can interact with each other and continue their education in programming.
            </p>
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