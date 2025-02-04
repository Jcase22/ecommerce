import "./CheckoutButton.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";

const CheckoutButton = () => {
  const { cart } = useContext(ShopContext);

  const isEmpty = Object.keys(cart).length === 0;

  return (
    <>
      {!isEmpty ? (
        <button className="checkout-btn">Proceed To Checkout</button>
      ) : (
        <button className="disabled-checkout-btn">Proceed To Checkout</button>
      )}
    </>
  );
};

export default CheckoutButton;
