import React from "react";

const ItemBox = ({ item, itemsCount }) => {

  // Use different classes for single and multiple items. To adjust the width of the item box.
  const itemBoxClass = itemsCount > 1 ? "item-box multiple" : "item-box single";

  return (
      <div className={itemBoxClass}>
        <h4>{item.name}</h4>
        <p>LKR {item.price.toFixed(2)}</p>
      </div>
  );
};

export default ItemBox;
