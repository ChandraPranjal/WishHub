const express = require('express')
const cartRouter = express.Router()
const {fetchItemsByUserId, addItem, updateCart, deleteItemFromCart, resetCart} = require('../controllers/cart.controller')
const { verifyJWT } = require("../middlewares/auth.middleware");

cartRouter.route("/").get(verifyJWT,fetchItemsByUserId)
cartRouter.route("/").post(verifyJWT,addItem)
cartRouter.route("/:id").patch(verifyJWT,updateCart)
cartRouter.route("/:id").delete(verifyJWT,resetCart)



module.exports = {cartRouter}