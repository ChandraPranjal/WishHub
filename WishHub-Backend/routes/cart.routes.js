const express = require('express')
const cartRouter = express.Router()
const {fetchItemsByUserId, addItem, updateCart, deleteItemFromCart} = require('../controllers/cart.controller')

cartRouter.route("/").get(fetchItemsByUserId)
cartRouter.route("/").post(addItem)
cartRouter.route("/:id").patch(updateCart)
cartRouter.route("/:id").delete(deleteItemFromCart)



module.exports = {cartRouter}