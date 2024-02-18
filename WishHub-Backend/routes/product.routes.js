const express = require("express");
const {
  createProducts,
  fetchProductById,
  fetchProducts,
  updateProductById,
} = require("../controllers/product.controllers");

const router = express.Router();

router.route("/").post(createProducts);
router.route("/").get(fetchProducts);
router.route("/:id").get(fetchProductById);
router.route("/:id").patch(updateProductById)
module.exports = router;
