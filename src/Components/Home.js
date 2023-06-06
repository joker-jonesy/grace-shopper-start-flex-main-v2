import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store"
import { Link } from "react-router-dom"
import UserDetails from "./UserDetails"

const Home = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col items-center">
      <h1>Home</h1>
      {auth.username ? <div>Welcome {auth.username}!!</div> : <></>}
      <div className="w-1/2">
        <UserDetails user={auth} />
      </div>
    </div>
  )
}

export default Home
