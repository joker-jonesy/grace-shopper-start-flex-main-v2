const conn = require("./conn")
const { INTEGER, UUID, UUIDV4 } = conn.Sequelize

const CartItem = conn.define("cartItem", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  productId: {
    type: UUID,
    allowNull: false,
  },
  cartId: {
    type: UUID,
    allowNull: false,
  },
})

module.exports = CartItem
