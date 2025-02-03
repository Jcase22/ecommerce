import "./CartPage.css";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton.jsx";

const CartPage = () => {
  const { cart, products, prices } = useContext(ShopContext);
  const [cartTotal, setCartTotal] = useState(0);

  const fetchProductInfo = (item) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === item) {
        return products[i];
      }
    }
  };

  const fetchPrice = (productId) => {
    for (let i = 0; i < prices.length; i++) {
      if (prices[i].product === productId) {
        return prices[i].unit_amount;
      }
    }
  };

  const calcCartTotal = () => {
    let cartTotal = 0;

    const cartObjKeys = Object.keys(cart);

    for (let i = 0; i < cartObjKeys.length; i++) {
      for (let x = 0; x < prices.length; x++) {
        if (prices[x].product === cartObjKeys[i]) {
          cartTotal += prices[x].unit_amount * cart[cartObjKeys[i]];
        }
      }
    }

    return cartTotal / 100;
  };

  useEffect(() => {
    setCartTotal(calcCartTotal());
  }, [cart]);

  return products ? (
    <div className="cart-page">
      {/*----  left side   ----- */}
      <div className="cart-wrapper">
        <h1 className="cart-header">Shopping Cart</h1>
        <ul>
          {Object.keys(cart).map((item) => {
            const productInfo = fetchProductInfo(item);
            const price = fetchPrice(productInfo.id);

            return (
              <div className="cart-item" key={productInfo.id}>
                <div className="cart-page-item-img-wrapper">
                  <img
                    src={productInfo.images[0]}
                    className="cart-page-item-img"
                  />
                </div>
                <div className="cart-page-item-info-wrapper">
                  <div className="cart-page-item-name">{productInfo.name}</div>
                  <div className="cart-page-item-price">${price / 100}.00</div>
                </div>
                <div className="cart-item-space-fill"></div>
                <div className="quantity-selector-wrapper">
                  <input
                    defaultValue={cart[item]}
                    type="text"
                    className="quantity-selector"
                    readonly
                  />
                </div>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="cart-page-spacer" />

      {/*----  right side   ----- */}
      <div className="cart-total">
        <h1 className="cart-header cart-total-header">Order Summary</h1>
        <div className="order-summary-wrapper">
          <div className="order-summary-lane">
            <div className="lane-name">Subtotal</div>
            <div className="cart-total-numeric">${cartTotal}.00</div>
          </div>
          <div className="order-summary-lane">
            <div className="lane-name">Shipping</div>
            <div className="cart-total-numeric">TBD</div>
          </div>
          <div className="order-summary-lane">
            <div className="lane-name">Estimated Tax</div>
            <div className="cart-total-numeric">
              ${(Math.round(cartTotal * 0.08 * 100) / 100).toFixed(2)}
            </div>
          </div>
          <div className="order-summary-spacer" />
          <div className="order-summary-lane total">
            <div className="lane-name total">Total</div>
            <div className="cart-total-numeric total">
              ${(cartTotal + cartTotal * 0.08).toFixed(2)}
            </div>
          </div>
          <Link to="/checkout">
            <CheckoutButton />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="loader" />
  );
};

export default CartPage;
