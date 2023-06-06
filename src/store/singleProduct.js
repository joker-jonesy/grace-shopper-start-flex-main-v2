import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {}

export const fetchSingleProduct = createAsyncThunk("fetchSingleProduct", async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
})

const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default singleProductSlice.reducer