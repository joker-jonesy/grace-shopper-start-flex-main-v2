import React, { useEffect } from "react"
import Home from "./Home"
import Login from "./Login"
import Cart from "./Cart"
import Products from "./Products"
import CreateAccount from "./CreateAccount"
import NotFound from "./NotFound"
import SingleProductView from "./SingleProductView"
import { useSelector, useDispatch } from "react-redux"
import { loginWithToken, fetchCart, fetchProducts } from "../store"
import { Link, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Account from "./Account"
import Landing from "./Landing"
import Footer from "./Footer"
import AdminPage from "./pages/AdminPage"
import AdminUserPage from "./pages/AdminUserPage"
import AdminProductPage from "./pages/AdminProductPage"
import Spinner from "./Spinner"

const App = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginWithToken())
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart())
    }
  }, [auth])
  return (
    <>
      <Navbar auth={auth} />
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/create" element={<CreateAccount />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
          </Route>
          <Route path="/products/:id" element={<SingleProductView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
