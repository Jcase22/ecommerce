import "./NavBar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../public/cart1.svg";
import { ShopContext } from "../../context/ShopContext.jsx";

const NavBar = () => {
  const { cart } = useContext(ShopContext);

  const calcItemAmount = () => {
    let amount = 0;

    const cartItems = Object.values(cart);

    cartItems.forEach((item) => {
      amount += item
    })

    return amount
  }

  return cart !== undefined ? (
    <nav className="navbar">
      <div className="nav-logo">
        <p>COZY THREADS</p>
      </div>
      <ul className="nav-menu">
        <Link to="/" className="link">
          <li>Shop</li>
        </Link>
        <li>Women</li>
        <li>Men</li>
        <li>Kids</li>
      </ul>
      <div className="nav-cart-container">
        <Link to="/cart" className="link">
          <img className="cart-icon" src={cartIcon} alt="" />
          {calcItemAmount() !== 0 ? (
            <span className="cart-item-count">{calcItemAmount()}</span>
          ) : null}
        </Link>
      </div>
    </nav>
  ) : (
    <div className="loader" />
  );
};

export default NavBar;
