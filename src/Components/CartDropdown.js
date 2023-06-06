import React from 'react'

const CartDropdown = () => {
    return (
            <div
              tabIndex={0}
              className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
            >
            <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn-primary btn-block btn">
                    View cart
                  </button>
                </div>
            </div>
            </div>
    )
}

export default CartDropdown