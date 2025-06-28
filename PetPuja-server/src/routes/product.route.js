import express from "express";
import { createProduct, getProductById, getProducts } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

// Define routes

router.post("/",upload.single("productImage"), createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);

// Export the router
export default router;
