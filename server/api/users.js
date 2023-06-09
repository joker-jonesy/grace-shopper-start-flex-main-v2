const express = require("express")
const app = express.Router()
const { User, Order, Review, Product } = require("../db")

module.exports = app

app.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin || user.id !== req.params.id) {
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

app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin || user.id !== req.params.id) {
      res.sendStatus(401)
      return
    }
    const fetchedUser = await User.findByPk(req.params.id)
    console.log(req.body.data)
    await fetchedUser.update(req.body.data)
    res.send(fetchedUser)
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403)
      res.send(error.errors[0].message)
    } else {
      next(error)
    }
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
      attributes: [
        "id",
        "username",
        "email",
        "createdAt",
        "isAdmin",
        "stripeId",
        "avatar",
      ],
      include: [
        Order,
        {
          model: Review,
          include: Product,
        },
      ],
    })
    res.send(users)
  } catch (ex) {
    next(ex)
  }
})
