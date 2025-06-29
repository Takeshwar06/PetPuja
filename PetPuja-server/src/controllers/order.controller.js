import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/order.model.js";
import Qr from "qrcode";

// order creation
export const createOrder = asyncHandler(async (req, res, next) => {
  const { items, totalAmount, user , paymentId } = req.body;

  // console.log("createOrder called",{ items, totalAmount, user , paymentId });
  if (!items || !totalAmount || !user) {
    return next(new ApiError(400, "items or totalAmount or user is missing!"));
  }
  if (items.length === 0) {
    return next(new ApiError(400, "items is empty!"));
  }

  const order = await Order.create({
    items,
    totalAmount,
    user,
    paymentId,
  });
  Qr.toDataURL(order._id.toString(), async (err, url) => {
    if (err) {
      await Order.findByIdAndDelete(order._id);
      return next(new ApiError(400, "order qr code is not created!"));
    }
    order.qrImgUrl = url;
    await order.save();
    console.log(url);
    res
      .status(200)
      .json(new ApiResponse(200, order, "order created successfully!"));
  });
});

// get by id
export const getOrderById = asyncHandler(async (req, res, next) => {
  const orderId = req.params?.orderId;
  if (!orderId) {
    return next(new ApiError(400, "orderId is missing!"));
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ApiError(400, "order is not found!"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, order, "order fetched successfully!"));
});

// get all orders
export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully!"));
});

// get orders for develivery
export const getOrdersForDelivery = asyncHandler(async (req, res, next) => {
  console.log("getOrdersForDelivery called");
  const orders = await Order.find({
    deleveryPartner: { $in: [null, undefined] },
  });

  res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully!"));
});

// get user orders
export const getUserOrders = asyncHandler(async (req, res, next) => {
  const { user } = req.body;
  const orders = await Order.find({ user });
  res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully!"));
});

// get delivery partner orders
export const getDeliveryPartnerOrders = asyncHandler(async (req, res, next) => {
  const { deleveryPartner } = req.body;
  console.log("getDeliveryPartnerOrders called", { deleveryPartner });
  const orders = await Order.find({ deleveryPartner });
  res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully!"));
});

// update status
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { orderId, status } = req.body;
  console.log("updateOrderStatus called", { orderId, status });
  const order = await Order.findById(orderId);
  order.status = status;
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "order status updated successfully!"));
});


// verify order 
export const verifyOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  console.log("verifyOrder called", { orderId });
  if (!orderId) {
    return next(new ApiError(400, "orderId is missing!"));
  }
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ApiError(400, "order is not found!"));
  }
  if (order.status === "complete") {
    return next(new ApiError(400, "qr code is Invalid or already verified!"));
  }
  order.status = "complete";
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "order verified successfully!"));
});


// accept order 
export const acceptOrder = asyncHandler(async (req, res, next) => {
  const { orderId, deleveryPartner } = req.body;
  console.log("acceptOrder called", { orderId, deleveryPartner });
  if (!orderId || !deleveryPartner) {
    return next(new ApiError(400, "orderId or deleveryPartner is missing!"));
  }
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ApiError(400, "order is not found!"));
  }
  if( order.deleveryPartner){
    return next(new ApiError(400, "order is already accepted by another delivery partner!"));
  }
  order.deleveryPartner = deleveryPartner;
  order.status = "accept";
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "order accepted successfully!"));
});