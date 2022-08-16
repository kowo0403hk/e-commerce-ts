import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./src/routes/userRoutes";
import authRouter from "./src/routes/authRoutes";
import productRouter from "./src/routes/productRoutes";

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.error(error));

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routers
app.use("/api/users", userRouter());
app.use("/api/auth", authRouter());
app.use("/api/products", productRouter());

app.listen(process.env.PORT || 9999, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
