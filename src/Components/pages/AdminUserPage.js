import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import UserDetails from "../ui/UserDetails"
import { fetchUsers } from "../../store/users"

function AdminUserPage() {
  const { users } = useSelector((state) => state)
  const [selectedUser, setSelectedUser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <div className="flex w-full flex-row">
      <div className="w-1/2 p-2">
        <h2 className="p-2 text-sm">
          Select a user to view orders, carts, and reviews.
        </h2>
        <div className="flex flex-row justify-evenly"></div>
        <div className="bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>
                    <input
                      type="checkbox"
                      checked="checked"
                      className="checkbox h-4 w-4"
                    />{" "}
                    Admin
                  </th>
                  <th>Stripe ID</th>
                  <th>Total Orders and Carts</th>
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
                        <td>{user.stripeId}</td>
                        <td>{user.orders ? user.orders.length : 0}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-1/2 p-2">
        <UserDetails user={selectedUser} />
      </div>
    </div>
  )
}

export default AdminUserPage
