const mongoose = require("mongoose");
const ProdSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true , required:true},
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [1, `Min Price can't be less than 1`],
    },
    discountPercentage: { type: Number, required: true, min: [0, `Min disc`] },
    rating: {
      type: Number,
      required: true,
      default: 0,
      max: [5, "Max rating can't be more than 5"],
      min: [0, `Min rating can't be less than 0`],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, `Min Stock can't be less than 0 `],
    },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    imageSrc: { type: String, required: true },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    expiryDate: { type: Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
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

const Product = mongoose.model("Product", ProdSchema);

module.exports = { Product };
