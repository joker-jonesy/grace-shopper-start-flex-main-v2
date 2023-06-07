import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store"
import { Link } from "react-router-dom"

const Cart = () => {
  const { cart } = useSelector((state) => state)
  console.log("KART", cart.lineItems);
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Cart</h1>
      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
      <div>
      </div>
      <button className="btn-primary btn-block btn">Checkout</button>
    </div>
  )
}

export default Cart
