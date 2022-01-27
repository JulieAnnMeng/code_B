import './App.css';
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState();
  const [board, setBoard] = useState(null);
  const [searchReturn, setSearchReturn] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    // console.log(loggedIn)
    setIsLoggedIn(loggedIn)
    getDiscussions();
     if(loggedIn) {
      getUser()
    } else {setUser(null)}
  }, [isLoggedIn]);

//  console.log(user);

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

  function getDiscussions() {
    fetch("/discussions")
    .then((response) => response.json())
    .then((data) => {
      setBoard(data);
    })
    .catch((error) => console.log(error))
}


  // console.log(user, isLoggedIn)

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} board={board} setSearchReturn={setSearchReturn}/>
      <Body setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} getUser={getUser} getDiscussions={getDiscussions} board={searchReturn ? searchReturn : board}/>
    </div>
  );
}

export default App;