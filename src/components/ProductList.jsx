import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../components/ProductContext';
import { useLocation } from 'react-router-dom';

const ProductList = () => {
  const { products } = useProducts(); // Destructure the products from the context
  const location = useLocation();
  const menRef = useRef(null);
  const womenRef = useRef(null);
  const specialRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#men' && menRef.current) {
      menRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#women' && womenRef.current) {
      womenRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#special' && specialRef.current) {
      specialRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="py-20 px-10 mt-10 bg-[#1D1D1D] text-white">
      <div ref={menRef} id="men" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={womenRef} id="women" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.slice(3, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={specialRef} id="special" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.slice(6, 9).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
