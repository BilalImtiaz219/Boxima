import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { fetchProducts } from '../redux/storeAPIs.js';

const WomenCategory = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter the last 12 products for Women's category
  const womenProducts = products.slice(0, 12);

  return (
    <div className="bg-white text-[#EC3642] py-16 md:py-24 lg:py-40 font-bold px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl text-center mb-8">Women's Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WomenCategory;
