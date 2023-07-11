/*
   deploy to netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/a70f5038-9987-4ce2-b49b-537565a8e9b8/deploy-status)]
(https://app.netlify.com/sites/hyf-sam-ecommerce/deploys)*/

import React, { useState } from "react";
import categories from "./fake-data/all-categories";
import products from "./fake-data/all-products";
import "./App.css";



function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

const filteredProducts = selectedCategory
  ? products.filter((product) =>
      product.category
        .toLowerCase()
        .includes(selectedCategory.replace("FAKE: ", "").toLowerCase())
    )
  : products;



  return (
    <div className="App">
      <h1>Products</h1>
      <nav className="navbar">
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      </nav>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;







