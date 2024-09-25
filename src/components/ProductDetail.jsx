import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../redux/storeAPIs.js";
import { useToastify } from "../hooks/useToastify.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const product = products.find((p) => p._id === id);
  const [quantity, setQuantity] = useState(1);
  const { showSuccessToast, showErrorToast } = useToastify();
  const { user = {} } = useAuth() || {};

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (!product) return <div className="text-white">Loading...</div>;

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddToCart = async () => {
    if (!user?._id) {
      showErrorToast('Please Login First');
      return;
    }

    try {
      const data = {
        productID: product._id,
        userID: user?._id,
        quantity,
      };
      const res = await dispatch(addToCart(data));
      if (res.type.includes("fulfilled")) {
        showSuccessToast(res.payload.message);
      } else {
        showErrorToast(res.payload.message);
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 md:p-20 lg:p-40 flex flex-col md:flex-row">
      {/* Product Image Section */}
      <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-3xl max-h-[500px] object-cover w-full sm:w-auto p-4 shadow-2xl"
          onError={(e) => (e.target.src = "/images/default-product.png")}
        />
      </div>

      {/* Product Details Section */}
      <div className="md:w-1/2 md:pl-10 flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl text-[#EC3642] font-bold mb-4">
          {product.name}
        </h1>
        <div className="mb-4">
          <span className="text-red-500 text-lg">★★★★★</span>
          <span className="text-gray-500 text-sm ml-2">(customer review)</span>
        </div>
        <p className="mb-4 text-gray-700">{product.description}</p>
        <p className="text-xl text-[#EC3642] mb-4">
          Price: ${(product.price * quantity).toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center mb-4">
          <button
            className="bg-[#EC3642] text-white px-4 py-2 transition"
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="mx-4">{quantity}</span>
          <button
            className="bg-[#EC3642] text-white px-4 py-2 transition"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="bg-[#EC3642] text-white py-2 px-6 rounded-lg transition hover:bg-[#d52b3d]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
