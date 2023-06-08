import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../store/singleProduct"
import { useParams } from "react-router-dom"

const SingleProductView = () => {
  const [amount, setAmount] = useState(1)
  const product = useSelector(state => state.singleProduct)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch])

  const addToCart = (event) => {
    event.preventDefault()
    //add to cart function
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src= {product.imageURL}/>
      <p>{product.description}</p>
      <h3>{product.price}</h3>
      <form onSubmit={addToCart}>
        {/* <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        /> */}
        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button>Add to Cart</button>
      </form>
    </div>
  )
}
export default SingleProductView
