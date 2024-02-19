const mongoose = require("mongoose");

const AddressScheama = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  email: { type: String },
  address: { type: String },
});

const Address = new mongoose.model("Address", AddressScheama);

module.exports = { Address };
