// backend/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware"); // ✅ Add this

// 🟢 POST /api/cart — add or update a cart item (🔒 Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || qty == null) {
      return res.status(400).json({ message: "productId and qty are required" });
    }

    const userId = req.user._id; // ✅ from token
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let item = await CartItem.findOne({ productId, userId });

    if (item) {
      item.qty = qty > 0 ? qty : 1;
      await item.save();
    } else {
      item = await CartItem.create({ productId, userId, qty });
    }

    const items = await CartItem.find({ userId }).populate("productId");
    const total = items.reduce((sum, i) => sum + (i.productId?.price || 0) * i.qty, 0);

    res.status(200).json({ items, total });
  } catch (err) {
    console.error("❌ Error adding to cart:", err.message);
    res.status(500).json({ message: "Server error adding to cart" });
  }
});

// 🟢 GET /api/cart — get user’s cart (🔒 Protected)
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const items = await CartItem.find({ userId }).populate("productId");
    const total = items.reduce((sum, i) => sum + (i.productId?.price || 0) * i.qty, 0);

    res.status(200).json({ items, total });
  } catch (err) {
    console.error("❌ Error fetching cart:", err.message);
    res.status(500).json({ message: "Server error fetching cart" });
  }
});

// 🗑️ DELETE /api/cart/:id — remove cart item (🔒 Protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const item = await CartItem.findOne({ _id: id, userId });
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await CartItem.findByIdAndDelete(id);

    const items = await CartItem.find({ userId }).populate("productId");
    const total = Math.round(
  items.reduce((sum, i) => sum + (i.productId?.price || 0) * i.qty, 0)
);

    res.status(200).json({ items, total });
  } catch (err) {
    console.error("❌ Error removing item:", err.message);
    res.status(500).json({ message: "Server error removing cart item" });
  }
});

module.exports = router;
