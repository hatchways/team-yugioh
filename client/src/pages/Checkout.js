import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import CheckoutForm from "../components/Checkout/CheckoutForm";
import CheckoutSuccess from "../components/Checkout/CheckoutSuccess";

const stripePromise = loadStripe(
  "pk_test_51IAF0CHUsZNgCog2HKJ6N7blSBXlpTbMyPOsW4bXMVHlrWEPAbvhkcLtHxrcLdB7Git73G7i4eU2I4kovKAfBhvY00gbMjxWER"
);

const CheckoutPage = () => {
  const classes = useStyles();

  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [status, setStatus] = useState(""); //pending, success, failure
  const [askForPayment, setAskForPayment] = useState(false);

  useEffect(() => {
    axios.get("/api/subscription/check").then((res) => {
      const subscribed = res.data.subscribed;
      setAskForPayment(!subscribed);
    });
  }, []);

  useEffect(() => {
    if (askForPayment) {
      axios.get("/api/subscription/pay").then((res) => {
        const amount = res.data.amount || undefined;
        const clientSecret = res.data.clientSecret || undefined;
        if (amount && clientSecret) {
          setAmount(amount / 100); //stripe API interpret the last two digits as decimals
          setClientSecret(clientSecret);
        } else {
          throw new Error("Not getting amount or client secret from backend");
        }
      });
    }
  }, [askForPayment]);

  return (
    <Elements stripe={stripePromise}>
      <Paper className={classes.root} elevation={5}>
        {status === "success" ? (
          <CheckoutSuccess amount={amount} clientSecret={clientSecret} />
        ) : (
          <CheckoutForm
            amount={amount}
            clientSecret={clientSecret}
            status={status}
            setStatus={setStatus}
            askForPayment={askForPayment}
          />
        )}
      </Paper>
    </Elements>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(50),
    width: theme.spacing(60),
    margin: `${theme.spacing(10)}px auto`,
    position: "relative",
  },
}));

export default CheckoutPage;
