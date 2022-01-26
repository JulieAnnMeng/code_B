import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProfilePage({user, getUser}) {
    let iconSmall;

    useEffect(() => {
          getUser()
      }, []);

    if(user) {
        if(user.icon){
            iconSmall = <img src={user.icon} alt="usericon" className='icon-img-profile'/>;
        } else {
            iconSmall = <em className='small-icon'>{user.first_name.charAt(0) + user.last_name.charAt(0)}</em>;
        }
    }

    return (
        <div><br /><br />
            <div>
                <div className="container">
                    <div>
                        <div>
                            <h2 className="board">Profile</h2> 
                        </div>
                        <div>
                            <Link to="/ProfileEdit" className="btn btn2" aria-label="editbutton" aria-describedby="basic-addon1"><span className="edit-btn btn bttn2">EDIT</span></Link>
                        </div>
                    </div>                  
                    <div className="outside">
                        <div>
                            <h3 className="profile-title">Personal Info</h3><br />
                            <div className="inside" style={{height: 319}}>
                            {/* change to */}
                                <p className="txt"><span>Name: </span>{user.first_name} {user.last_name}</p><br />
                                <p className="txt"><span>Username: </span>{user.username}</p><br />
                                <p className="txt"><span>Icon:  </span>{iconSmall}</p><br />
                                <p className="txt"><span>Password: </span>**********</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="profile-title">Personal Stats</h3><br />
                            <div className="inside" style={{height: 319}}>
                                <br /><p className="txt"><span>Interests: </span>{user.profilePage.interest}</p><br />
                                <p className="txt"><span>Discussions: </span>{user.profilePage.discussion}</p><br />
                                <p className="txt"><span>Comments: </span>{user.profilePage.comment}</p><br />
                            </div>
                        </div>
                    </div><br />
                </div><br />
            </div>
        </div>
    )
}

export default ProfilePage