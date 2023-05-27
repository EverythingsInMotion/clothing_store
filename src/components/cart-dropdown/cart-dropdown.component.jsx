import React, { useContext } from "react";
import Button from "../button/Button.component";
import styles from "./cart-dropdown.module.css";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = (props) => {
  const { cartItems } = useContext(CartContext);

  let navigate = useNavigate();
  const checkoutClickHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles.cartDropdownContainer}>
      {cartItems.length === 0 && (
        <span className={styles.emptyMessage}>Cart Empty</span>
      )}
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={checkoutClickHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
