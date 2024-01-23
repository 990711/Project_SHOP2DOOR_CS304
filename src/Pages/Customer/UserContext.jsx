// UserContext.js
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  userID: null,
  username: null,
  orderID: null,
};

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userID: action.payload.userID,
        username: action.payload.username,
        orderID: action.payload.orderID,
      };
    case 'LOGOUT':
      return initialState;
    case 'ADD_ORDER_ID':
      return {
        ...state,
        orderID: action.payload.orderID,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
