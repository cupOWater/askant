import { useNavigate } from "react-router";
import logo from "../assets/images/logo.png"
import PersonCircle from "../assets/images/person-circle.svg"
import "../assets/styles/header.css";
import { authService } from "../service/authService";
import { Link } from "react-router-dom";

function Header({ user, setUser }) { // userType : "" -> Guest, "User" -> User
    const navigate = useNavigate();

    const logout = event => {
        event.preventDefault();
        authService.logout();
        setUser();
        navigate("/");
        window.location.reload();
    }
    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="headerLeft">
                        <li className="headerLeftItem fst-normal">
                            <Link className="leftItems" to={"/"}>Forum</Link>
                        </li>
                        <li className="headerLeftItem fst-normal">
                            <Link className="leftItems" to={"/"}>Shopping</Link>
                        </li>
                    </div>
                    <div className="headerCenter">
                        <li className="headerCenterItem"><a href="/"><img src={logo} className="headerImage"></img></a></li>
                    </div>
                    <div className="headerRight">
                        {(!user) ?
                            <>
                                <li className="headerRightItem fst-normal"><a href="/register"><button type="button" className="btn btn-outline-success fst-normal">Sign up</button></a></li>
                                <li className="headerRightItem fst-normal"><a href="/LogIn"><button type="button" className="btn btn-outline-warning fst-normal">Log In</button></a></li>
                            </>
                            :
                            <>
                                <li className="headerRightItem fst-normal"><button type="button" className="btn btn-outline-primary fst-normal"><img className="personCircle" src={PersonCircle} />{user.userName}</button></li>
                                <li className="headerRightItem"><button type="button" className="btn btn-danger fst-normal" onClick={logout}>Log Out</button></li>
                            </>
                        }
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header;