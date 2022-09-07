const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

const productGetById = async (req, res) => {
  const findedProduct = await Product.findById(req.params.id);
  res.json(findedProduct);
};

const addProduct = (req, res) => {
  const newProduct = new Product({
    _id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });
  newProduct
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    });
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const findedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Ürün silindi",
      product: findedProduct,
    });
  } catch (error) {
    res.json({
      message: "Ürün silinirken hata oluştu.",
    });
  }
};

module.exports = {
  getAllProducts,
  productGetById,
  addProduct,
  updateProduct,
  deleteProduct,
};
