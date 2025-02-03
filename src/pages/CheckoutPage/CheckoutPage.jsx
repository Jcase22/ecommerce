import "./CheckoutPage.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import PaymentCompletePage from "../../pages/PaymentCompletePage/PaymentCompletePage.jsx";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm.jsx";

const stripePromise = loadStripe(
  "pk_test_51Qn2QL07YZ22xJoRveVHkfKtLxF2qcGyIPgUbtC0nxVGCLJ2VV70QGtPLmLF3JLhJD62h4HnuyXMW0l4Rova8Ch1008NK431yJ"
);

const CheckoutPage = () => {


  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useContext(ShopContext);

  const retrieveClientSecretKey = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/createPaymentIntent",
        cart
      );
      const axiosRes = response.data.clientSecret;

      setClientSecret(axiosRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveClientSecretKey();
  }, []);

  return (
    <>
      {clientSecret && <CheckoutForm clientSecret={clientSecret}/>}
    </>
  );
};

export default CheckoutPage;
