import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from "../store"
import { cartQuantity, cartTotal } from "../util"

const CartDropdown = () => {
    const { cart } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  const totalPrice = cartTotal(cart.lineItems)
  const totalQuantity = cartQuantity(cart.lineItems)
    return (
            <div
              tabIndex={0}
              className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-10"
            >
            <div className="card-body">
                <span className="text-lg font-bold">{totalQuantity} Items</span>
                <span className="text-info">Subtotal: ${totalPrice}</span>
                <div className="card-actions">
                <Link to="/cart">
                  <button className="btn-primary btn-block btn">
                    View cart
                  </button>
                </Link>         
                </div>
            </div>
            </div>
    )
}

export default CartDropdown