import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../store/singleProduct"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import AddToCartButton from "./AddToCartButton"
import ReviewForm from "./ReviewForm"

const SingleProductView = () => {
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState()
  const product = useSelector((state) => state.singleProduct)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch, id])

  const addToCart = (event) => {
    event.preventDefault()
    //add to cart function
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newReview = {description, rating}

    dispatch(createReview(newReview))

    setDescription("")
    setRating("")
  }

  const starArr = Array.from(Array(5).keys())

  const handleReturn = () => {
    navigate(-1) // to go back to the previous page
  }

  return !product.id ? (
    <>
      <h1 className="bg-gradient-to-r from-success to-accent bg-clip-text text-9xl font-extrabold text-transparent">
        Product Not Found
      </h1>
      <NavLink
        to={"/"}
        className={({ isActive, isPending }) =>
          `text-md btn-ghost btn normal-case ${isActive ? "btn-active" : ""}`
        }
      >
        Return to Previous Page
      </NavLink>
    </>
  ) : (
    <div>
      <div className="flex flex-wrap justify-center gap-10 mt-6 text-2xl font-bold normal-case"> 
        {product.name}
      </div>
      <hr />
      <div className="flex flex-row justify-center">
        <div className="card glass card-compact m-4 w-64 sm:card-normal">
          <img src={product.imageURL} className="mask-square aspect-square h-full w-full"/>
          <p className="text-sm">{product.description}</p>
          <span className="badge badge-ghost">
            <span className="text-lg font-bold">$</span>
            <span className="font-bold">{product.price}</span>
          </span>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <AddToCartButton product={product} quantity={parseInt(quantity)} />
          </form>
        </div>
        <ReviewForm />
      </div>
    </div>
  )
}
export default SingleProductView
