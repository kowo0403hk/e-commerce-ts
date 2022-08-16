import express, { Request, Response, IRouter } from "express";
import { isAdmin } from "../helpers/verifyToken"; //middleware doing the user authentication work
import Product, { ProductDocument } from "../models/Product";

const router = express.Router();

const productRouter = (): IRouter => {
  // Create a new product by Admin
  router.post("/", isAdmin, async (req: Request, res: Response) => {
    const newProduct = new Product(req.body);

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Update product info
  router.put("/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
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
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get product
  router.get("/find/:id", async (req: Request, res: Response) => {
    try {
      const product: ProductDocument | null = await Product.findById(
        req.params.id
      );

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
      let products: ProductDocument[] | undefined;

      if (query)
        products = await Product.find().sort({ createdAt: -1 }).limit(5);

      if (byCategory)
        products = await Product.find({ categories: { $in: [byCategory] } });

      if (!query && !byCategory) products = await Product.find();

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  return router;
};

export default productRouter;
