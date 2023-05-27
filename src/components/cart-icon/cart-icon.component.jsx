import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import styles from "./cart-icon.module.css";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = (props) => {
  const { cartQty } = useContext(CartContext);

  return (
    <div className={styles.cartIconContainer} onClick={props.onClick}>
      <ShoppingIcon className={styles.shoppingIcon} />
      <span className={styles.itemCount}>{cartQty}</span>
    </div>
  );
};

export default CartIcon;
