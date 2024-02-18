const { Product } = require("../models/product.model");

const createProducts = async (req, res) => {
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
  try {
    const query = [];

    const brand = req.query.brand || [];
    const category = req.query.category || [];

    // console.log(req.query);
    let brands = [],
      categories = [];
    if (brand.length !== 0) {
      brands = brand.split(",");
    }
    if (category.length !== 0) {
      categories = category.split(",");
    }
    // console.log(brands, categories);
    if (brands.length !== 0) {
      brands.map((brand) => {
        query.push({ brand: brand });
      });
    }

    if (categories.length !== 0) {
      categories.map((category) => {
        query.push({ category: category });
      });
    }

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

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const fetchProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(`Error occured while fetching by Id ${error}`);
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is required");
    const updatedDoc = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDoc);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createProducts, fetchProducts, fetchProductById ,updateProductById};
