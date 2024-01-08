import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";


export const createOrderAsync = createAsyncThunk(
    "/orders/create",async (orderData)=>{
        const response = await createOrder(orderData);
        return response.data;
    }
)

export const orderSlice = createSlice({
    name : "order",
    initialState:{
        status:"idle",
        orders:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(createOrderAsync.pending,(state,action)=>{
            state.status = "loading"
        })
        builder.addCase(createOrderAsync.fulfilled,(state,action)=>{
            state.status = "loaded",
            state.orders = [...state.orders , action.payload]
        })
        builder.addCase(createOrderAsync.rejected,(state,action)=>{
            state.status = "rejected"
        })
    }
})

export default orderSlice.reducer

