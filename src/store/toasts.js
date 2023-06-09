import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  toasts: [
  ],
}

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    createToast(state, action) {
      state.toasts.push(action.payload)
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
  },
  extraReducers: (builder) => { },
})

export const { removeToast, createToast } = toastsSlice.actions
export default toastsSlice.reducer
