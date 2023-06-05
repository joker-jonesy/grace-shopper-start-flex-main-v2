import React, { useEffect } from "react"
import Home from "./Home"
import Login from "./Login"
import Cart from "./Cart"
import { useSelector, useDispatch } from "react-redux"
import { loginWithToken, fetchCart } from "../store"
import { Link, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
const App = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginWithToken())
  }, [])

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart())
    }
  }, [auth])
  return (
    <>
      <Navbar auth={auth} />
      <div className="flex justify-center">
        {auth.id ? <></> : <Login />}
        {!!auth.id && (
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  )
}

export default App
