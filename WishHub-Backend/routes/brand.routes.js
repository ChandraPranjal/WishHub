const express = require("express");
const { fetchBrands, createBrand } = require("../controllers/brand.controller");
const brandRouter = express.Router();
const { verifyJWT } = require("../middlewares/auth.middleware");

brandRouter.route("/").get(verifyJWT, fetchBrands);
brandRouter.route("/").post(verifyJWT, createBrand);

module.exports = { brandRouter };
