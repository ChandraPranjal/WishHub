const jwt = require('jsonwebtoken')
const { Order } = require("../models/order.model");

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const fetchOrder = async (req, res) => {
  console.log("Fetch called");
  try {
    const { id } = req.user;

    const doc = await Order.find({ user: id })
      .populate("items.product")
      .populate("address");
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { createOrder, fetchOrder };
