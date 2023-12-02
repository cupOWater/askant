// NOTE!!
// Our system has to check the username(ID) is unique from database.
// If the username is not unique(Already exists on database), the system should inform to user.
// It requires backend work!

import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ userType, user }) {
    const fakeUserType = ""; // MUST delete after backend work is done; dummy
    const fakeUsername = "Tony1234";  // MUST delete after backend work is done; dummy

    const [userName, setUserName] = useState(""); // Entered username(ID)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Entered password
    
    return (
        <>
        {(fakeUserType==="User") // MUST change to 'userType' after backend work is done
            ?
            <div className="pt-5">
                <h2 className='loggedIn-text'>You are logged in, {fakeUsername // MUST change to 'user.username' after backend work is done
                } :D</h2> 
            </div>
            :
            <div className="login-container col-sm-8 mx-auto mt-5">
                <h2 className='registration-text'>Registration</h2>
                <hr />
                <form 
                //onSubmit={register} -> register process; make sure it should be functioned on backend work!
                className="row">
                    <div className="mb-3">
                        <label className="form-label">Username<span>*</span></label>
                        <input 
                            className="form-control" 
                            id="userName"
                            type="text"
                            placeholder="Enter your username (ID)..."  
                            minLength="5" maxLength="12" 
                            title="Username length must be from 5 to 12." 
                            onChange={(e) => setUserName(e.target.value)} 
                            value={userName}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email<span>*</span></label>
                        <input 
                            className="form-control register-form" 
                            id="userEmail"
                            type="email" 
                            placeholder="Enter your email..."  
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password<span>*</span></label>
                        <input 
                            className="form-control" 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password..." 
                            minLength="8" maxLength="20" 
                            title="Password length should be from 8 to 20." 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <button className="login-btn col-12 mb-3">REGISTER</button>
                    <p className="text-muted register-text">Are you a member? <Link to={"/login"}>Let's Login!</Link></p>
                </form>
            </div>
        }
        </>
    )
}

export default Register;