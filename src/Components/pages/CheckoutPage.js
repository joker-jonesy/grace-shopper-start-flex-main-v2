import axios from 'axios';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserCart } from '../../store';

const CheckoutPage = () => {

  const {auth} = useSelector(state => state);
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

  const[status, setStatus] = useState("pending");

  let order = "";

  const submit = async (event) => {
    try {
      event.preventDefault()
      const newOrder = {
        firstName,
        lastName,
        street,
        city,
        state,
        zip,
        userId: auth.id,
      }
      const token = window.localStorage.getItem("token")
      order = await axios.post(
        "/api/order",
        { data: newOrder },
        {
          headers: {
            authorization: token,
          },
        }
      )
      console.log(order);
      dispatch(fetchUserCart())
      setStatus("created")
    } catch (error) {
      setStatus("error")
    }
  }

  const OrderCreated = (
    <div>
      <h1 className="bg-gradient-to-r from-success to-accent bg-clip-text text-9xl font-extrabold text-transparent">
        Order Created
      </h1>
      <p>{order}</p>
      <button
        onClick={() => {
          navigate("/account")
        }}
      >
        Return to Account
      </button>
    </div>
  )

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
    <div className="card">
      <h1 className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-9xl font-extrabold text-transparent">Enter Details</h1>
      <form  className="flex flex-col justify-center" onSubmit={submit}>
        <h3>First Name</h3>
        <input
          type="text"
          className = "input"
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
        <h3>Last Name</h3>
        <input
          type="text"
          className = "input"
          value={lastName}
          onChange={event => setLastName(event.target.value) }
        />
        <h3>Street</h3>
        <input
          type="text"
          className = "input"
          value={street}
          onChange={event => setStreet(event.target.value) }
        />
        <h3>City</h3>
        <input
          type="text"
          className = "input"
          value={city}
          onChange={event => setCity(event.target.value)}
        />
        <h3>State</h3>
        <input
          type="text"
          className = "input"
          value={state}
          onChange={event => setState(event.target.value) }
        />
        <h3>Zip</h3>
        <input
          type="text"
          className = "input"
          value={zip}
          onChange={event => setZip(event.target.value) }
        />
        <h3>CC Number</h3>
        <input
          type="text"
          className = "input"
          value={number}
          onChange={event => setNumber(event.target.value)}
        />
        <h3>Exp.</h3>
        <input
          type="text"
          className = "input"
          value={exp}
          onChange={event => setExp(event.target.value) }
        />
        <h3>CCV</h3>
        <input
          type="text"
          className = "input"
          value={ccv}
          onChange={event => setCcv(event.target.value) }
        />
        <button>Submit</button>
      </form>
    </div>
  )

  if(status === "pending"){
    return form
  }else if(status === "created"){
    return OrderCreated
  }else{
    return OrderFailed
  }
}

export default CheckoutPage
