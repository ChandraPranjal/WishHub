const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
});
const OrderScheama = new mongoose.Schema({
  items: { type: [itemSchema] },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  totalAmount: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "dispatched", "delivered"],
  },
  paymentMethod: { type: String, enum: ["Cash", "Card Payment"] },
});

const Order = new mongoose.model("Order", OrderScheama);

module.exports = { Order };
