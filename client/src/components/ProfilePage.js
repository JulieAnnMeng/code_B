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
                <div className="outside block">
                    <div>
                        <h2 className="board">Profile  <Link to="/ProfileEdit" className="edit-btn bttn2 right">EDIT</Link></h2> 
                    </div> 
                    {user ?               
                        <div>
                            <div className="block profile inside">
                                <h3 className="profile-title">Personal Info</h3><br />
                                <div>
                                    <p className="txt"><span>Name: </span>{user.first_name} {user.last_name}</p><br />
                                    <p className="txt"><span>Username: </span>{user.username}</p><br />
                                    <p className="txt"><span>Icon:  </span>{iconSmall}</p><br />
                                    <p className="txt"><span>Password: </span>**********</p>
                                </div>
                            </div>
                            <div className="block profile inside">
                                <h3 className="profile-title">Personal Stats</h3><br />
                                <div>
                                    <br /><p className="txt"><span>Interests: </span>{user.profilePage.interest}</p><br />
                                    <p className="txt"><span>Discussions: </span>{user.profilePage.discussion}</p><br />
                                    <p className="txt"><span>Comments: </span>{user.profilePage.comment}</p><br /><br />
                                </div>
                            </div>
                        </div>
                        :
                        <h1>Loading...</h1>}
                </div><br />
            </div>
        </div>
    )
}

export default ProfilePage