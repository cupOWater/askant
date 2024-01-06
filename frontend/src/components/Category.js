import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../assets/styles/category.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { productService } from '../service/productService';
import ant from "../assets/images/ant.png"
import shelter from "../assets/images/shelter.png"
import food from "../assets/images/food.png"

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous"
/>

//Product List
const ProductsList = ({ products }) => {
  return (
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <a href={product.link}>
            <div className="card">
              <img src={product.img} className="mx-auto d-block img-fluid" alt={product.name} style={{ width: '25%', height: 'auto' }} />
              <div className="card-body">
                <h5 className="card-title text-lg">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <p className="card-text">
                  <small className="text-muted">{product.shopName}</small>
                </p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

// Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="btn btn-warning" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


const Category = () => {
  const [products, setProduct] = useState([])
  const querPa = new URLSearchParams(window.location.search);
  const selectedCategory = querPa.get('category');
  const [category, setCategory] = useState(selectedCategory)


  const fetchProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      const productsAll = res.data;

      const filteredProducts = selectedCategory
          ? productsAll.filter((products) => products.category === selectedCategory)
          : productsAll;

      setProduct(filteredProducts);

      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    fetchProducts();
  }, [selectedCategory]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="container-fluid">

      <div className="row">
      <nav className="col-md-2 sidebar text-center d-none d-md-block ">
        <div className="sidebar-sticky ">
          <h5>Category</h5>
          <ul className="category-list">
              <li className ="category-item">
                <NavLink
                    className={`nav-link ${category === 'ant' ? 'active' : 'notActive'}`}
                    to="/shop/?category=ant"
                    
                    
                  >
                    <img src={ant} class="icon" alt='ant'/> Ants
                  </NavLink>
                </li>
                  

              <li className ="category-item">
              <NavLink
                    className={`nav-link ${category === 'tank' ? 'active' : 'notActive'}`}
                    to="/shop/?category=tank"
                    
                  >
                    <img src={shelter} class="icon" alt='Tank'/> Tank
                  </NavLink>
              </li>

              <li className ="category-item">
              <NavLink
                    className={`nav-link ${category === 'supply' ? 'active' : 'notActive'}`}
                    to="/shop/?category=supply"
                    
                  >
                    <img src={food} class="icon" alt='Supply'/> Supply
                  </NavLink>
              </li>
          </ul>
        </div>
      </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h3>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/shop">Shop</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  <NavLink to={`/?category=${selectedCategory}`}>{selectedCategory}</NavLink>
                </li>
              </ol>
            </nav>
          </h3>
          <ProductsList products={displayedProducts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </div>

    </div>


  );
};

export default Category;

