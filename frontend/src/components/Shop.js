import React, { useState, useEffect } from 'react';
import "../assets/styles/Shop.css";
import { productService } from '../service/productService';
import SideBar from './SideBar';

function Shop() {
  const [product, setProduct] = useState([])
  // const products = product.length;

  const fetchProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      setProduct(res.data);
    } catch (error) {
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
        <SideBar />

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 mt-1 mb-1">

          {Object.keys(groupedProducts).map((category) => (
            <div key={category} className="mb-4" id={category}>
              <h3>{category}</h3>
              <div className="row">
                {groupedProducts[category].slice(0, 5).map((product) => (
                  <div key={product.id} className="col-md-4 mb-3">
                    <a href={product.link}>
                      <div className="card">
                        <img src={product.img} className="mx-auto d-block img-fluid" alt={product.name} style={{ width: '25%', height: 'auto' }} />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">Price: {product.price}</p>
                          <p className="card-text">Shop: {product.shopName}</p>
                        </div>
                      </div>
                    </a>
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