import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Body({setIsLoggedIn, setUser, user, getUser}) {
    const [board, setBoard] = useState(null);

    // let icon;

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
         if(loggedIn) {
            getDiscussions();
        }
      }, []);

    function getDiscussions() {
        fetch("/discussions")
        .then((response) => response.json())
        .then((data) => setBoard(data))
        .catch((error) => console.log(error))
    }

    return (
        <div className="App">
            <div className='intro'>
                <h1 className='welcome'> 
                    {
                        user ? 
                            user.icon ?
                            <Link to='#' className='icon'><img src={user.icon} className='icon-img'/></Link>
                            :
                            <Link to="/#" className="icon">&nbsp;{user.first_name.charAt(0) + user.last_name.charAt(0)}&nbsp;</Link>
                        : 
                        null
                    } 
                    <em className="welcome-2">
                        Welcome to Code<span>B</span>
                    </em>
                    {
                        user ?
                        <Link to={`/DiscussionForm`} className="bttn discus-bttn"><br/>&nbsp;Start a discussion&nbsp;<br/></Link>
                        : 
                        null
                    }
                </h1>
            </div>
            {/* change welcome to home, do not like on body */}
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