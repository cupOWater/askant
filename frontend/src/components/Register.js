// NOTE!!
// Our system has to check the username(ID) is unique from database.
// If the username is not unique(Already exists on database), the system should inform to user.
// It requires backend work!

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../service/authService';

function Register({setUser}) {
    const [userName, setUserName] = useState(""); // Entered username(ID)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Entered password
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authService.register(userName, email, password);
        if(response.status === 201){
            setUser(response.data.user);
            navigate("/");
        }else{
            alert(response.response.data)
        }
    }

    return (
        <>
        {(localStorage.getItem("aToken"))
            ?
            <Navigate to={"/"} replace={true}/>
            :
            <div className="login-container col-sm-8 mx-auto mt-5">
                <h2 className='registration-text'>Registration</h2>
                <hr />
                <form 
                onSubmit={handleSubmit}
                className="row">
                    <div className="mb-3">
                        <label className="form-label">Username<span>*</span></label>
                        <input 
                            className="form-control" 
                            id="userName"
                            type="text"
                            placeholder="Enter your username..."  
                            minLength="5" maxLength="16" 
                            title="Username length must be from 5 to 16." 
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
                    <input type='submit' className="login-btn col-12 mb-3" value={"REGISTER"}/>
                    <p className="text-muted register-text">Are you a member? <Link to={"/login"}>Let's Login!</Link></p>
                </form>
            </div>
        }
        </>
    )
}

export default Register;