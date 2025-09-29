import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContextProvider.jsx'; // FIXED import

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider> {/* Use the Provider component */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
