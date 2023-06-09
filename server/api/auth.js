const express = require("express")
const app = express.Router()
const { User } = require("../db")

module.exports = app

app.post("/", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body)
    const user = await User.findByToken(token)
    if (req.session && req.session.cartId) {
      const guestCart = await User.getGuestCart(req.session.cartId)
      if (guestCart) {
        await user.mergeGuestCart(guestCart)
      }
      req.session.cartId = null
    }
    res.send(token)
  } catch (ex) {
    next(ex)
  }
})

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      attributes: ["id", "username", "email", "createdAt", "isAdmin"],
    })
    if (req.session && req.session.cartId) {
      const guestCart = await User.getGuestCart(req.session.cartId)
      if (guestCart) {
        await user.mergeGuestCart(guestCart)
      }
      req.session.cartId = null
    }
    res.send(user)
  } catch (ex) {
    next(ex)
  }
})
