import React from "react";
import "../../styles/Customer.css";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <p>{message}</p>
        <button className="shopping-btn user-update-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
