const mongoose = require("mongoose");
const Product = require("./models/products");
const url =
  "mongodb+srv://usename:password@practice.sgnnn.mongodb.net/retails?retryWrites=true&w=majority";
// It uses connection cooling and manage open and close connection
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Not Connected");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  //_id will be added by default by moongoose.
  const result = await createdProduct.save(); //save method provided by moongoose
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec(); //exec method turn this method into actual promise
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
