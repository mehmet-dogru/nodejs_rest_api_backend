const Product = require("../models/Product");
const createError = require("http-errors");

const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

const productGetById = async (req, res) => {
  const findedProduct = await Product.findById(req.params.id);
  res.json(findedProduct);
};

const addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      _id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    });

    const { error, value } = newProduct.joiValidation(req.body);

    if (error) {
      next(createError(400, error));
    } else {
      const result = await newProduct.save();
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  //Kullanıcın değiştirmesine izin verilmez
  delete req.body.createdAt;
  delete req.body.updatedAt;

  // const { error, value } = Product.joiValidationForUpdate(req.body);

  // if (error) {
  //   next(createError(400, error));
  // } else {

  // }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      return res.json(updatedProduct);
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const findedProduct = await Product.findByIdAndDelete(req.params.id);
    if (findedProduct) {
      return res.json({
        message: "Ürün silindi",
        product: findedProduct,
      });
    } else {
      /*const errObj = new Error("Product not found");
      errObj.statusCode = 404;*/

      throw createError(404, "Product not found");

      /*
      res.status(404).json({
        message: "Product not found",
      });
      */
    }
  } catch (error) {
    next(createError(400, error));
  }
};

module.exports = {
  getAllProducts,
  productGetById,
  addProduct,
  updateProduct,
  deleteProduct,
};
