const express = require("express")
const app = express.Router()
const { User } = require("../db")

module.exports = app

// Create an order
app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const order = await user.createOrder(req.body.data)
    res.send(order)
  } catch (ex) {
    next(ex)
  }
})

// Retrieve the guest cart
app.get("/guest-cart", async (req, res, next) => {
  try {
    const guestCart = await User.getGuestCart()
    res.send(guestCart)
  } catch (ex) {
    next(ex)
  }
})
