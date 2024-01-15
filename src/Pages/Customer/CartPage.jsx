import React from "react";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cartItems, removeCartItem, clearCart } = useCart();

  return (
    <div>
      <div className="customer-header">
        <h1 className="customer-header-name">SHOP2DOOR</h1>
      </div>

      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}{" "}
            <button onClick={() => removeCartItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
};

export default CartPage;
