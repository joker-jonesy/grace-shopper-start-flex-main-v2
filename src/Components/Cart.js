import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchGuestCart, fetchUserCart, logout, removeFromCart } from "../store"
import { Link, useNavigate } from "react-router-dom"
import { cartQuantity, cartTotal } from "../util"
import Spinner from "./Spinner"
import RemoveFromCartButton from "./RemoveFromCartButton"
import CartItem from "./CartItem"

const Cart = () => {
  const { cart, auth, product } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserCart())
    } else {
      dispatch(fetchGuestCart())
    }
  }, [])


  const cartItems = cart && cart.cartItems ? cart.cartItems : []
  const totalPrice = cartTotal(cart.cartItems)
  const totalItems = cartQuantity(cart.cartItems)

  return (
    <div>
      <h1>Cart</h1>
      <div className="m-4 flex flex-shrink flex-wrap justify-center">
        {cartItems.map((product) => (
          <CartItem key={product.product.id} product={product}/>
        ))}
        <div className="flex-row">
          <div className="badge badge-ghost">
            <div className="text-lg font-bold"> Total: ${totalPrice}</div>
          </div>
          <div>{totalItems} Items</div>
        </div>
      </div>
      <button className="btn-primary btn-block btn" onClick={()=>{navigate("/orders/verify")}}>Checkout</button>
    </div>
  )
}

export default Cart
