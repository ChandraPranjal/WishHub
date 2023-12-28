import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./productAPI";

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilters",
  async (filter) => {
    console.log("Filter in slice", filter);
    const response = await fetchProductsByFilters(filter);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      (state.status = "loaded"),
        (state.products = [...state.products, ...action.payload]);
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    });
    builder.addCase(fetchProductsByFilterAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      (state.status = "loaded"), (state.products = action.payload);
    });
    builder.addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});


export const selectAllProducts = (state) => state.products.products;

export default productSlice.reducer;
