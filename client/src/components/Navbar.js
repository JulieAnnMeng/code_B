import React, {useState} from "react";
import { NavLink, useHistory } from "react-router-dom";

function Navbar({isLoggedIn, setIsLoggedIn, board, setSearchReturn}) {
    let history = useHistory();

    const [search, setSearch] = useState("")
    let searchResults;

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleSearch(e){
        e.preventDefault();
        searchResults = board.filter( function (term) {
            return term.topic.toLowerCase().includes(search.toLowerCase()) || term.discussion.toLowerCase().includes(search.toLowerCase())
        });
        searchResults[0] ? setSearchReturn(searchResults) : setSearchReturn(null)
        history.push('/')
    }

    function logOut() {
		fetch("/logout", {
			method: "DELETE",
		}).then(() => {
            localStorage.removeItem("isLoggedIn")
            setIsLoggedIn(false)
            history.push('/')
            // console.log("Logged out")
		});        
	}

    function homeRefresh(){
        history.push('/')
        if(search != ""){
            window.location.reload(false);
        }
    }

    return (
        <div className="navbar">
            <NavLink className="Navbar-title block" to="/" onClick={homeRefresh}>Code <span>B</span> </NavLink>
            <form className="block searchbar" onSubmit={handleSearch}>
                <input 
                    className="search" 
                    type="search" 
                    placeholder="🔍 Search code_B" 
                    name="search" 
                    value={search}
                    onChange={handleChange}
                />
                &nbsp;&nbsp;
                <button className="bttn" type="submit">Search</button>
            </form>
            <nav className="navbar-links block">
                {isLoggedIn ?
                    <>
                        
                        <button className="bttn" onClick={logOut}>Logout<br/></button>
                        &nbsp;&nbsp;&nbsp;
                        <NavLink className="bttn" to='/ProfilePage'><button className="bttn">👤</button></NavLink>
                    </>
                    :
                    <>
                        <NavLink className="bttn" to='/Login'><button className="bttn">Login</button></NavLink>
                        &nbsp;&nbsp;&nbsp;
                        <NavLink className="bttn" to='/Signup'><button className="bttn">Sign up</button></NavLink>
                    </>
                }
                
            </nav>
        </div>
    )
}

export default Navbar;