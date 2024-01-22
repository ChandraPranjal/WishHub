import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggerInUserOrders } from "./userAPI";

export const fetchLoggerInUserOrdersAsync = createAsyncThunk(
  "/user/fetchLoggerInUserOrders",
  async (id) => {
    const response = await fetchLoggerInUserOrders(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userOrders: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoggerInUserOrdersAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchLoggerInUserOrdersAsync.fulfilled, (state, action) => {
      (state.status = "loaded"),
        console.log("action,payload in slice", action.payload);

      state.userOrders = action.payload;
    });
    builder.addCase(fetchLoggerInUserOrdersAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default userSlice.reducer;
