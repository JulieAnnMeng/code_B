import React from "react";
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Body({setIsLoggedIn, setUser, user}) {

    return (
        <div className="App">
            {/* <a href='/FunList'><button>Fun List</button></a> */}
            <Switch>
                <Route exact path="/">
                    <Home />
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