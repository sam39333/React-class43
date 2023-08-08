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

  
  const isFavorite = false;

  return (
    <div className="product-detail">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.image} alt={product.title} />
            <button
              onClick={() => toggleFavorite(Number(id))}
              className="favorite-button"
            >
              <img
                src={"./assets/heart-regular.svg"} 
                alt="Favorite"
              />
            </button>
          </div>
          <div className="product-description">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
