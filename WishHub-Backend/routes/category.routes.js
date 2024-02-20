const express = require("express");
const categoryRouter = express.Router();
const { verifyJWT } = require("../middlewares/auth.middleware");

const {
  fetchCategories,
  createCategory,
} = require("../controllers/category.controller");

categoryRouter.route("/").get(verifyJWT, fetchCategories);
categoryRouter.route("/").post(verifyJWT, createCategory);

module.exports = { categoryRouter };
