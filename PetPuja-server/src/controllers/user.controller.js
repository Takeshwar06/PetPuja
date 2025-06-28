import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const deliveryLogin = asyncHandler(async (req, res, next) => {
  const { mobileNo, password } = req.body;

  console.log("login called");
  if (!mobileNo || !password) {
    return next(new ApiError(400, "mobileNo or password is missing!"));
  }

  if (password !== "PetPuja@123") {
    return next(new ApiError(400, "password is not correct!"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, { mobileNo, password }, "login successfull!"));
});
