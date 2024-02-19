const { Cart } = require("../models/cart.model");

const addItem = async (req, res) => {
  try {
    const cartProduct = await Cart.findOneAndUpdate(
      { product: req.body.productId },
      { $inc: { quantity: 1 } }, // Increment quantity by 1
      { upsert: true, new: true } // If the document doesn't exist, create a new one
    ).populate("product");
    res.status(201).json(cartProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const fetchItemsByUserId = (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const doc = Cart.find({ user: userId })
      .populate("product")
      .populate("user");
    res.status(200).json(doc);
  } catch (error) {
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
const resetCart = (userId) => {};

module.exports = {
  addItem,
  fetchItemsByUserId,
  updateCart,
  deleteItemFromCart,
  resetCart,
};
