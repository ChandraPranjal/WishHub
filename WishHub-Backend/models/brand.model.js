const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const Brand = new mongoose.model("Brand", brandSchema);

module.exports = { Brand };
