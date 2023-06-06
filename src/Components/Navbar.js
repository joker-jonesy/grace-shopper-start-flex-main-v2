import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { logout } from "../store/auth"
import CartDropdown from "./CartDropdown"

function Navbar({ auth }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  const handleLogin = () => {
    navigate("/login")
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn-ghost btn text-xl normal-case">
          GraceShopper
        </Link>
        <ul className="menu menu-horizontal px-1">
          {auth.isAdmin && (
            <li>
              <Link to={"/users"}>Users</Link>
            </li>
          )}
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        {auth.id && (
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
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            {/* CART DROP DOWN */}
            <CartDropdown />
        
          </div>
        )}
        {/* USER DROP DOWN */}
        {auth.id ? (
          <button
            className="btn-secondary btn mr-2"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn-secondary btn mr-2"
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
