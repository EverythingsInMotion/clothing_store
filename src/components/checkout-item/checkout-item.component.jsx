import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import styles from "./checkout-item.module.css";

const CheckoutItem = ({ item }) => {
  const { removeItemFromCart, addItemToCart, completelyRemoveFromCart } =
    useContext(CartContext);

  const decrementItemHandler = () => removeItemFromCart(item);
  const incrementItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => completelyRemoveFromCart(item);

  return (
    <div className={styles.checkoutItemContainer}>
      <div className={styles.imageContainer}>
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <span className={styles.name}>{item.name}</span>
      <div className={styles.quantity}>
        <div className={styles.arrow} onClick={decrementItemHandler}>
          &#10094;
        </div>
        <span className={styles.value}>{item.quantity}</span>
        <div className={styles.arrow} onClick={incrementItemHandler}>
          &#10095;
        </div>
      </div>
      <span className={styles.price}>${item.price}</span>
      <div className={styles.removeButton} onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
