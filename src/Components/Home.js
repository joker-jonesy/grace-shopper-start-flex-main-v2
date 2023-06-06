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
    </div>
  )
}

export default Home
