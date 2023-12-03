import "../assets/styles/sidebar.css";
import ant from "../assets/images/ant.png"
import shelter from "../assets/images/shelter.png"
import food from "../assets/images/food.png"
import tools from "../assets/images/tools.png"
import { NavLink } from 'react-router-dom';
const SideBar = () => {
    return (
        <nav class="category">
            <h3>CATEGORY</h3>
            <ul class="category-list">
                <li class ="category-item">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive ? 'active' : ''
                        }
                    >
                        <img src={ant} class="icon"/>Ants
                    </NavLink>
                </li>

                <li class ="category-item">
                    <NavLink
                            to="/shelters"
                            className={({ isActive }) =>
                            isActive ? 'active' : ''
                            }
                    >
                        <img src={shelter} class="icon"/>Shelters
                    </NavLink>
                </li>

                <li class ="category-item">
                    <NavLink
                        to="/foods"
                        className={({ isActive }) =>
                        isActive ? 'active' : ''
                        }
                    >
                        <img src={food} class="icon"/>Foods
                    </NavLink>
                </li>

                <li class ="category-item">
                    <NavLink
                        to="/tools"
                        className={({ isActive }) =>
                        isActive ? 'active' : ''
                        }
                    >
                        <img src={tools} class="icon"/>Tools
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default SideBar