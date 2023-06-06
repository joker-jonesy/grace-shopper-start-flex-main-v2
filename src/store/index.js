import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import auth from "./auth"
import cart from "./cart"
import products from "./products"
import users from "./users"

const store = configureStore({
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  reducer: {
    auth: auth,
    cart: cart,
    products: products,
    users: users,
  },
})

export default store
export * from "./auth"
export * from "./cart"
export * from "./products"
export * from "./users"
