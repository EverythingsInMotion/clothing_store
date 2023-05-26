import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );
  const index = cartItems.indexOf(existingCartItem);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const completelyRemoveCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  completelyRemoveFromCart: () => {},
  cartQty: 0,
  totalCost: 0,
});

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems((prevState) => addCartItem(prevState, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems((prevState) => removeCartItem(prevState, productToRemove));
  };

  const completelyRemoveFromCart = (productToRemove) => {
    setCartItems((prevState) =>
      completelyRemoveCartItem(prevState, productToRemove)
    );
  };

  useEffect(() => {
    const totalCartQuantity = cartItems.reduce(
      (sum, item) => item.quantity + sum,
      0
    );

    setCartQty((_) => totalCartQuantity);
  }, [cartItems, cartQty]);

  useEffect(() => {
    const cartTotal = cartItems.reduce(
      (sum, item) => item.quantity * item.price + sum,
      0
    );

    setTotalCost((_) => cartTotal);
  }, [cartItems, totalCost]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    cartQty,
    completelyRemoveFromCart,
    totalCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
