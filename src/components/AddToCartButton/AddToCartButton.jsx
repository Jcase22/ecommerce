import "./AddToCartButton.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";

const AddToCartButton = ({ productId }) => {
  let { cart, setCart } = useContext(ShopContext);

  const handleClick = () => {
    const cartCopy = { ...cart };

    if (!cartCopy[productId]) {
      cartCopy[productId] = 1;
    } else {
      cartCopy[productId] += 1;
    }

    setCart(cartCopy);
  };

  return cart ? (
    <>
      <button onClick={handleClick} className="btn-75">
        Add To Cart
      </button>
    </>
  ) : (
    <div className="loader" />
  );
};

export default AddToCartButton;
