import React from "react";
import { Typography, makeStyles, Grid, Button } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

const CheckoutSuccess = ({ amount, clientSecret }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.grid}
        direction="column"
        alignItems="center"
        justify="space-between"
        spacing={4}
      >
        <Grid item>
          <Typography variant="h5">
            Your payment of {amount}$CAD is completed
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">Keep your reference:</Typography>
          <Typography variant="subtitle2">{clientSecret}</Typography>
        </Grid>
        <Grid item>
          <CheckCircleOutline className={classes.checkCircle} />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            <Link to="/" className={classes.link}>
              Return to home page
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },
  checkCircle: {
    color: "green",
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
    width: theme.spacing(20),
  },
}));

export default CheckoutSuccess;
