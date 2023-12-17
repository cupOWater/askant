import React, { useState } from 'react';
import fireAnt from "../assets/images/fireAnt.png"
import "../assets/styles/category.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ant from "../assets/images/ant.png"
import shelter from "../assets/images/shelter.png"
import food from "../assets/images/food.png"
import tools from "../assets/images/tools.png"
import { NavLink } from 'react-router-dom';
import Footer from "./Footer";

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous"
/>

const products = [
  {
    name: 'Fire Ant',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 2',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 3',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 4',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 5',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 6',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 7',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 8',
    price: '200.000 VND',
    shopName: 'Ask Ant',
    image: fireAnt,
  },
  {
    name: 'Product 9',
    price: '200.000 VND',
    shopName: 'The Best Shop Ant',
    image: fireAnt,
  },
  {
    name: 'Product 9',
    price: '200.000 VND',
    shopName: 'Ant Canada',
    image: fireAnt,
  },

];

//Product List
const ProductsList = ({ products }) => {
  return (
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card">
            <img src={product.image} className="mx-auto d-block img-fluid" alt={product.name} style={{width:'25%', height: 'auto'}}/>
            <div className="card-body">
              <h5 className="card-title text-lg">{product.name}</h5>
              <p className="card-text">{product.price}</p>
              <p className="card-text">
                <small className="text-muted">{product.shopName}</small>
              </p>
            </div>
          </div>
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
        <nav className="col-md-2 d-none d-md-block sidebar text-center ">
          {/* Sidebar content goes here */}
          <div className="sidebar-sticky ">
            <h5>Category</h5>
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
                        className={({ isActive })  =>
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
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Shopping</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Ants</li>
                    </ol>
                </nav>
            </h3>
          <ProductsList products={displayedProducts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Category;

