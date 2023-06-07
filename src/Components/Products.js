import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

const PaginatedProducts = () => {
  const { products } = useSelector((state) => state)
  const [selectedCategory, setSelectedCategory] = useState("")

  //pagination variables
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + itemsPerPage

  // Invoke when user click to request another page
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
    window.scrollTo(0, 0)
  }

  const filterProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  const currentProducts = filterProducts.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(filterProducts.length / itemsPerPage)

  return (
    <>
      {/* Filter by category */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Category1">Category 1</option>
        <option value="Category2">Category 2</option>
        {/* Add more options for your categories */}
      </select>

      {/* Display filtered products */}
      <Products currentProducts={currentProducts} />

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="join flex justify-center"
        activeClassName="btn-sm join-item bg-accent"
        pageClassName="btn-sm join-item"
        previousClassName="btn-sm join-item bg-primary"
        nextClassName="btn-sm join-item bg-primary"
      />
    </>
  )
}

export const Products = ({currentProducts}) => {
  return (
    <div className="m-4 flex flex-shrink flex-wrap justify-center">
      {currentProducts.map((product) => {
        return (
          <div className="card glass m-4 w-64" key={uuidv4()}>
            <figure>
              <img src={product.imageURL} alt="" />
            </figure>
            <div className="card-body p-2">
              <Link to={`/products/${product.id}`}>
                <h2 className="text-sm">{product.name}</h2>
              </Link>
              <div className="card-actions justify-end">
                <button className="rounded-btn btn-sm bg-secondary">
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
