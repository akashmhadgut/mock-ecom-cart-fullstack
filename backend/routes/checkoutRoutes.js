const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// POST /api/checkout
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Get cart items
    const cartItems = await CartItem.find().populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );

    // Mock receipt
    const receipt = {
      name,
      email,
      total,
      timestamp: new Date(),
      items: cartItems.map((item) => ({
        product: item.productId.name,
        price: item.productId.price,
        qty: item.qty,
      })),
    };

    // Clear cart after checkout
    await CartItem.deleteMany();

    res.json({ message: "Checkout successful", receipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Checkout failed", error });
  }
});

module.exports = router;
