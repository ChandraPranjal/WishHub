const express = require("express");
const { createOrder, fetchOrder } = require("../controllers/order.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const orderRouter = express.Router();
orderRouter.route("/").get(verifyJWT, fetchOrder);
orderRouter.route("/").post(verifyJWT, createOrder);

module.exports = { orderRouter };
