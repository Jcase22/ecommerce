import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";
import { useState, useEffect, useContext } from "react";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton.jsx";

const ProductPage = ({ productInfo }) => {
  const { productId } = useParams();

  const { products, prices } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [priceData, setPriceData] = useState(null);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);
        return null;
      }
    });
  };

  const fetchPriceData = async () => {
    prices.map((item) => {
      if (item.product === productId) {
        setPriceData(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    fetchPriceData();
  }, [productId, products]);

  return productData ? (
    <div className="product-page">
      <img className="headline-image" src={productData.images[0]} />
      <div className="product-info">
        <div>
          <h1 className="product-title">{productData.name}</h1>
          <div className="product-price">${priceData.unit_amount / 100}.00</div>
          <div className='spacing'></div>
        </div>
        <p className="product-description">{productData.description}</p>
        <AddToCartButton productId={productData.id}/>
      </div>
    </div>
  ) : (
    <div className="loader" />
  );
};

export default ProductPage;
