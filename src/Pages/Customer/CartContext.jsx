import React, { createContext, useContext, useReducer } from "react";

// Initial state for the cart
const initialCartState = {
  items: [],
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Create context provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Add a function to dispatch actions (e.g., addToCart)
  const addToCart = (item) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };

  return (
    <CartContext.Provider value={{ cart: state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the cart context
export const useCart = () => {
  return useContext(CartContext);
};
