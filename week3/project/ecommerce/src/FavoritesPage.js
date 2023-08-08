
import React, { useEffect, useState } from "react";
import { useFavoriteContext } from "./FavoriteContext"; // Import the context

function FavoritesPage() {
  const { favorites } = useFavoriteContext();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      const productPromises = favorites.map((productId) =>
        fetch(`https://fakestoreapi.com/products/${productId}`).then(
          (response) => response.json()
        )
      );
      const products = await Promise.all(productPromises);
      setFavoriteProducts(products);
    };

    fetchFavoriteProducts();
  }, [favorites]);

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {favoriteProducts.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="favorites-list">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="favorite-product">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
