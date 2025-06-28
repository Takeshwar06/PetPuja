import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/order.model.js";
import Qr from "qrcode";

// order creation
export const createOrder = asyncHandler(async (req, res, next) => {
  const { items, totalAmount, user } = req.body;

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
  });
  Qr.toDataURL(order._id, async (err, url) => {
    if (err) {
      await Order.findByIdAndDelete(order._id);
      return next(new ApiError(400, "order qr code is not created!"));
    }

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
  const orders = await Order.find({ deleveryPartner });
  res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully!"));
});

// update status
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { orderId, status } = req.body;
  const order = await Order.findById(orderId);
  order.status = status;
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "order status updated successfully!"));
});
