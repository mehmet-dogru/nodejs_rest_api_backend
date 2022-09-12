const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      minLength: 3,
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
      maxLength: 255,
      minLength: 2,
    },
    image: {
      type: String,
      trim: true,
      default:
        "https://hotelbeyt.com/wp-content/uploads/woocommerce-placeholder.png",
    },
  },
  { collection: "Product", timestamps: true }
);

ProductSchema.methods.joiValidation = function (productObject) {
  const productSchema = Joi.object({
    name: Joi.string().min(3).max(255).trim().required(),
    price: Joi.number().required(),
    description: Joi.string().min(3).max(255).trim().required(),
    image: Joi.string().trim(),
  });
  return productSchema.validate(productObject);
};

// ProductSchema.methods.joiValidationForUpdate = function (productObject) {
//   const productSchema = Joi.object({
//     name: Joi.string().min(3).max(20).trim(),
//     price: Joi.number(),
//     description: Joi.string().min(3).max(50).trim(),
//     image: Joi.string().trim(),
//   });
//   console.log("kjdgl");
//   return productSchema.validate(productObject);
// };

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
