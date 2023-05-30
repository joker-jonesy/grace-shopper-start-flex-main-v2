import {configureStore} from "@reduxjs/toolkit";
import auth from './auth';
import cart from './cart';

const reducer = combineReducers({
  auth,
  cart
});

const store = configureStore({
  reducer:{
    auth: auth,
    cart: cart
  }
});

export default store;

