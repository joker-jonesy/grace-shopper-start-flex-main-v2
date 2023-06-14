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

    // const starArr = Array.from(Array(5).keys())

    return (
        <div>Leave a Review
            <form onSubmit={handleSubmit}>
                <label>Description
                    <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
                {/* <label>Star Rating
                    {/* <select value={rating} onChange={(event) => setRating(event.target.value)} className="select select-bordered w-full max-w-xs">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select> */}
                {/* </label> */} 
                <Rating className="select select-bordered w-20"rating={rating} onSelect={setRating}/>
                <button disabled = {description === "" || rating === ""}type="submit" className="btn-secondary btn-sm btn text-base-300">Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm
