import { createContext, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [cart, setCart] = useState({});
  const [cartAmount, setCartAmount] = useState(0);

  return (
    <ShopContext.Provider
      value={{
        cartAmount,
        products,
        prices,
        cart,
        setCartAmount,
        setProducts,
        setPrices,
        setCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
