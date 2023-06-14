import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Products } from "./Products"
import axios from "axios"

const Landing = () => {
  const { products } = useSelector((state) => state.products)

  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    if (Array.isArray(products)) {
      setPopularProducts(products.slice(0, 4))
    } else {
      setPopularProducts([])
    }
  }, [products])

  return (
    <div className="">
      <div className="flex justify-center backdrop-blur">
        <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-8xl font-extrabold text-transparent">
          ACME Web Store
        </div>
      </div> 
      <p className="m-auto mb-2 mt-2 flex w-10/12 justify-center text-center">
        About: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
        aliquid, delectus, illum illo id atque libero deleniti enim eius
        perferendis et! Expedita excepturi perspiciatis similique ipsum amet
        totam nulla sapiente!
      </p>
      <h1 className="mt-12 flex justify-center text-4xl">Popular Products</h1>
      <Products currentProducts={popularProducts} />
    </div>
  )
}

export default Landing
