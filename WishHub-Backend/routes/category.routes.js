const express = require("express");
const categoryRouter = express.Router();

const {
  fetchCategories,
  createCategory,
} = require("../controllers/category.controller");

categoryRouter.route("/").get(fetchCategories);
categoryRouter.route("/").post(createCategory);

module.exports = {categoryRouter}