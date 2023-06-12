import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from "react-paginate"
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react"
import Spinner from "../Spinner"
import { fetchOrders } from "../../store"
import { Modal, ModalHeader, ModalActions } from "../ui/Modal"
import { Link } from "react-router-dom"

function AdminOrdersPage() {
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)
    const [itemsPerPage, setItemsPerPage] = useState(24)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [itemOffset, setItemOffset] = useState(0)
    const pageCount = Math.ceil(orders.length / itemsPerPage)
    useEffect(() => {
        dispatch(fetchOrders())
    }, [])
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length
        setItemOffset(newOffset)
        window.scrollTo(0, 0)
    }
    const handleDetailsClick = (order) => {
        setSelectedOrder(order)
    }

    return (
        <div className="p-2">
            {selectedOrder && (
                <Modal
                    open={selectedOrder}
                    className="md:min-w-2xl lg:min-w-4xl w-3/4"
                    responsive
                    onClickBackdrop={() => setSelectedOrder(null)}
                >
                    <ModalHeader className="font-bold">
                        {selectedOrder &&
                            `${selectedOrder.lastName}, ${selectedOrder.firstName}'s Order Details`}
                    </ModalHeader>
                    <div className="card flex flex-row">
                        <div className="flex w-1/3 flex-col justify-between">
                            <div className="py-4 font-bold">Total Items:</div>
                            <div className="py-4 font-bold">Total Price:</div>
                            <div className="py-4 font-bold">Order Date:</div>
                            <div className="py-4 font-bold">Shipped To:</div>
                        </div>
                        <div className="flex w-2/3 flex-col">
                            <div className="py-4">
                                {selectedOrder.lineItems.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                )}
                            </div>
                            <div className="py-4">
                                $
                                {selectedOrder.lineItems.reduce(
                                    (acc, item) => acc + item.quantity * item.product.price,
                                    0
                                )}
                            </div>
                            <div className="py-4">
                                {new Date(selectedOrder.createdAt).toLocaleString()}
                            </div>
                            <div className="py-4">
                                <div className="flex flex-col">
                                    <div>
                                        {`${selectedOrder.lastName}, ${selectedOrder.firstName}`}
                                    </div>
                                    <div>
                                        {selectedOrder.street}, {selectedOrder.city},{" "}
                                        {selectedOrder.state}, {selectedOrder.zip}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col">
                            <div className="py-4 font-bold">Items:</div>
                            {selectedOrder.lineItems.map((item) => {
                                return (
                                    <div className="flex flex-row justify-between border border-primary p-2 my-2">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-10 w-10">
                                                <img src={item.product.imageURL} alt={item.product.name} />
                                            </div>
                                        </div>
                                        <div className="text-center align-middle"><Link className="link link-primary" to={`/products/${item.product.id}`}>{item.product.name}</Link></div>
                                        <div className="text-center align-middle font-bold text-lg">{item.quantity}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <ModalActions></ModalActions>
                    </div>
                </Modal>
            )}
            <h1>Orders</h1>
            <div className="flex flex-row justify-evenly">{/* filters */}</div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Shipping Address</th>
                            <th>Order Date</th>
                            <th>Updated At</th>
                            <th>Total Items</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => {
                                const address = `${order.street}, ${order.city}, ${order.state} ${order.zip}`
                                const totalItems = order.lineItems.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                )
                                const totalPrice = order.lineItems.reduce(
                                    (acc, item) => acc + item.quantity * item.product.price,
                                    0
                                )

                                return (
                                    <tr
                                        key={order.id}
                                        className={`${selectedOrder &&
                                            selectedOrder.id === order.id &&
                                            "bg-base-200"
                                            }`}
                                    >
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={order.user.avatar}
                                                            alt={order.user.username}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {`${(order.lastName, order.firstName)}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="">{address}</div>
                                        </td>
                                        <td>
                                            <div className="w-4">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="w-4">
                                                {new Date(order.updatedAt).toLocaleString()}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="w-4">{totalItems}</div>
                                        </td>
                                        <td>
                                            <div className="w-4">{`$${totalPrice}`}</div>
                                        </td>
                                        <th>
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    className="btn-neutral btn-xs btn mx-1 px-1"
                                                    onClick={() => handleDetailsClick(order)}
                                                >
                                                    details
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                )
                            })
                        ) : (
                            <Spinner />
                        )}
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
    )
}

export default AdminOrdersPage
