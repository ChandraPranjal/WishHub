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
    let productsQuery = Product.find(
      query.length !== 0 ? { $or: [...query] } : {}
    );

    if (req.query._order) {
      productsQuery = productsQuery.sort(
        req.query._order === "asc"
          ? `${req.query._sort}`
          : `-${req.query._sort}`
      );
    }

    const totalDocs = await Product.countDocuments(
      query.length !== 0 ? { $or: [...query] } : {}
    );

    res.set("X-Total-Count", totalDocs);

    if (req.query._page) {
      const itemsPerPage = req.query._limit || 10;
      const currentPage = req.query._page;
      productsQuery = productsQuery.skip(itemsPerPage * (currentPage - 1));
    }

    productsQuery = productsQuery.limit(10);

    const products = await productsQuery.exec();

    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { createProducts, fetchProducts };
