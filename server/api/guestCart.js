const express = require("express")
const app = express.Router()
const { User } = require("../db")

module.exports = app

// Create a guest cart
app.post("/guest-cart", async (req, res, next) => {
  try {
    const guestCart = await User.addToGuestCart(req.body)
    res.send(guestCart)
  } catch (ex) {
    next(ex)
  }
})

// Get the guest cart
app.get("/guest-cart", async (req, res, next) => {
  try {
    const guestCart = await User.getGuestCart()
    res.send(guestCart)
  } catch (ex) {
    next(ex)
  }
})

// Add item to the guest cart
app.post("/guest-cart/items", async (req, res, next) => {
  try {
    const guestCart = await User.addToGuestCart(req.body)
    res.send(guestCart)
  } catch (ex) {
    next(ex)
  }
})
