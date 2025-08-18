// client/src/context/ServiceCartContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const ServiceCartContext = createContext();

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SET_CATEGORY: 'SET_CATEGORY'
};

// Initial state
const initialState = {
  items: [],
  category: null, // Current category being browsed
  totalItems: 0
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { service, category } = action.payload;
      
      // Check if service already exists
      const existingIndex = state.items.findIndex(item => item.service.id === service.id);
      
      if (existingIndex !== -1) {
        // Service already in cart, don't add again
        return state;
      }
      
      const newItems = [...state.items, { service, category }];
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length
      };
    }
    
    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { serviceId } = action.payload;
      const newItems = state.items.filter(item => item.service.id !== serviceId);
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length
      };
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
        totalItems: 0
      };
    }
    
    case CART_ACTIONS.SET_CATEGORY: {
      const { category } = action.payload;
      // When switching categories, clear cart if it contains items from different category
      if (state.category && state.category !== category && state.items.length > 0) {
        return {
          ...initialState,
          category
        };
      }
      
      return {
        ...state,
        category
      };
    }
    
    default:
      return state;
  }
};

// Context Provider
export const ServiceCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Action creators
  const addToCart = (service, category) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { service, category }
    });
  };
  
  const removeFromCart = (serviceId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { serviceId }
    });
  };
  
  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART
    });
  };
  
  const setCategory = (category) => {
    dispatch({
      type: CART_ACTIONS.SET_CATEGORY,
      payload: { category }
    });
  };
  
  // Helper functions
  const isInCart = (serviceId) => {
    return state.items.some(item => item.service.id === serviceId);
  };
  
  const getCartItemsForCategory = (category) => {
    return state.items.filter(item => item.category === category);
  };
  
  const canProceedToCheckout = () => {
    return state.items.length > 0;
  };
  
  const value = {
    ...state,
    addToCart,
    removeFromCart,
    clearCart,
    setCategory,
    isInCart,
    getCartItemsForCategory,
    canProceedToCheckout
  };
  
  return (
    <ServiceCartContext.Provider value={value}>
      {children}
    </ServiceCartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useServiceCart = () => {
  const context = useContext(ServiceCartContext);

  if (!context) {
    throw new Error('useServiceCart must be used within a ServiceCartProvider');
  }

  return context;
};

export default ServiceCartProvider;
