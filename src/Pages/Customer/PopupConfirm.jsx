import React, { useState } from "react";
import { useCart } from "./CartContext";

const ConfirmPopup = ({ isOpen, onCancel, onConfirm, item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const handleConfirm = () => {
    item.quantity = quantity;
    addToCart({ ...item});
    onConfirm();
  };

  const popupClassName = isOpen ? "confirm-popup" : "hidden-popup";

  return (
    <div className={popupClassName}>
      <div className={"confirm-popup-content"}>
        <h2>Enter quantity:</h2>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          max={item.quantity}
          placeholder="Quantity"
          className={"confirm-popup-input"}
        />
        <div className={"confirm-popup-button-container"}>
          <button onClick={onCancel} className={"confirm-popup-cancel-button"}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={"confirm-popup-confirm-button"}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
