import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCategories } from "./filterAPI";

export const fetchFilterAsync = createAsyncThunk("/filters", async () => {
  const categories = await fetchCategories();
  const brands = await fetchBrands();

  return { categories, brands };
});

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    status: "idle",
    brands: [],
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilterAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchFilterAsync.fulfilled, (state, action) => {

      state.status = "loaded";
      state.brands = action.payload.brands;
      state.categories = action.payload.categories;
    });
    builder.addCase(fetchFilterAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default filterSlice.reducer;
