import "../assets/styles/sidebar.css";
import ant from "../assets/images/ant.png"
import shelter from "../assets/images/shelter.png"
import food from "../assets/images/food.png"
import { NavLink } from 'react-router-dom';
const SideBar = () => {
    return (
        <nav className="col-md-2 sidebar text-center d-none d-md-block ">
          <div className="sidebar-sticky ">
            <h5>Category</h5>
            <ul className="category-list">
                <li className ="category-item">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive ? 'active' : 'notActive'
                        }
                    >
                        <img src={ant} class="icon" alt='ant'/>Ants
                    </NavLink>
                </li>

                <li className ="category-item">
                    <NavLink
                            to="/shelters"
                            className={({ isActive }) =>
                            isActive ? 'active' : 'notActive'
                            }
                    >
                        <img src={shelter} class="icon" alt='Tank'/>Tank
                    </NavLink>
                </li>

                <li className ="category-item">
                    <NavLink
                        to="/foods"
                        className={({ isActive })  =>
                        isActive ? 'active' : 'notActive'
                        }
                    >
                        <img src={food} class="icon" alt='Supply'/>Supply
                    </NavLink>
                </li>
            </ul>
          </div>
        </nav>
    )
}

export default SideBar