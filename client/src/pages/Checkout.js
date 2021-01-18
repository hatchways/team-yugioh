import { Grid, makeStyles, Paper, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IAF0CHUsZNgCog2HKJ6N7blSBXlpTbMyPOsW4bXMVHlrWEPAbvhkcLtHxrcLdB7Git73G7i4eU2I4kovKAfBhvY00gbMjxWER"
);

const CheckoutPage = () => {
  const classes = useStyles();

  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .get("/api/checkout")
      .then((res) => {
        const amount = res.data.amount || undefined;
        const clientSecret = res.data.clientSecret || undefined;
        if (amount && clientSecret) {
          setAmount(amount);
          setClientSecret(clientSecret);
        } else {
          throw new Error("Not getting amount or client secret from backend");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Paper className={classes.root} elevation={5} spacing={5}>
        <Grid
          className={classes.grid}
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              Checkout
            </Typography>
          </Grid>

          <Grid item>
            <CheckoutForm amount={amount} clientSecret={clientSecret} />
          </Grid>
        </Grid>
      </Paper>
    </Elements>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(40),
    width: theme.spacing(60),
    margin: `${theme.spacing(10)}px auto`,
  },
  form: {
    width: theme.spacing(40),
  },
  grid: {
    height: "100%",
  },
}));

export default CheckoutPage;
