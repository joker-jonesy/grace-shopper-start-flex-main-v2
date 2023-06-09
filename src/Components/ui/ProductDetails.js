import React from "react"
import Rating from "./Rating"
import Socials from "./Socials"
import { getAverageRating } from "../../util"

function ProductDetails({ product, children }) {
  if (!product) return null
  return (
    <div className="container mx-auto px-5">
      <div className="mx-auto flex flex-wrap lg:w-4/5">
        {product.imageURL && (
          <img
            className="h-8 w-full rounded object-cover object-center lg:h-auto lg:w-1/3"
            src={product.imageURL}
            alt={product.name}
          />
        )}
        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
          <h2 className="title-font text-sm tracking-widest text-gray-500">
            {product.material}
          </h2>
          <h1 className="title-font mb-1 text-3xl font-medium text-secondary">
            {product.name}
          </h1>
          <div className="mb-4 flex items-center">
            {product.rating && (
              <Rating rating={getAverageRating(product.rating)} />
            )}
            {product.id && (
              <span className="ml-3 flex border-l-2 border-gray-200 py-2 pl-3">
                <Socials product={product} />
              </span>
            )}
          </div>
          <span className="badge badge-ghost mb-2">
            <span className="">{product.category}</span>
          </span>
          <p className="leading-relaxed">{product.description}</p>
          <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-200 pb-5">
            <div className="flex">
              <span className="title-font text-2xl font-medium text-secondary">{`$${product.price}`}</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
