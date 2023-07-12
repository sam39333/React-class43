

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
    ? products.filter((product) => {
        const category = product.category.toLowerCase();
        const selected = selectedCategory
          .replace("FAKE: ", "")
          .toLowerCase()
          .trim();

        if (selected === "men's clothing") {
          return category === "men's clothing";
        } else if (selected === "women's clothing") {
          return category === "women's clothing";
        } else {
          return category === selected;
        }
      })
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
