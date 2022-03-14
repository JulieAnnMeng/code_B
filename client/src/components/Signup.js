import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


function Signup({setIsLoggedIn}) {
    let history = useHistory();

    const blankFormData = {first_name: "", last_name: "", username: "", password: "", password_confirmation: ""}
    const [formData, setFormData] = useState(blankFormData);    
    const [error, setError] = useState();

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
            r.json().then((err) => setError(err.error));
          }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="form outside">
            <p className="alert">{error}</p>
            <h1 className='form-title'>Signup</h1>
            <div>
                <form className="inside"onSubmit={handleSubmit}>
                    <label className="label"><span>First name </span></label>
                    <input 
                        id="firstname-signup" 
                        placeholder="First name"
                        className="input"
                        name="first_name" 
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />
                    <label className="label"><span>Last name </span></label>
                    <input 
                        id="lastname-signup"
                        placeholder="Last name"
                        className="input"
                        name="last_name" 
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />
                    <label className="label"><span>Username </span></label>
                    <input 
                        id="username-signup"
                        placeholder="username"
                        className="input"
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />
                    <label className="label"><span>Password </span></label>
                    <input 
                        id="password-signup" 
                        placeholder="password"
                        className="input"
                        type="password"
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />
                    <label className="label"><span>Password Confirmation </span></label>
                    <input 
                        id="password-confirmation-signup" 
                        placeholder="Password confirmation"
                        className="input"
                        type="password"
                        name="password_confirmation" 
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />
                    <button type="submit" className="bttn2">Signup</button>
                </form>
            </div>    
        </div>
    )
}

export default Signup