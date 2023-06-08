import React from "react"

function Rating({ rating, id }) {
  const ratings = new Array(5).fill().map((_, i) => {
    return (
      <input
        key={i + id}
        type="radio"
        name="rating"
        className="mask mask-star bg-secondary"
        checked={rating === i + 1}
        readOnly
      />
    )
  })


  return <div className="rating">
    {ratings}
  </div>
}

export default Rating
