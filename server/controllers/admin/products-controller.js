const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    return res.status(200).json({
      success: true,
      result
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error uploading image",
    })
  }
}

// add a new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    })

    await newlyCreatedProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newlyCreatedProduct
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error adding product",
    })
  }
}


const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "List of products",
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    })
  }
}

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const findProduct = await Product.findById({ id });
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error to edit product"
    })
  }
}


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndDelete({ id });
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted succesfully"
    })
  } catch (error) {
    console.log(error.message);
    return res.status({
      success: false,
      message: "Error to delete product"
    })
  }
}


module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct
}