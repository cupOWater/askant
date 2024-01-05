import React, { useState, useEffect } from 'react';
// import fireAnt from "../assets/images/fireAnt.png"
import "../assets/styles/category.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { productService } from '../service/productService';
import SideBar from './SideBar';

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous"
/>

// const products = [
//   {
//     name: 'Fire Ant',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 2',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 3',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 4',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 5',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 6',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 7',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 8',
//     price: '200.000 VND',
//     shopName: 'Ask Ant',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 9',
//     price: '200.000 VND',
//     shopName: 'The Best Ant Shop',
//     image: fireAnt,
//   },
//   {
//     name: 'Product 9',
//     price: '200.000 VND',
//     shopName: 'Ant Canada',
//     image: fireAnt,
//   },

// ];

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
  const [products, setProduct] = useState([])

  
  const fetchProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      setProduct(res.data);
      console.log(res.data)
    } catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('hello')
    fetchProducts();
  }, []);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log('hello')
  console.log('Products:', products);

  return (
    <div className="container-fluid">
      
      <div className="row">
       <SideBar/>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/shop">Shopping</a></li>
                        <li class="breadcrumb-item active" aria-current="page"><a href="/ants">Ants</a></li>
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

