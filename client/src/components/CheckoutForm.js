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
import { Link } from "react-router-dom";

const CheckoutForm = (props) => {
  //const stripe = useStripe();
  const classes = useStyles();
  const amount = props.amount;
  const clientSecret = props.clientSecret;
  return (
    <form className={classes.form}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="subtitle2">Card number</Typography>
          <div className={`${classes.cardInput} ${classes.cardNum}`}>
            <CardNumberElement classes={classes.cardNum2} />
          </div>
        </Grid>

        <Grid item container spacing={4} justify="center" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2">Expiry date</Typography>
            <div className={`${classes.cardInput} ${classes.cardExpiry}`}>
              <CardExpiryElement />
            </div>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2">CVC</Typography>
            <div className={`${classes.cardCvc} ${classes.cardInput}`}>
              <CardCvcElement />
            </div>
          </Grid>
        </Grid>

        <Grid item>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            <Link to="/" className={classes.link}>
              Pay {amount} CAD$
            </Link>
          </Button>
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
    width: theme.spacing(30),
  },
  cardInput: {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(0.3),
    borderColor: "#bfcae1",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  cardCvc: {
    width: theme.spacing(10),
  },
  cardExpiry: {
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

export default CheckoutForm;
