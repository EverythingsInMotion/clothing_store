import React from "react";
import "./category-item.styles.scss";

const CategoryItem = (props) => {
  const { title, imageUrl } = props.category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2>{title.toUpperCase()}</h2>
        <p>{"Shop now".toUpperCase()}</p>
      </div>
    </div>
  );
};

export default CategoryItem;