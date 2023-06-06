const express = require("express")
const app = express.Router()
const { User } = require("../db")

module.exports = app

app.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const fetchedUser = await User.findByPk(req.params.id)
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
    const users = await User.findAll()
    res.send(users)
  } catch (ex) {
    next(ex)
  }
})
