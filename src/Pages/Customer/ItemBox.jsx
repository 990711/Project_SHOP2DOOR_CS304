import React from "react";

const ItemBox = ({ item, itemsCount }) => {
  const discountPercentage = item.discount_percentage || 0;

  // Calculate the discounted price
  const discountedPrice = item.price - (item.price * discountPercentage) / 100;

  // Use different classes for single and multiple items. To adjust the width of the item box.
  const itemBoxClass = itemsCount > 1 ? "item-box multiple" : "item-box single";

  return (
    <div className={itemBoxClass}>
      <h4>{item.name}</h4>
      {discountPercentage > 0 ? (
        <>
          <p>
            <span className="original-price">LKR {item.price.toFixed(2)}</span>{" "}
            <span className="discounted-price">LKR {discountedPrice.toFixed(2)}</span>
          </p>
          <p className="discount-percentage">{discountPercentage}% off</p>
        </>
      ) : (
        <p>LKR {item.price.toFixed(2)}</p>
      )}
    </div>
  );
};

export default ItemBox;