import React, { useState, useEffect } from "react";
import ItemsService from "../../Services/ItemsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ singleCartItem, itemQuantity, onRemove, onQuantityIncrease, onQuantityDecrease }) => {
  const [item, setItem] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(1);
  const [quantity, setQuantity] = useState(itemQuantity);

  useEffect(() => {
    ItemsService.GetItemById(singleCartItem.item_id)
      .then(response => {
        setItem(response.data);
        console.log(response.data);
        setMaxQuantity(response.data.quantity);
        // Set minQuantity based on your logic, for now, it's set to 1
        setMinQuantity(1);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const handleQuantityIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      onQuantityIncrease(singleCartItem.item_id);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
      onQuantityDecrease(singleCartItem.item_id);
    }
  };

  const discountPercentage = item.quantity === 0 ? 0 : item.discount_percentage || 0;
  const discountedPrice = item.price - (item.price * discountPercentage);
  const total = (quantity * discountedPrice).toFixed(2);

  return (
    <div className="cart-item">
      <div className="item-details">
        <p className="cart-item-name">{item.name}</p>
      </div>
      <div className="item-quantity">
        <div className="quantity-section">
          <p>{quantity}</p>
        </div>
        <div className="buttons-section">
          <button
            className="cartItemBtn"
            onClick={handleQuantityIncrease}
            disabled={quantity === maxQuantity}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="cartItemBtn"
            onClick={handleQuantityDecrease}
            disabled={quantity === minQuantity}
          >
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
