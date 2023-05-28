import { createContext, useEffect, useReducer, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEM: "SET_CART_ITEM",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

const INITAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartQty: 0,
  totalCost: 0,
};

export const CartContextProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartQty, setCartQty] = useState(0);
  // const [totalCost, setTotalCost] = useState(0);

  // useEffect(() => {
  //   const totalCartQuantity = cartItems.reduce(
  //     (sum, item) => item.quantity + sum,
  //     0
  //   );

  //   setCartQty((_) => totalCartQuantity);
  // }, [cartItems, cartQty]);

  // useEffect(() => {
  //   const cartTotal = cartItems.reduce(
  //     (sum, item) => item.quantity * item.price + sum,
  //     0
  //   );

  //   setTotalCost((_) => cartTotal);
  // }, [cartItems, totalCost]);

  const [{ cartItems, isCartOpen, cartQty, totalCost }, dispatch] = useReducer(
    cartReducer,
    INITAL_STATE
  );

  const updateCartItemsReducer = (newCartItems) => {
    const newCartQuantity = newCartItems.reduce(
      (sum, item) => item.quantity + sum,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (sum, item) => item.quantity * item.price + sum,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
        cartItems: newCartItems,
        totalCost: newCartTotal,
        cartQty: newCartQuantity,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const completelyRemoveFromCart = (productToRemove) => {
    const newCartItems = completelyRemoveCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
  };

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
