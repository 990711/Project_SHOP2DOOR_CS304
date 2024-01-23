import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import ItemQuantityService from "../../Services/ItemQuantityService";
import OrderService from "../../Services/OrderService";
import { useUser } from "./UserContext";

const CartPage = () => {
  const { state } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);

  const additionalDiscount = 0;

  useEffect(() => {
    ItemQuantityService.getOrderItemQuantities(state.orderID)
      .then((response) => {
        setCartItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  useEffect(() => {
    OrderService.getOrderById(state.orderID)
      .then((foundOrder) => {
        if (foundOrder) {
          setOrder(foundOrder);
          console.log("Found order:", foundOrder);
        } else {
          console.log("Order not found.");
        }
      })
      .catch((error) => {
        console.error("Error handling the order:", error);
      });
  }, []);

  console.log(cartItems);

  const updateCartItemQuantity = (itemId, newQuantity) => {
    // Implement logic to update the quantity of a specific item in the cart
    console.log(`Updated quantity of item ${itemId} to ${newQuantity}`);
    updateCartItemQuantity(itemId, newQuantity);
  };

  const removeCartItem = (removeItemID) => {
    console.log(removeItemID);
  };

  const clearCart = () => {};

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
              key={item.item_id}
              singleCartItem={item}
              itemQuantity={item.quantity}
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
          <p className="order-summary-label">Total:</p>
          <p className="order-summary-value">{order.total}</p>
          <p className="order-summary-label">Promotion Discount:</p>
          <p className="order-summary-value">{additionalDiscount}</p>
          <p className="order-summary-label">Service Charges:</p>
          <p className="order-summary-value">{additionalDiscount}</p>
          <p className="order-summary-label">Net Total:</p>
          <p className="order-summary-value">{order.total}</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
