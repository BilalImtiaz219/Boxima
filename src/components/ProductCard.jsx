import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/storeAPIs.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToastify } from "../hooks/useToastify.js";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();
  console.log("🚀 ~ ProductCard ~ user:", user);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const { showSuccessToast, showErrorToast } = useToastify();

  const handleAddToCart = async (e) => {
    if (!user?._id) {
      showErrorToast("Please Login First");
    }
    try {
      e.stopPropagation(); // Prevents the event from propagating to the parent elements
      const data = {
        productID: product._id,
        userID: user?._id,
        quantity: 1,
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
    <div
      onClick={handleCardClick}
      className="border border-gray-800 rounded-2xl p-8 m-2 shadow-lg h-full bg-[white] text-white cursor-pointer"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full object-cover mb-4 rounded-lg"
      />
      <h2 className="text-lg font-semibold text-[#EC3642] mb-2">
        {product.name.slice(0, 25)}...
      </h2>
      <p className="text-gray-400 mb-2">
        {product.description.slice(0, 60)}...
      </p>
      <p className="text-xl font-bold text-black mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-[#EC3642] text-white px-4 py-2 rounded shadow-2xl hover:bg-red-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
