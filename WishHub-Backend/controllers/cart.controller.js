const { Cart } = require("../models/cart.model");
const jwt = require("jsonwebtoken");
const addItem = async (req, res) => {
  try {
    console.log(req.body);
    const docIfAlreadyPresent = await Cart.findOne({
      product: req.body.productId,
    });
    if (docIfAlreadyPresent) {
      const cartProduct = await Cart.findOneAndUpdate(
        { product: req.body.productId },
        { $set: { quantity: docIfAlreadyPresent.quantity + 1 } },
        { new: true }
      ).populate("product");
      res.status(201).json(cartProduct);
    } else {
      const item = new Cart({
        ...req.body,
        user: req.body.userId,
        product: req.body.productId,
      });
      const doc = await item.save();
      const cartProduct = await doc.populate("product");
      res.status(201).json(cartProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const fetchItemsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const doc = await Cart.find({ user: userId })
      .populate("product")
      .populate("user");

    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Cart.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    }).populate("product");
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).error(error);
  }
};
const deleteItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Cart.findByIdAndDelete({ _id: id });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(err);
  }
};
const resetCart = async (req, res) => {
  console.log("resetting");
  try {
    const id = req.user.id;
    const doc = await Cart.deleteMany({ user: id });
    console.log(doc);
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  addItem,
  fetchItemsByUserId,
  updateCart,
  deleteItemFromCart,
  resetCart,
};
