const express = require('express')
const cartRouter = express.Router()
const {fetchItemsByUserId, addItem, updateCart, deleteItemFromCart, resetCart} = require('../controllers/cart.controller')

cartRouter.route("/").get(fetchItemsByUserId)
cartRouter.route("/").post(addItem)
cartRouter.route("/:id").patch(updateCart)
cartRouter.route("/:id").delete(resetCart)



module.exports = {cartRouter}