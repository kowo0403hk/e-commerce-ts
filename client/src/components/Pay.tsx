import { FC, useState, useEffect } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import axios from "axios";

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;

const Pay: FC = () => {
  const [stripeToken, setStripeToken] = useState<Token | null>(null);

  const onToken = (token: Token | null) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/payments", {
          tokenId: stripeToken!.id,
          amount: 3000,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken! && makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing...Please wait.</span>
      ) : (
        <StripeCheckout
          name="PigCasso"
          image="https://github.com/kowo0403hk/e-commerce-ts/blob/main/client/docs/logo.png?raw=true"
          billingAddress
          shippingAddress
          description="Your total is $30"
          amount={3000}
          token={onToken}
          currency="cad"
          stripeKey={KEY}
          // I additionally added a children: React.ReactNode key-value pair to its interface, checkout the documentation
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
