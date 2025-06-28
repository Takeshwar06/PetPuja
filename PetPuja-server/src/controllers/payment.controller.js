import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get the key
export const getPaymentKey = asyncHandler(async (req, res, next) => {
  // Return response with the key
  console.log("getPaymentKey called");
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { key: process.env.RAZORPAY_API_KEY },
        "key fetched successfully!"
      )
    );
});

// create order
export const orderGenrate = asyncHandler(async (req, res, next) => {
  console.log("orderGenrate called");
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res
    .status(200)
    .json(new ApiResponse(200, order, "Razorpay order created successfully!"));
});

// verify payment
export const verifyPayment = asyncHandler(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto // after run  sha256 algo must be equal razorpay_signature and expectedSignature
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const paymentRecord = {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    };

    res
      .status(200)
      .json(new ApiResponse(200, paymentRecord, "payment successfull!"));
  } else {
    return next(new ApiError(400, "payment failed!"));
  }
});
