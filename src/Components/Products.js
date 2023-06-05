import React, { useState } from "react"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"

const Products = () => {
  const {products} = useSelector(state => state);

  return (
    <div className="flex flex-wrap flex-shrink m-12" >
      {products.map((product) => {
        return (
          <div className="card glass m-4 w-48" key={uuidv4()}>
            <figure>
              <img src={product.imageURL} alt="" />
            </figure>
            <div className="card-body p-2">
              <Link to={`/products/${product.id}`}>
                <h2 className="text-md">{product.name}</h2>
              </Link>
              <div className="card-actions justify-end">
                <button className="rounded-md bg-cyan-500 p-1 text-xs">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Products