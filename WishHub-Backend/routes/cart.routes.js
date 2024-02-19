const express = require('express')
const cartRouter = express.Router()
const {fetchItemsByUserId, addItem, updateCart} = require('../controllers/cart.controller')

cartRouter.route("/").get(fetchItemsByUserId)
cartRouter.route("/").post(addItem)
cartRouter.route("/:id").patch(updateCart)



module.exports = {cartRouter}