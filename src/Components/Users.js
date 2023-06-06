import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>{user.username}</th>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.isAdmin ? "TRUE" : "FALSE"}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
