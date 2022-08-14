import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const verifyToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.token as string;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err: any, user: any) => {
        if (err) return res.status(403).json("Token is not valid.");
        req.user = user;
      }
    );
    next();
  } else {
    return res.status(401).json("You are not authenticated.");
  }
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: Function
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log(req.user);
      next();
    } else return res.status(403).json("You are not authenticated");
  });
};
