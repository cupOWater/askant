import "../assets/styles/header.css";

function Header() {
    return (
        <header className="header">
            <div className="headerTop">
                <nav>
                    <ul className="mb-0 pb-0">
                        <li><a href="#">Save More on App</a></li>
                        <li><a href="/search">Sell On Lazada</a></li>
                        <li><a href="#">Lazada Care</a></li>
                        <li></li>
                    </ul>
                </nav>
            </div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary my-0">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} className="headerImage ms-2"></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#lazadaHeader" aria-controls="lazadaHeader" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex float-right" id="lazadaHeader">
                        <a href="/cart">
                            <button className="cartBtn me-3">

                            </button>
                        </a>
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;