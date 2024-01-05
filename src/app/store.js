import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import filterReducer from "../features/filters/filterSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
