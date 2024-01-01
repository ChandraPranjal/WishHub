import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import filterReducer from "../features/filters/filterSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    filter:  filterReducer
  },
});
