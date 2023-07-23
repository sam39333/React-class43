import React, { useState } from "react";
import categories from "./fake-data/all-categories";
import products from "./fake-data/all-products";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const filteredProducts = selectedCategory
    ? products.filter(({ category }) => {
        const selected = selectedCategory
          .replace("FAKE: ", "")
          .toLowerCase()
          .trim();
        return category.toLowerCase().trim() === selected;
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
        {filteredProducts.map(({ id, image, title, description }) => (
          <div key={id} className="product-item">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
