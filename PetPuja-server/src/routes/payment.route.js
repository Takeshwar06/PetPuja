import express from "express";
import {
    getPaymentKey,
  orderGenrate,
  verifyPayment,
} from "../controllers/payment.controller.js";
const router = express.Router();

// Define routes
router.route("/get-key").get(getPaymentKey);
router.route("/order-gen").post(orderGenrate);
router.route("/verify").post(verifyPayment);

// Export the router
export default router;
