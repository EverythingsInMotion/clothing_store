import React from "react";
import styles from "./cart-item.module.css";

const CartItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <div className={styles.cartItemContainer}>
      <img src={imageUrl} alt={name} />
      <div className={styles.itemDetails}>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
