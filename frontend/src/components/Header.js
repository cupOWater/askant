import logo from "../assets/images/logo.png"
import "../assets/styles/header.css";

function Header() {
    return (
        <header className="header">
            <nav>
                <ul className="mb-0 pb-0">  
                    <div className="headerLeft">
                        <li className="headerLeftItem">Shopping</li>
                        <li className="headerLeftItem">Forum</li>
                    </div>
                    <div className="headerCenter">
                        <li><img src={logo} className="headerImage ms-2"></img></li>
                    </div>
                    <div className="headerRight">
                        <li className="headerRightItem">Sign up</li>
                        <li className="headerRightItem"><button type="button" class="btn btn-warning">Log in</button></li>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header;