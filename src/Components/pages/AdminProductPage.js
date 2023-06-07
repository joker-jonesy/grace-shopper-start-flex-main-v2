import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts, updateProduct, deleteProduct } from "../../store"
import ReactPaginate from "react-paginate"
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react"

function AdminProductPage() {
  const { products } = useSelector((state) => state)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [itemOffset, setItemOffset] = useState(0)
  const [pendingChanges, setPendingChanges] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    material: "",
    category: "",
    price: "",
    imageURL: "",
  })
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
  const categories = products.length > 0 ? products.map((product) => product.category) : []
  const uniqueCategories = [...new Set(categories)]



  const currentProducts =
    products.length > 0 ? products.slice(itemOffset, endOffset) : []
  const pageCount = Math.ceil(currentProducts.length / itemsPerPage)

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  const handleDeleteClick = () => { }

  const handleDetailsClick = (product) => {
    setSelectedProduct(product)
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      material: product.material,
      category: product.category,
      price: product.price,
      imageURL: product.imageURL,
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((formData) => ({ ...formData, [name]: value }))
    setPendingChanges(true)
  }

  const handleSubmit = () => {
    dispatch(updateProduct(formData))
    setPendingChanges(false)
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="w-1/2 p-2">
        {/**THIS IS THE LEFT SIDE PANEL */}
        <h1>Products</h1>
        <div className="flex flex-row justify-evenly">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select className="select select-bordered w-full max-w-xs" defaultValue={"All"} onChange={handleCategoryChange}>
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
            <select className="select select-bordered w-full max-w-xs" defaultValue="All">
              <option>All</option>
              <option>{`<$100`}</option>
              <option>{`<$1000`}</option>
            </select>
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
                    <tr key={product.id} className={`${selectedProduct && selectedProduct.id === product.id && "bg-base-200"}`} >
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
                            className="btn-error btn-xs btn px-1 mx-1"
                            onClick={() => handleDeleteClick(product)}
                          >
                            delete
                          </button>
                          <button
                            className="btn-neutral btn-xs btn px-1 mx-1"
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
      <div className="w-1/2 p-2">
        {/**THIS IS THE RIDE SIDE PANEL */}
        {selectedProduct ? (
          <div className="card glass m-4 p-4">
            <figure>
              <img src={selectedProduct.imageURL} alt={selectedProduct.name} className="rounded-lg h-20 w-20 md:h-32 md:w-32" />
            </figure>
            <div className="card-body p-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input type="text" placeholder="Product Name" name="name" className="input input-bordered w-full max-w-xs" value={formData.name} onChange={handleInputChange} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Material</span>
                </label>
                <input type="text" placeholder="Product Material" name="material" className="input input-bordered w-full max-w-xs" value={formData.material} onChange={handleInputChange} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input type="number" placeholder="Price" name="price" className="input input-bordered w-full max-w-xs" value={formData.price} onChange={handleInputChange} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select placeholder="Category" name="category" className="select select-bordered w-full max-w-xs" value={formData.category} onChange={handleInputChange} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input type="text" placeholder="Image" name="imageURL" className="input input-bordered w-full max-w-xs" value={formData.imageURL} onChange={handleInputChange} />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Description</span>
                </label>
                <textarea placeholder="Description" name="description" className="textarea text-area-bordered w-full" value={formData.description} onChange={handleInputChange} />
              </div>
            </div>

            <div className="card-footer">
              <button className="btn btn-primary" disabled={!pendingChanges} onClick={() => handleSubmit()}>
                Save
              </button>
            </div>
          </div>


        ) : <h1>Select a Product</h1>}
      </div>
    </div>
  )
}

export default AdminProductPage
