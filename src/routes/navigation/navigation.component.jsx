import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as SiteLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = (props) => {
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
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
