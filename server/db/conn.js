require("dotenv").config()
const Sequelize = require("sequelize")
const config = {
  dialect: "postgres",
  logging: false,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER,
}

if (process.env.QUIET) {
  config.logging = false
}
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_shopping_db",
  config
)

module.exports = conn
