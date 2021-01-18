import { Grid, makeStyles, Paper, Button, Typography } from "@material-ui/core";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IAF0CHUsZNgCog2HKJ6N7blSBXlpTbMyPOsW4bXMVHlrWEPAbvhkcLtHxrcLdB7Git73G7i4eU2I4kovKAfBhvY00gbMjxWER"
);

const CheckoutPage = () => {
  const classes = useStyles();
  return (
    <Elements stripe={stripePromise}>
      <Paper className={classes.root} elevation={5}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="space-around"
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
  return (
    <form>
      <CardElement />
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(60),
    width: theme.spacing(100),
    margin: `${theme.spacing(10)}px auto`,
  },
}));

export default CheckoutPage;

// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const CheckoutForm = () => {
//   const stripe = useStripe();

//   return (
//     <form>
//       <CardElement />
//     </form>
//   );
// };

// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

// const App = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );

// export default App;
