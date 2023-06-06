import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"
import { fetchUsers } from "../store/users"

const Users = () => {
  const { auth, users } = useSelector((state) => state)
  if (!auth.isAdmin) {
    return <h1>Not Authorized</h1>
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <></>
    </div>
  )
}

export default Users
