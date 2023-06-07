const conn = require("./conn")
const User = require("./User")
const Product = require("./Product")
const Order = require("./Order")
const LineItem = require("./LineItem")
const { faker } = require("@faker-js/faker")

Order.belongsTo(User)
User.hasMany(Order)
LineItem.belongsTo(Order)
Order.hasMany(LineItem)
LineItem.belongsTo(Product)

const TOTAL_PRODUCTS = 200

const createFakeProduct = () => {
  return {
    name: faker.commerce.productName(),
    imageURL: faker.image.url({
      height: 400,
      width: 400,
    }),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    category: "Category1",
  }
}

const fakeProducts = faker.helpers.multiple(createFakeProduct, {
  count: TOTAL_PRODUCTS,
})

const syncAndSeed = async () => {
  await conn.sync({ force: true })
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      email: "seed1@test.com",
      isAdmin: true,
    }),
    User.create({ username: "lucy", password: "123", email: "seed2@test.com" }),
    User.create({ username: "dudedude", password: "123", email: "seed5@test.com" }),
    User.create({
      username: "larry",
      password: "123",
      email: "seed3@test.com",
    }),
    User.create({
      username: "ethyl",
      password: "123",
      email: "seed4@test.com",
    }),
  ])

  const insertedProducts = await Promise.all(
    fakeProducts.map((product) => Product.create(product))
  )

  const cart = await ethyl.getCart()
  await ethyl.addToCart({ product: insertedProducts[1], quantity: 3 })
  await ethyl.addToCart({ product: insertedProducts[2], quantity: 2 })
  return {
    users: {
      moe,
      lucy,
      larry,
    },
    products: {
      insertedProducts,
    },
  }
}

module.exports = {
  syncAndSeed,
  User,
  Product,
  Order,
}
