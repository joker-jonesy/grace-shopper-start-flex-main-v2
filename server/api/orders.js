const express = require("express")
const app = express.Router()
const { User } = require("../db")

module.exports = app

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(await user.createOrder())
  } catch (ex) {
    next(ex)
  }
})

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(await user.getCart())
  } catch (ex) {
    next(ex)
  }
})

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(await user.addToCart(req.body))
  } catch (ex) {
    next(ex)
  }
})

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(await user.removeFromCart(req.body))
  } catch (ex) {
    next(ex)
  }
})

// retrieves the guest cart
app.get("/guest-cart", async (req, res, next) => {
  try {
    const guestCart = await User.getGuestCart()
    res.send(guestCart)
  } catch (ex) {
    next(ex)
  }
})

// adds a product to the guest cart
app.post("/guest-cart", async (req, res, next) => {
  try {
    const guestCart = await User.addToGuestCart(req.body)
    res.send(guestCart)
  } catch (ex) {
    next(ex)
  }
})
