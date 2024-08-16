import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-800 rounded-2xl p-8 shadow-2xl bg-[black] text-white cursor-pointer"
    >
      <img src={product.image} alt={product.name} className="w-full object-cover mb-4 rounded-lg" />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-400 mb-2">{product.description.slice(0, 120)}...</p>
      <p className="text-xl font-bold mb-4">${product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents the event from propagating to the parent elements
          addToCart(product);
        }}
        className="bg-[#EC3642] text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
