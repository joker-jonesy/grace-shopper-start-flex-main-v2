const conn = require("./conn");
const { STRING, UUID, UUIDV4, FLOAT, ENUM, INTEGER } = conn.Sequelize; // Float for decimal, Enum for predefined vals
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
    type: FLOAT,
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0,
  },
  imageURL: {
    type: STRING,
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
});

module.exports = Product;
