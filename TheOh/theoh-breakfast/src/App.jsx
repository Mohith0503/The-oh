import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { MenuProvider } from './context/MenuContext';

function App() {
  return (
    <MenuProvider>
      <CheckoutProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </CheckoutProvider>
    </MenuProvider>
  );
}

export default App;
