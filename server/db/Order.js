const conn = require("./conn")
const { STRING, BOOLEAN, UUID, UUIDV4 } = conn.Sequelize
const sequelize = require('sequelize') ;

const Order = conn.define("order", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  lookUpId: {
    type: sequelize.INTEGER,
    autoIncrement: true
  },
  userId: {
    type: UUID,
  },
  email: {
    type: STRING,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  street: {
    type: STRING,
    allowNull: false,
  },
  city: {
    type: STRING,
    allowNull: false,
  },
  state: {
    type: STRING,
    allowNull: false,
  },
  zip: {
    type: STRING,
    allowNull: false,
  },
})

module.exports = Order
