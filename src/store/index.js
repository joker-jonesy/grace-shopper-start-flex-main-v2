import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import auth from "./auth"
import cart from "./cart"
import products from "./products"
import singleProduct from "./singleProduct"
import users from "./users"
import reviews from "./reviews"
import toasts from "./toasts"

const store = configureStore({
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  reducer: {
    auth: auth,
    cart: cart,
    products: products,
    singleProduct: singleProduct,
    users: users,
    reviews: reviews,
    toasts: toasts,
  },
})

export default store
export * from "./auth"
export * from "./cart"
export * from "./products"
export * from "./users"
export * from "./reviews"
export * from "./toasts"

