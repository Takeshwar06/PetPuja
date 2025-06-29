import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "complete", "reject"],
      default:"pending",
    },
    user: {
      type: String,
      required: true,
    },
    qrImgUrl: {
      type: String,
    },
    deleveryPartner: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
