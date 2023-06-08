const conn = require("./conn")
const { STRING, BOOLEAN, UUID, UUIDV4 } = conn.Sequelize

const Order = conn.define("order", {
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

module.exports = Order
