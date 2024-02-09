const { Brand } = require("../models/brand.model");

const fetchBrands = (req, res) => {
  Brand.find({})
    .then((brands) => {
      res.status(200).json(brands);
    })
    .catch((err) => {
      console.log("Error occured while fetching brands", err);
      res.status(404).json(err);
    });
};

const createBrand = (req, res) => {
  const brand = new Brand(req.body);
  brand
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log("Error occured while creating brand", err);
      res.status(404).json(err);
    });
};

module.exports = { fetchBrands, createBrand };
