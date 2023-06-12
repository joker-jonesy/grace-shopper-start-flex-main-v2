const { INTEGER, TEXT } = require("sequelize")
const conn = require("./conn")
const { UUID, UUIDV4, STRING } = conn.Sequelize

//productId and UserID should be unique index

const Wishlist = conn.define("wishlist", {
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
})

module.exports = Wishlist
