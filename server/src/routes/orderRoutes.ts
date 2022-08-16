import express, { Request, Response, IRouter } from "express";
import { isAuthenticated, verifyToken, isAdmin } from "../helpers/verifyToken"; //middleware doing the user authentication work
import Order, { OrderDocument } from "../models/Order";

const router = express.Router();

const productRouter = (): IRouter => {
  // Create a new order
  router.post("/", verifyToken, async (req: Request, res: Response) => {
    const newOrder = new Order(req.body);

    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Update order
  router.put("/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete order
  router.delete("/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been emptied.");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get user order by userID
  router.get("/find/:id", async (req: Request, res: Response) => {
    try {
      const orders: OrderDocument[] | null = await Order.find({
        userId: req.params.userId,
      });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get all cart of all users
  router.get("/", isAdmin, async (req: Request, res: Response) => {
    try {
      const orders: OrderDocument[] = await Order.find();

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get monthly income

  router.get("/income", isAdmin, async (req: Request, res: Response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    // prevMonth is the month before last month
    const prevMonth = new Date(new Date(date.setMonth(date.getMonth() - 1)));

    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: prevMonth },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);

      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  return router;
};

export default productRouter;
