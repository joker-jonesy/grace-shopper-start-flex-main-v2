import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  products: Array(0),
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

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (product) => {
    try {
      const token = window.localStorage.getItem("token")
      const response = await axios.put(`/api/products/${product.id}`, product, {
        headers: {
          authorization: token,
        },
      })
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId) => {
    try {
      const token = window.localStorage.getItem("token")
      const response = await axios.delete(`/api/products/${productId}`, {
        headers: {
          authorization: token,
        },
      })
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
    }),
      builder.addCase(updateProduct.fulfilled, (state, action) => {
        return action.payload
      }),

      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        return action.payload
      })
  },
})

export const { setSelectedCategory } = productsSlice.actions
export default productsSlice.reducer
