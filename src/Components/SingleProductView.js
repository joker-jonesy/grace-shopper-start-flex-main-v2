import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../store/singleProduct"
import { useParams } from "react-router-dom"
import AddToCartButton from "./AddToCartButton"
import { createReview } from "../store"

const SingleProductView = () => {
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState()
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

  const handleSubmit = (event) => {
    event.preventDefault()

    const newReview = (
      description, 
      rating
    )

    dispatch(createReview(newReview))

    setDescription("")
    setRating("")
  }

  const starArr = Array.from(Array(5).keys())

  return (
    <div>
      <div className="card card-compact sm:card-normal glass m-4 w-64">
        <img src= {product.imageURL}/>
        <h1 className="text-lg font-bold">{product.name}</h1>
        <p className='text-sm'>{product.description}</p>
        <span className="badge badge-ghost">
          <span className="text-lg font-bold">$</span><span className="font-bold">{product.price}</span>
        </span>
        <form onSubmit={addToCart}>
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <AddToCartButton product={product} quantity={parseInt(quantity)}/>
        </form>
      </div>
      <div>Leave a Review
        <form onSubmit={handleSubmit}>
          <label>Description
            <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label>Star Rating
            {/* <input
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            /> */}
            <select className="select select-bordered w-full max-w-xs">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <button disabled = {description === "" || rating === ""}type="submit">Submit</button>
        </form>
      </div>
    </div>
      

  )
}
export default SingleProductView
