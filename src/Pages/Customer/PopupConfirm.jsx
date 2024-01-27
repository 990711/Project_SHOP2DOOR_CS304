import React, { useState } from "react";
import ItemQuantityService from "../../Services/ItemQuantityService";
import { useUser } from "./UserContext";


const ConfirmPopup = ({ isOpen, onCancel, onConfirm, item }) => {
  const [orderQuantity, setQuantity] = useState(1);
  const { state } = useUser();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const handleConfirm = async () => {
    console.log("Confirming...");
    item.quantity = orderQuantity;
    try {
      const response = await ItemQuantityService.addNewItemQuantity(state.CustomerOrderID, item.item_id, 
        {"quantity": orderQuantity});

      console.log(response?.data);
    } catch (error) {
      console.error("Error adding item quantity:", error);
    }
    onConfirm();
  };

  const popupClassName = isOpen ? "confirm-popup" : "hidden-popup";

  return (
    <div className={isOpen ? "popup-container" : "hidden-popup"}>
    <div className={popupClassName}>
      <div className={"confirm-popup-content"}>
        <h2>Enter quantity:</h2>
        <input
          type="number"
          value={orderQuantity}
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
    </div>
  );
};

export default ConfirmPopup;
