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
    <div className="card card-compact sm:card-normal glass m-4 w-64">
      <img src= {product.imageURL}/>
      <h1 className="text-lg font-bold">{product.name}</h1>
      <p className='text-sm'>{product.description}</p>
      <span className="badge badge-ghost">
        <span className="text-lg font-bold">$</span><span className="font-bold">{product.price}</span>
      </span>
      <form onSubmit={addToCart}>
        {/* <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        /> */}
        <select className="select select-bordered w-full max-w-xs">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button className="btn-secondary btn-sm btn mr-2">
          Add to Cart
        </button>
      </form>
    </div>
  )
}
export default SingleProductView
