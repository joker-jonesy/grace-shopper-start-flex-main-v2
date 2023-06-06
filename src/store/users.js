import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  users: [],
  user: {},
}

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.get("/api/users", {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchUser = createAsyncThunk("fetchUser", async (id) => {
  try {
    const token = window.localStorage.getItem("token")
    const response = await axios.get(`/api/users/${id}`, {
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer
