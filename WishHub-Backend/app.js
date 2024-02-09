const express = require("express");

const app = express();

//middlewares
app.use(express.json());

//Routes Import
const ProductRouter = require("./routes/product.routes.js");
const bodyParser = require("body-parser");
const { User } = require("./models/user.model.js");
const { Test } = require("./models/test.model.js");
const { categoryRouter } = require("./routes/category.routes.js");
const { brandRouter } = require("./routes/brand.routes.js");

//Routes Declaration
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);

app.post("/test", (req, res) => {
  const test = new Test(req.body);
  test
    .save()
    .then(() => {
      res.status(201).send(test);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = { app };
