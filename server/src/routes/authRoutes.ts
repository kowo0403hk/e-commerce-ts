// Registration route goes here
import express, { Request, Response, IRouter } from "express";
import User from "../models/User";

const router = express.Router();

const authRouter = (): IRouter => {
  router.post("/register", async (req: Request, res: Response) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  return router;
};

export default authRouter;
