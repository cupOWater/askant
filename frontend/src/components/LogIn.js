import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../service/authService';

function LogIn({ setUser }) { // userType : "" -> Guest, "User" -> User
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // Entered username(ID)
    const [password, setPassword] = useState(""); // Entered password


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await authService.login(email, password)
        if (response.status === 200) {
            setUser(response.data.user);
            navigate("/");
        }else{
            alert(response.response.data)
        }
    }

    if (localStorage.getItem("aToken")) {
        return (
            <Navigate to={"/"} replace={true} />
        )
    }
    else {
        return (
            <div className="login-container col-sm-3 mx-auto mt-4">
                <form
                    onSubmit={handleSubmit}
                >
                    <h2 className='welcome-text'>Welcome!</h2>
                    <hr />
                    <div className="my-4">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            id="userName"
                            type="email"
                            placeholder="Enter your email..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                    <input type='submit' className="login-btn col-12 mb-3" value={"LOG IN"} />
                    <p className="text-muted register-text">Are you a guest? <Link to={"/register"}>Be our member!</Link></p>
                </form>
            </div>
        )
    }


}

export default LogIn;