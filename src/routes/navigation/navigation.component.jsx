import React, { Component, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as SiteLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = (props) => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const cartDropdownHandler = () => {
    setIsCartOpen((prevState) => setIsCartOpen(!prevState));
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <SiteLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon onClick={cartDropdownHandler} />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
