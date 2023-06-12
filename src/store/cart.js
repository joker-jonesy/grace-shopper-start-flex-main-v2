import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

const initialState = {
  cartItems: [],
}

export const fetchUserCart = createAsyncThunk("fetchUserCart", async () => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.get("/api/cart", {
      headers: {
        authorization: token,
      },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchGuestCart = createAsyncThunk("fetchGuestCart", async () => {
  let cart = window.localStorage.getItem("cart");
  if(!cart){
    window.localStorage.setItem("cart", JSON.stringify({id: uuidv4(), userId: null}))
    cart = window.localStorage.getItem("cart");
  }
  return JSON.parse(cart)
}) 

export const addToCart = createAsyncThunk("addToCart", async (payload) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.post("/api/cart", payload, {
      headers: {
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const removeFromCart = createAsyncThunk("removeFromCart", async (payload) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.put("/api/cart", payload, {
      headers: {
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuestCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default cartSlice.reducer
