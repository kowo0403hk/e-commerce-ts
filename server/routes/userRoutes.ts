import express, { Request, Response, IRouter } from "express";

const router = express.Router();

const userRouter = (): IRouter => {
  router.get("/", (req: Request, res: Response) => {
    res.send("Hello There");
  });

  router.post("/post", (req: Request, res: Response) => {
    console.log(req.body.username);
    res.send("Post request successful");
  });

  return router;
};

export default userRouter;
