import { createContext, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [cart, setCart] = useState({});

  return (
    <ShopContext.Provider
      value={{
        products,
        prices,
        cart,
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
