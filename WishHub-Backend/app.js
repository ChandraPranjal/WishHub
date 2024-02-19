const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
//middlewares
app.use(express.json());
console.log(process.env.CORS_ORIGIN);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  exposedHeaders:['X-Total-Count']
}))

//Routes Import
const ProductRouter = require("./routes/product.routes.js");

const { Test } = require("./models/test.model.js");
const { categoryRouter } = require("./routes/category.routes.js");
const { brandRouter } = require("./routes/brand.routes.js");
const { userRouter } = require("./routes/user.routes.js");
const { cartRouter } = require("./routes/cart.routes.js");
const { orderRouter } = require("./routes/order.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes Declaration
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);


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
