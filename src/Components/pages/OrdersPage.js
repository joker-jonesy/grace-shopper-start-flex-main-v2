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
      console.log(response);
    }catch (error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[auth])

  const LogedIn = () => {
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <td>{order.lookUpId}</td>
                <td>{order.lineItems.length}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => window[order.id].showModal()}
                  >
                    open modal
                  </button>
                  <dialog id={order.id} className="modal">
                    <form method="dialog" className="modal-box">
                      <h1>Order Number {order.lookUpId}</h1>
                      <h2></h2>
                      <div className="modal-action">
                        <button className="btn">Close</button>
                      </div>
                    </form>
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