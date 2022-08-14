import express, { Request, Response, IRouter } from "express";
import { isAuthenticated, isAdmin } from "../helpers/verifyToken"; //middleware doing the user authentication work
import User, { UserDocument } from "../models/User";

const router = express.Router();

const userRouter = (): IRouter => {
  // Update user info
  router.put("/:id", isAuthenticated, async (req: Request, res: Response) => {
    // isAuthenticated middleware already did the authentication part, so we can directly process user info update request
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY as string
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete user
  router.delete(
    "/:id",
    isAuthenticated,
    async (req: Request, res: Response) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  // Get user stats
  router.get("/stats", isAdmin, async (req: Request, res: Response) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: lastYear },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get user
  router.get("/find/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const user: UserDocument | null = await User.findById(req.params.id);
      const { password, ...others } = user!._doc;

      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Get all users
  router.get("/", isAdmin, async (req: Request, res: Response) => {
    const query = req.query.new;

    try {
      const users: UserDocument[] = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  return router;
};

export default userRouter;
