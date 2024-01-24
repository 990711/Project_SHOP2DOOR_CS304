import React, { useState, useEffect } from "react";
import ItemsService from "../../Services/ItemsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ singleCartItem, itemQuantity, onRemove, onQuantityIncrease, onQuantityDecrease }) => {
  const [item, setItem] = useState([]);

  var quantity = itemQuantity;

  const handleQuantityIncrease = () => {
    onQuantityIncrease(singleCartItem.item_id);
  };

  const handleQuantityDecrease = () => {
    onQuantityDecrease(singleCartItem.item_id);
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
          <button className="cartItemBtn" onClick={() => handleQuantityIncrease()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="cartItemBtn" onClick={() => handleQuantityDecrease()}>
            <FontAwesomeIcon icon={faMinus} />
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
