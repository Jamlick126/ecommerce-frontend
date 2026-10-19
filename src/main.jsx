import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { CartProvider } from './components/CartContext.jsx';
import { StoreProvider } from './components/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </StoreProvider>
  </StrictMode>,
)
