const { UUID } = require("sequelize")
const conn = require("./conn")
// Cart model is defined below

const Cart = conn.define("cart", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  productIds: {
    type: ARRAY(UUID),
    allowNull: false,
    defaultValue: [],
  },
  items: {
    type: ARRAY({
      productId: UUID,
      quantity: INTEGER,
      addedAt: DATE,
    }),
    allowNull: false,
    defaultValue: [],
  },
  userId: {
    type: UUID,
    allowNull: true,
  },
})

module.exports = Cart
