const express = require("express");
const { createOrder } = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.route("/").post(createOrder);

module.exports = { orderRouter };
