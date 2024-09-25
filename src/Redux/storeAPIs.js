import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  products: [],
  filteredProducts: [],
  cartTotals: null,
  cart: {},
  status: "idle",
  error: null,
};

//Get thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://boxima-backend.vercel.app/api/products/get"
    );
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await axios.get(
      `https://boxima-backend.vercel.app/api/products/${id}`
    );
    return response.data;
  }
);

export const fetchCart = createAsyncThunk("get/cart", async () => {
  const response = await axios.get(
    "https://boxima-backend.vercel.app/api/carts/getCart"
  );
  return response.data;
});

export const getCartByUserID = createAsyncThunk(
  "get/cartbyID",
  async (userID) => {
    const response = await axios.get(
      `https://boxima-backend.vercel.app/api/carts/get-by-user-id/${userID}`
    );
    return response.data;
  }
);

//Post thunks
export const addToCart = createAsyncThunk("post/addToCart", async (data) => {
  const response = await axios.post(
    "https://boxima-backend.vercel.app/api/carts/add-or-update",
    data
  );
  return response.data;
});

// Remove Item from Cart
export const removeItemFromCart = createAsyncThunk(
  "post/removeItemFromCart",
  async (data) => {
    const response = await axios.post(
      `https://boxima-backend.vercel.app/api/carts/remove-item/${data.userID}/${data.itemID}`,
      data
    );
    return response.data;
  }
);

export const placeNewOrder = createAsyncThunk(
  "post/placeNewOrder",
  async (data) => {
    const response = await axios.post(
      `https://boxima-backend.vercel.app/api/orders/create`,
      data
    );
    return response.data;
  }
);

// Create slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    filter: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })

      .addCase(getCartByUserID.pending, (state) => {
        state.status = "Loading cart totals";
      })
      .addCase(getCartByUserID.fulfilled, (state, action) => {
        state.status = "Succeeded in fetching cart Data";
        state.cart = action.payload || {};
      })
      .addCase(getCartByUserID.rejected, (state, action) => {
        state.status = "Failed to fetch cart totals";
        state.error = action.error.message;
        state.cart = {};
      })

      .addCase(fetchCart.pending, (state) => {
        state.status = "Loading cart";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "Succeeded in fetching cart";
        state.cart = action.payload || {};
      })

      .addCase(addToCart.pending, (state) => {
        state.status = "Adding to cart";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "Succeeded in adding to cart";
        state.cart = action.payload.cart || {};
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "Failed to add to cart";
        state.error = action.error.message;
      })

      .addCase(removeItemFromCart.pending, (state) => {
        state.status = "Removing from cart";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "Succeeded in removing from cart";
        state.cart = action.payload.cart || []; // Update cart after removing item
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = "Failed to remove from cart";
        state.error = action.error.message;
      })
      .addCase(placeNewOrder.pending, (state) => {
        state.status = "Placing new order";
      })
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.status = "Order placed successfully";
        state.cart = action.payload.cart || {}; // Update cart after placing order
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.status = "Failed to place order";
        state.error = action.error.message;
      });
  },
});

export const { filter } = dataSlice.actions;
export default dataSlice.reducer;
