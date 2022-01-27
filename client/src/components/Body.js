import React from "react";
import { Switch, Route, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import DiscussionForm from "./DiscussionForm";
import Discussion from "./Discussion";
import CommentForm from "./CommentForm";
import ProfilePage from "./ProfilePage";
import ProfileEdit from "./ProfileEdit";
import UserPage from "./UserPage";
import ViewUser from "./ViewUser";
import ScrollToTop from './ScrollToTop';

function Body({setIsLoggedIn, setUser, user, getUser, getDiscussions, board}) {

    function addInterest(user_id, discussion_id) {
        fetch(`/addInterest`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            user_id, 
            discussion_id
          })
        })
        .then((r) => {
          if (r.ok) {
            r.json();
            }
          else {
            r.json().then((err) => console.log(err.errors));
          }
          getUser();
          getDiscussions();
        })
        .catch(error => console.log("Log in incorrect: ", error))
    }

    return (
        <div className="home">
            <div className='intro'>
                <h1 className='welcome'> 
                    {
                        user ? 
                            user.icon ?
                            <Link to='/UserPage' className='icon'><img src={user.icon} alt='user icon' className='icon-img'/></Link>
                            :
                            <Link to="/UserPage" className="icon">&nbsp;{user.first_name.charAt(0) + user.last_name.charAt(0)}&nbsp;</Link>
                        : 
                        null
                    } 
                    <em className="welcome">Welcome to Code <span>B</span></em>
                    {
                        user ?
                        <Link to={`/DiscussionForm`} className="bttn discus-bttn"><br/>&nbsp;Start a discussion&nbsp;<br/></Link>
                        : 
                        null
                    }
                </h1>
            </div>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/">
                        <Home user={user} board={board} getUser={getUser} getDiscussions={getDiscussions} addInterest={addInterest}/>
                    </Route>
                    <Route exact path="/Login">
                        <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
                    </Route>
                    <Route exact path="/Signup">
                        <Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
                    </Route>
                    <Route exact path="/ProfilePage">
                        <ProfilePage user={user} getUser={getUser}/>
                    </Route>
                    <Route exact path="/ProfileEdit">
                        <ProfileEdit user={user} getUser={getUser}/>
                    </Route>
                    <Route exact path="/UserPage">
                        <UserPage user={user} getUser={getUser} getDiscussions={getDiscussions}/>
                    </Route>
                    <Route exact path="/ViewUser/:id">
                        <ViewUser user={user}/>
                    </Route>
                    <Route exact path="/DiscussionForm">
                        <DiscussionForm user={user} getUser={getUser} getDiscussions={getDiscussions}/>
                    </Route>
                    <Route exact path="/DiscussionForm/:id">
                        <DiscussionForm user={user} getUser={getUser} board={board} getDiscussions={getDiscussions}/>
                    </Route>
                    <Route exact path="/Discussion/:id">
                        <Discussion user={user} board={board} getUser={getUser} getDiscussions={getDiscussions} addInterest={addInterest}/>
                    </Route>
                    <Route exact path="/CommentForm/:id">
                        <CommentForm user={user} board={board} getUser={getUser} getDiscussions={getDiscussions} />
                    </Route>
                    <Route exact path="/Discussion/:discussion_id/CommentForm/:id">
                        <CommentForm user={user} board={board} getUser={getUser} getDiscussions={getDiscussions} />
                    </Route>
                </Switch>
            </ScrollToTop>
        </div>
    )
}

export default Body;