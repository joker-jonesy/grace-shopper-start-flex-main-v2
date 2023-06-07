import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  products: [],
  selectedCategory: "",
}

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (category) => {
    try {
      const response = await axios.get(`/api/products?category=${category}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // for setting the selected category
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { setSelectedCategory } = productsSlice.actions
export default productsSlice.reducer
