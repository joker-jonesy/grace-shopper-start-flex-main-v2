import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store"
import { Link } from "react-router-dom"

const Home = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Home</h1>
      {auth.username ? <div>Welcome {auth.username}!!</div> : <></>}
      <Link to="/products">Products</Link>
      <Link to="/login"> Login</Link>
      <Link to="/account/create">Create Account</Link>
    </div>
  )
}

export default Home
