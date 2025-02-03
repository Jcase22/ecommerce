import "./HomePage.css";
import { useEffect, useState, useContext } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { ShopContext } from "../../context/ShopContext.jsx";

const HomePage = () => {

  const {prices, products} = useContext(ShopContext);


  return prices ? (
    <div className="product-card-board">
      {products.map((product) => {
        let currentPriceObj = {};

        for (let i = 0; i < prices.length; i++) {
          if (product.id === prices[i].product) {
            currentPriceObj = prices[i];
            break;
          }
        }

        return (
          <ProductCard
            key={product.id}
            productInfo={product}
            priceInfo={currentPriceObj}
          />
        );
      })}
    </div>
  ) : <div className='loader'/>
};

export default HomePage;
