import express, { Request, Response, IRouter } from "express";
import StripeRawError from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

const router = express.Router();

const paymentRouter = (): IRouter => {
  router.post("/", async (req: Request, res: Response) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "cad",
      },
      (stripeErr: StripeRawError, stripeRes: any) => {
        stripeErr
          ? res.status(500).json(stripeErr)
          : res.status(200).json(stripeRes);
      }
    );
  });

  return router;
};

export default paymentRouter;
