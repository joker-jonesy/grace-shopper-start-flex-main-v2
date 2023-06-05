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
      res.sendStatus(404).json("Product Not Found");
    }
    res.json(product);
  } catch (ex) {
    next(ex);
  }
});
