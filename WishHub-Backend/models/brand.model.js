const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
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
      transform: function (ret, doc) {
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

const Brand = new mongoose.model("Brand", brandSchema);

module.exports = { Brand };
