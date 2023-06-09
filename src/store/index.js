import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import auth from "./auth"
import cart from "./cart"
import products from "./products"
import singleProduct from "./singleProduct"
import users from "./users"

const persistedCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { lineItems: [] }

const store = configureStore({
  reducer: {
    auth: auth,
    cart: cart,
    products: products,
    singleProduct: singleProduct,
    users: users,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: {
    cart: persistedCart,
  },
})

export default store
export * from "./auth"
export * from "./cart"
export * from "./products"
export * from "./users"
