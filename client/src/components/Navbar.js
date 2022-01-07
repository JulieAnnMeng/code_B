import React, {useState} from "react";
import { NavLink, useHistory } from "react-router-dom";

function Navbar({isLoggedIn, setIsLoggedIn}) {
    let history = useHistory();

    const [search, setSearch] = useState("")
    // let searchResults;

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleSearch(e){
        e.preventDefault();
        // searchResults = board.filter( function (term) {
        //     return term.topic.toLowerCase().includes(search.toLowerCase()) || term.discussion.toLowerCase().includes(search.toLowerCase())
        // });
        // searchResults[0] ? setSearchReturn(searchResults) : setSearchReturn(null)
        history.push('/')
        console.log("Searching for:", search)
    }

    function logOut() {
		// fetch("/logout", {
		// 	method: "DELETE",
		// }).then(() => {
        //     localStorage.removeItem("isLoggedIn")
        //     setIsLoggedIn(false)
        //     history.push('/')
		// });
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false)
        history.push('/')
        console.log("Logged out")
	}


    return (
        <div className="navbar">
            <NavLink className="Navbar-title block" to="/">Code <span>B</span> </NavLink>
            <form className="block searchbar" onSubmit={handleSearch}>
                <input 
                    id="search"
                    className="search" 
                    type="search" 
                    placeholder="🔍 Search code_B" 
                    name="search" 
                    value={search}
                    onChange={handleChange}
                />
                <button className="bttn" type="submit">Search</button>
            </form>
            <nav className="navbar-links block">
                {isLoggedIn ?
                    <>
                        
                        <button className="bttn nav-bttn" onClick={logOut}>Logout</button>
                        <NavLink className="nav-bttn" to='#'><button className="bttn">👤</button></NavLink>
                    </>
                    :
                    <>
                        <NavLink className="nav-bttn" to='/Login'><button className="bttn">Login</button></NavLink>
                        <NavLink className="nav-bttn" to='/Signup'><button className="bttn">Sign up</button></NavLink>
                    </>
                }
                
            </nav>
        </div>
    )
}

export default Navbar;