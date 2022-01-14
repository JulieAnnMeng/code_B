import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Body({setIsLoggedIn, setUser, user, getUser}) {
    const [board, setBoard] = useState(null);

    let icon;

    if(user) {
        getDiscussions();
        if(user.icon){
            icon = <Link to='/UserPage' className='icon'><img src={user.icon} className='icon-img'/></Link>;
        } else {
            icon = <Link to='/UserPage' className='icon'>{user.first_name.charAt(0) + user.last_name.charAt(0)}</Link>;
        }
    }    
    // This is running in a loop, change to something else

    function getDiscussions() {
        fetch("/discussions")
        .then((response) => response.json())
        .then((data) => setBoard(data))
        .catch((error) => console.log(error))
    }

    return (
        <div className="App">
            <div className='intro'>
                <br /><br />
                <h1 className='welcome'> 
                    {user ? icon : null} 
                    <em className="welcome-2">
                        Welcome to Code<span>B</span>
                    </em>
                    {
                        user ?
                        <Link to={`/DiscussionForm`} className="bttn discus-bttn"><br/>Start a discussion<br/></Link>
                        : 
                        null
                    }
                </h1>
                <br />
                <p className='info txt'>
                    A forum for all coding discussions, where users can interact with each other and continue their education in programming.
                </p>
            </div>
           {/* To start added in all other routes */}
            <Switch>
                <Route exact path="/">
                    <Home user={user} board={board} getUser={getUser} getDiscussions={getDiscussions}/>
                </Route>
                <Route exact path="/Login">
                    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
                </Route>
                <Route exact path="/Signup">
                    <Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Body;