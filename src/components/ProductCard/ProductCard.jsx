import "./ProductCard.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton/AddToCartButton.jsx";

const ProductCard = ({ productInfo, priceInfo }) => {
  return (
    <Link to={`/product/${productInfo.id}`} className="link">
      <div className="product-card">
        <div className="img-wrapper">
          <img className="product-img" src={productInfo.images[0]} />
        </div>

        <h1 className="product-name">{productInfo.name}</h1>
        <div className="product-card-price">${priceInfo.unit_amount / 100}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
