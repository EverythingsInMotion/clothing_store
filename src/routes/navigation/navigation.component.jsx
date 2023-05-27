import React, { Component, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as SiteLogo } from "../../assets/crown.svg";
import styles from "./navigation.module.css";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = (props) => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const cartDropdownHandler = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className={styles.navigation}>
        <Link className={styles.logoContainer} to="/">
          <SiteLogo className={styles.logo} />
        </Link>
        <div className={styles.navLinksContainer}>
          <Link className={styles.navLink} to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className={styles.navLink} onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className={styles.navLink} to="/auth">
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
