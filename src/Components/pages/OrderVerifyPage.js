import axios from "axios"
import React, {useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RemoveFromCartButton from "../RemoveFromCartButton"

const OrderVerifyPage = () => {
  const { cart } = useSelector((state) => state)
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);
  let canCheckOut = true;

  const fetchStock = async () => {
    const productsToFetch = [];
    cart.cartItems.forEach((item) => {productsToFetch.push(item.product.id)});
    const response = await axios.put("/api/products/some",{data: productsToFetch},{})
    setStock(response.data);
  }

  useEffect(()=>{
    if(cart.cartItems){
      fetchStock()
    }
  },[cart])

  const verifyInStock = (productId,quantity) => {
    const item = stock.find(item => item.id === productId)
    if(item){
      if(item.quantity - quantity >= 0){
        return {enoughStock: true, msg: "in stock"}
      }else{
        return { enoughStock: false, msg: `not enough in stock. current stock ${item.quantity}` }
      }
    }else{
      return {enoughStock: false, msg: "loading"}
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>In Stock</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((item)=>{
            const check = verifyInStock(item.product.id, item.quantity)
            if(!check.enoughStock){canCheckOut = false}
            return (
              <tr>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{check.msg}</td>
                <td><RemoveFromCartButton product = {item}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button
        disabled = {!canCheckOut}
        className="btn btn-primary"
        onClick={() => {
          navigate("/orders/create")
        }}
      >
        Checkout | Billing Info
      </button>
    </>
  )
}

export default OrderVerifyPage;



