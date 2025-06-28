import express from "express";
import { deliveryLogin } from "../controllers/user.controller.js";

const router = express.Router();

// Define routes
router.route("/delivery-login").post(deliveryLogin);

// Export the router
export default router;
