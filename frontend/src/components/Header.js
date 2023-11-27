import logo from "../assets/images/logo.png"
import PersonCircle from "../assets/images/person-circle.svg"
import "../assets/styles/header.css";

function Header({ userType, username }) { // userType : "" -> Guest, "User" -> User
    const fakeUserType = "" // MUST delete after backend work is done; dummy (If you want to test as user, make this variable as User.)
    const fakeUsername = "Tony1234"  // MUST delete after backend work is done; dummy

    const logout = event => {
        event.preventDefault();

        // require backend for logout function

        alert("Successfully logged out!");
        window.location.href = '/';
    }

    return (
        <header className="header">
            <nav>
                <ul>  
                    <div className="headerLeft">
                        <li className="headerLeftItem fst-normal"><a className="leftItems" href="#">Shopping</a></li>
                        <li className="headerLeftItem fst-normal"><a className="leftItems" href="/">Forum</a></li>
                    </div>
                    <div className="headerCenter">
                        <li><a href="/"><img src={logo} className="headerImage"></img></a></li>
                    </div>
                    <div className="headerRight">
                        {(fakeUserType === "") ? // MUST change to 'userType' after backend work is done
                            <>
                                <li className="headerRightItem fst-normal"><a href="/register"><button type="button" className="btn btn-outline-success fst-normal">Sign up</button></a></li>
                                <li className="headerRightItem fst-normal"><a href="/LogIn"><button type="button" className="btn btn-outline-warning fst-normal">Log In</button></a></li>
                            </>
                        :
                            <> 
                                <li className="headerRightItem fst-normal"><a href="#"><button type="button" className="btn btn-outline-primary fst-normal"><img className="personCircle" src={PersonCircle} />{fakeUsername // MUST change to 'username' after backend work is done
                                }</button></a></li> 
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