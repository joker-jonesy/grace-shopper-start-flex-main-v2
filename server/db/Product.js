const conn = require("./conn")
const { STRING, UUID, UUIDV4, DECIMAL } = conn.Sequelize

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
  imageUrl: {
    type: STRING,
    allowNull: false,
    defaultValue: 'https://www.eteknix.com/wp-content/uploads/2013/04/anonymous.jpg'
  },
  description: {
    type: STRING
  },
  price: {
    type: DECIMAL,
    validate: {
      min: 0.0
    }
  }, 
  material: {
    type: STRING,
  }
})

module.exports = Product
