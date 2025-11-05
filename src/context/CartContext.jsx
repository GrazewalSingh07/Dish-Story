import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

const CartContext = createContext();
const CART_STORAGE_KEY = 'dishStory_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on mount
    return getStorageItem(CART_STORAGE_KEY, []);
  });
  
  // Ref to store toast callback (set by ToastProvider)
  const toastCallbackRef = useRef(null);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  const setToastCallback = (callback) => {
    toastCallbackRef.current = callback;
  };

  const addToCart = (dish) => {
    const newItem = {
      ...dish,
      cartItemId: Date.now() + Math.random() // Unique ID for this cart item
    };
    setCartItems(prev => [...prev, newItem]);
    
    // Return the item ID for undo functionality
    return newItem.cartItemId;
  };

  const removeCartItemById = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const removeFromCart = (dishId) => {
    setCartItems(prev => prev.filter(item => item.dishId !== dishId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeCartItemById, clearCart, getCartCount, setToastCallback }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

