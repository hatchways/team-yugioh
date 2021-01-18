import { Grid, makeStyles, Paper, Button, Typography } from "@material-ui/core";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IAF0CHUsZNgCog2HKJ6N7blSBXlpTbMyPOsW4bXMVHlrWEPAbvhkcLtHxrcLdB7Git73G7i4eU2I4kovKAfBhvY00gbMjxWER"
);

const CheckoutPage = () => {
  const classes = useStyles();
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
            <CheckoutForm />
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              <Link to="/" className={classes.link}>
                Pay
              </Link>
            </Button>
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
  cardNum: {
    width: theme.spacing(20),
  },
  cardNum2: {
    border: "1px black solid",
  },
  cardCvc: {
    width: theme.spacing(10),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    width: "3em",
  },
}));

export default CheckoutPage;
