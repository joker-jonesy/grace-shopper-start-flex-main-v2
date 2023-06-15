import React, { useState } from 'react'
import { createReview } from '../store'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Rating from './ui/Rating'

const ReviewForm = () => {
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(1)
    const dispatch = useDispatch()
    const { id } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault()
    
        const newReview = {
          productId: id,
          description, 
          rating
    }

        dispatch(createReview(newReview))
    
        setDescription("")
        setRating("")
    }


    return (
        <div className="w-75 card glass card-compact p-2 flex-col space-y-10">
            <div className="font-bold text-lg">Leave a Review</div>
            <div className="text-sm">Description</div>
            <form onSubmit={handleSubmit}>
                <input
                className="h-40"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                />
                <div className="p-5">
                    <Rating className="select select-bordered"rating={rating} onSelect={setRating}/>
                </div>
                <button disabled = {description === "" || rating === ""}type="submit" className="btn-secondary btn-sm btn text-base-300">Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm
