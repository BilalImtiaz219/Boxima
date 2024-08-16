import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { useProducts } from '../components/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts(); // Destructure products from the returned object
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className='text-white'>Loading...</div>;

  return (
    <div className='bg-[#1D1D1D] text-white p-40 flex flex-col md:flex-row'>
      <div className='md:w-1/2 mb-4 md:mb-0'>
        <img src={product.image} alt={product.name} className='rounded-3xl' />
      </div>
      <div className='md:w-1/2 md:pl-10 items-center grid justify-items-start'>
        <h1 className='text-3xl text-left mb-4'>{product.name}</h1>
        <p className='mb-4 text-left'>{product.description}</p>
        <p className='text-xl mb-4 text-left'>Price: ${product.price}</p>
        <button 
          className='bg-[#EC3642] text-white p-2 rounded-lg hover:bg-white hover:text-black transition'
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
