import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import filterReducer from "../features/filters/filterSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import contactReducer from "../features/checkout/contactSlice"
import orderReducer from '../features/order/orderSlice'
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer,
    auth: authReducer,
    cart: cartReducer,
    contact:contactReducer,
    order:orderReducer,
    user:userReducer
  },
});
