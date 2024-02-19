const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity:{
        type:Number
    }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc,ret) {
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

const Cart = new mongoose.model("Cart", CartSchema);

module.exports = { Cart };
