import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../store/singleProduct"
import { useParams } from "react-router-dom"
import AddToCartButton from "./AddToCartButton"
import ReviewForm from "./ReviewForm"

const SingleProductView = () => {
  const [quantity, setQuantity] = useState(1)
  const product = useSelector(state => state.singleProduct)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch])

  return (
    <div>
      <div className="card card-compact sm:card-normal glass m-4 w-64">
        <img src= {product.imageURL}/>
        <h1 className="text-lg font-bold">{product.name}</h1>
        <p className='text-sm'>{product.description}</p>
        <span className="badge badge-ghost">
          <span className="text-lg font-bold">$</span><span className="font-bold">{product.price}</span>
        </span>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <AddToCartButton product={product} quantity={parseInt(quantity)}/>
        </form>
      </div>
      <ReviewForm />
    </div>
      

  )
}
export default SingleProductView
