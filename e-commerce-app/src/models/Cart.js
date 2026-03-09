const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  name: String,
  qty: Number,
  price: Number,
  image: String,
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", cartSchema);
