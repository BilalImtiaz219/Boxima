import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  fetchProducts,
  getCartByUserID,
  placeNewOrder,
} from "../redux/storeAPIs.js";
import { useNavigate } from "react-router-dom";
import { useToastify } from "../hooks/useToastify.js";

const formFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Full Name",
    fullWidth: true,
  },
  {
    name: "email",
    type: "email", // Corrected type to "email"
    placeholder: "Email Address",
    fullWidth: true,
  },
  {
    name: "phone",
    type: "tel", // Corrected type to "tel"
    placeholder: "Contact Number",
    fullWidth: true,
  },
  {
    name: "streetAddress",
    type: "text",
    placeholder: "Street Address",
    fullWidth: true,
  },
  {
    name: "city",
    type: "text",
    placeholder: "City",
    fullWidth: false,
  },
  {
    name: "state",
    type: "text",
    placeholder: "State/Province",
    fullWidth: false,
  },
  {
    name: "postalCode",
    type: "number",
    placeholder: "Postal Code",
    fullWidth: false,
  },
  {
    name: "country",
    type: "text",
    placeholder: "Country",
    fullWidth: false,
  },
];

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToastify();
  const { cart, products } = useSelector((state) => state.data) || {};
  const { user = {} } = useAuth() || {};
  const [totalPrice, setTotalPrice] = useState(0);
  const [formValues, setFormValues] = useState({});

  const onChangeHandler = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (user?._id && dispatch) {
      dispatch(getCartByUserID(user._id));
    }
  }, [user?._id, dispatch]);

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (cart?.items?.length && products?.length) {
      const calculatedTotalPrice = cart.items.reduce((total, item) => {
        const product = products.find(
          (product) => product._id === item.productID
        );
        return total + (product?.price || 0) * item.quantity;
      }, 0);
      setTotalPrice(calculatedTotalPrice.toFixed(2));
    }
  }, [cart, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      showErrorToast("Please Login First");
      return;
    }
    const productDetails =
      cart.items?.map((item) => {
        const { productID, quantity } = item;
        let product = products.find((p) => p._id === productID);
        return {
          quantity,
          totalQuantityPrice: item.quantity * product.price,
          ...product,
        };
      }) || [];

    let userDetails = { ...user };
    delete userDetails.password;

    const data = {
      billingDetails: formValues,
      productDetails,
      userDetails,
      totalPrice,
    };
    const res = await dispatch(placeNewOrder(data));
    console.log("🚀 ~ handleSubmit ~ res:", res);
    if (res.type?.includes('fulfilled')) {
      showSuccessToast(res.payload.message);
      navigate('/');
    } else {
      showErrorToast('Request Failed');
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-black p-8 md:p-16 lg:p-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl text-[#EC3642] font-bold mb-4">
            Billing Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={`${field.fullWidth ? "col-span-1 sm:col-span-2" : ""}`}
                >
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500"
                    required
                    onChange={(e) =>
                      onChangeHandler(field.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-start items-start gap-3">
              <h2 className="text-xl text-[#EC3642] font-bold">
                Payment Methods
              </h2>
              <div className="flex items-center">
                <input
                  value="cash-on-delivery"
                  type="radio"
                  id="cash-on-delivery"
                  name="paymentMethod"
                  defaultChecked
                  className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:border-[#EC3642] checked:bg-[#EC3642]"
                />
                <label htmlFor="cash-on-delivery" className="ml-2">
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#EC3642] text-white py-2 px-4 border border-transparent rounded-md 
                text-sm font-medium hover:bg-[#e02d3b]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Your Order */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl text-[#EC3642] font-bold mb-4">Your Order</h2>
          <ul className="mb-4">
            {cart?.items?.map((item) => (
              <ProductQuantityAndPrice
                key={item._id}
                item={item}
                products={products}
                setTotalPrice={setTotalPrice}
              />
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductQuantityAndPrice = ({
  products = [],
  item = {},
  setTotalPrice = () => {},
}) => {
  const product = useMemo(() => {
    if (products?.length > 0 && item?.productID) {
      return products.find((product) => product._id === item.productID);
    }
    return {};
  }, [products, item.productID]);

  const price = (product.price * item.quantity).toFixed(2);

  return (
    <li className="flex justify-between mb-2 items-center">
      <img
        className="w-[100px] h-[100px] object-contain"
        alt={product.name}
        src={product.image}
      />
      <span>
        {product.name} (x{item.quantity})
      </span>
      <span>${price}</span>
    </li>
  );
};

export default Payment;
