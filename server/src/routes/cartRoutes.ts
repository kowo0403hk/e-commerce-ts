import express, { Request, Response, IRouter } from "express";
import { isAuthenticated, verifyToken, isAdmin } from "../helpers/verifyToken"; //middleware doing the user authentication work
import Cart, { CartDocument } from "../models/Cart";

const router = express.Router();

const productRouter = (): IRouter => {
  // Create a new product by Admin
  router.post("/", verifyToken, async (req: Request, res: Response) => {
    const newCart = new Cart(req.body);

    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Update product info
  router.put("/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const updatedProduct = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete prodcut
  router.delete("/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get product
  router.get("/find/:id", async (req: Request, res: Response) => {
    try {
      const product: CartDocument | null = await Cart.findById(req.params.id);

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get all products
  router.get("/", async (req: Request, res: Response) => {
    const query = req.query.new;
    const byCategory = req.query.category;

    try {
      let products: CartDocument[] | undefined;

      if (query) products = await Cart.find().sort({ createdAt: -1 }).limit(5);

      if (byCategory)
        products = await Cart.find({ categories: { $in: [byCategory] } });

      if (!query && !byCategory) products = await Cart.find();

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  return router;
};

export default productRouter;
