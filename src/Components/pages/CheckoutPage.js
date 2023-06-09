import axios from 'axios';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';

const CheckoutPage = () => {

  const {auth, cart} = useSelector(state => state);

  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[street,setStreet] = useState("");
  const[city,setCity] = useState("");
  const[state,setState] = useState("");
  const[zip,setZip] = useState("");
  const[number,setNumber] = useState("");
  const[exp,setExp] = useState("");
  const[ccv,setCcv] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const newOrder = {firstName, lastName, street, city, state, zip, userId: auth.id};
    const token = window.localStorage.getItem("token")
    const order = await axios.post("/api/order", {data: newOrder},{
      headers: {
        authorization: token,
      },
    })
    
  }

  return (
    <div className="card">
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
}

export default CheckoutPage
