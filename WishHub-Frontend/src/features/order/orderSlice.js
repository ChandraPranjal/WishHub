import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";
import { resetCart } from "../cart/cartAPI";

export const createOrderAsync = createAsyncThunk(
  "/orders/create",
  async (orderData) => {
    const response = await createOrder(orderData);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: "idle",
    orders: [],
    orderPlaced: null,
  },
  reducers: {
    resetOrder: (state, action) => {
      // (state.orders = []), 
        (state.status = "reseted"),
        (state.orderPlaced = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      (state.status = "loaded"),
        (state.orders = [...state.orders, action.payload]),
        (state.orderPlaced = action.payload);
    });
    builder.addCase(createOrderAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
