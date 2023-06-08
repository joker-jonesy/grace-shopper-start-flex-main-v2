const conn = require("./conn")
const { STRING, BOOLEAN, UUID, UUIDV4 } = conn.Sequelize

const Cart = conn.define("cart", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
})

module.exports = Cart
