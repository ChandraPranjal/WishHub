import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authAPI";

export const createUserAsync = createAsyncThunk(
  "/user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "/user/login",
  async (userData) => {
    const response = await loginUser(userData);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk("user/signout", async (userId) => {
  //do something in backend
  return "success";
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    userToken: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.status = "loaded";
      //password must not be sent back. Modify it later
      state.userToken = action.payload;
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action);
      state.error = action.error;
    });
    builder.addCase(loginUserAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.status = "loaded";
      state.userToken = action.payload.id;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.userToken = action.payload;
      state.error = action.error;
    });
    builder.addCase(signOutAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = "loaded";
      state.userToken = null;
    });
    builder.addCase(signOutAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default authSlice.reducer;
