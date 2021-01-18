import React from "react";
import { Grid, makeStyles, Paper, Button, Typography } from "@material-ui/core";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <div className={classes.cardNum}>
            <Typography variant="subtitle2">Card number</Typography>
            <CardNumberElement classes={classes.cardNum2} />
          </div>
        </Grid>

        <Grid item container spacing={4} justify="center" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2">Expiry date</Typography>
            <CardExpiryElement />
          </Grid>

          <Grid item>
            <div className={classes.cardCvc}>
              <Typography variant="subtitle2">CVC</Typography>
              <CardCvcElement />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default CheckoutForm;
