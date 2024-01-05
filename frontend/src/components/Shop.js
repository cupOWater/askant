import React, {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../assets/styles/Shop.css";
import ant from "../assets/images/ant.png"
import shelter from "../assets/images/shelter.png"
import food from "../assets/images/food.png"
import fireAnt from "../assets/images/fireAnt.png"
import { productService } from '../service/productService';

function Shop(){
    // const fakeData = [
    //     { id: 1, category: 'Electronics',image: fireAnt, name: 'Smartphone', price: '$500', shopName: 'Askant' },
    //     { id: 2, category: 'Electronics',image: fireAnt, name: 'Laptop', price: '$1000' , shopName: 'Askant'},
    //     { id: 3, category: 'Electronics',image: fireAnt, name: 'Headphones', price: '$50', shopName: 'Askant' },
    //     { id: 4, category: 'Electronics',image: fireAnt, name: 'Smartwatch', price: '$150' , shopName: 'Askant'},
    //     { id: 5, category: 'Electronics',image: fireAnt, name: 'Tablet', price: '$300', shopName: 'Askant' },
    //     { id: 6, category: 'Clothing',image: fireAnt, name: 'T-Shirt', price: '$20' , shopName: 'Askant'},
    //     { id: 7, category: 'Clothing',image: fireAnt, name: 'Jeans', price: '$50', shopName: 'Askant' },
    //     { id: 8, category: 'Clothing',image: fireAnt, name: 'Hoodie', price: '$40', shopName: 'Askant' },
    //     { id: 9, category: 'Clothing',image: fireAnt, name: 'Sneakers', price: '$60' , shopName: 'Askant'},
    //     { id: 10, category: 'Clothing',image: fireAnt, name: 'Dress', price: '$70', shopName: 'Askant' },
    //     { id: 11, category: 'Books',image: fireAnt, name: 'JavaScript Book', price: '$30', shopName: 'Askant' },
    //     { id: 12, category: 'Books',image: fireAnt, name: 'React Book', price: '$35', shopName: 'Askant' },
    //     { id: 13, category: 'Books',image: fireAnt, name: 'Python Book', price: '$25', shopName: 'Askant' },
    //     { id: 14, category: 'Books',image: fireAnt, name: 'Data Science Book', price: '$40', shopName: 'Askant' },
    //     { id: 15, category: 'Books',image: fireAnt, name: 'Design Patterns Book', price: '$45', shopName: 'Askant' },
    
    // ];

    const [product, setProduct] = useState([])
    // const products = product.length;

    const fetchProducts = async () => {
      try {
        const res = await productService.getAllProducts();
        setProduct(res.data);
      } catch (error){
        console.log(error);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    const groupedProducts = product.reduce((acc, product) => {
        acc[product.category] = [...(acc[product.category] || []), product];
        return acc;
    }, {});

    return (
    <div className="container-fluid">
      <div className="row">
      <nav className="col-md-2 d-none d-md-block sidebar text-center ">
          <div className="sidebar-sticky ">
            <h5>Category</h5>
            <ul class="category-list">
                <li class ="category-item">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive ? 'active' : 'notActive'
                        }
                    >
                        <img src={ant} class="icon"/>Ants
                    </NavLink>
                </li>

                <li class ="category-item">
                    <NavLink
                            to="/shelters"
                            className={({ isActive }) =>
                            isActive ? 'active' : 'notActive'
                            }
                    >
                        <img src={shelter} class="icon"/>Tank
                    </NavLink>
                </li>

                <li class ="category-item">
                    <NavLink
                        to="/foods"
                        className={({ isActive })  =>
                        isActive ? 'active' : 'notActive'
                        }
                    >
                        <img src={food} class="icon"/>Supply
                    </NavLink>
                </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 mt-1 mb-1">

          {Object.keys(groupedProducts).map((category) => (
            <div key={category} className="mb-4" id={category}>
              <h3>{category}</h3>
              <div className="row">
                {groupedProducts[category].slice(0, 5).map((product) => (
                  <div key={product.id} className="col-md-4 mb-3">
                    <div className="card">
                      <img src={product.image} className="mx-auto d-block img-fluid" alt={product.name} style={{width:'25%', height: 'auto'}} />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: {product.price}</p>
                        <p className="card-text">Shop: {product.shopName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
    )
}

export default Shop;