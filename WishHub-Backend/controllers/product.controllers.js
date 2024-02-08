const { Product } = require("../models/product.model");

const createProducts = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log(`Error while saving Product Data ${err}`);
      res.status(400).json(err);
    });
};

const fetchProducts = async (req, res) => {
  const query = [];

  if (req.body.brands) {
    req.body.brands.map((brand) => {
      query.push({ brand: brand });
    });
  }

  if (req.body.categories) {
    req.body.categories.map((category) => {
      query.push({ category: category });
    });
  }

  try {
    let productsPromise = Product.find(
      query.length !== 0 ? { $or: [...query] } : {}
    );
    if (req.query._order)
      productsPromise = productsPromise.sort(
        req.query._order === "asc"
          ? `${req.query._sort}`
          : `-${req.query._sort}`
      );
    if (req.query._page) {
      const items_per_page = req.query._limit;
      const current_page = req.query._page;
      productsPromise = productsPromise.skip(
        items_per_page * (current_page - 1)
      );
    }
    productsPromise = productsPromise.limit(10);

    const products = await productsPromise;
    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { createProducts, fetchProducts };
