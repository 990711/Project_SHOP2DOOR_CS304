import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";

const ItemBox = ({ item, itemsCount }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const discountPercentage = item.discount_percentage || 0;
  const discountedPrice = item.price - (item.price * discountPercentage) / 100;
  const itemBoxClass = itemsCount > 1 ? "item-box multiple" : "item-box single";

  const handleConfirm = (_quantity) => {
    setQuantity(_quantity);
    console.log(`Confirmed with quantity: ${quantity}`);

    addToCart({ ...item, quantity: _quantity });
  };

  return (
    <div className={`${itemBoxClass} ${item.quantity === 0 ? 'overlay' : ''}`} disabled={item.quantity === 0}>
      <h4>{item.name}</h4>
      {discountPercentage > 0 ? (
        <>
          <p>
            <span className="original-price">
              LKR {item.price.toFixed(2)}
            </span>{" "}
            <span className="discounted-price">
              LKR {discountedPrice.toFixed(2)}
            </span>
          </p>
          <p className="discount-percentage">{discountPercentage}% off</p>
        </>
      ) : (
        <p>LKR {item.price.toFixed(2)}</p>
      )}
      <button className="cart-btn" onClick={() => handleConfirm(quantity)} disabled={item.quantity === 0}>Add to Cart</button>
    </div>
  );
};

export default ItemBox;
