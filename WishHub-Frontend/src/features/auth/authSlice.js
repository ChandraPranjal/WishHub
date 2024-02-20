import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authentication, createUser, loginUser } from "./authAPI";

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
  const response = await fetch("http://localhost:3000/api/v1/users/logout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  const data = await response.json();
  return data;
});
export const authenticationAsync = createAsyncThunk(
  "user/authentication",
  async () => {
    const response = await authentication();
    return response.data;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    userToken: null,
    error: null,
    isChecked: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.status = "loaded";
      //password must not be sent back. Modify it later
      state.userToken = action.payload.id;
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
    builder.addCase(authenticationAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(authenticationAsync.fulfilled, (state, action) => {
      state.status = "loaded";
      state.userToken = action.payload;
      state.isChecked = true;
    });
    builder.addCase(authenticationAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.isChecked = true;
    });
  },
});

export default authSlice.reducer;
