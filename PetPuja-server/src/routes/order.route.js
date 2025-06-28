import express from "express";
import {
  createOrder,
  getDeliveryPartnerOrders,
  getOrderById,
  getOrders,
  getOrdersForDelivery,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
const router = express.Router();

// Define routes

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.get("/for-delivery", getOrdersForDelivery);
router.post("/user", getUserOrders);
router.post("/delivery-partner", getDeliveryPartnerOrders);
router.put("/status", updateOrderStatus);

// Export the router
export default router;
