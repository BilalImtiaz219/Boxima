// import React, { createContext, useContext, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart as addToCartThunk, removeFromCart, fetchCart, fetchCartTotals } from '../redux/storeAPIs.js';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.data.cart);
//   const cartTotals = useSelector((state) => state.data.cartTotals);
  
//   useEffect(() => {
//     dispatch(fetchCart());
//     dispatch(fetchCartTotals());
//   }, [dispatch]);

//   const addToCart = (product) => {
//     const productWithValidPrice = {
//       ...product,
//       price: parseFloat(product.price), // Ensure price is a number
//       quantity: product.quantity || 1, // Default quantity to 1
//     };
//     dispatch(addToCartThunk(productWithValidPrice));
//   };

//   const increaseQuantity = (productId) => {
//     const product = cart.find(item => item.id === productId);
//     if (product) {
//       dispatch(addToCartThunk({ ...product, quantity: product.quantity + 1 }));
//     }
//   };

//   const decreaseQuantity = (productId) => {
//     const product = cart.find(item => item.id === productId);
//     if (product && product.quantity > 1) {
//       dispatch(addToCartThunk({ ...product, quantity: product.quantity - 1 }));
//     }
//   };

//   const removeFromCart = (productId) => {
//     dispatch(removeFromCart(productId));
//   };

//   const getTotalPrice = () => {
//     return cartTotals ? cartTotals.totalPrice : 0;
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, increaseQuantity, decreaseQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
