import React from "react";

const ItemBox = ({ item }) => {
  return (
      <div className="shop-box">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
      </div>
  );
};

export default ItemBox;
