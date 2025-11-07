const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      set: (v) => Math.round(v), // round before save
    },
    image: {
      type: String,
      default: "",
    },
    fakestoreId: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Always return rounded price in API response
productSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.price = Math.round(ret.price);
    return ret;
  },
});

module.exports = mongoose.model("Product", productSchema);
