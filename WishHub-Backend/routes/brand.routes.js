const express = require("express");
const { fetchBrands, createBrand } = require("../controllers/brand.controller");
const brandRouter = express.Router();

brandRouter.route("/").get(fetchBrands);
brandRouter.route("/").post(createBrand);

module.exports = { brandRouter };
