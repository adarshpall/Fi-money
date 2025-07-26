const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ product_id: product._id });
  } catch (err) {
    res.status(400).json({ message: "Error adding product", error: err.message });
  }
};

// Update Quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Error updating quantity", error: err.message });
  }
};

// Get Products with Pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
