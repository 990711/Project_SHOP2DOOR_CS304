import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import ItemQuantityService from "../../Services/ItemQuantityService";
import OrderService from "../../Services/OrderService";
import { useUser } from "./UserContext";
import animation from "../../assets/waiting_animation.svg";

const CartPage = () => {
  const { state } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [deletedItemID, setDeletedItemID] = useState(null);
  const [updateItemCount, setUpdateItemCount] = useState(true);
  const [ orderStatus, setOrderStatus ] = useState("");

  const additionalDiscount = 0;

  useEffect(() => {
    ItemQuantityService.getOrderItemQuantities(state.CustomerOrderID)
      .then((response) => {
        setCartItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [deletedItemID, updateItemCount]);

  useEffect(() => {
    OrderService.getOrderById(state.CustomerOrderID)
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
  }, [deletedItemID, updateItemCount]);

  const updateOrderStatus = async () => {
    try {
      // Fetch order details to update orderStatus
      const updatedOrder = await OrderService.getOrderById(state.CustomerOrderID);

      if(updatedOrder?.action === "Confirmed and waiting for a rider") {
        setOrderStatus("Order failed");
      }
      else {
        setOrderStatus(updatedOrder?.action);
      }      

      console.log("Updated order status:", orderStatus)
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const updateCartItemQuantityIncrease = async (itemId) => {
    // Implement logic to increase the quantity of a specific item in the cart
    console.log(`Increased quantity of item ${itemId}`);
    try {
      const response = await ItemQuantityService.incrementItemQuantity(
        itemId,
        state.CustomerOrderID
      );
      console.log(response?.data);
      setUpdateItemCount(!updateItemCount);
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const updateCartItemQuantityDecrease = async (itemId) => {
    // Implement logic to decrease the quantity of a specific item in the cart
    console.log(`Decreased quantity of item ${itemId}`);
    try {
      const response = await ItemQuantityService.decrementItemQuantity(
        itemId,
        state.CustomerOrderID
      );
      console.log(response?.data);
      setUpdateItemCount(!updateItemCount);
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  const removeCartItem = async (removeItemID) => {
    try {
      const response = await ItemQuantityService.deleteItemQuantity(
        removeItemID,
        state.CustomerOrderID
      );
      console.log(response?.data);

      // Change this so that the items updates realtime
      setDeletedItemID(removeItemID);
    } catch (error) {
      console.error("Error removing item quantity:", error);
    }
  };

  const clearCart = () => {};

  const confirmOrder = async () => {
    // Implement logic to confirm the order
    console.log("Confirming order: ", state.CustomerOrderID);

    try {
      const responsePromise = OrderService.confirmOrder(state.CustomerOrderID);

      // Use Promise.race to wait for either the response or a timeout
      const response = await Promise.race([
        responsePromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000)
        ),
      ]);
      console.log(response?.data);
      setOrderStatus(response?.data.action);

      setTimeout(() => {
        updateOrderStatus();
      }, 10000);

    } catch (error) {
      console.error("Error confirming order:", error);
    }
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
              key={item.item_id}
              singleCartItem={item}
              itemQuantity={item.quantity}
              onRemove={removeCartItem}
              onQuantityIncrease={updateCartItemQuantityIncrease}
              onQuantityDecrease={updateCartItemQuantityDecrease}
            />
          ))}
          <div className="shopping-cart-btn-panel">
            {cartItems.length > 0 && (
              <button className="shopping-btn" onClick={clearCart}>
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="order-summary-container">
          {/* Order summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p className="order-summary-label">Total:</p>
            <p className="order-summary-value">{order.total}</p>
            <p className="order-summary-label">Promotion Discount:</p>
            <p className="order-summary-value">{additionalDiscount}</p>
            <p className="order-summary-label">Net Total:</p>
            <p className="order-summary-value">{order.total}</p>
            <div className="shopping-cart-btn-panel">
              <button className="shopping-btn" onClick={confirmOrder}>
                Confirm Order
              </button>
            </div>
          </div>

          {/* Waiting */}
          {orderStatus === "Confirmed and waiting for a rider" && (
          <div className="order-status">
            <h2>Status</h2>
            <div className="waiting-panel-show">
              <div className="waiting">
                <img
                  src={animation}
                  alt="Waiting Animation"
                  className="waiting-svg-icon"
                />
              </div>
              <h4>Waiting for a rider to accept your order</h4>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
