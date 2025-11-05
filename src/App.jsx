 import React from 'react'
 import './App.css'
import StoryFeed from './components/StoryFeed'
import { CartProvider } from './context/CartContext'

function App() {
  
  return (
    <CartProvider>
      <StoryFeed />
    </CartProvider>
  )
}

export default App
