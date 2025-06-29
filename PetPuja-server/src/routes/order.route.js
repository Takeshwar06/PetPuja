import express from "express";
import {
  acceptOrder,
  createOrder,
  getDeliveryPartnerOrders,
  getOrderById,
  getOrders,
  getOrdersForDelivery,
  getUserOrders,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/order.controller.js";
const router = express.Router();

// Define routes

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/for-delivery", getOrdersForDelivery);
router.post("/user", getUserOrders);
router.post("/delivery-partner", getDeliveryPartnerOrders);
router.put("/accept", acceptOrder);
router.put("/status", updateOrderStatus);
router.put("/:orderId/verify",verifyOrder);
router.get("/:orderId", getOrderById);

// Export the router
export default router;
