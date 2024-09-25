import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, getTotalPrice } = useCart();

  return (
    <div className='bg-black text-white p-10'>
      <h2 className='text-3xl mb-4'>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className='mb-4'>
            {cart.map(product => (
              <li key={product.id} className='mb-2'>
                {product.name} - ${product.price} x {product.quantity}
              </li>
            ))}
          </ul>
          <p className='text-xl mb-4'>Total Price: ${getTotalPrice()}</p>
          <Link 
            to="/payment" 
            className='bg-[#EC3642] text-white p-2 rounded-lg hover:bg-white hover:text-black transition'
          >
            Proceed to Payment
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
