import React, { useState, useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import { useFavoriteContext, FavoriteProvider } from "./FavoriteContext";
import "./App.css";
import ProductDetail from "./ProductDetail";
import FavoritesPage from "./FavoritesPage";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, toggleFavorite } = useFavoriteContext();

  useEffect(() => {
    setIsProductSelected(location.pathname.startsWith("/product/"));
  }, [location]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setIsProductSelected(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsProductSelected(true);
  };

  return (
    <div className="App">
     
      {!isProductSelected && <h1>Products</h1>}
      {!isProductSelected && (
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
            <ul className="navbar-list"  id="navbar">
              <li>
                <Link to="/">Products</Link>
              </li>
              <li>
                <Link to="/favourites">Favorites</Link>
              </li>
            </ul>
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/"
          element={
            <div className="products-grid">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                products.map(({ id, image, title, description }) => (
                  <div key={id} className="product-item">
                    <img src={image} alt={title} />
                    <button
                      onClick={() => toggleFavorite(Number(id))}
                      className="favorite-button"
                    >
                      <img src={"./assets/heart-regular.svg"} alt="Favorite" />
                    </button>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </div>
                ))
              )}
            </div>
          }
        />
        <Route path="/favourites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  );
}

export default WrappedApp;
