import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
    return () => {
      navigate("/");
    };
  }, [id, navigate]);

  return (
    <div className="product-detail">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.image} alt={product.title} />
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
