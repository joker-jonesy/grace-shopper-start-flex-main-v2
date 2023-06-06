import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = []

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await axios.get("/api/products")
    return response.data
  } catch (err) {
    console.log(err)
  }
})


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default productsSlice.reducer