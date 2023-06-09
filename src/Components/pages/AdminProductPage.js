import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../../store"
import ReactPaginate from "react-paginate"
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react"
import { Modal, ModalHeader, ModalActions } from "../ui/Modal"
import ProductDetails from "../ui/ProductDetails"

function AdminProductPage() {
  const { products } = useSelector((state) => state.products)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [itemOffset, setItemOffset] = useState(0)
  const [pendingChanges, setPendingChanges] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const endOffset = itemOffset + itemsPerPage

  //TODO: add pagination
  //TODO: add search
  //TODO: add filter

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    setItemOffset(newOffset)
    window.scrollTo(0, 0)
  }

  //get categories list from products, then filter out duplicates
  const categories =
    products.length > 0 ? products.map((product) => product.category) : []
  const uniqueCategories = [...new Set(categories)]

  const currentProducts =
    products.length > 0 ? products.slice(itemOffset, endOffset) : []
  const pageCount = Math.ceil(currentProducts.length / itemsPerPage)

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  const handleDeleteClick = (product) => {
    dispatch(deleteProduct(product.id))
  }

  const handleDetailsClick = (product) => {
    setSelectedProduct(product)
  }

  const onFileChange = (event) => {
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      setSelectedProduct({ ...selectedProduct, imageURL: reader.result })
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }
  const handleAddProductClick = () => {
    setIsAdding(true)
    setSelectedProduct({
      name: "",
      category: "Category1",
      price: 0.0,
      material: "",
      quantity: 0,
      description: "",
      imageURL: "",
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setSelectedProduct({ ...selectedProduct, [name]: value })
    if (isAdding) {
      if (
        selectedProduct.name !== "" &&
        selectedProduct.category !== "" &&
        selectedProduct.price !== 0 &&
        selectedProduct.material !== "" &&
        selectedProduct.quantity !== 0 &&
        selectedProduct.description !== "" &&
        selectedProduct.imageURL !== ""
      ) {
        setPendingChanges(true)
      }
    } else {
      setPendingChanges(true)
    }
  }

  const handleSubmit = () => {
    dispatch(updateProduct(selectedProduct))
    setPendingChanges(false)
    setSelectedProduct(null)
  }

  const handleAdd = () => {
    console.log(selectedProduct)
    dispatch(createProduct(selectedProduct))
    setPendingChanges(false)
    setSelectedProduct(null)
  }

  return (
    <div className="flex w-full flex-col">
      <div className="p-2">
        {selectedProduct && (
          <Modal
            open={selectedProduct}
            className="w-5/6"
            responsive
            onClickBackdrop={() => setSelectedProduct(null)}
          >
            <ModalHeader className="font-bold">
              {selectedProduct && selectedProduct.name}
            </ModalHeader>
            <div className="card">
              <ProductDetails product={selectedProduct} />
              <div className="flex w-full flex-row">
                <div className="form-control w-full px-1">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    className="input-bordered input"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex w-full flex-row">
                <div className="form-control w-1/2 px-1">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    placeholder="Category"
                    name="category"
                    className="select-bordered select"
                    value={selectedProduct.category}
                    onChange={handleInputChange}
                  >
                    {uniqueCategories.map((category) => {
                      return <option key={category}>{category}</option>
                    })}
                  </select>
                </div>
                <div className="form-control w-1/2 px-1">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    min={"0.01"}
                    step="0.01"
                    className="input-bordered input"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex w-full flex-row">
                <div className="form-control w-1/2 px-1">
                  <label className="label">
                    <span className="label-text">Product Material</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Material"
                    name="material"
                    className="input-bordered input"
                    value={selectedProduct.material}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-control w-1/2 px-1">
                  <label className="label">
                    <span className="label-text">Quantity Available</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    min={0}
                    step={1}
                    className="input-bordered input"
                    value={selectedProduct.quantity}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="form-control w-3/4 px-1">
                  <label className="label">
                    <span className="label-text">Product Image</span>
                  </label>
                  <input
                    type="file"
                    className="file-input-bordered file-input w-3/4"
                    onChange={onFileChange}
                  />
                </div>
              </div>
              <div className="flex w-full flex-row">
                <div className="form-control w-full px-1">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    className="input-bordered textarea"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <ModalActions>
                <button
                  className="btn-primary btn"
                  disabled={!pendingChanges}
                  onClick={() => (isAdding ? handleAdd() : handleSubmit())}
                >
                  {isAdding ? "Create" : "Save"}
                </button>
              </ModalActions>
            </div>
          </Modal>
        )}
      </div>
      <div className="p-2">
        <h1>Products</h1>
        <div className="flex flex-row justify-evenly">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select-bordered select w-full max-w-xs"
              defaultValue={"All"}
              onChange={handleCategoryChange}
            >
              <option>All</option>
              {uniqueCategories.map((category) => {
                return <option key={category}>{category}</option>
              })}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <select
              className="select-bordered select w-full max-w-xs"
              defaultValue="All"
            >
              <option>All</option>
              <option>{`<$100`}</option>
              <option>{`<$1000`}</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Actions</span>
            </label>
            <button
              className="btn-primary btn-sm btn"
              onClick={() => handleAddProductClick()}
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description | Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 &&
                currentProducts.map((product) => {
                  return (
                    <tr
                      key={product.id}
                      className={`${
                        selectedProduct &&
                        selectedProduct.id === product.id &&
                        "bg-base-200"
                      }`}
                    >
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={product.imageURL} alt={product.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.name}</div>
                            <div className="text-sm opacity-50">
                              {product.material}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="w-4 text-ellipsis">
                          {product.description}
                        </span>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="text-lg">${product.price}</td>
                      <th>
                        <div className="flex flex-row justify-evenly">
                          <button
                            className="btn-error btn-xs btn mx-1 px-1"
                            onClick={() => handleDeleteClick(product)}
                          >
                            delete
                          </button>
                          <button
                            className="btn-neutral btn-xs btn mx-1 px-1"
                            onClick={() => handleDetailsClick(product)}
                          >
                            details
                          </button>
                        </div>
                      </th>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowBigRightDashIcon size={24} alt="Next" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowBigLeftDashIcon size={24} alt="Previous" />}
            renderOnZeroPageCount={null}
            className="join flex justify-center"
            activeClassName="join-item bg-base-200"
            pageClassName="btn-sm join-item text-lg"
            previousClassName="btn-sm join-item bg-base-300 hover:bg-base-200 flex items-center"
            nextClassName="btn-sm join-item bg-base-300 hover:bg-base-200 flex items-center"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminProductPage
