const { INTEGER } = require("sequelize")
const conn = require("./conn")
const { UUID, UUIDV4, STRING } = conn.Sequelize

const Review = conn.define("review", {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    productId: {
        type: UUID,
        allowNull: false,

    },
    userId: {
        type: UUID,
        allowNull: false,

    },
    description: {
        type: STRING,
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }

})

module.exports = Review
