const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { collection: "Product", timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
