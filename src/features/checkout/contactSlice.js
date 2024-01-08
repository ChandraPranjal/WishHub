import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createContact } from "./contactAPI";

export const createContactAsync = createAsyncThunk(
    "/contacts/create",async(userData)=>{
        const reponse = await createContact(userData);
        return reponse.data;
    }
)
export const contactSlice = createSlice({
    name:"address",
    initialState:{
        data:[],
        status:"idle"
    },
    extraReducers:(builder)=>{
        builder.addCase(createContactAsync.pending,(state,action)=>{
            state.status = "loading"
        })
        builder.addCase(createContactAsync.fulfilled,(state,action)=>{
            state.status = "loaded",
            state.data = [...state.data, action.payload];
        })
        builder.addCase(createContactAsync.rejected,(state,action)=>{
            state.status = "rejected"
        })
    }
})

export default contactSlice.reducer