import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { removeItemFromCart, addItemToCart, completelyRemoveFromCart } =
    useContext(CartContext);

  const decrementItemHandler = () => removeItemFromCart(item);
  const incrementItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => completelyRemoveFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <span className="name">{item.name}</span>
      <div className="quantity">
        <div className="arrow" onClick={decrementItemHandler}>
          &#10094;
        </div>
        <span className="value">{item.quantity}</span>
        <div className="arrow" onClick={incrementItemHandler}>
          &#10095;
        </div>
      </div>
      <span className="price">${item.price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
