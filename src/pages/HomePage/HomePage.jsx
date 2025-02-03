import "./HomePage.css";
import { useEffect, useState, useContext } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { ShopContext } from "../../context/ShopContext.jsx";
import { keyBy } from "../../utils/utils.js";

const HomePage = () => {
  const { prices, products } = useContext(ShopContext);

  const pricesKeyedByProduct = keyBy(prices, "product");

  return prices ? (
    <div className="product-card-board">
      {products.map((product) => {

        return (
          <ProductCard
            key={product.id}
            productInfo={product}
            priceInfo={pricesKeyedByProduct[product.id]}
          />
        );
      })}
    </div>
  ) : (
    <div className="loader" />
  );
};

export default HomePage;
