import React, {useState, useEffect} from "react"
import axios from "axios"
import { useSelector } from "react-redux";
import { v4 as uuidv4} from "uuid"
import { Link } from "react-router-dom";
import { getAverageRating } from "../../util";
import Rating from "../ui/Rating";

const Orders = () => {

  const {auth} = useSelector(state => state)
  
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try{
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/orders", {
        headers: {
          authorization: token,
        },
      })
      setOrders(response.data);
    }catch (error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[auth])

  console.log(orders);

  const LogedIn = () => {
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Products</th>
            <th>Date Placed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={uuidv4()}>
                <td>{order.lookUpId}</td>
                <td>{order.lineItems.length}</td>
                <td>{order.createdAt}</td>
                <td>shipped</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => window[order.id].showModal()}
                  >
                    View Details
                  </button>
                  <dialog id={order.id} className="modal">
                    <div className="text-white">
                      <form
                        method="dialog"
                        className="modal-box"
                        id="myCoolBackground"
                      >
                        <div className="m-2 flex">
                          <div className="m-2 rounded-lg p-6 backdrop-blur">
                            <h1>Order Number {order.lookUpId}</h1>
                            <h2>
                              Placed By {order.firstName} {order.lastName}
                            </h2>
                            <h2>Created at: {order.createdAt}</h2>
                          </div>
                          <div className="m-2 rounded-lg p-6 backdrop-blur">
                            <h1>Shippng To</h1>
                            <h2>{order.street}</h2>
                            <h2>
                              {order.city}, {order.state} {order.zip}
                            </h2>
                            <h2>Arriving in: 2 days</h2>
                          </div>
                        </div>
                        <h1 className="mx-auto text-lg">Order Items</h1>
                        <div>
                          {order.lineItems.map((item) => {
                            return (
                              <div key={uuidv4()} className="card card-side m-2 shadow-xl backdrop-blur">
                                <figure>
                                  <img
                                    src={item.product.imageURL}
                                    alt={item.product.name}
                                  />
                                </figure>
                                <div className="card-body">
                                  <h2 className="card-title">
                                    {item.product.name}
                                  </h2>
                                  <h3>Quantity {item.quantity}</h3>
                                  <h3>{item.product.price}</h3>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <div className="modal-action">
                          <button className="btn">Close</button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  const NotLogedIn = () => {
    const [pageState, setPageState] = useState("form");
    const [order, setOrder] = useState({});

    const Form = () => {

      const findOrder = async (event) => {
        event.preventDefault()
        const response = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: email,
          },
        })
        setOrder(response.data)
        console.log(response.data)
        setPageState("found")
      }

      const [orderId, setOrderId] = useState("")
      const [email, setEmail] = useState("")
      return (
        <form onSubmit={findOrder}>
          <h1>Order Number</h1>
          <input
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
          />
          <h1>Email</h1>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button>Find Order</button>
        </form>
      )
    }

    const OrderFound = () => {
      return (
        <h1>
          order found
        </h1>
      )
    }

    if(pageState === "form"){
      return <Form/>
    }else if (pageState === "found"){
      return <OrderFound/>
    }
  }

  return (
    <div>
      <h1>Orders</h1>
      {auth.id && (<LogedIn />)}
      {!auth.id && (<NotLogedIn />)}
    </div>
  )
}

export default Orders