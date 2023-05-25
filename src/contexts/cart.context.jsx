import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    cartItems[cartItems.indexOf(existingCartItem)].quantity++;
    return [...cartItems];
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQty: 0,
});

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems((prevState) => addCartItem(prevState, productToAdd));
  };

  useEffect(() => {
    const totalCartQuantity = cartItems.reduce(
      (sum, item) => item.quantity + sum,
      0
    );

    setCartQty((_) => totalCartQuantity);
  }, [cartItems, cartQty]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
