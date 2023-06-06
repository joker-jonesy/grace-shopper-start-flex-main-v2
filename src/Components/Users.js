import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUsers } from "../store/users"
import UserDetails from "./UserDetails"

const Users = () => {
  const { auth, users } = useSelector((state) => state)
  const [selectedUser, setSelectedUser] = useState(null)
  if (!auth.isAdmin) {
    return <h1>Not Authorized</h1>
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleUserClick = () => {}
  return (
    <div>
      <h1 className="p-8 text-lg font-bold">Users</h1>
      <div className="flex flex-row">
        <div className="w-1/2 p-2">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Admin</th>
                  <th>Total Orders</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user) => {
                    return (
                      <tr
                        key={user.id}
                        className="hover cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <th>{user.username}</th>
                        <td>{user.email}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>{user.isAdmin ? "TRUE" : "FALSE"}</td>
                        <td>{user.orders ? user.orders.length : 0}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <UserDetails user={selectedUser} />
        </div>
      </div>
    </div>
  )
}

export default Users
