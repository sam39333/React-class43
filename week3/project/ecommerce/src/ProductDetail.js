import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavoriteContext } from "./FavoriteContext"; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoriteContext();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
    return () => {
      navigate("/");
    };
  }, [id, navigate]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(Number(id)));
  }, [favorites, id]);

  const handleToggleFavorite = () => {
    toggleFavorite(Number(id));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-detail">
      {product ? (
        <div className="product-container">
          <div className="product-image">
            <button onClick={handleToggleFavorite} className="favorite-button">
              <img
                src={
                  isFavorite
                    ? "/path/to/heart-solid.svg"
                    : "/path/to/heart-regular.svg"
                }
                alt={isFavorite ? "Solid Heart" : "Regular Heart"}
                className="heart-icon"
                
              />
            </button>
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-description">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
