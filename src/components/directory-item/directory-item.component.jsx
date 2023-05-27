import React from "react";
import styles from "./directory-item.module.css";
import { useNavigate } from "react-router-dom";

const DirectoryItem = (props) => {
  const { title, imageUrl, route } = props.category;

  let navigate = useNavigate();

  const onNavigateHandler = () => {
    navigate(route);
  };

  return (
    <div className={styles.directoryItemContainer} onClick={onNavigateHandler}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className={styles.body}>
        <h2>{title.toUpperCase()}</h2>
        <p>{"Shop now".toUpperCase()}</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
