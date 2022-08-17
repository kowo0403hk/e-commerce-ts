import { FC } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;

const Pay: FC = () => {
  const onToken = (token: Token) => {
    console.log(token);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="Piggy Island"
        image="#"
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
    </div>
  );
};

export default Pay;
