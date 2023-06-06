import React, { useState } from "react"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

const PaginatedProducts = () => {
  const { products } = useSelector((state) => state)

  //pagination variables
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentProducts = products.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(products.length / itemsPerPage)

  // Invoke when user click to request another page
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Products currentProducts={currentProducts} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="flex justify-center"
        activeClassName="text-cyan-300 m-1"
        pageClassName="text-xl m-1"
        previousClassName="text-xl text-blue-600 m-1"
        nextClassName="text-xl text-blue-600 m-1"
      />
    </>
  )
}

const Products = ({ currentProducts }) => {
  return (
    <div className="m-12 flex flex-shrink flex-wrap justify-center">
      {currentProducts.map((product) => {
        return (
          <div className="card glass m-4 w-64" key={uuidv4()}>
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

export default PaginatedProducts
