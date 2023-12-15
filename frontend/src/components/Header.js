import { useNavigate } from "react-router";
import logo from "../assets/images/logo.png"
import PersonCircle from "../assets/images/person-circle.svg"
import "../assets/styles/Header.css";
import { authService } from "../service/authService";

function Header({ user, setUser }) { // userType : "" -> Guest, "User" -> User
    const navigate = useNavigate();

    const logout = event => {
        event.preventDefault();
        authService.logout();
        setUser();
        navigate("/");
    }
    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="headerLeft">
                        <li className="headerLeftItem fst-normal"><a className="leftItems" href="/">Forum</a></li>
                        <li className="headerLeftItem fst-normal"><a className="leftItems" href="#">Shopping</a></li>
                    </div>
                    <div className="headerCenter">
                        <li className="headerCenterItem"><a href="/"><img src={logo} className="headerImage"></img></a></li>
                    </div>
                    <div className="headerRight">
                        {(!user) ? // MUST change to 'userType' after backend work is done
                            <>
                                <li className="headerRightItem fst-normal"><a href="/register"><button type="button" className="btn btn-outline-success fst-normal">Sign up</button></a></li>
                                <li className="headerRightItem fst-normal"><a href="/LogIn"><button type="button" className="btn btn-outline-warning fst-normal">Log In</button></a></li>
                            </>
                            :
                            <>
                                <li className="headerRightItem fst-normal"><a href="#"><button type="button" className="btn btn-outline-primary fst-normal"><img className="personCircle" src={PersonCircle} />{user.userName}</button></a></li>
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