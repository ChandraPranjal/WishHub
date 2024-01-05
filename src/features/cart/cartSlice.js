import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItem, deleteItemFromCart, fetchItemsByUserId, updateCart } from "./cartAPI";

export const addItemAsync = createAsyncThunk(
    "/cart/addItem",async (productInfo)=>{
        const response = await addItem(productInfo);
        return response.data;
    }
) 

export const fetchItemsByUserIdAsync = createAsyncThunk(
    "/cart/fetchItemsByUserId",async (userId)=>{
        const response = await fetchItemsByUserId(userId);
        return response.data;
    }
)

export const updateCartAsync = createAsyncThunk(
    "/cart/updateCart",async (id)=>{
        const response = await updateCart(id);
        return response.data;
    }
)

export const deleteItemFromCartAsync = createAsyncThunk(
    "/cart/deleteItem",async (id)=>{
        const response = await deleteItemFromCart(id);
        return response.data;
    }
)


export const cartSlice = createSlice({
    name : "cartSlice",
    initialState:{
        cartItems:[],
        status:"idle"
    },
    extraReducers:(builder)=>{
        builder.addCase(addItemAsync.pending,(state,action)=>{
            state.status = "loading"
        });
        builder.addCase(addItemAsync.fulfilled,(state,action)=>{
            state.status = "loaded",
            state.cartItems = [...state.cartItems,action.payload]
        });
        builder.addCase(addItemAsync.rejected,(state,action)=>{
            state.status = "rejected"
        })
        builder.addCase(fetchItemsByUserIdAsync.pending,(state,action)=>{
            state.status = "loading"
        })
        builder.addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
            state.status = "loaded",
            state.cartItems = action.payload
        })
        builder.addCase(fetchItemsByUserIdAsync.rejected,(state,action)=>{
            state.status = "rejected"
        })
        builder.addCase(updateCartAsync.pending,(state,action)=>{
            state.status = "loading"
        })
        builder.addCase(updateCartAsync.fulfilled,(state,action)=>{
            state.status = "loaded",
            state.cartItems = state.cartItems.map((item)=>{
                if(item.id !== action.payload.id)
                    return item;
                else
                    return action.payload;
            })
        })
        builder.addCase(updateCartAsync.rejected,(state,action)=>{
            state.status = "rejected"
        })
        builder.addCase(deleteItemFromCartAsync.pending,(state,action)=>{
            state.status = "loading"
        })
        builder.addCase(deleteItemFromCartAsync.fulfilled,(state,action)=>{
            state.status = "loaded",
            state.cartItems = state.cartItems.filter((item)=>{
                if(item.id !== action.payload.id)
                    return item;
            })
            
        })
        builder.addCase(deleteItemFromCartAsync.rejected , (state,action)=>{
            state.status = "rejected"
        })
    }
})

export default cartSlice.reducer;