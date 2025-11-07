const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/Product");

// GET /api/products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    console.log("Existing products count:", products.length);

    if (products.length === 0) {
      console.log("Seeding products from Fake Store API...");
      const { data } = await axios.get("https://fakestoreapi.com/products?limit=8");
      console.log("Fetched products from API:", data.length);

      const formatted = data.map((item) => ({
        name: item.title,
        price: item.price,
        image: item.image,
        fakestoreId: item.id,
      }));

      const inserted = await Product.insertMany(formatted);
      console.log("Inserted products:", inserted.length);

      products = await Product.find();
      console.log("Total products after seeding:", products.length);
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching or seeding products:", err);
    res.status(500).json({ message: "Server error fetching products", error: err.message });
  }
});


module.exports = router;
