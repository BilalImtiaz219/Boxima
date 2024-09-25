import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, getCartByUserID } from "../redux/storeAPIs.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import SingleCartItem from "./SingleCartItem.jsx";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart = {}, products = [] } = useSelector((state) => state.data) || {};
  const { user = {} } = useAuth() || {};

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getCartByUserID(user._id));
    }
  }, [user?._id]);

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-[white] text-black px-4 sm:px-10 md:px-20 lg:px-40 py-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#EC3642]">Checkout</h1>

      {!cart?.items?.length ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-4">
            {cart?.items?.length > 0 &&
              cart?.items?.map((item) => (
                <SingleCartItem
                  item={item}
                  key={item?._id}
                  products={products}
                  cartID={cart?._id}
                />
              ))}
          </ul>
          {/* <div className="text-xl font-bold mb-4 text-black">Total: ${getTotalPrice().toFixed(2)}</div> */}
        </>
      )}

      <button
        className="bg-[#EC3642] text-white p-2 px-4 rounded-lg font-semibold transition hover:bg-[#d52b3d] disabled:opacity-50"
        onClick={handleProceedToPayment}
        disabled={cart?.items?.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
