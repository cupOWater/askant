import { Link } from 'react-router-dom';
import { useState } from 'react';

function LogIn(userType, user) { // userType : "" -> Guest, "User" -> User
    const fakeUserType = "user"; // MUST delete after backend work is done; dummy
    const fakeUsername = "Tony1234";  // MUST delete after backend work is done; dummy
    const [ID, setID] = useState(""); // Entered username(ID)
    const [password, setPassword] = useState(""); // Entered password

    return (
    <>
        {(fakeUserType!=="") // MUST change to 'userType' after backend work is done
            ?
            <div className="pt-5">
                <h2 className='loggedIn-text'>You are logged in, {fakeUsername // MUST change to 'user.username' after backend work is done
                } :D</h2> 
            </div>
            :
            <div className="login-container col-sm-3 mx-auto mt-4">
                <form 
                // onSubmit={logIn} -> login process; make sure it should be functioned on backend work!
                >
                    <h2 className='welcome-text'>Welcome!</h2>
                    <hr />
                    <div className="my-4">
                        <label className="form-label">Username (ID)</label>
                        <input 
                            className="form-control" 
                            id="userName" 
                            type="text" 
                            placeholder="Enter your username (ID)..." 
                            onChange={(e) => setID(e.target.value)}
                            value={ID}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password</label>
                        <input 
                            className="form-control" 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password..." 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required 
                        />
                    </div>
                    <button className="login-btn col-12 mb-3">LOG IN</button>
                    <p className="text-muted register-text">Are you a guest? <Link to={"/register"}>Be our member!</Link></p>
                </form>
            </div>
        }
        </>
    )
}

export default LogIn;