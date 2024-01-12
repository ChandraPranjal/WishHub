import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createContact,getContacts } from "./contactAPI";

export const getContactsAsync = createAsyncThunk("/contacts", 
async (userId) => {

  const response = await getContacts(userId);
  return response.data;
});

export const createContactAsync = createAsyncThunk(
  "/contacts/create",
  async (userData) => {
    const reponse = await createContact(userData);
    return reponse.data;
  }
);

export const contactSlice = createSlice({
  name: "address",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(createContactAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createContactAsync.fulfilled, (state, action) => {
      (state.status = "loaded"), (state.data = [...state.data, action.payload]);
    });
    builder.addCase(createContactAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getContactsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getContactsAsync.fulfilled, (state, action) => {
      (state.status = "loaded"), (state.data = action.payload);
    });
    builder.addCase(getContactsAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default contactSlice.reducer;
