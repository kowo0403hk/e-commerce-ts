import express, { Request, Response, IRouter } from "express";
import { verifyToken, isAuthenticated } from "../helpers/verifyToken"; //middleware doing the user authentication work
import User from "../models/User";

const router = express.Router();

const userRouter = (): IRouter => {
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

  return router;
};

export default userRouter;
