import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../assets/styles/Shop.css";
import ant from "../assets/images/ant.png"
import shelter from "../assets/images/shelter.png"
import food from "../assets/images/food.png"
import tools from "../assets/images/tools.png"
import fireAnt from "../assets/images/fireAnt.png"

function RecommendHome(){
    const fakeData = [
        {
            id:1,
            imageName: fireAnt,
            productName: 'Fire Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:2,
            imageName: '',
            productName: 'Grease Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:3,
            imageName: '',
            productName: 'Pharaoh Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:4,
            imageName: '',
            productName: 'Ghost Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:5,
            imageName: '',
            productName: 'Odorous Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:6,
            imageName: '',
            productName: 'Carpenter Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:7,
            imageName: '',
            productName: 'Pavement Ants',
            price: '200.000',
            shopName:'Askant',
        },
        {
            id:8,
            imageName: '',
            productName: 'Ants',
            price: '200.000',
            shopName:'Askant',
        },
    
    ];

    const [product, setProduct] = useState(fakeData)


    return (
    <div className="shop-page">
        <div className='sidebar-shop'>
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
        </div>
        <div className='product-display'>
            <h4>Ants</h4>
            <div className='card-holder row justify-content-center'>
                {product.map((product) => (
                    <Link to={'/${product._id}'}>
                        <div className="card">
                            <div className='image-holder'>
                                <img src={product.imageName} className='card-img-top' alt="product " />
                            </div>
                            <div className="card-body">
                                <h5 className="product-name">{product.productName}</h5>
                                <p className="card-text price">{product.price} VND</p>
                                <p className="card-text"><b>{product.shopName}</b></p>
                            </div>
                        </div>
                    </Link> 
                ))}
            </div>
        </div>
    </div>
    )
}

export default RecommendHome;