import React, { useMemo, useState } from "react";
import { addToCart, removeItemFromCart } from "../redux/storeAPIs";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";

export default function SingleCartItem({ item = {}, products = [] }) {
  const dispatch = useDispatch();
  const { user = {} } = useAuth() || {};
  const [loading, setLoading] = useState(false);

  const product = useMemo(() => {
    if (products?.length > 0 && item.productID) {
      return products.find((product) => product._id === item.productID);
    }

    return {};
  }, [products, item.productID]);

  const handleDecreaseQuantity = async () => {
    try {
      setLoading(true);
      const data = {
        productID: item.productID,
        userID: user._id,
        quantity: item.quantity - 1,
      };
      await dispatch(addToCart(data));
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      setLoading(true);
      const data = {
        productID: item.productID,
        userID: user._id,
        quantity: item.quantity + 1,
      };
      const res = await dispatch(addToCart(data));
      console.log("res: ", res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteItem = async () => {
    try {
      setLoading(true);
      const data = {
        userID: user._id,
        itemID: item._id,
      };

      const res = await dispatch(removeItemFromCart(data));
      console.log("res: ", res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <li className="flex justify-between items-center mb-4">
      <img src={product.image} alt={product.name} className="w-20 h-20 mr-4" />
      <span className="flex-1 text-black">{product.name}</span>
      {/* <span className="mx-4 text-black">${item.price.toFixed(2)}</span> */}
      <div className="flex items-center">
        <button
          disabled={item.quantity === 1}
          className={`${
            item.quantity === 1 ? "bg-slate-500" : "bg-[#EC3642]"
          } text-[white] p-2 mx-2 font-semibold `}
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
        <span className="text-black">{item.quantity}</span>
        <button
          className="bg-[#EC3642] text-[white] p-2 mx-2 font-semibold "
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
      <button
        className="bg-[#EC3642] text-[white] p-2 ml-2 font-semibold "
        onClick={handleDeleteItem}
      >
        Remove
      </button>
    </li>
  );
}
