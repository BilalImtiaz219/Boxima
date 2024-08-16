// Checkout.jsx
import React from 'react';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();

  return (
    <div className="min-h-screen bg-[#1D1D1D] text-white p-40">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <ul className="mb-6">
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="text-xl font-bold mb-4">Total: ${getTotalPrice().toFixed(2)}</div>
      <button className="bg-[#EC3642] text-white p-2 hover:bg-[#1D1D1D] hover:text-[#EC3642]">Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
