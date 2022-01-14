import './App.css';
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    // console.log(loggedIn)
    setIsLoggedIn(loggedIn)
     if(isLoggedIn) {
      getUser()
    } else {setUser(null)}
  }, [isLoggedIn]);

 

  function getUser() {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data);
        })
      } else {
        r.json().then(setUser(null))
      }})
    .catch((error) => console.log(error))
  }

  // console.log(user, isLoggedIn)

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Body setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} getUser={getUser}/>
    </div>
  );
}

export default App;