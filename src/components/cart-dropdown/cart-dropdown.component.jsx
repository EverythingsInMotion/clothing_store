import React from "react";
import Button from "../button/Button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = (props) => {
  return (
    <div className="cart-dropdown-container">
      <span className="empty-message">Cart Empty</span>
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
