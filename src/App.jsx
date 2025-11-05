 import React, { useEffect } from 'react'
 import './App.css'
import StoryFeed from './components/StoryFeed'
import { CartProvider, useCart } from './context/CartContext'
import { CustomizationProvider } from './context/CustomizationContext'
import { ToastProvider, useToast } from './context/ToastContext'
import Toast from './components/Toast'

// Inner component to connect Cart and Toast contexts
const AppContent = () => {
  const { setToastCallback } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    // Connect cart context to toast context
    if (setToastCallback) {
      setToastCallback(showToast);
    }
  }, [setToastCallback, showToast]);

  return (
    <>
      <StoryFeed />
      <Toast />
    </>
  );
};

function App() {
  
  return (
    <CartProvider>
      <CustomizationProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </CustomizationProvider>
    </CartProvider>
  )
}

export default App
