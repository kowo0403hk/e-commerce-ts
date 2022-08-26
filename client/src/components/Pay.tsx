import { FC, useState, useEffect } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
import { userRequest } from "../helpers/requestMethods";

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;

interface ReduxCartProduct {
  _id?: number;
  title?: string;
  desc?: string;
  img?: string;
  categories?: string[] | null;
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface IPay {
  children: React.ReactNode;
  cart: {
    products: ReduxCartProduct;
    quantity: number;
    subtotal: number;
  };
}

const Pay: FC<IPay> = ({ children, cart }: IPay) => {
  const [stripeToken, setStripeToken] = useState<Token | null>(null);

  const onToken = (token: Token | null) => {
    setStripeToken(token);
  };

  const history = useHistory();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/payments", {
          tokenId: stripeToken!.id,
          amount: cart.subtotal * 1.12 * 100,
        });

        history.push("/success", { stripeData: res.data, products: cart });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken! && makeRequest();
  }, [stripeToken, cart.subtotal, history]);

  return (
    <div>
      {stripeToken ? (
        <span>Processing...Please wait.</span>
      ) : (
        <StripeCheckout
          name="PiggyLand"
          image="https://github.com/kowo0403hk/e-commerce-ts/blob/main/client/docs/logo.png?raw=true"
          billingAddress
          shippingAddress
          description={
            "Your total is $" +
            ((cart.subtotal * 1.12) / 100).toFixed(2) +
            " CAD."
          }
          amount={cart.subtotal * 1.12}
          token={onToken}
          currency="cad"
          stripeKey={KEY}
          // I additionally added a children: React.ReactNode key-value pair to its interface, checkout the documentation
        >
          {children}
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
