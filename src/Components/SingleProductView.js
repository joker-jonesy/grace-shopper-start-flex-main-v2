import React, { useState } from "react"

const SingleProductView = () => {
  const [amount, setAmount] = useState(1)

  const addToCart = (event) => {
    event.preventDefault()
    //add to cart function
  }

  return (
    <div>
      <h1>Name</h1>
      <img></img>
      <p>description</p>
      <h3>price</h3>
      <form onSubmit={addToCart}>
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button>Add to Cart</button>
      </form>
    </div>
  )
}
export default SingleProductView
