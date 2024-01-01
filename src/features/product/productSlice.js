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
  async ({ filter, sort, page }) => {
    const response = await fetchProductsByFilters({ filter, sort, page });
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    totalItems: 0,
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
      const { products, totalItems } = action.payload;
      state.status = "loaded";
      state.products = products;
      state.totalItems = totalItems;
    });

    builder.addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
