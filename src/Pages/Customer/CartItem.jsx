import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { item_id, name, quantity, price } = item;

  const handleQuantityChange = (newQuantity) => {
    // Call the parent component's callback to update the quantity
    onQuantityChange(item_id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        <p>{name}</p>
        <p>Quantity: {quantity}</p>
        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>
      <div className="item-total">Total: {quantity * price}</div>
      <button onClick={() => onRemove(item_id)}>Remove</button>
    </div>
  );
};

export default CartItem;
