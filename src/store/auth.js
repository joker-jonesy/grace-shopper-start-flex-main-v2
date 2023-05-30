import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {};

export const loginWithToken = createAsyncThunk("loginWithToken", async () => {
  const token = window.localStorage.getItem('token');
  if(token){
    const response = await axios.get('/api/auth', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }
});

export const attemptLogin = createAsyncThunk("attemptLogin", async (cred) => {
  const response = await axios.post('/api/auth', cred);
  window.localStorage.setItem('token', response.data);
  loginWithToken();
});

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout: (state)=>{
      window.localStorage.removeItem('token');
      state.value={};
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(loginWithToken.fulfilled, (state, action)=>{
      return action.payload;
    })
  }
});

export default authSlice.reducer;
