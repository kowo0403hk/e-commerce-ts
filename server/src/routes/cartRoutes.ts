import express, { Request, Response, IRouter } from "express";
import { isAuthenticated, verifyToken, isAdmin } from "../helpers/verifyToken"; //middleware doing the user authentication work
import Cart, { CartDocument } from "../models/Cart";

const router = express.Router();

const productRouter = (): IRouter => {
  // Create a new cart
  router.post("/", verifyToken, async (req: Request, res: Response) => {
    const newCart = new Cart(req.body);

    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Update cart
  router.put("/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete cart
  router.delete(
    "/:id",
    isAuthenticated,
    async (req: Request, res: Response) => {
      try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been emptied.");
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  // Get user cart by userID
  router.get("/find/:id", async (req: Request, res: Response) => {
    try {
      const cart: CartDocument | null = await Cart.findOne({
        userId: req.params.userId,
      });

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get all cart of all users
  router.get("/", isAdmin, async (req: Request, res: Response) => {
    try {
      const carts: CartDocument[] = await Cart.find();

      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  return router;
};

export default productRouter;
