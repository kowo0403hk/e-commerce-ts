// Registration route goes here
import express, { Request, Response, IRouter } from "express";
import CryptoJS from "crypto-js";
import User, { UserDocument } from "../models/User";

const router = express.Router();

const authRouter = (): IRouter => {
  // user registration
  router.post("/register", async (req: Request, res: Response) => {
    const newUser: UserDocument = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY as string
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  // user login
  router.post("/login", async (req: Request, res: Response) => {
    try {
      const user: UserDocument | null = await User.findOne({
        username: req.body.username,
      });

      if (!user) return res.status(401).json("Wrong credentials!");

      const hashedPassword = CryptoJS.AES.decrypt(
        user!.password,
        process.env.SECRET_KEY as string
      );

      const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (orginalPassword !== req.body.password)
        return res.status(401).json("Wrong credentials!");

      // we extract password from the object and send the rest of the key value pairs to the client
      // _doc property is where all the user information stored
      const { password, ...others } = user._doc;

      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  return router;
};

export default authRouter;
