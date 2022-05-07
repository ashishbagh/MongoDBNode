const mongoose = require("mongoose");
//Blue print for the documents that are stored in the data base
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
