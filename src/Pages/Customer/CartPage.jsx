import React from "react";
import { useCart } from "./CartContext";
import CartItem from "./CartItem";

const CartPage = () => {
  const { cartItems, removeCartItem, clearCart } = useCart();

  const updateCartItemQuantity = (itemId, newQuantity) => {
    // Implement logic to update the quantity of a specific item in the cart
    console.log(`Updated quantity of item ${itemId} to ${newQuantity}`);
    updateCartItemQuantity(itemId, newQuantity);
  };

  return (
    <div>
      <div className="customer-header">
        <h1 className="customer-header-name">SHOP2DOOR</h1>
      </div>
    <div className="cart-page">
      {/* Cart items */}
      <div className="cart-items">
        <h2>Shopping Cart</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeCartItem}
            onQuantityChange={updateCartItemQuantity}
          />
        ))}
        {cartItems.length > 0 && (
          <button onClick={clearCart}>Clear Cart</button>
        )}
      </div>

      {/* Order summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {/* Implement logic to calculate order summary, shipping cost, total, etc. */}
      </div>
    </div>
    </div>
  );
};

export default CartPage;
