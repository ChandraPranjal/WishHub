const { Category } = require("../models/category.model.js");

const fetchCategories = (req, res) => {
  const categories = Category.find({})
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log("Error occured while fetching categories", err);
      res.status(400).json(err);
    });
};

const createCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log("Error occured while creating categories", err);
      res.status(400).json(err);
    });
};

module.exports = { fetchCategories, createCategory };
