import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";

const url = process.env.DB_URL as string;

mongoose
  .connect(url)
  .then((response: any) => console.log("DB connection successful"))
  .catch((error: any) => console.error(error));

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("received home page request");
  res.send("Hello");
});

app.listen(process.env.PORT || 9999, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
