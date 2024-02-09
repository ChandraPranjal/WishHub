const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
  }
);

const Category = new mongoose.model("Category", categorySchema);

module.exports = { Category };
