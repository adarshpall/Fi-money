const express = require("express");
const router = express.Router();
const { addProduct, updateQuantity, getProducts } = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

router.post("/products", protect, addProduct);
router.put("/products/:id/quantity", protect, updateQuantity);
router.get("/products", protect, getProducts);

module.exports = router;
