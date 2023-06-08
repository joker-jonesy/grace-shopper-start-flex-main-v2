import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartQuantity, cartTotal } from "../util"

const CartDropdown = () => {
  const { cart } = useSelector((state) => state)
  const cartItems = cart.cartItems || [] // Ensure cartItems is an array
  const dispatch = useDispatch()

  const totalPrice = cartItems.length > 0 ? cartTotal(cartItems) : 0 // Ensure totalPrice is a number
  const totalQuantity = cartItems.length > 0 ? cartQuantity(cartItems) : 0 // Ensure totalQuantity is a number

  return (
    <div
      tabIndex={0}
      className="card dropdown-content card-compact z-10 mt-3 w-52 bg-base-100 shadow"
    >
      <div className="card-body">
        <span className="text-lg font-bold">{totalQuantity} Items</span>
        <span className="text-info">Subtotal: ${totalPrice}</span>
        <div className="card-actions">
          <Link to="/cart">
            <button className="btn-primary btn-block btn">View cart</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartDropdown
