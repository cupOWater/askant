import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav id="navbar">
            <NavLink to={'/'} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>Home</NavLink>
            <NavLink to={'/shop'}>Currated Shops</NavLink>
        </nav>
    );
}

export default Navbar;