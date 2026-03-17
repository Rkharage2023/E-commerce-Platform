import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    totalPrice: Number,

    paymentStatus: {
      type: String,
      default: "Paid",
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
