import React, { useState, useEffect } from "react";
import ConfirmPopup from "./PopupConfirm";

const ItemBox = ({ item, itemsCount }) => {

  const discountPercentage =
    item.quantity === 0 ? 0 : item.discount_percentage || 0;
  const discountedPrice = item.price - (item.price * discountPercentage) / 100;
  const itemBoxClass = itemsCount > 1 ? "item-box multiple" : "item-box single";
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const openConfirmation = () => {
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleConfirm = () => {
    closeConfirmation();
  };

  return (
    <div
      className={`${itemBoxClass} ${
        item.quantity === 0 ? "overlay disabled-item-box" : ""
      }`}
    >
      {item.quantity === 0 && (
        <div className="out-of-stock-label">Out of Stock</div>
      )}
      <h4>{item.name}</h4>
      {discountPercentage > 0 ? (
        <>
          <p>
            <span className="original-price">LKR {item.price.toFixed(2)}</span>{" "}
            <span className="discounted-price">
              LKR {discountedPrice.toFixed(2)}
            </span>
          </p>
          <p className="discount-percentage">{discountPercentage}% off</p>
        </>
      ) : (
        <p>LKR {item.price.toFixed(2)}</p>
      )}
      <button
        className="cart-btn"
        onClick={openConfirmation}
        disabled={item.quantity === 0}
      >
        Add to Cart
      </button>
      <ConfirmPopup
        isOpen={isConfirmationOpen}
        onCancel={closeConfirmation}
        onConfirm={handleConfirm}
        item={item}
      />
    </div>
  );
};

export default ItemBox;
