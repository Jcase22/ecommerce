import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import CartPage from "../pages/CartPage/CartPage.jsx";
import ProductPage from "../pages/ProductPage/ProductPage.jsx";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.jsx";
import PaymentCompletePage from "../pages/PaymentCompletePage/PaymentCompletePage.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const App = () => {
  const { cart, prices, products, setPrices, setProducts } =
    useContext(ShopContext);

  const loader = "auto";
  const appearance = {
    theme: "stripe",
  };
  const mode = "payment";
  const currency = "usd";
  const amount = 1099;
  const isCartEmpty = Object.keys(cart).length === 0;

  const listProducts = async () => {
    let config = {
      method: "get",
      url: "http://localhost:3000/products",
    };

    try {
      const response = await axios.request(config);
      const axiosRes = response.data.data;

      setProducts(axiosRes);
    } catch (error) {
      console.log(error);
    }
  };

  const listPrices = async () => {
    let config = {
      method: "get",
      url: "http://localhost:3000/prices",
    };

    try {
      const response = await axios.request(config);
      const axiosRes = response.data.data;

      setPrices(axiosRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listProducts();
    listPrices();
  }, []);

  return (
    <>
      <NavBar />
      <Elements
        options={{ currency, mode, amount, appearance, loader }}
        stripe={stripePromise}
      >
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/cart"} element={<CartPage />} />
          <Route path={"/product/:productId"} element={<ProductPage />} />
          <Route
            path={"/checkout"}
            element={isCartEmpty ? <HomePage /> : <CheckoutPage />}
          />
          <Route
            path={"/payment-complete"}
            element={<PaymentCompletePage />}
          />
        </Routes>
      </Elements>
    </>
  );
};

export default App;
