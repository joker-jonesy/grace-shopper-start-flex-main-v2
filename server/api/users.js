const express = require("express")
const app = express.Router()
const { User, Order } = require("../db")

module.exports = app

app.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const fetchedUser = await User.findByPk(req.params.id, {
      include: Order,
    })
    res.send(fetchedUser)
  } catch (ex) {
    next(ex)
  }
})

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const users = await User.findAll({
      attributes: ["id", "username", "email", "createdAt", "isAdmin"],
      include: Order,
    })
    res.send(users)
  } catch (ex) {
    next(ex)
  }
})
