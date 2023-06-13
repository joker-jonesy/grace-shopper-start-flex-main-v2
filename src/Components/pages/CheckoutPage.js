import axios from 'axios';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteGuestCart } from '../../store';

const CheckoutPage = () => {

  const {auth,cart} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[street,setStreet] = useState("");
  const[city,setCity] = useState("");
  const[state,setState] = useState("");
  const[zip,setZip] = useState("");
  const[number,setNumber] = useState("");
  const[exp,setExp] = useState("");
  const[ccv,setCcv] = useState("");
  const[email, setEmail] = useState("");

  const[status, setStatus] = useState("pending");

  const[order, setOrder] = useState({data:{createdAt:""}});

  const submit = async (event) => {
    try {
      event.preventDefault()
      if(auth.id){
        const newOrder = {
          firstName,
          lastName,
          street,
          city,
          state,
          zip,
          userId: auth.id,
          email,
        }
        const token = window.localStorage.getItem("token")
        const response = await axios.post(
          "/api/orders",
          { data: newOrder },
          {
            headers: {
              authorization: token,
            },
          } 
        )
        setOrder(response)
        setStatus("created")
      }else{
        const newOrder = {
          firstName,
          lastName,
          street,
          city,
          state,
          zip,
          email,
        }
        const response = await axios.post(
          "/api/orders",
          { data: {newOrder, cart}}
        )
        setOrder(response)
        dispatch(deleteGuestCart())
        setStatus("created")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  const OrderCreated = ({props}) => {
    console.log(props);
    return(
      <div>
        <h1 className="bg-gradient-to-r from-success to-accent bg-clip-text text-9xl font-extrabold text-transparent">
          Order Created
        </h1>
        <h2>
          Thank you {props.data.firstName} {props.data.lastName} for shopping with us.
        </h2>
        <h4>Order Placed at: {props.data.createdAt}</h4>
        <h4>shipping to:</h4>
        <h4>{props.data.street}</h4>
        <h4>
          {props.data.city}, {props.data.state} {props.data.zip}
        </h4>
        <h4>Arriving in: 2 days</h4>
        <button
          onClick={() => {
            navigate("/orders")
          }}
        >
          Return to Account
        </button>
      </div>
    )
  }

  const OrderFailed = (
    <div>
      <h1 className="bg-gradient-to-r from-error to-warning bg-clip-text text-9xl font-extrabold text-transparent">
        Order Failed
      </h1>
      <button
        onClick={() => {
          setStatus("pending")
        }}
      >
        Try Again
      </button>
    </div>
  )

  const form = (
    <div className="mx-auto my-4 flex w-11/12 justify-center rounded-xl border-2 border-secondary bg-base-200">
      <div className="flex flex-col justify-center">
        <h1 className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-9xl font-extrabold text-transparent">
          Enter Details
        </h1>
        <form className="" onSubmit={submit}>
          <div className="flex">
            <div className="w-1/2">
              <h3 className="m-2">First Name</h3>
              <input
                type="text"
                className="input m-2 w-11/12"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="w-1/2">
              <h3 className="m-2">Last Name</h3>
              <input
                type="text"
                className="input m-2 w-full"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <h3 className="m-2">Email</h3>
            <input
              type="text"
              className="input m-2 w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="w-full">
            <h3 className="m-2">Street</h3>
            <input
              type="text"
              className="input m-2 w-full"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <h3 className="m-2">City</h3>
              <input
                type="text"
                className="input m-2 w-11/12"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="w-1/3">
              <h3 className="m-2">State</h3>
              <input
                type="text"
                className="input m-2 w-11/12"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
            <div className="w-1/3">
              <h3 className="m-2">Zip</h3>
              <input
                type="text"
                className="input m-2 w-full"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </div>
          </div>
          <h3 className="m-2 w-full">CC Number</h3>
          <input
            type="text"
            className="input m-2 w-full"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
          <div className="flex">
            <div className="w-1/2">
              <h3 className="m-2">Exp.</h3>
              <input
                type="text"
                className="input m-2 w-11/12"
                value={exp}
                onChange={(event) => setExp(event.target.value)}
              />
            </div>
            <div className="w-1/2">
              <h3 className="m-2">CCV</h3>
              <input
                type="text"
                className="input m-2 w-full"
                value={ccv}
                onChange={(event) => setCcv(event.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <button
              className="btn-primary btn m-2 w-full"
              disabled={
                firstName === "" ||
                lastName === "" ||
                street === "" ||
                email === "" ||
                city === "" ||
                zip === "" ||
                number === "" ||
                ccv === "" ||
                exp === "" ||
                state === ""
              }
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  if(status === "pending"){
    return form
  }else if(status === "created"){
    return (<OrderCreated props = {order}/>)
  }else{
    return OrderFailed
  }
}

export default CheckoutPage
