import React, { useState, useEffect } from "react";
import ItemsService from "../../Services/ItemsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ singleCartItem, itemQuantity, onRemove, onQuantityChange }) => {
  const [item, setItem] = useState([]);

  var quantity = itemQuantity;

  const handleQuantityChange = (newQuantity) => {
    // Call the parent component's callback to update the quantity
    quantity = newQuantity;
    console.log(quantity);
  };

  useEffect(() => {
    ItemsService.GetItemById(singleCartItem.item_id)
      .then(response => {
        setItem(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });
  }, []);
  
  const discountPercentage = item.quantity === 0 ? 0 : item.discount_percentage || 0;
  const discountedPrice = item.price - (item.price * discountPercentage) / 100;
  const total = (quantity * discountedPrice).toFixed(2);

  return (
    <div className="cart-item">
      <div className="item-details">
        <p className="cart-item-name" >{item.name}</p>
      </div>
      <div className="item-quantity">
        <div className="quantity-section">
          <p>{quantity}</p>
        </div>
        <div className="buttons-section">
          <button className="cartItemBtn" onClick={() => handleQuantityChange(quantity - 1)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button className="cartItemBtn" onClick={() => handleQuantityChange(quantity + 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="item-total">
        <p>Total: {total}</p>
      </div>
      <div>
        <button className="cartItemBtn cartDeleteBtn" onClick={() => onRemove(singleCartItem.item_id)}>
        <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
