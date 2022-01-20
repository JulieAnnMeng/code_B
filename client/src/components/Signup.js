import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


function Signup({setIsLoggedIn}) {
    let history = useHistory();

    const blankFormData = {first_name: "", last_name: "", username: "", password: "", password_confirmation: ""}
    const [formData, setFormData] = useState(blankFormData);    

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        signUp(formData);
        setFormData(blankFormData)
    }

    function signUp (data) {
        fetch('/signup',{
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
            r.json().then((err) => console.log("Please fill out all inputs: ", err.errors));
          }
        })
        .catch(error => console.log("Log in incorrect: ", error))
    }

    return (
        <div className="form">
            <h1 className='form-title'>Signup</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label><span>First name </span></label>
                    <input 
                        id="firstname-signup" 
                        placeholder="First name"
                        name="first_name" 
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <label><span>Last name </span></label>
                    <input 
                        id="lastname-signup"
                        placeholder="Last name"
                        name="last_name" 
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <label><span>Username </span></label>
                    <input 
                        id="username-signup"
                        placeholder="username"
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <label><span>Password </span></label>
                    <input 
                        id="password-signup" 
                        placeholder="password"
                        type="password"
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <label><span>Password Confirmation </span></label>
                    <input 
                        id="password-confirmation-signup" 
                        placeholder="Password confirmation"
                        type="password"
                        name="password_confirmation" 
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <button type="submit" className="bttn2">Signup</button>
                </form>
            </div>    
        </div>
    )
}

export default Signup