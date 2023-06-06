import React from "react"
import { useSelector, useDispatch } from "react-redux"

const Home = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col items-center">
      <h1>Home</h1>
      {auth.username ? <div>Welcome {auth.username}!!</div> : <></>}
      <div className="w-3-4"></div>
    </div>
  )
}

export default Home
