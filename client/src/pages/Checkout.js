import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Route } from "react-router-dom";

import CollectPayment from "../components/Checkout/CollectPayment";
import PaymentSucceeds from "../components/Checkout/PaymentSucceeds";

const stripePromise = loadStripe(
  "pk_test_51IAF0CHUsZNgCog2HKJ6N7blSBXlpTbMyPOsW4bXMVHlrWEPAbvhkcLtHxrcLdB7Git73G7i4eU2I4kovKAfBhvY00gbMjxWER"
);

const CheckoutPage = () => {
  const classes = useStyles();

  const [status, setStatus] = useState(""); //pending, failure
  const [askForPayment, setAskForPayment] = useState(false);

  useEffect(() => {
    axios.get("/api/subscription/check").then((res) => {
      const subscribed = res.data.subscribed;
      setAskForPayment(!subscribed);
    });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Paper className={classes.root} elevation={5}>
        <Route exact path="/checkout">
          <CollectPayment
            status={status}
            setStatus={setStatus}
            askForPayment={askForPayment}
          />
        </Route>

        <Route path="/checkout/success/:reference">
          <PaymentSucceeds />
        </Route>
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
