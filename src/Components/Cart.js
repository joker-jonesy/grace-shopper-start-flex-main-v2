import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchGuestCart, fetchUserCart, logout } from "../store"
import { Link, useNavigate } from "react-router-dom"
import { cartQuantity, cartTotal } from "../util"
import Spinner from "./Spinner"

const Cart = () => {
  const { cart, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserCart())
    } else {
      dispatch(fetchGuestCart())
    }
  }, [])

  useEffect(() => {
    if (!auth.id) {
      localStorage.setItem("guestCart", JSON.stringify(cart))
    }
  }, [cart])

  const cartItems = cart && cart.cartItems ? cart.cartItems : []
  const totalPrice = cartTotal(cart.cartItems)
  const totalItems = cartQuantity(cart.cartItems)

  return (
    <div>
      <h1>Cart</h1>
      <div className="m-4 flex flex-shrink flex-wrap justify-center">
        {cartItems.map((item) => (
          <div className="card glass m-4 w-64" key={item.product.id}>
            <div className="card-body p-2">
              <span>{item.product.name}</span>
              <span>{item.product.price}</span>
              <span>{item.quantity}</span>
            </div>
            <img src={item.product.imageURL} alt={item.product.name} />
          </div>
        ))}
        <div className="flex-row">
          <div> Total: ${totalPrice}</div>
          <div>{totalItems} Items</div>
        </div>
      </div>
      <button className="btn-primary btn-block btn" onClick={navigate("/orders/create")}>Checkout</button>
    </div>
  )
}

export default Cart
