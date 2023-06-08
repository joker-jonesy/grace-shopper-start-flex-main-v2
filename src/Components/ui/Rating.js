import React, { useState, useEffect } from "react"

function Rating({ rating, onSelect }) {
  //To update review in database,  pass function to onSelect prop
  const [ratingState, setRatingState] = useState(rating ? rating : 0)
  const [stars, setStars] = useState([])
  useEffect(() => {
    const stars = generateStars(ratingState)
    setStars(stars)
  }, [])

  const onClick = (starIndex) => {
    if (!onSelect) return
    const stars = generateStars(starIndex)
    setRatingState(starIndex)
    setStars(stars)
    if ('function' === typeof onSelect) {
      onSelect(starIndex)
    }

  }

  const generateStars = (rating) => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const rand = Math.floor(Math.random() * (10000 - 1) + 1);
      stars.push(
        <div
          key={i + rand}
          onClick={() => onClick(i)}
          className={`mask mask-star h-4 w-4 ${i <= rating ? "bg-secondary" : "bg-base-300"
            } ${onSelect
              ? "hover:scale-110 hover:cursor-pointer hover:bg-base-200"
              : ""
            }`}
        ></div>
      )
    }
    return stars
  }

  return <div className="flex flex-row justify-between">{stars}</div>
}

export default Rating
