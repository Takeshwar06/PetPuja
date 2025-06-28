import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";
import paymentRoute from "./routes/payment.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    project: "PetPuja",
    startAt: "27/06/2025",
  });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/payments", paymentRoute);

app.use(errorMiddleware);

export { app };
