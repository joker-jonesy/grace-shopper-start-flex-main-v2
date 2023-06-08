import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { logout } from "../store/auth"
import CartDropdown from "./CartDropdown"
import { cartQuantity } from "../util"
import { fetchGuestCart, fetchUserCart } from "../store"

function Navbar({ auth }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate("/login")
  }

  const { cart } = useSelector((state) => state)

  const cartDisplayQuantity = cartQuantity(cart.cartItems)

  return (
    <div className="navbar sticky top-0 z-10 bg-base-200">
      <div className="flex-1">
        <Link to={"/"} className="text-md btn-ghost btn normal-case">
          Home
        </Link>
        {auth.isAdmin && (
          <Link to={"/admin"} className="text-md btn-ghost btn normal-case">
            Admin
          </Link>
        )}
        <Link to={"/products"} className="text-md btn-ghost btn normal-case">
          Products
        </Link>
      </div>
      <div className="flex-none">
        {
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* CART TOTAL ITEMS */}
                <span className="badge badge-sm indicator-item">
                  {cartDisplayQuantity}
                </span>
              </div>
            </label>
            {/* CART DROP DOWN */}
            <CartDropdown />
          </div>
        }
        {/* USER DROP DOWN */}
        {auth.id ? (
          <button
            className="btn-secondary btn-sm btn mr-2"
            onClick={() => navigate("/account")}
          >
            Account
          </button>
        ) : (
          <button
            className="btn-secondary btn-sm btn mr-2"
            onClick={() => handleLogin()}
          >
            Login | Sign Up
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
