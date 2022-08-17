import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./src/routes/userRoutes";
import authRouter from "./src/routes/authRoutes";
import productRouter from "./src/routes/productRoutes";
import cartRouter from "./src/routes/cartRoutes";
import orderRouter from "./src/routes/orderRoutes";
import paymentRouter from "./src/routes/paymentRouter";
import cors from "cors";

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.error(error));

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routers
app.use("/api/users", userRouter());
app.use("/api/auth", authRouter());
app.use("/api/products", productRouter());
app.use("/api/carts", cartRouter());
app.use("/api/orders", orderRouter());
app.use("/api/payments", paymentRouter());

app.listen(process.env.PORT || 9999, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
