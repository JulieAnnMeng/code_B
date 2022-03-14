import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function ProfileEdit({user, getUser}) {
    const history = useHistory();
    const blankFormData = {first_name: '', last_name: '', username: '', icon: '', password: '', new_password: '', new_password_confirmation: ''};
    const [formData, setFormData] = useState(blankFormData); 
    const [toggle, setToggle] = useState(false);
    const [match, setMatch] = useState(true);
    const [error, setError] = useState();

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function passwordUpdate(){
        if (formData.new_password !== formData.new_password_confirmation) {
            setMatch(false)
            setError("Passwords must match")
        } 
        else { 
            setMatch(true)
            userEdit(user.id, formData);
            setFormData("");
        }
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        if(toggle){  
            passwordUpdate()
        } else {
            userEdit(user.id, formData);
            setFormData("");
        }
    }

    function handleToggle(e) {
        e.preventDefault();
        setToggle(!toggle);
    }

    function userEdit(id, data){
        let updates = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
        fetch(`/userEdit/${id}`,{
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(updates)
        })
        .then((r) => {
          if (r.ok) {
            r.json();
            getUser();
            history.push(`/ProfilePage`);
            }
          else {
            r.json().then((err) => {
                setError(err.error)
            });
          }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h1 className='form-title2'>Profile Edits</h1>
            <div className='outside'><br />
                <div className='inside'><br />
                    <p className='alert'>{error}</p>
                    <h1 className='form-type-title'>Personal Information:</h1><br />
                    <form className='edit-form' onSubmit={handleSubmit}>
                        <div>
                            <div className="block" >
                                <label className="edit-label"><span>Firstname</span></label>
                                <input 
                                    id="firstname-edit" 
                                    type="firstname" 
                                    className="input" 
                                    placeholder="First name"
                                    name="first_name" 
                                    pattern="/^[A-Za-z]+$/" 
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div><br/>
                        <div>
                            <div className="block">
                                <label className="edit-label"><span>Lastname</span></label>
                                <input 
                                    id="lastname-edit"
                                    type="lastname" 
                                    className="input" 
                                    placeholder="Last name"
                                    name="last_name" 
                                    pattern="/^[A-Za-z]+$/" 
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div><br/>
                        <div>
                            <div className="block">
                                <label className="edit-label"><span>Username</span></label>
                                <input 
                                    id="username-edit"
                                    type="username" 
                                    className="input" 
                                    placeholder="username"
                                    name="username" 
                                    // pattern="/^[A-Za-z]+$/" 
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div><br/>
                        <div>
                            <div className="block">
                                <label className="edit-label"><span>Icon URL</span></label>                            
                                <input 
                                    id="icon-edit"
                                    type="icon" 
                                    className="input" 
                                    placeholder="icon"
                                    name="icon" 
                                    // pattern="/^[A-Za-z]+$/" 
                                    value={formData.icon}
                                    onChange={handleChange}
                                />
                            </div>
                        </div><br/><br/>
                        <div>
                            <h2 className="title">To confirm your changes, please enter your password</h2><br />
                            
                            <div className="block">
                                <label className="edit-label"><span>Current Password</span></label>
                                <input 
                                    id="current-password-edit" 
                                    type="password" 
                                    className="input" 
                                    placeholder="Current Password" 
                                    name="password" 
                                    // pattern="/^\s*$/" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div><br/>
                        <div className="edit-bttn">
                            <button type="submit" className="password-bttn bttn">Update</button>
                            &nbsp; &nbsp;
                            <button className="password-bttn bttn" onClick={handleToggle}> {toggle ? "Nevermind" : "Change Password"} </button>                    
                        </div>
                        {/* Password Change Section */}
                        <div className={toggle ? undefined : 'hidden'}><br />
                            <div className="edit-password"><br />
                                <div className="edit-password">
                                    <div className="block">
                                        <label className="edit-label"><span>New Password</span></label>
                                        <input 
                                            id="new-password-edit" 
                                            type="password" 
                                            className="input" 
                                            placeholder="New Password"
                                            name="new_password" 
                                            // pattern="/^\s*$/" 
                                            value={formData.new_password}
                                            onChange={handleChange}
                                            required={toggle}
                                            style={{backgroundColor: match ? 'none' : 'red'}}
                                        />
                                    </div>
                                </div><br/>
                                <div className="edit-password">
                                    <div className="block">
                                        <label className="edit-label"><span>New Password Confirmation</span></label>
                                        <input 
                                            id="new-password-confirmation-edit" 
                                            type="password" 
                                            className="form-control input" 
                                            placeholder="New Password confirmation" 
                                            name="new_password_confirmation" 
                                            // pattern="/^\s*$/" 
                                            value={formData.new_password_confirmation}
                                            onChange={handleChange}
                                            required={toggle}
                                            style={{backgroundColor: match ? 'none' : 'red'}}
                                        />
                                    </div>
                                </div><br/>
                            </div>
                        </div>    
                    </form><br />
                </div><br />
            </div><br />

        </div>
    )
}

export default ProfileEdit