import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const dummyProducts = [
        { id: 1, name: 'Product 2', description: 'Boxing gloves are padded gloves worn by boxers during training and matches to protect their hands and minimize injury to their opponents. Designed with cushioned foam and a secure wrist strap, they provide support, shock absorption, and ensure safe, powerful punches. Available in various sizes and weights, boxing gloves are essential for both amateur and professional fighters, as well as fitness enthusiasts.', price: 29.99, image: '/assets/product6.webp' },
        { id: 2, name: 'Product 3', description: 'Boxing gloves are padded gloves worn by boxers during training and matches to protect their hands and minimize injury to their opponents. Designed with cushioned foam and a secure wrist strap, they provide support, shock absorption, and ensure safe, powerful punches. Available in various sizes and weights, boxing gloves are essential for both amateur and professional fighters, as well as fitness enthusiasts.', price: 39.99, image: 'assets/product7.webp' },
        { id: 3, name: 'Product 4', description: 'Boxing gloves are padded gloves worn by boxers during training and matches to protect their hands and minimize injury to their opponents. Designed with cushioned foam and a secure wrist strap, they provide support, shock absorption, and ensure safe, powerful punches. Available in various sizes and weights, boxing gloves are essential for both amateur and professional fighters, as well as fitness enthusiasts.', price: 39.99, image: 'assets/product12.webp' },
        { id: 4, name: 'Product 5', description: 'Boxing gloves are padded gloves worn by boxers during training and matches to protect their hands and minimize injury to their opponents. Designed with cushioned foam and a secure wrist strap, they provide support, shock absorption, and ensure safe, powerful punches. Available in various sizes and weights, boxing gloves are essential for both amateur and professional fighters, as well as fitness enthusiasts.', price: 39.99, image: 'assets/product15.webp' },
        { id: 5, name: 'Product 6', description: 'Boxing gloves are padded gloves worn by boxers during training and matches to protect their hands and minimize injury to their opponents. Designed with cushioned foam and a secure wrist strap, they provide support, shock absorption, and ensure safe, powerful punches. Available in various sizes and weights, boxing gloves are essential for both amateur and professional fighters, as well as fitness enthusiasts.', price: 39.99, image: 'assets/product3.webp' },
        { id: 6, name: 'Product 7', description: 'Boxing gloves are padded gloves worn by boxers during training and matches to protect their hands and minimize injury to their opponents. Designed with cushioned foam and a secure wrist strap, they provide support, shock absorption, and ensure safe, powerful punches. Available in various sizes and weights, boxing gloves are essential for both amateur and professional fighters, as well as fitness enthusiasts.', price: 39.99, image: 'assets/productbig.webp' },
        
      ];

      if (Array.isArray(dummyProducts)) {
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      } else {
        console.error("Fetched products is not an array");
      }
    };

    fetchProducts();
  }, []);

  const searchProducts = (searchQuery) => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else if (Array.isArray(products)) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      console.error("Products is not an array, cannot filter");
    }
  };

  return (
    <ProductContext.Provider value={{ products: filteredProducts, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);