import React from "react";
import {
  Grid,
  makeStyles,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom";

const price = 8;
const priceId = "prod_IngdayIOUK0C6B";

const CollectPayment = ({ status, setStatus, askForPayment }) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const [customerId, setCustomerId] = useState();
  const [redirectToSuccess, setRedirectToSuccess] = useState(false);

  useEffect(() => {
    axios.post("/api/subscription/create-customer").then((res) => {
      const id = res.data.customer.id;
      console.log("customer Id:", id);
      setCustomerId(id);
    });
  }, [askForPayment, customerId]);

  const submitPayment = (event) => {
    if (!amount || !clientSecret) {
      //edge cases, although unlikely
      throw new Error("amount or clientSecret has not been set");
    }
    event.preventDefault();
    setStatus("pending");
    stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: "john doe", // for now
        },
      })
      .then((result) => {
        if (result.error) {
          setStatus("failure");
        } else {
          setRedirectToSuccess(true);
          createSubscription({
            customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId,
          });
        }
      });
  };

  if (redirectToSuccess) {
    return <Redirect to={`/checkout/success/${customerId}`} />;
  } else {
    return (
      <form className={classes.form} onSubmit={submitPayment}>
        <Grid
          className={classes.grid}
          container
          direction="column"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              Checkout
            </Typography>
          </Grid>

          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item container>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Card number</Typography>
                <div className={classes.cardInput}>
                  <CardNumberElement classes={classes.cardNum2} />
                </div>
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={4}
              justify="center"
              alignItems="center"
            >
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

          <Grid item>
            {status === "failure" ? (
              <Typography
                className={classes.failureMsg}
                variant="h5"
                color="error"
              >
                "Payment failed"
              </Typography>
            ) : !askForPayment ? (
              <Typography
                className={classes.failureMsg}
                variant="h6"
                color="success"
              >
                You have subscribed already!
              </Typography>
            ) : null}
          </Grid>
        </Grid>

        <Grid container justify="center">
          {askForPayment ? (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
            >
              {status === "pending" ? (
                <CircularProgress />
              ) : (
                `Pay ${price} $CAD`
              )}
            </Button>
          ) : null}
        </Grid>
      </form>
    );
  }
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
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
    width: theme.spacing(20),
    height: theme.spacing(5),
    position: "absolute",
    bottom: theme.spacing(4),
    margin: "auto",
  },
  failureMsg: {
    margin: theme.spacing(3),
  },
}));

CollectPayment.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clientSecret: PropTypes.string,
  status: PropTypes.string,
  setStatus: PropTypes.func,
};

export default CollectPayment;
