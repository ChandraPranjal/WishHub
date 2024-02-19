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

// const fetchOrder = asyc(req,res) =>{
//   const
// }

module.exports = {createOrder}