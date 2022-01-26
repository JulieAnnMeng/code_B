import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'


function ProfileEdit({user, getUser}) {
    const history = useHistory();
    const blankFormData = {first_name: '', last_name: '', username: '', icon: '', password: '', new_password: '', new_password_confirmation: ''};
    const [formData, setFormData] = useState(blankFormData); 
    const [toggle, setToggle] = useState(false);
    const [match, setMatch] = useState(true);

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function passwordMatch(){
        if (formData.new_password !== formData.new_password_confirmation) {
            setMatch(false)
        } else { setMatch(true) }
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        if(formData.password === null){
            console.log("Current password is required");
        } else if(toggle && formData.new_password === null && formData.new_password_confirmation === null ){
            console.log("Please confirm your passwords");
        } else if (formData.new_password !== formData.new_password_confirmation) {
            console.log("Passwords must match");
            passwordMatch();
        } 
        else {
            passwordMatch()        
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
            }
          else {
            r.json().then((err) => console.log(err.errors));
          }
          getUser();
          history.push(`/ProfilePage`);
        })
        .catch(error => console.log("Log in incorrect: ", error))
    }

    return (
        <div><br />
        <h1 className='form-title2'>Profile Edits</h1><br />
        <div className='container outside'>
            <div className='container inside'>
                <br /><h1 className='form-type-title'>Personal Information: </h1><br />
                &nbsp;
                <form className='container edit-form right' onSubmit={handleSubmit}>
                    <br /><div>
                        <label className="edit-label"><span>Firstname</span></label>
                        <div className="edit-input" style={{width: '55%'}}>
                            <input 
                                id="firstname-edit" 
                                className="form-control input" 
                                type="firstname" 
                                placeholder="First name"
                                name="first_name" 
                                pattern="/^[A-Za-z]+$/" 
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    &nbsp;
                    <div>
                        <label className="edit-label"><span>Lastname</span></label>
                        <div className="edit-input" style={{width: '55%'}}>
                            <input 
                                id="lastname-edit"
                                type="lastname" 
                                className="form-control input" 
                                placeholder="Last name"
                                name="last_name" 
                                pattern="/^[A-Za-z]+$/" 
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    &nbsp; 
                    <div>
                        <label className="edit-label"><span>Username</span></label>
                        <div className="edit-input" style={{width: '55%'}}>
                            <input 
                                id="username-edit"
                                type="username" 
                                className="form-control input" 
                                placeholder="username"
                                name="username" 
                                // pattern="/^[A-Za-z]+$/" 
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    &nbsp;
                    <div>
                        <label className="edit-label"><span>Icon URL</span></label>
                        <div className="edit-input" style={{width: '55%'}}>
                            <input 
                                id="icon-edit"
                                type="icon" 
                                className="form-control input" 
                                placeholder="icon"
                                name="icon" 
                                // pattern="/^[A-Za-z]+$/" 
                                value={formData.icon}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    &nbsp;
                    <div>
                        <h2 className="title">To confirm your changes, please enter your password</h2><br /><br /><br />
                        <label className="edit-label"><span>Current Password</span></label>
                        <div className="edit-input" style={{width: '55%'}}>
                            <input 
                                id="current-password-edit" 
                                type="password" 
                                className="form-control input" 
                                placeholder="Current Password" 
                                name="password" 
                                // pattern="/^\s*$/" 
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    &nbsp;
                    <div>
                        <button type="submit" className="btn password-bttn bttn">Update</button>
                        &nbsp; &nbsp;
                        <button className="btn password-bttn bttn" onClick={handleToggle}> {toggle ? "Nevermind" : "Change Password"} </button>                    
                    </div>
                    {/* Password Change Section */}
                    <div className={toggle ? undefined : 'hidden'}><br />
                        <div className="edit-password conatainer card"><br />
                            <div className="edit-password">
                                <label className="edit-label"><span>New Password</span></label>
                                <div style={{width: '55%'}}>
                                    <input 
                                        id="new-password-edit" 
                                        type="password" 
                                        className="form-control input" 
                                        placeholder="New Password"
                                        name="new_password" 
                                        // pattern="/^\s*$/" 
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        required={toggle}
                                        style={{backgroundColor: match ? 'none' : 'red'}}
                                    />
                                </div>
                            </div>
                            &nbsp;
                            <div className="edit-password">
                                <label className="edit-label"><span>New Password Confirmation</span></label>
                                <div  style={{width: '55%'}}>
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
                            </div>
                        </div>
                    </div>    
                </form><br />
            </div><br />
        </div><br />
    </div>
    )
}

export default ProfileEdit