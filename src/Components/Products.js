import React, { useState } from "react"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';

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
    setItemOffset(newOffset);
    window.scrollTo(0,0);
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
        className="join flex justify-center"
        activeClassName="btn-sm join-item bg-accent"
        pageClassName="btn-sm join-item"
        previousClassName="btn-sm join-item bg-primary"
        nextClassName="btn-sm join-item bg-primary"
      />
    </>
  )
}

const Products = ({currentProducts}) => {
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
                <h2 className="text-sm">{product.name}</h2>
              </Link>
              <div className="card-actions justify-end">
                <button className="btn-sm bg-secondary rounded-btn">
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