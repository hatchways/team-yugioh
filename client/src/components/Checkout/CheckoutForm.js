import React from "react";
import {
  Grid,
  makeStyles,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount, clientSecret, status, setStatus }) => {
  const classes = useStyles();
  const submitPayment = (event) => {
    event.preventDefault();
  };
  return (
    <form className={classes.form} onSubmit={submitPayment}>
      <Grid
        className={classes.grid}
        container
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Typography variant="h5" className={classes.title}>
            Checkout
          </Typography>
        </Grid>

        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <Typography variant="subtitle2">Card number</Typography>
            <div className={`${classes.cardInput} ${classes.cardNum}`}>
              <CardNumberElement classes={classes.cardNum2} />
            </div>
          </Grid>

          <Grid item container spacing={4} justify="center" alignItems="center">
            <Grid item xs={7}>
              <Typography variant="subtitle2">Expiry date</Typography>
              <div className={`${classes.cardInput} ${classes.cardExpiry}`}>
                <CardExpiryElement />
              </div>
            </Grid>

            <Grid item xs={5}>
              <Typography variant="subtitle2">CVC</Typography>
              <div className={`${classes.cardCvc} ${classes.cardInput}`}>
                <CardCvcElement />
              </div>
            </Grid>
          </Grid>
        </Grid>

        {status === "failure" ? <Typography>Payment failed</Typography> : null}
      </Grid>

      <Grid container justify="center">
        <Button color="primary" variant="contained" className={classes.button}>
          {status === "pending" ? (
            <CircularProgress color="secondary" />
          ) : (
            `Pay ${amount} CAD$`
          )}
        </Button>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "auto",
    width: theme.spacing(40),
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  cardInput: {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(0.3),
    borderColor: "#bfcae1",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  cardNum: {
    width: theme.spacing(30),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
    width: theme.spacing(20),
    position: "absolute",
    bottom: theme.spacing(4),
    margin: "auto",
  },
}));

export default CheckoutForm;
