const express = require("express")
const app = express.Router()
const { User } = require("../db")

module.exports = app

app.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const token = await User.authenticate({ username, password })

    // Check if there is a guest cart
    if (req.session.cart) {
      const guestCart = req.session.cart
      req.session.cart = null // Clear guest cart after merging

      // Merge the guest cart with the logged-in user's cart
      const user = await User.findByToken(token)
      const userCart = await user.getCart()
      await userCart.mergeCart(guestCart)
    }

    res.send(
      await User.findByToken(token, {
        attributes: ["id", "username", "email", "createdAt", "isAdmin"],
      })
    )
  } catch (ex) {
    next(ex)
  }
})

app.get("/", async (req, res, next) => {
  try {
    res.send(
      await User.findByToken(req.headers.authorization, {
        attributes: ["id", "username", "email", "createdAt", "isAdmin"],
      })
    )
  } catch (ex) {
    next(ex)
  }
})
