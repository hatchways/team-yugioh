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
          justify="space-between"
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
            <Button>Pay</Button>
          </Grid>
        </Grid>
      </Paper>
    </Elements>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const classes = useStyles();
  return (
    <form>
      <Typography variant="subtitle2">Card number</Typography>
      <CardNumberElement />

      <Grid item container>
        <Grid item>
          <Typography variant="subtitle2">Expiry date</Typography>
          <CardExpiryElement />
        </Grid>

        <Grid item className={classes.cvc}>
          <Typography variant="subtitle2">CVC</Typography>
          <CardCvcElement />
        </Grid>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(60),
    width: theme.spacing(100),
    margin: `${theme.spacing(10)}px auto`,
  },
  form: {
    width: "20em",
  },
  grid: {
    height: "100%",
  },
  cardNum: {
    width: "10em",
  },
  cardCvc: {
    width: "5em",
  },
}));

export default CheckoutPage;
