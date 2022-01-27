import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


function Login({setIsLoggedIn}) {
    let history = useHistory();

    const blankFormData = {username: "", password: ""}
    const [formData, setFormData] = useState(blankFormData);    

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        logIn(formData);
        setFormData(blankFormData)
    }

    function logIn (data) {
        fetch('/login',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
        })
        .then((r) => {
          if (r.ok) {
            r.json().then((user) => {
                localStorage.setItem("isLoggedIn", true);
                setIsLoggedIn(true)
                history.push('/')
            });
          } 
          else {
            r.json().then((err) => console.log("Log in incorrect: ", err.error));
          }
        })
        .catch(error => console.log("Log in incorrect: ", error))
    }

    return (
        <div className="form">
            <h1 className='form-'>Login</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label><span>Username </span></label>
                    <input 
                        id="username-login" 
                        placeholder="Username"
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <label><span>Password </span></label>
                    <input 
                        id="password-login"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}    
                        onChange={handleChange}
                    />
                    <br /><br />
                    <button type="submit" className="bttn2">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login