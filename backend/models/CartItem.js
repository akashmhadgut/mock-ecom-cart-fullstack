// backend/models/CartItem.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    // In CartItem schema (models/CartItem.js)
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
