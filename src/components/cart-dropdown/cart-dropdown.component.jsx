import React, { useContext } from "react";
import Button from "../button/Button.component";
import "./cart-dropdown.styles.scss";
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
    <div className="cart-dropdown-container">
      {cartItems.length === 0 && (
        <span className="empty-message">Cart Empty</span>
      )}
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={checkoutClickHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
