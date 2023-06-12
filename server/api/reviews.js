const express = require("express")
const app = express.Router()
const { Review, User, Product } = require("../db")

module.exports = app

app.get("/", async (req, res, next) => {
  try {

    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id", "email", "avatar"],
        },
        {
          model: Product,
        },
      ],
    })
    res.send(reviews)
  } catch (ex) {
    next(ex)
  }
})

app.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const review = await Review.findByPk(id)
    if (!review) {
      res.sendStatus(404)
    } else {
      res.json(review)
    }
  } catch (ex) {
    next(ex)
  }
})

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const reviewData = { ...req.body, userId: user.id }
    const review = await Review.create(reviewData)
    res.send(review)
  } catch (error) {
    next(error)
  }
})

app.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const review = await Review.findByPk(req.params.id)
    if (review.userId !== user.id && !user.isAdmin) {
      res.sendStatus(401)
      return
    }
    await review.destroy()
    res.send(review)
  } catch (error) {
    next(error)
  }
})

// UPDATE /products/:id - Admin updates a single product

app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const review = await Review.findByPk(req.params.id)
    if (review.userId !== user.id && !user.isAdmin) {
      res.sendStatus(401)
      return
    }
    await product.update(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})
