import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// creating product
export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price } = req.body;
  console.log("createProduct called");
  if (!name || !description || !price) {
    return next(new ApiError(400, "name or description or price is missing!"));
  }
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return next(new ApiError(400, "product already exists!"));
  }
  // image uploading
  const productImageBuffer = req.file?.buffer;
  let imageUrl;
  if (!productImageBuffer) {
    return next(new ApiError(400, "product image is required"));
  }

  imageUrl = await uploadOnCloudinary(productImageBuffer);
  if (!imageUrl) {
    return next(new ApiError(400, "Error while uploading product image"));
  }

  const product = await Product.create({
    name,
    description,
    price,
    image: imageUrl?.url,
  });
  res
    .status(200)
    .json(new ApiResponse(200, product, "product created successfully!"));
});

// get all products
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res
    .status(200)
    .json(new ApiResponse(200, products, "products fetched successfully!"));
});

// get product by id 
export const getProductById = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError(400, "product not found!"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, product, "product fetched successfully!"));
});
