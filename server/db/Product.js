const conn = require("./conn")
const { STRING, UUID, UUIDV4, ENUM, INTEGER, DECIMAL } = conn.Sequelize // Float for decimal, Enum for predefined vals
// this is to define the model for the products table
const Product = conn.define("product", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DECIMAL(),
    allowNull: false,
    validate: {
      min: 0.0,
    },
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0,
  },
  imageURL: {
    type: STRING,
    defaultValue:
      "https://www.eteknix.com/wp-content/uploads/2013/04/anonymous.jpg",
  },
  description: {
    type: STRING,
  },
  category: {
    type: ENUM("Category1", "Category2"),
    allowNull: false,
  },
  material: {
    type: STRING,
  },
})

module.exports = Product
