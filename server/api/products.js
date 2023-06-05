const express = require("express");
const app = express.Router();
const { Product } = require("../db");
// this is for the product(s) route
module.exports = app;

// GET /products - Get all products
app.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

// GET /products/:id - Get a single product
app.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (ex) {
    next(ex);
  }
});

// POST /products - Admin creates new product

app.post('/', async(req, res, next) => {
  try {
    const product = await Product.create(req.body.product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// DELETE /products/:id - Admin deletes a single product

app.delete('/:id', async(req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy();
    res.send(product)
  } catch (error) {
    next(error)
  }
})


// UPDATE /products/:id - Admin updates a single product

app.put('/:id', async(req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    const edit = {}
    await product.update(edit)
    res.send(product);
  } catch (error) {
    next(error)
  }
})