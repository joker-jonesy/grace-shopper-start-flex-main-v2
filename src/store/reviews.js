import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  reviews: Array(0),
  review: {},
}

export const fetchReviews = createAsyncThunk("fetchReviews", async () => {
  try {
    const response = await axios.get("/api/reviews")
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchReview = createAsyncThunk("fetchReview", async (id) => {
  try {
    const response = await axios.get(`/api/reviews/${id}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const createReview = createAsyncThunk("createReview", async (review) => {
  try {
    console.log("REVIEW", review)
    const token = window.localStorage.getItem("token")
    const response = await axios.post("/api/reviews", review, {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const deleteReview = createAsyncThunk("deleteReview", async (id) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.delete(`/api/reviews/${id}`, {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const updateReview = createAsyncThunk("updateReview", async (review) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.put(`/api/reviews/${review.id}`, review, {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      return { ...state, reviews: action.payload }
    })
    builder.addCase(fetchReview.fulfilled, (state, action) => {
      return { ...state, review: action.payload }
    })
    builder.addCase(createReview.fulfilled, (state, action) => {
      return {
        ...state,
        review: action.payload,
        reviews: [...state.reviews, action.payload],
      }
    })
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      return {
        ...state,
        review: action.payload,
        reviews: state.reviews.filter(
          (review) => review.id !== action.payload.id
        ),
      }
    })
    builder.addCase(updateReview.fulfilled, (state, action) => {
      return {
        ...state,
        review: action.payload,
        reviews: state.reviews.map((review) =>
          review.id === action.payload.id ? action.payload : review
        ),
      }
    })
  },
})

export default reviewsSlice.reducer
