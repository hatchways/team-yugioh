import React from "react";
import { Typography, makeStyles, Grid, Button } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Cash from "../../assets/cash.png";

const PaymentSuccess = () => {
  const classes = useStyles();
  const { reference } = useParams(); //this allows us to refresh the success page without losing information
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.grid}
        direction="column"
        alignItems="center"
        justify="space-between"
        spacing={1}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            align="center"
            className={classes.thanks}
          >
            <Grid item>
              <CheckCircleOutline className={classes.checkCircle} />
            </Grid>
            <Grid item>
              <Typography variant="h5">
                Thank you for your subscription!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <img
            className={classes.calendy}
            src={Cash}
            alt="cute calendar holding cash"
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">Keep your reference:</Typography>
          <Typography variant="subtitle2">{reference}</Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Button color="primary" variant="contained" className={classes.button}>
          <Link to="/home" className={classes.link}>
            Return to home page
          </Link>
        </Button>
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
  calendy: {
    width: "40%",
    display: "block",
    margin: "auto",
  },
  checkCircle: {
    color: "green",
    height: theme.spacing(3),
    width: theme.spacing(6),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  thanks: {
    marginLeft: "-4%",
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
}));

PaymentSuccess.propTypes = {
  amount: PropTypes.number,
  clientSecret: PropTypes.string,
};

export default PaymentSuccess;
