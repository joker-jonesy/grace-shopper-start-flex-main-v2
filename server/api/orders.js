const express = require("express")
const app = express.Router()
const { User, Order } = require("../db")
const conn = require("../db/conn")

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

app.get("/all", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if(user.dataValues.isAdmin){
      res.send(await Order.findAll({
        include: [
          {
            model: conn.models.lineItem,
            include: [conn.models.product],
          },
        ],
      }))
    } else {
      res.sendStatus(401);
    }
  }catch (error){
    next(error)
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
