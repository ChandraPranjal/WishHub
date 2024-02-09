const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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

const Category = new mongoose.model("Category", categorySchema);

module.exports = { Category };
