const express = require("express")
const app = express.Router()
const { Product, User, Review } = require("../db")
// this is for the product(s) route
module.exports = app

// GET /products - Get all products
app.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Review,
    })
    res.send(products)
  } catch (ex) {
    next(ex)
  }
})

// GET /products/:id - Get a single product
app.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await Product.findByPk(id)
    if (!product) {
      res.sendStatus(404)
    } else {
      res.json(product)
    }
  } catch (ex) {
    next(ex)
  }
})

// POST /products - Admin creates new product

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const product = await Product.create(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// DELETE /products/:id - Admin deletes a single product

app.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// UPDATE /products/:id - Admin updates a single product

app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const product = await Product.findByPk(req.params.id)
    await product.update(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// GET /products?category= - Get all products in a category
app.get("/category/:category", async (req, res, next) => {
  try {
    const category = req.params.category
    const products = await Product.findAll({ where: { category } })
    res.send(products)
  } catch (ex) {
    next(ex)
  }
})
