import React, { useState } from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"

function UserDetails({ user }) {
  const [selectedTab, setSelectedTab] = useState(1)
  if (!user) return null
  return (
    <>
      <h2 className="font-bold">{user.username}'s Details</h2>
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${selectedTab === 1 && "tab-active"}`}
          onClick={() => setSelectedTab(1)}
        >
          Orders
        </a>
        <a
          className={`tab ${selectedTab === 2 && "tab-active"}`}
          onClick={() => setSelectedTab(2)}
        >
          Carts
        </a>
        <a
          className={`tab ${selectedTab === 3 && "tab-active"}`}
          onClick={() => setSelectedTab(3)}
        >
          Reviews
        </a>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {selectedTab === 1 && (
            <div className="overflow-x-auto">
              <table className="table-xs table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Created At</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders &&
                    user.orders
                      .filter((order) => {
                        return order.isCart !== true
                      })
                      .map((order) => {
                        return (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.createdAt}</td>
                            <td>x</td>
                            <td>x</td>
                            <td>
                              <button className="btn-neutral btn">
                                View Items
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === 2 && (
            <div className="overflow-x-auto">
              <table className="table-xs table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Created At</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders &&
                    user.orders
                      .filter((order) => {
                        return order.isCart === true
                      })
                      .map((order) => {
                        return (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.createdAt}</td>
                            <td>x</td>
                            <td>x</td>
                            <td>
                              <button className="btn-neutral btn">
                                View Items
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === 3 && (
            <div className="overflow-x-auto">
              <table className="table-xs table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Created At</th>
                    <th>Rating</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {user.reviews &&
                    user.reviews.map((review) => {
                      return (
                        <tr key={review.id}>
                          <td>
                            <Link to={`/products/${review.product.id}`}>
                              {review.product.name}
                            </Link>
                          </td>
                          <td>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <Rating
                              rating={review.rating}


                            />
                          </td>
                          <td>{review.description}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserDetails
