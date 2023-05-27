import React, { useContext } from "react";
import Button from "../button/Button.component";
import styles from "./product-card.module.css";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const onAddToCartHandler = () => {
    addItemToCart(product);
  };

  return (
    <div className={styles.productCardContainer}>
      <img src={imageUrl} alt={name} />
      <div className={styles.footer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{price}</span>
      </div>
      <Button buttonType="inverted" onClick={onAddToCartHandler}>
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductCard;
